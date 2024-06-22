import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import FilterNews from "./components/FilterNews";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { apiURL, filterData } from "./data";
import Cards from "./components/Cards";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  //initially set to all

  async function fetchNews() {
    setLoading(true);
    try {
      let response = await fetch(apiURL);
      // console.log(response);
      let output = await response.json();
      // console.log(output)
      setNews(output.articles || []);
      //in newsapi the news articles are represented as array articles : [ {title,url etc.} ,{}, {}]
    } catch (error) {
      toast.error("Issue in the network");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <Navbar />
      <div className="bg-bgDark2">
        <FilterNews
          filterData={filterData}
          category={category}
          setCategory={setCategory}
        />

        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? <Spinner /> : <Cards News={news} category={category} />}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
