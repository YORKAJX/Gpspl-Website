const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });

  const page = await browser.newPage({
    viewport: { width: 1536, height: 864 },
    deviceScaleFactor: 1,
  });

  await page.goto('http://127.0.0.1:5501/index.html', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  });

  const desktopShots = [
    ['featured', '#featured-products'],
    ['testimonials', '#testimonials'],
    ['partners', '#partners'],
    ['industries', '#industries'],
    ['cases', '.home-case-study-preview'],
    ['seo', '.seo-intent-section'],
  ];

  for (const [name, selector] of desktopShots) {
    await page.evaluate((currentSelector) => {
      document.querySelector(currentSelector)?.scrollIntoView({ block: 'start' });
    }, selector);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `outputs/home-final-polish-20260803/${name}.png` });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5501/index.html', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  });

  const mobileShots = [
    ['mobile-featured', '#featured-products'],
    ['mobile-testimonials', '#testimonials'],
    ['mobile-partners', '#partners'],
    ['mobile-industries', '#industries'],
    ['mobile-seo', '.seo-intent-section'],
  ];

  for (const [name, selector] of mobileShots) {
    await page.evaluate((currentSelector) => {
      document.querySelector(currentSelector)?.scrollIntoView({ block: 'start' });
    }, selector);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `outputs/home-final-polish-20260803/${name}.png` });
  }

  await browser.close();
})();
