@echo off
cd /d "%~dp0"

if exist node_modules (
  echo Cleaning old dependencies...
  rmdir /s /q node_modules
)

echo Installing dependencies...
call npm install

echo Starting CakeSensei...
start cmd /k "npm run dev"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

start "" http://localhost:5173
