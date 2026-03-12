async function openSearch(baseUrl, queryParts) {
  const query = queryParts.join(" ").trim();

  if (!query) {
    console.log("You need to type something to search.");
    process.exit(1);
  }

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
