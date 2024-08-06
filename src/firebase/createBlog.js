
import { database, storage } from "./Firebase";
import { app } from "./Firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  ref as dbRef,
  set,
  serverTimestamp,
  getDatabase,
  remove,
  update,
} from "firebase/database";
// import { ValidateBlog } from "./Helpers";

const db = getDatabase();

export const createBlog = async (blog) => {
  let { title, body, image } = blog;
  try {
    // Upload image to Firebase Storage
    const imageName = image.name;
    const storageRef = ref(storage, "images/" + imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading image:", error.message);
      }
    );

    // Wait for the upload to complete and get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log(downloadURL)

    // Generate a unique random ID (consider using a more robust method like UUID)
    const id = Math.floor(Math.random() * 1000000); // 6-digit random number

    // Save blog data to Firebase Realtime Database
    await set(dbRef(db, "blogs/" + id), {
      title,
      body,
      createdAt: serverTimestamp(),
      Image: downloadURL,
      id,
    });

    console.log("Blog added successfully!");
  } catch (error) {
    console.error("Error saving blog data:", error.message);
  }
};

export const deleteBlog = async (id) => {
  try {
    //remove blog if I am the admin user
    await remove(dbRef(db, "blogs/" + id), function (error) {
      if (error) {
        console.log("delete error" + error);
      }
    });    
  } catch (error) {
    console.error("Error deleting blog data:", error.message);
  }
};

export const editBlog = async (blog, BlogID) => {
  let { title, body, Image } = blog;
  try {
    // Upload image to Firebase Storage
    if(Image.name === undefined){
      const blogRef = dbRef(db, "blogs/" + BlogID);
      await update(blogRef, {
        title,
        body,
        createdAt: serverTimestamp(),
        Image: Image,
        id: BlogID,
      });

    } else { 
      const imageName = Image.name;
      const storageRef = ref(storage, "images/" + imageName);
      const uploadTask = uploadBytesResumable(storageRef, Image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image:", error.message);
        }
      );
      // Wait for the upload to complete and get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
      // Save blog data to Firebase Realtime Database
      const blogRef = dbRef(db, "blogs/" + BlogID);
      await update(blogRef, {
        title,
        body,
        createdAt: serverTimestamp(),
        Image: downloadURL,
        id: BlogID,
      }); 
      
    }   
    // console.log("Blog Updated successfully!");
   
  } catch (error) {
    console.error("Error saving blog data:", error.message);
  }
};
