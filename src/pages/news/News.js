import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsSection from "./NewsSection";
import NewsSearch from "./NewsSearch";
import "./News.css";

function News() {
  return (
    <>
      <Header />
      <div className="bg-news">
        <NewsSearch />
        <NewsSection />
      </div>
      <Footer />
    </>
  );
}

export default News;
