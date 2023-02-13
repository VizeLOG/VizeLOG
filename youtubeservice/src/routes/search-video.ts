import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

const API_KEY = "YOUTUBE_API_KEY";

const START_DATE = "2023-01-01";
const END_DATE = "2023-01-31";

router.get(
  "/api/youtube/search/video/:keyword",
  async (req: Request, res: Response) => {
		const showVideoYoutubeByKeyword = await searchVideos(req.params.keyword, START_DATE, END_DATE);
	
    if (!showVideoYoutubeByKeyword) {
      throw new Error();
    }

    res.send(showVideoYoutubeByKeyword)
	}
);



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

export { router as searchVideoRouter };