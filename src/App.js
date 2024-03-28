import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import BlogPage from "./Pages/BlogPage";
import AboutPage from "./Pages/AboutPage";
import ContactUs from "./Pages/ContactUs/ContactUs";
import TripPage from "./Pages/TripPage/TripPage";

import AddTrip from "./Pages/Dashboard/AddTrip";
import AllTrips from "./Pages/Dashboard/AllTrips";
import AddBlog from "./Pages/Dashboard/AddBlog";
import AllBlogs from "./Pages/Dashboard/AllBlogs";

import SearchPage from "./Pages/SearchPage/SearchPage";
import UpdateCurrentTrip from "./Pages/Dashboard/UpdateCurrentTrip";
import ContactMessage from "./Pages/Dashboard/ContactMessage";
import Orders from "./Pages/Dashboard/Orders";
import MoreDeteles from "./Pages/MoreDeteles/MoreDeteles";
import SignIn from "./components/Header/SignIn";
import SignUp from "./components/Header/SignUp";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
import AddNewAdmin from "./Pages/Dashboard/AddNewAdmin";
import Category1 from "./Pages/TripPage/Category1";
import Category2 from "./Pages/TripPage/Category2";
import Category3 from "./Pages/TripPage/Category3";
import Category4 from "./Pages/TripPage/Category4";
import SuccessPayment from "./Pages/SuccessPayment/SuccessPayment.jsx";
import Feedbacks from "./Pages/feedbacks/feedbacks.js";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/feedbacks",
    element: <Feedbacks />,
  },
  {
    path: "/ourTrips",
    element: <TripPage />,
  },
  {
    path: "/detaileTrip/:id",
    element:<MoreDeteles />
  },

  {
    path: "/addAdmin",
    element: <AddNewAdmin />,
  },
  {
    path: "/addTrip",
    element: <AddTrip />,
  },
  {
    path: "/allTrips",
    element: <AllTrips />,
  },
  {
    path: "/addBlog",
    element: <AddBlog />,
  },
  {
    path: "/allBlogs",
    element: <AllBlogs />,
  },
  {
    path: "/contactmessage",
    element: <ContactMessage />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },

  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/updateTrip/:id",
    element: <UpdateCurrentTrip />,
  },
  {
    path: "/login",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  }
  ,
  {
    path: "/category1",
    element: <Category1/>,
  },
  {
    path: "/category2",
    element: <Category2/>,
  },
  {
    path: "/category3",
    element: <Category3/>,
  }
  ,
  {
    path: "/category4",
    element: <Category4/>,
  },
{
  path:"/orders/state",
  element:<SuccessPayment/>,
  
}
]);

function App() {

  return (
    <>
      <RouterProvider router={router}>
      <I18nextProvider i18n={i18n}> 

      </I18nextProvider>
      </RouterProvider>
    </>
  );
}

export default App;
