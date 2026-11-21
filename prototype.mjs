import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const preview = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "dev", "--port", "3193"],
  {
    stdio: "inherit",
    env: { ...process.env, GREEN_CIRCUIT_PROTOTYPE: "1" },
  },
);

preview.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

preview.on("exit", (code) => {
  process.exit(code ?? 1);
});
