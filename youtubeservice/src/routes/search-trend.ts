import express, { Request, Response } from "express";
const googleTrends = require("google-trends-api");

const router = express.Router();

router.get(
  "/api/search/youtube/trend/:keyword/",
  async (req: Request, res: Response) => {
    const keyword = req.params.keyword;
    const startTime = req.query.starttime;
    const endTime = req.query.endtime;
    const showVideoYoutubeByKeyword = await GoogleTrends(
      keyword,
      startTime,
      endTime
    );

    if (!showVideoYoutubeByKeyword) {
      throw new Error();
    }

    const showVideoYoutubeByHashtag = await GoogleTrends(
      "#" + keyword,
      startTime,
      endTime
    );

    if (!showVideoYoutubeByHashtag) {
      throw new Error();
    }

    res.send({
      youtubekeyword: showVideoYoutubeByKeyword,
      youtubehashtag: showVideoYoutubeByHashtag,
    });
  }
);

async function GoogleTrends(keyword: string, startTime: any, endTime: any) {
  const dataFormatted = { dataPoints: [], relatedQueries: [] };

  let query = {
    keyword: keyword,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    timezone: 7,
    geo: "TH",
    property: "",
  };

  googleTrends
    .interestOverTime(query)
    .then(function (results: any) {
      var resultsJSON = JSON.parse(results);

      var data = resultsJSON["default"];
      var timelineData = data["timelineData"]; // array of interest timestamps

      timelineData.forEach(function (timestamp: any) {
        console.log(
          `On the date ${timestamp["formattedTime"]}, the interest value was at ${timestamp.value}`
        );
      });
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

export { router as searchTrendRouter };
