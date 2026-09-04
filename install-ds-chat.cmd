@echo off
setlocal
cd /d "%~dp0"
where dsh >nul 2>nul || (
  echo DS Chat requires DeepSeek Harness. Install the dsh command first.
  exit /b 1
)
where pnpm >nul 2>nul || (
  echo DS Chat plugin installation requires pnpm on PATH.
  exit /b 1
)
npm install
if errorlevel 1 exit /b %errorlevel%
dsh plugin --profile web add "%CD%"
if errorlevel 1 exit /b %errorlevel%
dsh --profile web %*
exit /b %errorlevel%
