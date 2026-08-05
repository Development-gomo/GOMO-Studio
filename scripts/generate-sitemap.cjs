const { execSync } = require("child_process");

execSync("npx --yes tsx scripts/write-sitemap.js", {
  stdio: "inherit",
  env: { ...process.env, TSX_TSCONFIG_PATH: "./jsconfig.json" },
});
