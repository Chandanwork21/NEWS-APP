import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, pageSize, category, apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    document.title = `NewsHub - ${capitalize(category)}`;
    setArticles([]);  // Reset articles when category changes
    setPage(1);       // Reset page number
    fetchNews(1);     // Fetch new category news
  }, [category]);

  const fetchNews = async (page) => {
    setProgress(0);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    let response = await fetch(url);
    setProgress(30);
    let data = await response.json();

    setProgress(70);
    setArticles((prevArticles) => [...prevArticles, ...data.articles]);
    setTotalResults(data.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchNews(newPage);
      return newPage;
    });
  };

  return (
    <div className="bg-dark text-white container-fluid my-3" style={{ paddingTop: "80px" }}>
      <h1 className="text-white text-center">NewsHub - Top Headlines</h1>

      {loading && page === 1 && <Spinner />} {/* Show spinner only for first load */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-4" key={element.url || index}>
                <NewsItem
                  title={element.title || "No title available"}
                  description={element.description || "No description available"}
                  imageurl={element.urlToImage || "https://via.placeholder.com/300"}
                  newsurl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt}
                  source={element.source?.name || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
