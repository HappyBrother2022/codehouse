import React, { useEffect, useState } from "react";

// for inifinite scroll
import InfiniteScroll from "react-infinite-scroll-component";

// components
import { AppHeader, Item } from "../components";

// fetching or editing database
import { harperFetch } from "../utils/HarperFetch";

const Review = (props) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(6); // count of posts that should load first
  const [loading, setLoading] = useState(false);

  // filters
  const [searchTerm, setSearchTerm] = useState(""); // search
  const [sort, setSort] = useState("popular"); // sort

  // useEffect(async () => {
  //   setData([]);
  //   setLoading(true);

  //   // fetching
  //   const cheatSheets = await harperFetch({
  //     operation: "sql",
  //     sql: "SELECT * FROM dev.review",
  //   });

  //   // sorting
  //   if (sort === "newest") {
  //     cheatSheets
  //       .sort((a, b) => {
  //         return a.__createdtime__ - b.__createdtime__;
  //       })
  //       .reverse();
  //   } else if (sort === "oldest") {
  //     cheatSheets.sort((a, b) => {
  //       return a.__createdtime__ - b.__createdtime__;
  //     });
  //   } else {
  //     cheatSheets.sort((a, b) => {
  //       if (a.upvotes.length > b.upvotes.length) {
  //         return -1;
  //       } else {
  //         return 1;
  //       }
  //     });
  //   }

  //   // data to be used
  //   await setData(cheatSheets);
  //   setLoading(false);
  // }, [sort]);

  // destructuring props
  const { user, setOpen } = props;

  // filtering posts (search)
  const filterPosts = (data, query) => {
    if (!query) {
      return data;
    }

    return data.filter((cheatsheet) => {
      const cheatsheetName = cheatsheet.cheatsheet_name.toLowerCase();
      return cheatsheetName.includes(query.toLowerCase());
    });
  };

  // all posts gets stored here
  const filteredPosts = filterPosts(data, searchTerm);

  return (
    <div className="bg-[#ECF2F5] dark:bg-[#2f2f2f] min-h-screen p-6">
      <AppHeader
        {...props}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sort={sort}
        setSort={setSort}
      />
      <div className="flex w-full items-center justify-center mt-3 mb-2">
        <img src="/assets/svg/review.svg" className="h-[300px]" />
        <div className="w-5/12 overflow-hidden">
          <h1 className="text-4xl font-bold dark:text-[#fafafa]">
            Cheatsheet on Review
          </h1>
          <p className="text-sm text-[#666] dark:text-[#aaa]">
            These cheatsheets are on review, give them an upvote to faster the
            process. Generally takes less than 2 days 🤟
          </p>
        </div>
      </div>
      <InfiniteScroll
        dataLength={count} //This is important field to render the next data
        next={() => setCount(count + 5)}
        hasMore={count >= data.lenghth ? false : true}
        loader={data.length > count ? <h4>Loading...</h4> : ""}
      >
        <div className="flex justify-center mt-5 w-full flex-wrap">
          {filteredPosts.slice(0, count).map((cheetsheet, key) => (
            <Item
              data={cheetsheet}
              key={key}
              {...props}
              setOpen={setOpen}
              user={user}
              review={true}
            />
          ))}
        </div>
      </InfiniteScroll>
      {data.length > 1 && filteredPosts.length < 1 && (
        <div className="w-full flex items-center flex-col">
          <img src="/assets/svg/no-results.svg" className="h-[300px]" />
          <h1 className="font-bold text-3xl">No Results Found</h1>
        </div>
      )}
      {data.length < 1 && (
        <div className="w-full flex items-center flex-col">
          <img src="/assets/svg/no-results.svg" className="h-[300px]" />
          <h1 className="font-bold text-3xl">No Cheatsheets on Review</h1>
        </div>
      )}
    </div>
  );
};

export default Review;
