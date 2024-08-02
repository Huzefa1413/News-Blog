# Robotsy News

Robotsy News is a React application that fetches and displays news articles using RapidAPI. The app allows users to search for news by category and provides real-time news updates.

## Features

- Search for news articles by category or keyword.
- Display news articles with details such as title, description, publication date, and source.
- Responsive and intuitive user interface.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making API requests.
- **Moment.js**: For formatting dates.
- **RapidAPI**: For accessing news APIs.
- **CSS**: For styling the components.

## API Integration

### Real-Time News API

- **Endpoint**: `https://real-time-news-data.p.rapidapi.com/search`
- **Method**: GET
- **Parameters**:
  - `query`: Search query.
  - `limit`: Number of results to return.
  - `time_published`: Time range for published news.
  - `country`: Country code for news.
  - `lang`: Language code for news.
- **Headers**:
  - `x-rapidapi-key`: Your RapidAPI key.
  - `x-rapidapi-host`: `real-time-news-data.p.rapidapi.com`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Huzefa1413/News-Blog.git
   ```

````

2. Navigate to the project directory:

   ```bash
   cd News-Blog
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser.
2. Use the search bar to enter a keyword or select a category.
3. Click the "Search" button to fetch news articles.
4. Browse through the displayed news articles.
````
