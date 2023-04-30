import express, { Request, Response } from "express";
const googleTrends = require("google-trends-api");

const router = express.Router();

router.get(
  "/api/google/search/trend/:keyword",
  async (req: Request, res: Response) => {
    const keyword = req.params.keyword;

    var dateToday = new Date();

    const thirtyDaysAgo = new Date(
      dateToday.getTime() - 30 * 24 * 60 * 60 * 1000
    );

    const sevenDaysAgo = new Date(
      dateToday.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    const getYearNow = dateToday.getFullYear();
    const getMonthNow = dateToday.getMonth() + 1;
    const getDateNow = dateToday.getDate();

    const getYear_start30 = thirtyDaysAgo.getFullYear();
    const getMonth_start30 = thirtyDaysAgo.getMonth() + 1;
    const getDate_start30 = thirtyDaysAgo.getDate();

    const getYear_start7 = sevenDaysAgo.getFullYear();
    const getMonth_start7 = sevenDaysAgo.getMonth() + 1;
    const getDate_start7 = sevenDaysAgo.getDate();

    const Date_now_formatted =
      getYearNow + "-" + getMonthNow + "-" + getDateNow;
    const Date_30_ago_formatted =
      getYear_start30 + "-" + getMonth_start30 + "-" + getDate_start30;
    const Date_7_ago_formatted =
      getYear_start7 + "-" + getMonth_start7 + "-" + getDate_start7;

    const showTrendGoogleByKeyword_30D = await GoogleTrendsWithDays(
      keyword,
      Date_30_ago_formatted,
      Date_now_formatted
    );

    const showTrendGoogleByKeyword_7D = await GoogleTrendsWithDays(
      keyword,
      Date_7_ago_formatted,
      Date_now_formatted
    );

    const showTrendGoogleByHashtag_30D = await GoogleTrendsWithDays(
      "#" + keyword,
      Date_30_ago_formatted,
      Date_now_formatted
    );

    const showTrendGoogleByHashtag_7D = await GoogleTrendsWithDays(
      "#" + keyword,
      Date_7_ago_formatted,
      Date_now_formatted
    );

    const showRelatedQueriesGoogleByKeyword_30D =
      await GoogleRelatedQueriesWithDay(
        keyword,
        Date_30_ago_formatted,
        Date_now_formatted
      );

    const showRelatedQueriesGoogleByKeyword_7D =
      await GoogleRelatedQueriesWithDay(
        keyword,
        Date_7_ago_formatted,
        Date_now_formatted
      );

    if (
      showTrendGoogleByKeyword_30D instanceof Error &&
      showTrendGoogleByKeyword_7D instanceof Error &&
      showTrendGoogleByHashtag_30D instanceof Error &&
      showTrendGoogleByHashtag_7D instanceof Error &&
      showRelatedQueriesGoogleByKeyword_30D instanceof Error &&
      showRelatedQueriesGoogleByKeyword_7D instanceof Error
    ) {
      res.sendStatus(404);
      // throw new Error();
    }

    console.log(keyword + " publish");
    res.send({
      googlekeyword30d: showTrendGoogleByKeyword_30D,
      googlekeyword7d: showTrendGoogleByKeyword_7D,
      googlehashtag30d: showTrendGoogleByHashtag_30D,
      googlehashtag7d: showTrendGoogleByHashtag_7D,
      googlerelatedqueries30d: showRelatedQueriesGoogleByKeyword_30D,
      googlerelatedqueries7d: showRelatedQueriesGoogleByKeyword_7D,
    });
  }
);

async function GoogleTrendsWithDays(
  keyword: string,
  startTime: any,
  endTime: any
) {
  let query = {
    keyword: keyword,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    timezone: 7,
    geo: "TH",
    property: "",
  };

  const dataQuery = { dataPoints: [{}] };

  const dataFormatted = await googleTrends
    .interestOverTime(query)
    .then(function (results: any) {
      if (!!isHTML(results)) {
        console.log("Can not toconnect");
        return new Error("No data");
      } else {
        var resultsJSON = JSON.parse(results);

        var data = resultsJSON["default"];
        var timelineData = data["timelineData"]; // array of interest timestamps

        timelineData.forEach(function (timestamp: any) {
          let getTimeStamp = parseInt(`${timestamp["time"] + "000"}`);
          let fullDateFormatted = new Date(getTimeStamp);

          const year = fullDateFormatted.getFullYear();
          const month = fullDateFormatted.getMonth();
          const day = fullDateFormatted.getDate();
          dataQuery.dataPoints.push({
            x: { year: year, month: month, day: day },
            y: parseInt(`${timestamp.value}`),
          });
        });

        dataQuery.dataPoints.shift();

        return dataQuery.dataPoints.length != 0
          ? dataQuery
          : new Error("No data");
      }
    })
    .catch(function (err: any) {
      console.error(
        "Oh no there was an error, double check your proxy settings",
        err
      );
      throw new Error(err);
    });

  return dataFormatted;
}

async function GoogleRelatedQueriesWithDay(
  keyword: string,
  startTime: any,
  endTime: any
) {
  let query = {
    keyword: keyword,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    timezone: 7,
    hl: "ti",
    geo: "TH",
  };

  const dataQuery = { metaData: [{}] };

  const dataFormatted = await googleTrends
    .relatedQueries(query)
    .then(function (results: any) {
      if (!!isHTML(results)) {
        console.log("Can not to connect");
        return new Error("No data");
      } else {

        var resultsJSON = JSON.parse(results);

        var data = resultsJSON["default"];
        var rankedList = data["rankedList"]; // array of ranked List

        // May be they have two array
        // 1st for Related value 1 - 100
        // and 2nd for weight value

        // Catch Error
        if (rankedList.length > 0) {

          dataQuery.metaData.shift();

          for (let index = 0; index < rankedList.length; index++) {
            const elementRankedKeyword = rankedList[index].rankedKeyword;

            // only need 1st related value
            if (index === 0) {
              elementRankedKeyword.forEach(function (rankedKeywordItem: any) {
                dataQuery.metaData.push({
                  query: `${rankedKeywordItem.query}`,
                  value: parseInt(`${rankedKeywordItem.value}`),
                });
              });
            }
          }
        }
        return dataQuery.metaData.length != 0
          ? dataQuery
          : new Error("No data");
      }
    })
    .catch(function (err: any) {
      console.error(
        "Oh no there was an error, double check your proxy settings",
        err
      );
      throw new Error(err);
    });

  return dataFormatted;
}

function isHTML(str: string) {
  const htmlRegExp = new RegExp(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/);
  return htmlRegExp.test(str);
}

export { router as searchTrendRouter };
