import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import Post from '../Post/NewsPost.jsx';
import './NewsHome.css';
import { Helmet } from 'react-helmet';

function NewsHome() {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState('World');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://real-time-news-data.p.rapidapi.com/search',
      params: {
        query: search,
        limit: '500',
        time_published: 'anytime',
        country: 'US',
        lang: 'en',
      },
      headers: {
        'x-rapidapi-key': '3c97ac746bmsh7dccd8a13cb8a63p18bed6jsn1e5ff75525bb',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com',
      },
    };
    const optiowns = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {
        q: search,
        freshness: 'Day',
        textFormat: 'Raw',
        safeSearch: 'Off',
      },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '3c97ac746bmsh7dccd8a13cb8a63p18bed6jsn1e5ff75525bb',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data);
        setPost(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [search]);

  const submitHandler = (e) => {
    e.preventDefault();
    document.getElementById('searchbox').value = '';
    const options = {
      method: 'GET',
      url: 'https://real-time-news-data.p.rapidapi.com/search',
      params: {
        query: search,
        limit: '500',
        time_published: 'anytime',
        country: 'US',
        lang: 'en',
      },
      headers: {
        'x-rapidapi-key': '3c97ac746bmsh7dccd8a13cb8a63p18bed6jsn1e5ff75525bb',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com',
      },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setPost(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <Helmet>
        <title>Robotsy News</title>
      </Helmet>
      <div className="apinavbar">
        <div className="newslogo">
          <h1>Robotsy News</h1>
        </div>
        <div className="search">
          <form className="searchform" onSubmit={submitHandler}>
            <input
              className="abc"
              id="searchbox"
              type="text"
              placeholder="Search Robotsy News"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <form className="news" onSubmit={submitHandler}>
        <button
          className={`${search === 'World' ? 'highlight' : 'nothighlight'}`}
          type="submit"
          onClick={() => setSearch('World')}
        >
          World
        </button>
        <button
          className={`${search === 'Business' ? 'highlight' : 'nothighlight'}`}
          type="submit"
          onClick={() => setSearch('Business')}
        >
          Business
        </button>
        <button
          className={`${
            search === 'Technology' ? 'highlight' : 'nothighlight'
          }`}
          type="submit"
          onClick={() => setSearch('Technology')}
        >
          Technology
        </button>
        <button
          className={`${
            search === 'Entertainment' ? 'highlight' : 'nothighlight'
          }`}
          type="submit"
          onClick={() => setSearch('Entertainment')}
        >
          Entertainment
        </button>
        <button
          className={`${search === 'Sports' ? 'highlight' : 'nothighlight'}`}
          type="submit"
          onClick={() => setSearch('Sports')}
        >
          Sports
        </button>
        <button
          className={`${search === 'Science' ? 'highlight' : 'nothighlight'}`}
          type="submit"
          onClick={() => setSearch('Science')}
        >
          Science
        </button>
        <button
          className={`${search === 'Health' ? 'highlight' : 'nothighlight'}`}
          type="submit"
          onClick={() => setSearch('Health')}
        >
          Health
        </button>
      </form>
      {loading ? (
        <div className="loadercontainer">
          <div className="newsloader"></div>
        </div>
      ) : (
        <div className="newspostsbody">
          {post.map((eachPost, i) => (
            <Post
              key={i}
              source={eachPost?.source_name}
              publishedAt={moment(eachPost?.published_datetime_utc).format(
                'Do MMMM, h:mm a'
              )}
              title={eachPost?.title}
              description={eachPost?.snippet}
              url={eachPost?.link}
              urlToImage={eachPost?.photo_url}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default NewsHome;
