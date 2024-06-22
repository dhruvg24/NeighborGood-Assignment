import React, { useEffect, useState } from "react";
import Card from "./Card";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NewsDetail from "./NewsDetail";
import { toast } from "react-toastify";
const Cards = ({ category }) => {
  //state variables to store the news articles, loading status, current page, and total pages.
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //useEffect to fetch data whenever the page or category is altered.
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let newsUrl = `https://saurav.tech/NewsAPI/top-headlines/category/${category.toLowerCase()}/in.json`;

        let response = await fetch(newsUrl);
        let output = await response.json();

        if (output.status === "ok") {
          setFilteredNews(output.articles || []);

          setTotalPages(Math.ceil(output.totalResults / 9));
          // lets say 9 articles/page
        }
        else {
          toast.error("Failed to fetch news articles");
        }
      } catch (error) {
        toast.error("Network error occured");
      }
      setLoading(false);
    }
    fetchData();
  }, [category, page]);
  //whenever change in category / page useEffect is called

  if (loading) {
    return <div className="text-cyan-50 font-bold">loading...</div>;
  }
  const validArticles = filteredNews.filter((article) => {
    const { title, description, content } = article;
    return (
      title &&
      !title.includes("[Removed]") &&
      description &&
      !description.includes("[Removed]") &&
      content &&
      !content.includes("[Removed]")
    );
  });

  if (!validArticles || validArticles.length == 0) {
    return (
      <div className="text-[50px] ml-8 mr-8 m-[100px] text-cyan-50">
        News articles currently unavailable under this category
      </div>
    );
  }

  //calculate the start and end indices for slicing the articles array
  const startIdx = (page - 1) * 9;
  //page 1 : 0-9 articles, page 2: 9 to 18 articles and so on....
  const endIdx = startIdx + 9;
  const newsOnDisplay = validArticles.slice(startIdx, endIdx);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {newsOnDisplay.map((article, index) => (
                  <Card key={index} news={article} index={startIdx + index} />
                ))}
              </div>

              <div className="flex justify-center mt-4 mb-5">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Prev
                </button>
                <span className="px-4 py-2">{page}</span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          }
        />
        <Route path="/news/:id" element={<NewsDetail news={filteredNews} />} />
      </Routes>
    </Router>
  );
};

export default Cards;
