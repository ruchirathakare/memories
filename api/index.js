import axios from "axios";

// for development
// const url = "https://9vw2z.sse.codesandbox.io/api/post";

//for production
const url = "csb-9vw2z-gkcf1ukjj-balugajwala.vercel.app/post";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.put(`${url}/likePost/${id}`);
export const updatePost = (id, updatedPost) =>
  axios.put(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
