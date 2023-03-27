import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

const API_KEY = "YOUTUBE_API_KEY";

const START_DATE = "2023-01-01";
const END_DATE = "2023-01-31";

router.get(
  "/api/youtube/search/views/:keyword",
  async (req: Request, res: Response) => {
		const countViewsYoutubeByKeyword = await searchYouTube(req.params.keyword);
	
    if (!countViewsYoutubeByKeyword) {
      throw new Error();
    }

    res.send(countViewsYoutubeByKeyword)
	}
);


async function searchYouTube(keyword: String) {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&publishedAfter=${START_DATE}T00%3A00%3A00Z&publishedBefore=${END_DATE}T00%3A00%3A00Z&key=${API_KEY}`
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
    `Results for "${keyword}" between ${START_DATE} and ${END_DATE}`
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

  return `There are views: ${countViews} on ${START_DATE} - ${END_DATE}`;
}

export { router as searchViewRouter };

