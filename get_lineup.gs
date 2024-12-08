function getFridayRoadshowLineupWithoutCheerio() {
  const url = "https://kinro.ntv.co.jp/lineup";
  try {
    // HTMLを取得
    const response = UrlFetchApp.fetch(url);
    const text = response.getContentText();

    // Cheerioをロード
    const cheerio = Cheerio.load(text);

    const lineup = cheerio(".list"); // class="list" を取得
    let tonight = "";
    let futureLineup = "";

    lineup.find(".cap").each(function (index) {
      const date = cheerio(this).find(".date").text().trim();
      const title = cheerio(this).find(".title").text().trim();
      
      if (index === 0) {
        tonight = `今夜の放送は ${title} です！`;
      } else {
        futureLineup += `\n${date}\n${title}\n`;
      }
    });
    
    var fryday = `${tonight}\n\n今後の放送ラインナップは${futureLineup}\nです！`;

    // 結果をログに出力
    Logger.log(fryday);

    return fryday;

  } catch (e) {
    Logger.log("Error: " + e.message);
  }
}


