#!/usr/bin/env node

const openSearch = require("../src/openSearch");
console.log("process.argv ---> ",process.argv)
// process.argv é um array com os argumentos passados no no terminal quando
// a gente executa um comando no node
// o slice(2) tira os dois primeiros (olhar no log)
openSearch("https://en.wikipedia.org/w/index.php?search=%s", process.argv.slice(2));
