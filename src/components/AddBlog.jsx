import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@mui/material";
import InputFileUpload from "./InputComonents/FileUpload";
import TextArea from "./InputComonents/TextArea";
import InputComponent from "./InputComonents/InputComponent";
import "../Style/Blogs.css";
import { createBlog } from "../firebase/createBlog";
import { isAuthenticated } from "../firebase/Authentication";
// import { useNavigate } from "react-router-dom";
import { ValidateBlog, waitToLoad } from "../firebase/Helpers";
import NoAccess from "./NoAccess";

function AddBlog() {
  // const [isCreated, setIsCreated] = useState(false);  
  const [preview,setPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "start  ",
    flexDirection: "column",
    paddingBottom:"50px",
    marginTop:"20px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    p: 4,
  };

  const handleOnClick = () => {   
    ValidateBlog(blog,setErrorMessage);
    console.log(errorMessage === null);
    if(errorMessage === null){
      createBlog(blog)   
    }     
  };

  const handleChange = (event) => {
    if (error) {
      setError("");
    }
    if (event.target.name === "title") {
      setBlog({ ...blog, title: event.target.value });
    }
    if (event.target.name === "body") {
      setBlog({ ...blog, body: event.target.value });
    }
      
  };

  const handleChangeFile= (event)=>{   
      setBlog({ ...blog, image: event.target.files[0] });
      setPreview(URL.createObjectURL(event.target.files[0]) )  
  }

  isAuthenticated(setIsLoggedIn);
  waitToLoad(setLoading)   

  return (
    <>
      <Navbar />
      <div style={{display:"flex", alignItems:"center"}}>
      {isLoggedIn ? 

      <div style={style} className="Add_blog_container">
        <h2 style={{ color: "#4A4D4E", marginBottom: "50px" }}>
          Create Your Awesome Blog!{" "}
        </h2>
        <>
          <InputComponent name="title" handleChange={handleChange} />
          <TextArea name="body" handleChange={handleChange} />
        </>
        <>
          <InputFileUpload name="image" handleChange={handleChangeFile} />
          {preview && <img src={preview} alt="img" style={{width:"100px",height:"80px", marginTop:"10px", borderRadius:"10px"}}/>}
          <Button
            variant="contained"
            onClick={handleOnClick}
            style={{ marginTop: "50px" }}
          >
            Create
          </Button>
        </>
      </div>
      :!loading &&  <NoAccess />}

      </div>


      <Footer />
    </>
  );
}

export default AddBlog;
