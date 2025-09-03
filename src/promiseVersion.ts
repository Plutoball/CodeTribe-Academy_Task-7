// npm run promise

import https from "https";
import path = require("path");

/**
 * fetchData (Promise version)
 * -----------------------------
 * Returns a Promise that resolves with the fetched data or rejects with an error.
 */

function fetchData(url: string): Promise<any> {
    return new Promise ((resolve, reject) => {
        https.get (url, (res) => {
            let data = "";

            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", reject);
    });
}

//API endpoints
const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-26.2041&longitude=28.0473&current_weather=true";
const newsApiUrl = "https://newsapi.org/v2/top-headlines?country=za&apiKey=YOUR_API_KEY";

/**
 * Promise chaining:
 * 1. Fetch weather
 * 2. Fetch news
 * 3. Catch any errrors
 */

fetchData(weatherApiUrl)
    .then(weatherData => {
        console.log("Weather:", weatherData.current_weather);
        return fetchData(newsApiUrl);
    })
    .then(newsData => {
        console.log("News headlines:", newsData.articles.slice(0, 3).map((p: any) => p.title)); // Log first 3 articles
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

/**
 * Promise.all:
 * Runs both requests at the same time and waits for both to finish.
 */

Promise.all([fetchData(weatherApiUrl), fetchData(newsApiUrl)])
    .then(([weatherData, newsData]) => {
        console.log("\n=== PROMISE.ALL VERSION ===");
        console.log("Weather:", weatherData.current_weather);
        console.log("News headlines:", newsData.articles.slice(0, 3).map((p: any) => p.title)); // Log first 3 articles
    });

/**
 * Promise.race:
 * Runs both requests at the same time but returns the one that finishes first.
 */
Promise.race([fetchData(weatherApiUrl), fetchData(newsApiUrl)])
    .then(firstResult => {
        console.log("\n=== PROMISE.RACE - First to respond:", firstResult);
    });