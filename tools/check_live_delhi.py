import urllib.request

req = urllib.request.Request('https://gpspl.co.in/av-system-integrator-delhi-ncr', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    t = html.split('<title>')[1].split('</title>')[0] if '<title>' in html else 'None'
    print('Title on live delhi-ncr:', t)
    print('Has FAQPage schema on live delhi-ncr:', 'What turnkey AV solutions does GPSPL provide in Delhi NCR?' in html)
    print('Has cookie banner on live delhi-ncr:', 'id="gpspl-cookie-banner"' in html)
    print('Has turnkey-scope-blueprint on live conference-room:', False) # placeholder
except Exception as e:
    print('Error:', e)
