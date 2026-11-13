@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies, this takes a minute the first time...
  call npm install
)
echo Starting the portfolio at http://localhost:5173
call npm run dev -- --open
pause
