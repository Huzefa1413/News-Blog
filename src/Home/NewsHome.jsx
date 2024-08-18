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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
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
          'x-rapidapi-key':
            '3c97ac746bmsh7dccd8a13cb8a63p18bed6jsn1e5ff75525bb',
          'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com',
        },
      };
      setLoading(true);
      try {
        const response = await axios.request(options);
        setPost(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(post.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <form className="news" onSubmit={submitHandler}>
        {[
          'World',
          'Business',
          'Technology',
          'Entertainment',
          'Sports',
          'Science',
          'Health',
        ].map((category) => (
          <button
            key={category}
            className={`${search === category ? 'highlight' : 'nothighlight'}`}
            type="button"
            onClick={() => setSearch(category)}
          >
            {category}
          </button>
        ))}
      </form>
      {loading ? (
        <div className="loadercontainer">
          <div className="newsloader"></div>
        </div>
      ) : (
        <div className="newspostsbody">
          {currentPosts.map((eachPost, i) => (
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default NewsHome;
