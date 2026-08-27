import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

// Home Pages
import HomeOne from '../pages/HomeOne';
import HomeTwo from '../pages/HomeTwo';
import HomeThree from '../pages/HomeThree';

// About Page
import About from '../pages/About';

// Blog Pages
import Blog from '../pages/Blog';
import BlogGrid from '../pages/BlogGrid';
import BlogDetails from '../pages/BlogDetails';

// Pricing Plans Page
import PricePlan from '../pages/PricePlan';

// Service Pages
import Service from '../pages/Service';
import ServiceDetails from '../pages/ServiceDetails';

// Team Pages
import Team from '../pages/Team';
import TeamDetails from '../pages/TeamDetails';

// Project Pages
import Project from '../pages/Project';
import ProjectDetails from '../pages/ProjectDetails';

// Contact Page
import Contact from '../pages/Contact';

// Not Fouond Page
import NotFound from '../pages/NotFound';
import AdminBlogs from "../pages/Admin/AdminBlogs";
import CreateBlog from "../pages/Admin/CreateBlog";
import EditBlog from "../pages/Admin/EditBlog";


const AppRouters = () => (
  <Fragment>
    <Routes>
      <Route path="/" exact element={<HomeTwo />} />
      <Route path="/home-two" exact element={<HomeTwo />} />
      <Route path="/home-three" exact element={<HomeThree />} />
      <Route path="/about" exact element={<About/>} />
      <Route path="/price-plan" exact element={<PricePlan/>} />
      <Route path="/service" exact element={<Service/>} />
      <Route path="/service-details/:slug" element={<ServiceDetails />}/>
      <Route path="/project" exact element={<Project/>} />
      <Route path="/project-details" exact element={<ProjectDetails/>} />
      <Route path="/team" exact element={<Team/>} />
      <Route path="/team-details" exact element={<TeamDetails/>} />
      <Route path="/blog-page" exact element={<Blog/>} />
      <Route path="/blogs" exact element={<BlogGrid/>} />
      <Route  path="/blog/:slug" exact element={<BlogDetails/>} />
      <Route path="/contact" exact element={<Contact/>} />
      <Route path="*" element={<NotFound/>} />
      <Route
  path="/admin/blogs"
  element={<AdminBlogs />}
/>

<Route
  path="/admin/blogs/create"
  element={<CreateBlog />}
/>

<Route
  path="/admin/blogs/edit/:id"
  element={<EditBlog />}
/>
    </Routes>
  </Fragment>
);

export default AppRouters;