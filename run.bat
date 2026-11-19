@echo off
chcp 65001 >nul
title JIB x iHaveCPU Launcher
cd /d "%~dp0"

echo ============================================================
echo  [1/2] Using static HTML, CSS and JavaScript files...
echo ============================================================
echo  css\style.css is ready.

echo.
echo ============================================================
echo  [2/2] Starting Local Web Server on http://localhost:3000 ...
echo ============================================================
node server.js
pause
