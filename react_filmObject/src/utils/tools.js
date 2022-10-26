class Tools {
  static dateStr(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  static toSearch(url) {
    let searchData = {};
    if (url.toString() !== "") {
      const search = new URLSearchParams(url.toString());
      search.forEach((value, key) => {
        searchData[key] = value;
      });
    }
    return searchData;
  }
}

module.exports = Tools;
