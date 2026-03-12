#!/usr/bin/env node

const openSearch = require("../src/openSearch");

openSearch("https://www.google.com/search?q=%s", process.argv.slice(2));
