import express from "express";
import { json } from "body-parser";
import axios from "axios";

const HttpsProxyAgent = require("https-proxy-agent");
const googleTrends = require("google-trends-api");

const app = express();
app.use(json());

const API_KEY = "YOUTUBE_API_KEY";

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || "http://PROXYHOST:PROXYPORT/";
console.log("using proxy server %j", proxy);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);

const SEARCH_QUERY = "keyword";
const START_DATE = "2023-01-01";
const END_DATE = "2023-01-31";

async function searchYouTube() {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${SEARCH_QUERY}&type=video&publishedAfter=${START_DATE}T00%3A00%3A00Z&publishedBefore=${END_DATE}T00%3A00%3A00Z&key=${API_KEY}`
  );

  const items = response.data.items;
  const videoIds = items
    .map((item: { id: { videoId: any } }) => item.id.videoId)
    .join(",");

  const videoResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
  );

  const videoData = videoResponse.data.items;

  console.log(
    `Results for "${SEARCH_QUERY}" between ${START_DATE} and ${END_DATE}`
  );
  console.log("------------------------------");

  let countViews = 0;
  items.forEach((item: { id: { videoId: any }; snippet: { title: any } }) => {
    const video = videoData.find(
      (video: { id: any }) => video.id === item.id.videoId
    );
    console.log(`Title: ${item.snippet.title}`);
    console.log(`Views: ${video.statistics.viewCount}`);
    countViews += parseInt(video.statistics.viewCount);
    console.log(
      `Video URL: https://www.youtube.com/watch?v=${item.id.videoId}\n`
    );
  });

  console.log(`There are views: ${countViews} on ${START_DATE} - ${END_DATE}`);
}

async function searchVideos(
  keyword: string,
  publishedAfter: string,
  publishedBefore: string
) {
  const params = {
    part: "snippet",
    type: "video",
    q: keyword,
    maxResults: 50,
    publishedAfter,
    publishedBefore,
    key: API_KEY,
  };

  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    { params }
  );
  console.log(response.data.items);

  return response.data.items;
}

// granularTimeResolution work on less than one week

// startTime: new Date('2023-01-01'), endTime: new Date('2023-01-31'), geo: ""
async function GoogleTrendsForYouTube() {
  let query = {
    keyword: SEARCH_QUERY,
    startTime: new Date(START_DATE),
    endTime: new Date(END_DATE),
    geo: "",
    property: "youtube",
    agent: agent,
  };

  googleTrends
    .interestOverTime(query)
    .then(function (results: any) {
      console.log("These proxied results are incredible", results);
    })
    .catch(function (err: any) {
      console.error(
        "Oh no there was an error, double check your proxy settings",
        err
      );
    });
}

app.listen(3000, async () => {
  if (!API_KEY) {
    throw new Error("YOUTUBE_API_KEY must be defined");
  }
  console.log("YouTube service listening on port 3000!!!!");
  await GoogleTrendsForYouTube();
  // searchYouTube();
  // searchVideos(SEARCH_QUERY, '2022-01-01T00:00:00Z', '2022-12-31T23:59:59Z')
});
