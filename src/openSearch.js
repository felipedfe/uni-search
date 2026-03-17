async function openSearch(baseUrl, queryParts) {
  const query = queryParts.join(" ").trim();
  console.log("query ---> ",query)

  if (!query) {
    console.log("You need to type something to search.");
    process.exit(1);
  }

  // esse encodeURIComponent normaliza a entrada pra formato de Url, tipo:
  // the band => the%20band
  const encodedQuery = encodeURIComponent(query);
  const finalUrl = baseUrl.replace("%s", encodedQuery);

  try {
    const { default: open } = await import("open");
    await open(finalUrl);
    console.log(`Opening: ${finalUrl}`);
  } catch (error) {
    console.error("Error opening browser:", error);
    process.exit(1);
  }
}

module.exports = openSearch;
