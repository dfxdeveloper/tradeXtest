import React from "react";
import search_icon from "../../assets/icons/search-icon.svg";
function SearchNews() {
  return (
    <>
      <section className="bg-customBlack py-16">
        <div className="lg:w-3/5">
          <h1 className="container text-white text-left text-xl md:text-3xl lg:text-4xl xl:text-5xl font-gilroy font-bold ">
            Get the latest forex, crypto, and trading news with expert insights
            daily.
          </h1>
        </div>
        <div className="container lg:flex justify-between lg:py-10">
          <p className="text-white md:text-2xl lg:text-3xl font-gilroy font-regular">
            Don't miss a trick with global real-time updates.
          </p>
          <div className="bg-white lg:w-2/5 rounded-full px-4 py-1 lg:py-2 flex gap-2 lg:gap-4">
            <img
              src={search_icon}
              alt="search-icon"
              className="w-6"
              loading="lazy"
            />
            <p className="font-gilroy font-light text-base md:text-xl lg:mt-2 text-[#3D3D3D]">
              Search Markets Here
            </p>
            <button className="bg-customBlack text-white font-gilroy font-bold px-10 py-1 lg:py-2 rounded-full ml-auto">
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
export default SearchNews;
