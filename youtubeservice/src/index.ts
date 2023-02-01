import express from "express";
import { json } from "body-parser";
import axios from "axios";

const app = express();
app.use(json());


const API_KEY = process.env.YOUTUBE_API_KEY;

const SEARCH_QUERY = 'keyword';
const START_DATE = 'START_DATE';
const END_DATE = 'END_DATE';

async function searchYouTube() {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${SEARCH_QUERY}&type=video&publishedAfter=${START_DATE}T00%3A00%3A00Z&publishedBefore=${END_DATE}T00%3A00%3A00Z&key=${API_KEY}`
  );

  const items = response.data.items;
  const videoIds = items.map((item: { id: { videoId: any; }; }) => item.id.videoId).join(',');

  const videoResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
  );

  const videoData = videoResponse.data.items;

  console.log(`Results for "${SEARCH_QUERY}" between ${START_DATE} and ${END_DATE}`);
  console.log('------------------------------');

  let countViews = 0
  items.forEach((item: { id: { videoId: any; }; snippet: { title: any; }; }) => {
    const video = videoData.find((video: { id: any; }) => video.id === item.id.videoId);
    console.log(`Title: ${item.snippet.title}`);
    console.log(`Views: ${video.statistics.viewCount}`);
    countViews += parseInt(video.statistics.viewCount)
    console.log(`Video URL: https://www.youtube.com/watch?v=${item.id.videoId}\n`);
  });

  console.log(`There are views: ${countViews} on ${START_DATE} - ${END_DATE}`);
  
}


app.listen(3000, () => {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error('YOUTUBE_API_KEY must be defined');
  }
	console.log("YouTube service listening on port 3000!!!!");
	searchYouTube();
});