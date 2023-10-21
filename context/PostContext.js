'use client'

import { createContext, useContext, useState } from 'react';

// Create a context
const PostContext = createContext();

// Create a context provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // Initialize with an empty array

  // Function to get a single post by ID
  const getSinglePost = (postId) => {
    console.log(postId, 'postId')
    return posts.find((post) => post.id === postId);
  };

  // You can also add other functions for adding, updating, or deleting posts here

  return (
    <PostContext.Provider value={{ posts, getSinglePost, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

// Create a custom hook to access the context
export const usePostContext = () => {
  return useContext(PostContext);
};
