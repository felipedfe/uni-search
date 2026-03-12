#!/usr/bin/env node

const openSearch = require("../src/openSearch");

openSearch("https://pt.wikipedia.org/w/index.php?search=%s", process.argv.slice(2));
