import "../Style/LandingPage.css";
import React, { useEffect, useState } from "react";

import writeImage from "../images/write.png";

import {
  FaArrowAltCircleDown,
  FaPenSquare,
  FaBookOpen,
  FaBookReader,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { listBlog } from "../firebase/getBlogs";
import {  listVocabularies } from "../firebase/Vocabulary";
import { Link } from "react-router-dom";
import { getStories } from "../firebase/APIs";
import { Button, Grid } from "@mui/material";
import { isAuthenticated } from "../firebase/Authentication";

function LandingPage() {
  const [blogList, setBlogList] = useState([]);
  const [vocabularyList, setVocabularyList] = useState([]);
  const [storyList, setStoryListList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  const blogNumber = blogList.length;
  const vocabularyNumber = vocabularyList.length;
  const storiesNumber = storyList.length;

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "#29b4e2",
  };

  

  function Stories() {
    getStories().then((Stories) => {
      setStoryListList(Stories);
    });
  }

  useEffect(() => {
    listBlog(setBlogList);
    listVocabularies(setVocabularyList);
    isAuthenticated(setIsLoggedIn);
    Stories();
  }, []);
  
  return (
    <div>
      <Navbar />
      <div
      className="welcome_text"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "70px",
          color: "#818181",
        }}
      >
        <h2 className="welcome_text">
          Welcome to <strong>LearnByWriting </strong>!
        </h2>
        <h4
          style={{
            fontWeight: 325,
            fontSize: 25,
          }}
        >
          <br /> Welcome to our world of learning through writing. Every
          keystroke is a step in your language journey.
          <br /> Join us in this transformative adventure of self-discovery.
          Start your journey today and let's make every word count!
        </h4>
      </div>
      <div className="hero_section">
        <div>
          <h1 style={{ color: "white" }}>Are you looking for...</h1>
        </div>
        <div className="hero_section_header">
        <Link to="/stories" style={{textDecoration:"none"}}>
          <div className="hero_section_header_blue" style={style}>
           
            <h2 style={{ color: "black" }}>
              A story to <strong>read ? </strong>
            </h2>
            <FaArrowAltCircleDown style={{ margin: "10px", fontSize: 40 }} />
           
          </div>
          </Link>
          <Link to="/Add_blog" style={{textDecoration:"none"}}>
          <div className="hero_section_header_red" style={style}>
            <h2 style={{ color: "black" }}>
              A story to <strong>Write ?</strong>
            </h2>
            <FaArrowAltCircleDown style={{ margin: "10px", fontSize: 40 }} />
          </div>
          </Link>
          <Link to="/Vocabulary" style={{textDecoration:"none"}}>
          <div className="hero_section_header_green" style={style}>
            <h2 style={{ color: "black" }}>
              A vocabulary to <strong>read ?</strong>
            </h2>
            <FaArrowAltCircleDown style={{ margin: "10px", fontSize: 40 }} />
          </div>
          </Link>
        </div>
      </div>

      <div
        className="main_who_static_section"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          color: "white",
        }}
      >
        <div className="stat_content">
          <span id="number_blog">{blogNumber}</span>
          <h3 style={{ color: "white" }}>Written blogs</h3>
        </div>
        <div className="stat_content stat_content_middle">
          <span id="number_books">{vocabularyNumber}</span>
          <h3 style={{ color: "white" }}>New words</h3>
        </div>
        <div className="stat_content">
          <span id="number_users">{storiesNumber}</span>
          <h3 style={{ color: "white" }}>Short stories</h3>
        </div>
      </div>

      <div
        className="main_content"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              color: "grey",
            }}
          >
            "Connect Through Words, Learn Through Writing!"
          </h2>
          <p
            style={{
              color: "black",
              padding: "5px",
              fontWeight: 325,
              fontSize: 22,
            }}
          >
            "Experience Brainy Adventure! Dive into our word playground,
            brimming with definitions and surprises. Whether you're looking for
            an interesting story or just exploring, come join the fun for
            curious minds!"
          </p>
          {!isLoggedIn && <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/register">
            <Button variant="outlined" size="large">
              Join today
            </Button>
            </Link>
          </div>}
        </div>

        <img className="image_landing"
          src={writeImage}
          alt="write"
          style={{ width: "20%", margin: "25px" }}
        />
      </div>

      <Grid
        container
        className="main_service_container"
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 3, sm: 6, md: 12 }}
        style={{
          backgroundColor: "#29b4e2",
          padding: "50px",
          paddingBottom: "150px",
          paddingLeft: "90px",
        }}
      >
        <Grid
          item
          xs={3}
          className="service_item app_link banner_and_icon"
          style={{
            margin: "15px",
          }}
        >
          <FaPenSquare />
          <Link to="/Add_blog">
            <h3 className="service_title">Write English</h3>
          </Link>
        </Grid>
        <Grid
          item
          xs={3}
          className="service_item app_link banner_and_icon"
          style={{
            margin: "15px",
          }}
        >
          <FaBookReader />
          <Link to="/Vocabulary">
            <h3 className="service_title">New vocabularies</h3>
          </Link>
        </Grid>
        <Grid
          item
          xs={3}
          className="service_item app_link banner_and_icon"
          style={{
            margin: "15px",
          }}
        >
          <FaBookOpen />
          <Link to="/Stories">
            <h3 className="service_title">Stories</h3>
          </Link>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default LandingPage;
