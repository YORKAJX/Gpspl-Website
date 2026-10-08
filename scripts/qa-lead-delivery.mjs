import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { handler } from '../netlify/functions/submit-enquiry.js';

// All delivery is mocked. No email, telemetry or production lead is sent.
const savedFetch = globalThis.fetch;
const savedEnv = { key: process.env.RESEND_API_KEY, turnstile: process.env.TURNSTILE_SECRET_KEY };
delete process.env.TURNSTILE_SECRET_KEY;
const event = (phone, ip) => ({ httpMethod: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
  body: JSON.stringify({ name: 'QA Project Buyer', phone, requirement: 'Conference Room', message: 'Mocked delivery verification only.' }) });
try {
  delete process.env.RESEND_API_KEY;
  globalThis.fetch = async () => { throw Error('Unexpected network call'); };
  const missing = await handler(event('9123456701', 'qa-missing'));
  assert.equal(missing.statusCode, 503);
  assert.equal(JSON.parse(missing.body).code, 'EMAIL_DELIVERY_UNAVAILABLE');
  assert.ok(JSON.parse(missing.body).deliveryFailures.includes('resend_not_configured'));
  assert.ok(!missing.body.includes('mock-key'));
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: 'true' }) });
  const fallback = await handler(event('9123456709', 'qa-fallback'));
  assert.equal(fallback.statusCode, 200);
  assert.equal(JSON.parse(fallback.body).deliveryId, 'formsubmit-accepted');
  process.env.RESEND_API_KEY = 'mock-key-for-test-only';
  globalThis.fetch = async () => ({ ok: false, status: 429, json: async () => ({ error: 'provider rejection' }) });
  assert.equal((await handler(event('9123456702', 'qa-retry'))).statusCode, 503);
  let calls = 0;
  globalThis.fetch = async () => { calls++; return { ok: true, status: 200, json: async () => ({ id: 'mock-receipt' }) }; };
  const retry = await handler(event('9123456702', 'qa-retry'));
  assert.equal(retry.statusCode, 200);
  assert.equal(JSON.parse(retry.body).deliveryId, 'mock-receipt');
  const callsAfterReceipt = calls;
  assert.equal(JSON.parse((await handler(event('9123456702', 'qa-retry'))).body).isDuplicate, true);
  assert.equal(calls, callsAfterReceipt);
  globalThis.fetch = async () => { throw Error('Mock network outage'); };
  assert.equal((await handler(event('9123456703', 'qa-network'))).statusCode, 503);
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({}) });
  assert.equal((await handler(event('9123456704', 'qa-no-receipt'))).statusCode, 503);
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ id: 'mock-receipt' }) });
  const mailEvent = event('9123456705', 'qa-ack');
  mailEvent.body = JSON.stringify({ ...JSON.parse(mailEvent.body), email: 'qa@example.com' });
  let ackCalls = 0;
  globalThis.fetch = async () => { if (++ackCalls === 2) throw Error('Mock acknowledgement failure'); return { ok: true, status: 200, json: async () => ({ id: 'mock-team-receipt' }) }; };
  assert.equal((await handler(mailEvent)).statusCode, 200);
} finally {
  globalThis.fetch = savedFetch;
  for (const [key, value] of [['RESEND_API_KEY', savedEnv.key], ['TURNSTILE_SECRET_KEY', savedEnv.turnstile]]) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
}

async function frontendCase(file, response) {
  const button = { disabled: false, tagName: 'BUTTON', dataset: {} };
  const status = { className: '', textContent: '' };
  const time = { value: '' };
  let submit, redirects = 0, successes = 0, requests = 0;
  const form = { id: 'contact', classList: { contains: () => false }, dataset: {}, setAttribute() {}, appendChild() {}, getAttribute(k) { return k === 'action' ? '/thank-you' : 'contact'; },
    querySelectorAll() { return []; }, querySelector(s) { if (s === '.form-submit-status') return status; if (s.includes('form_time_token')) return time; if (s.includes('button[type=')) return button; return null; },
    addEventListener(name, fn) { if (name === 'submit') submit = fn; } };
  const document = { readyState: 'complete', querySelectorAll: () => [form], addEventListener() {}, dispatchEvent(e) { if (e.type === 'gpspl:lead-form-success') successes++; } };
  const context = { document, window: { location: { href: 'https://gpspl.co.in/contact', pathname: '/contact', origin: 'https://gpspl.co.in', assign() { redirects++; } } },
    URL, AbortController, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
    FormData: class { get(key) { return ({ name: 'QA Buyer', phone: '9123456706' })[key] || ''; } entries() { return [['name', 'QA Buyer'], ['phone', '9123456706']][Symbol.iterator](); } },
    btoa: s => Buffer.from(s).toString('base64'), setTimeout(fn, ms) { assert.equal(ms, 20000); return 1; }, clearTimeout() {},
    fetch: async () => { requests++; if (response instanceof Error) throw response; return { ok: response.ok, status: response.status || 200, json: async () => response.data }; } };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
  submit({ preventDefault() {} });
  for (let i = 0; i < 6; i++) await new Promise(resolve => setImmediate(resolve));
  assert.equal(requests, 1);
  const accepted = !(response instanceof Error) && response.ok && response.data.success === true && !response.data.skipped;
  assert.equal(redirects, accepted ? 1 : 0);
  assert.equal(successes, accepted ? 1 : 0);
  if (!accepted) { assert.equal(button.disabled, false); assert.equal(status.className, 'form-submit-status is-error'); }
}
for (const file of ['JS/form-validation.js']) {
  for (const response of [new Error('Network failed'), { ok: false, data: { error: 'Provider failed' } },
    { ok: true, data: {} }, { ok: true, data: { success: true, skipped: true } }, { ok: true, data: { success: true } }]) await frontendCase(file, response);
}
for (const file of ['index.html']) {
  const html = fs.readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!attrs.includes('application/ld+json') && body.trim()) new vm.Script(body);
  }
}
// Exercise the custom quote acceptance boundary without running page UI or network.
for (const file of ['JS/room-configurator.js']) {
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const start = text.indexOf("    try {\n      const response = await fetch('/.netlify/functions/submit-enquiry'");
  const end = text.indexOf('\n    // 2. Backup', start);
  assert.ok(start >= 0 && end > start, `${file}: quote acceptance boundary exists`);
  const block = text.slice(start, end);
  for (const accepted of [false, true]) {
    let success = 0, failed = 0;
    const button = { disabled: true };
    const check = vm.runInNewContext(`(async () => { ${block} return 'continue'; })`, {
      fetch: async () => ({ ok: accepted, json: async () => accepted ? { success: true } : { error: 'Mock failure' } }),
      AbortSignal, FormData: class { get() { return ''; } }, leadData: { name: 'QA Buyer' }, timeToken: '',
      form: { id: 'distributionSupplyForm', querySelector: () => button }, alert: () => failed++,
      document: { dispatchEvent: () => success++ }, CustomEvent: class { constructor(type) { this.type = type; } }
    });
    assert.equal(await check(), accepted ? 'continue' : undefined);
    assert.equal(success, accepted ? 1 : 0);
    assert.equal(failed, accepted ? 0 : 1);
    if (!accepted) assert.equal(button.disabled, false);
  }
}
console.log('PASS: mocked backend failures/retries/duplicates, 10 frontend delivery outcomes, and inline script syntax. No real messages sent.');
