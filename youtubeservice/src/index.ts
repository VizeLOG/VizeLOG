import { app } from "./app";

const API_KEY = "YOUTUBE_API_KEY";

const start = async () => {
  console.log("Starting youtube service...");

  if (!API_KEY) {
    throw new Error("YOUTUBE_API_KEY must be defined");
  }

  app.listen(3000, async () => {
    console.log("YouTube service listening on port 3000!!!!");
  });
};

start();
