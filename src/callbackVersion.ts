// npm run callback

import https from "https";

/**
 * fetchData (Callback version)
 * ---------------------------------
 * Makes an HTTP GET request to the specified URL
 * Uses a callback function to return either:
 * -An error (first argument)
 * -Pared JSON data (second argument)
 */

function fetchData(url: string, callback: (error: Error | null, data: any) => void) {
  https.get(url, (res) => {
    let data = "";

    // Collect data chunks as the arrive
    res.on("data", (chunk) => {
      data += chunk;
    });

    // Once all data is received, parse it and call the callback (on end).
    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        callback(null, json);
      } catch (error) {
        callback(error as Error, null);
      }
    });
  }).on("error", (error) => {
    callback(error, null); // Handle network errors
  });
}

//API endpoints
const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-26.2041&longitude=28.0473&current_weather=true";
const newsApiUrl = "https://newsapi.org/v2/top-headlines?country=za&apiKey=YOUR_API_KEY";

console.log("Fetching data... \n=== CALLBACK VERSION ===");

/**
 * Fetch weather data first, then fetch news inside the weather callback.
 * Callback Hell: This nesting when it gets deep.
 */

fetchData(weatherApiUrl, (error, weatherData) => {
  if (error) {
    return console.error("Error fetching weather data:", error.message);
  }

  console.log("Weather:", weatherData);

  // Now fetch news data using the weather data
  fetchData(newsApiUrl, (error, newsData) => {
    if (error) {
      console.error("Error fetching news data:", error);
      return;
    }

    console.log("News Feed:", newsData.posts.slice(0, 3).map((post: any) => post.title)); // Display first 3 news articles
  });
});