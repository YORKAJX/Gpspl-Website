Write-Host "GPSPL WEBSITE BUILD TOOL" -ForegroundColor Cyan
Write-Host "Checking Node.js..." -ForegroundColor Yellow
node -v
Write-Host "Running JS syntax checks..." -ForegroundColor Yellow
node --check JS/service-page.js
node --check JS/service-page-icons.js
node --check scripts/prerender.mjs
Write-Host "JS syntax OK." -ForegroundColor Green
Write-Host "Running pre-render..." -ForegroundColor Yellow
node scripts/prerender.mjs
Write-Host "Pre-rendering complete." -ForegroundColor Green
Write-Host "BUILD SUCCESSFUL" -ForegroundColor Green
