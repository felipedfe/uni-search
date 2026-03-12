#!/usr/bin/env node

const openSearch = require("../src/openSearch");

openSearch("https://www.youtube.com/results?search_query=%s", process.argv.slice(2));
