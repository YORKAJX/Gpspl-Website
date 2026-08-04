# GPSPL Website Build & Verification Tool
# Usage: .\scripts\build.ps1

$ErrorActionPreference = "Stop"

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "     GPSPL WEBSITE BUILD & VERIFICATION TOOL      " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Verify Node.js Environment
Write-Host "`n[1/4] Checking Node.js environment..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node -v
    Write-Host "✓ Node.js is installed ($nodeVersion)" -ForegroundColor Green
} else {
    Write-Error "Node.js is not installed or not in system PATH. Please install Node.js."
}

# 2. Run Javascript Syntax checks
Write-Host "`n[2/4] Verifying JavaScript syntax..." -ForegroundColor Yellow
Write-Host "Checking JS/analytics.js..." -ForegroundColor DarkGray
node --check JS/analytics.js
Write-Host "Checking JS/form-validation.js..." -ForegroundColor DarkGray
node --check JS/form-validation.js
Write-Host "Checking JS/room-configurator.js..." -ForegroundColor DarkGray
node --check JS/room-configurator.js
Write-Host "Checking JS/service-page.js..." -ForegroundColor DarkGray
node --check JS/service-page.js
Write-Host "Checking JS/service-page-icons.js..." -ForegroundColor DarkGray
node --check JS/service-page-icons.js
Write-Host "Checking scripts/prerender.mjs..." -ForegroundColor DarkGray
node --check scripts/prerender.mjs
Write-Host "✓ JavaScript syntax check passed successfully." -ForegroundColor Green

# 3. Compile Static Content and Inline Header/Footer
Write-Host "`n[3/4] Running pre-rendering engine..." -ForegroundColor Yellow
try {
    node scripts/prerender.mjs
    Write-Host "✓ Pre-rendering and inlining completed successfully." -ForegroundColor Green
} catch {
    Write-Error "Pre-rendering script execution failed: $_"
}

# 4. Check Git Status
Write-Host "`n[4/4] Checking Git repository health..." -ForegroundColor Yellow
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitStatus = git status -s
    if ($gitStatus) {
        Write-Host "Modified/Untracked files in local working directory:" -ForegroundColor DarkYellow
        git status -s
    } else {
        Write-Host "✓ Local working directory is clean." -ForegroundColor Green
    }
} else {
    Write-Host "! Git command is not available in system PATH." -ForegroundColor Gray
}

Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "              BUILD COMPLETED SUCCESSFULLY        " -ForegroundColor Green
Write-Host "==================================================`n" -ForegroundColor Green
