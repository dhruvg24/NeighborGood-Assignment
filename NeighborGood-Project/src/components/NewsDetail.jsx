import React from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
const NewsDetail = ({ news }) => {
  const { id } = useParams();
  const articleIndex = parseInt(id, 10);
  const article = news[articleIndex];

  if (!article) {
    return <div className="text-cyan-50 font-bold">Article not found!</div>;
  }

  return (
    <div className="p-4 md:p-8 text-black">
      <Link to={`/`}>
        <div className="font bg-[#c6c7ce] b-1 text-lg w-[60px] h-[30px] flex m-[10px] justify-center rounded-[8px]">
        Home
        </div>
      </Link>
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full mb-4"
        />
      )}
      <p className="text-lg">
        {article.content} Only this much content available right now ...
      </p>
    </div>
  );
};

export default NewsDetail;
