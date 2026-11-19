/**
 * ==========================================================================
 * JIB x iHaveCPU — Local Development Server & Auto-Launcher (server.js)
 * Zero external dependencies (uses Node.js built-in modules)
 * ==========================================================================
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  const safeUrl = req.url.split("?")[0];
  const relativePath =
    safeUrl === "/" ? "index.html" : safeUrl.replace(/^\/+/, "");
  const filePath = path.join(ROOT_DIR, relativePath);

  // Prevent directory traversal outside project root
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 Forbidden");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found: " + safeUrl);
      } else {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("500 Internal Server Error");
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log("============================================================");
  console.log(" 🚀 JIB x iHaveCPU Server is running!");
  console.log(` 🌐 Open in Browser: ${url}`);
  console.log(" 🛑 Press Ctrl + C to stop the server.");
  console.log("============================================================");

  // Auto-open default browser on Windows / macOS / Linux
  if (!process.env.NO_OPEN) {
    const startCmd =
      process.platform === "win32"
        ? `start "" "${url}"`
        : process.platform === "darwin"
          ? `open "${url}"`
          : `xdg-open "${url}"`;
    exec(startCmd);
  }
});
