import { useEffect, useState } from "react";

// styles
import "tailwindcss/tailwind.css"; // tailwind jit
import "../styles/App.css"; // custom styles

// toaster
import { Toaster } from "react-hot-toast";

// components
import { SignInPopup } from "../components";

// firebase auth
import { auth } from "../utils/firebase";

// Router from next
import Router from "next/router";

// showing progress using nprogress
import NProgress from "nprogress";

function MyApp({ Component, pageProps }) {
  // loading state
  const [loading, setLoading] = useState(false);

  // views
  const [darkMode, setDarkMode] = useState(false);
  const [listView, setListView] = useState(false);

  // handling sign in popup
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);

  // handling bookmarks
  const [bookmarks, setBookmarks] = useState([]);

  // fetching bookmarks
  const fetchBookmarks = () => {
    if (window !== undefined) {
      if (window.localStorage.getItem("bookmarks")) {
        setBookmarks(JSON.parse(window.localStorage.getItem("bookmarks")));
      } else {
        // adding a blank [] if no bookmarks found
        window.localStorage.setItem("bookmarks", JSON.stringify([]));
      }
    }
  };

  // useeffect to handle bookmarks
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // destructured props
  const props = {
    darkMode,
    setDarkMode,
    listView,
    setListView,
    open,
    setOpen,
    user,
    setUser,
    bookmarks,
    fetchBookmarks,
  };

  // handling auth and storing user if found
  auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  // showing loading and progress
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
    NProgress.start();
    console.log("start");
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
    NProgress.done();
    console.log("complete");
  });

  return (
    <div className={`${darkMode ? "dark" : "light"} min-h-screen`}>
      <Toaster position="bottom-right" reverseOrder={false} />
      {loading && "Loading......"}
      <Component {...pageProps} {...props} />
      <SignInPopup open={open} setOpen={setOpen} />
    </div>
  );
}

export default MyApp;
