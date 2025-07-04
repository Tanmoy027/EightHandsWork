# filepath: scripts/restart-dev-server.ps1
# PowerShell script to restart Next.js dev server

Write-Host "`n============ Restarting Next.js Dev Server ============`n" -ForegroundColor Cyan

# Find any running Next.js processes
$nextProcesses = Get-Process | Where-Object { $_.ProcessName -eq "node" -and $_.CommandLine -like "*next*" }

if ($nextProcesses) {
    Write-Host "Stopping existing Next.js server processes..." -ForegroundColor Yellow
    foreach ($process in $nextProcesses) {
        try {
            $process | Stop-Process -Force
            Write-Host "Stopped process with ID: $($process.Id)" -ForegroundColor Green
        } catch {
            Write-Host "Failed to stop process with ID: $($process.Id)" -ForegroundColor Red
        }
    }
}

# Small delay to ensure processes are fully terminated
Start-Sleep -Seconds 2

# Reload environment
Write-Host "`nReloading environment variables..." -ForegroundColor Yellow
node scripts/reload-env.js

# Start the dev server
Write-Host "`nStarting Next.js development server..." -ForegroundColor Green
npm run dev

# Script end
Write-Host "`n============ Server restarted ============`n" -ForegroundColor Cyan
