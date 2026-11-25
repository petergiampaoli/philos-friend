#!/usr/bin/env node
import { createServer } from "node:net";
import { spawn, exec } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const startPort = Number(process.env.PORT ?? 3000);
const shouldOpen = process.env.NO_OPEN !== "1";

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.unref();
    server.once("error", () => resolve(false));
    // No host: bind the wildcard address so IPv6-only listeners are detected too.
    server.listen({ port }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findFreePort(from) {
  for (let port = from; port < from + 50; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`No free port found between ${from} and ${from + 49}.`);
}

async function waitForServer(url, timeoutMs = 60_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) {
        const body = await response.json();
        if (body?.app === "philos-friend") return true;
      }
    } catch {
      // The server is not listening yet, or a different app owns the port.
    }
    await delay(350);
  }
  return false;
}

function openBrowser(url) {
  if (!shouldOpen) {
    console.log(`\nOpen ${url} in your browser.\n`);
    return;
  }

  const command =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `cmd /c start "" "${url}"`
        : `xdg-open "${url}"`;

  exec(command, (error) => {
    if (error) {
      console.log(`\nCould not open a browser automatically. Open ${url}\n`);
    }
  });
}

const port = await findFreePort(startPort);
const url = `http://localhost:${port}`;
const npmCommand = process.platform === "win32" ? "npx.cmd" : "npx";

console.log(`\nPhilos-Friend dev server → ${url}\n`);

const child = spawn(npmCommand, ["next", "dev", "-p", String(port)], {
  stdio: "inherit",
  env: { ...process.env, PORT: String(port) },
});

let opened = false;

child.on("error", (error) => {
  console.error("Could not start Next.js:", error.message);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (!opened && code !== 0) {
    console.error(`Next.js exited before it was ready (${signal ?? code}).`);
  }
  process.exit(code ?? 0);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

const ready = await waitForServer(url);
if (ready) {
  opened = true;
  console.log(`\nReady at ${url}\n`);
  openBrowser(url);
} else {
  console.error(`\nThe server did not become ready at ${url}. Check the output above.\n`);
}
