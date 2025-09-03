// npm run async-await

import https from "https";

/**
 * fetchData (Promise helper)
 * ----------------------------
 * Same as in the Promise version - Async/Await will use this under the hood.
 */

function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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

console.log("Fetching data... \n=== ASYNC/AWAIT VERSION ===");

/**
 * run()
 * ---------------
 * Demonstrates :
 * 1. Sequential fetching with await
 * 2. Parallel fetching with Promise.all
 * 3. first to finish with Promise.race
 * All wrapped in try/catch for error handling
 */

async function run() {
    try {
        // 1. Sequential fetching with await
        const weatherData = await fetchData(weatherApiUrl);
        console.log("Weather Data:", weatherData.current_weather);

        const newsData = await fetchData(newsApiUrl);
        console.log("News Data:", newsData.posts.slice(0,3).map((post: any) => post.title));

        // Parallel fetching
        const[weather,news] = await Promise.all([fetchData(weatherApiUrl), fetchData(newsApiUrl)]);
        console.log("\n=== PROMISE.ALL - weather and news together ===");
        console.log("Weather:", weather.current_weather, news.posts[0].title);

        //First to finish
        const firstToFinish = await Promise.race([fetchData(weatherApiUrl), fetchData(newsApiUrl)]);
        console.log("\n=== PROMISE.RACE - first to finish ===");
        console.log("First to finish:", firstToFinish);
    } catch (error:any) {
        console.error("Error fetching data:", error.message);
    }
}