# Async Weather & News Dashboard

> Real-time weather and latest news
headlines - built with TypeScript, Node.js, and async patterns.

## Overview

This project demostrates three different asychronous programming approaches in Node.js to fetch and display:
-**Current weather data** for a given city
-**Latest news headlines**

## Features

-**Three Implementations**: Callbacks, Promises, Async/Await
-**TypeScript + Node.js** with strict type checking
-**ESM-ready** with `"type" : "module"`

## Tech Stack

|Tech                | Use            |
|--------------------|----------------|
| **TypeScript**     | Moder JS       |
| **Node.js**        | Runtime Env    |
| **ts-node**        | Run TypeScript |

## Project Structure

async-weather-news-dashboard/
├── src/
│   ├── callbackVersion.ts
│   ├── promiseVersion.ts
│   ├── asyncAwaitVersion.ts
├── package.json
├── tsconfig.json
└── README.md

## Getting Started

### 1. Clone the repo

```bash```
git clone <https://github.com/Plutoball/CodeTribe-Academy_Task-7.git>
cd CodeTribe-Academy_Task-7

### 2. Install dependencies

```bash```
npm install

### 3. Run a specific version

```bash```
npm run callback
npm run promise
npm run async

### 4. Sample Output

Weather in Johannesburg: 22°C, Clear skies

Top News: "Tech industry sees record growth in AI startups"
