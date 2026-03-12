#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const BASE_COMMANDS = new Set(["goo", "yt", "wiki", "uni"]);

function printUsage() {
  console.log("Usage:");
  console.log('  uni add <command> "<url-with-%s>"');
  console.log("  uni remove <command> [--force]");
  console.log("");
  console.log("Example:");
  console.log('  uni add bing "https://www.bing.com/search?q=%s"');
  console.log("  uni remove bing");
}

function isValidCommandName(name) {
  return /^[a-z][a-z0-9-]*$/i.test(name);
}

function buildBinFileContent(urlTemplate) {
  return `#!/usr/bin/env node

const openSearch = require("../src/openSearch");

openSearch(${JSON.stringify(urlTemplate)}, process.argv.slice(2));
`;
}

function getProjectPaths(commandName) {
  const projectRoot = path.resolve(__dirname, "..");
  return {
    packageJsonPath: path.join(projectRoot, "package.json"),
    targetBinPath: path.join(projectRoot, "bin", `${commandName}.js`)
  };
}

function sortBinEntries(binMap) {
  return Object.fromEntries(
    Object.entries(binMap).sort(([a], [b]) => a.localeCompare(b))
  );
}

function addCommand(commandName, urlTemplate) {
  if (!commandName || !urlTemplate) {
    printUsage();
    process.exit(1);
  }

  if (!isValidCommandName(commandName)) {
    console.error('Invalid command name. Use letters, numbers, and "-".');
    process.exit(1);
  }

  if (!urlTemplate.includes("%s")) {
    console.error('The URL must include "%s" to insert the search query.');
    process.exit(1);
  }

  const { packageJsonPath, targetBinPath } = getProjectPaths(commandName);

  if (fs.existsSync(targetBinPath)) {
    console.error(`A file for command "${commandName}" already exists.`);
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const currentBin = packageJson.bin || {};

  if (currentBin[commandName]) {
    console.error(`Command "${commandName}" already exists in package.json.`);
    process.exit(1);
  }

  fs.writeFileSync(targetBinPath, buildBinFileContent(urlTemplate), "utf8");
  fs.chmodSync(targetBinPath, 0o755);

  currentBin[commandName] = `./bin/${commandName}.js`;
  packageJson.bin = sortBinEntries(currentBin);

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

  console.log(`Searcher "${commandName}" created successfully.`);
  console.log(`File: bin/${commandName}.js`);
  console.log("Next step:");
  console.log("  npm install -g .");
}

function removeCommand(commandName, force) {
  if (!commandName) {
    printUsage();
    process.exit(1);
  }

  if (!isValidCommandName(commandName)) {
    console.error('Invalid command name. Use letters, numbers, and "-".');
    process.exit(1);
  }

  if (BASE_COMMANDS.has(commandName) && !force) {
    console.error(`Command "${commandName}" is protected and cannot be removed without --force.`);
    process.exit(1);
  }

  const { packageJsonPath, targetBinPath } = getProjectPaths(commandName);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const currentBin = packageJson.bin || {};

  if (!currentBin[commandName] && !fs.existsSync(targetBinPath)) {
    console.error(`Command "${commandName}" does not exist.`);
    process.exit(1);
  }

  if (fs.existsSync(targetBinPath)) {
    fs.unlinkSync(targetBinPath);
  }

  delete currentBin[commandName];
  packageJson.bin = sortBinEntries(currentBin);
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

  console.log(`Searcher "${commandName}" removed successfully.`);
  console.log("Next step:");
  console.log("  npm install -g .");
}

function main() {
  const [, , action, commandName, ...rest] = process.argv;

  if (action === "add") {
    const urlTemplate = rest.join(" ").trim();
    addCommand(commandName, urlTemplate);
    return;
  }

  if (action === "remove") {
    const force = rest.includes("--force");
    removeCommand(commandName, force);
    return;
  }

  printUsage();
  process.exit(1);
}

main();
