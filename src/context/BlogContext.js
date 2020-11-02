import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";
const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "edit_blogpost":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        } else {
          return blogPost;
        }
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id != action.payload);
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => async () => {
  const response = await jsonServer.get("/blogposts");
  dispatch({ type: "get_blogposts", payload: response.data });
};

const addBlogPost = (dispatch) => async (title, content, callback) => {
  const response = await jsonServer.post("/blogposts", { title, content });
  //dispatch({ type: "add_blogpost", payload: { title, content } });
  if (callback) {
    callback();
  }
};
const editBlogPost = (dispatch) => async (id, title, content, callback) => {
  const response = await jsonServer.put(`/blogposts/${id}`, { title, content });
  // dispatch({ type: "edit_blogpost", payload: { id, title, content } });
  if (callback) {
    callback();
  }
};
const deleteBlogPost = (dispatch) => async (id) => {
  await jsonServer.delete(`blogposts/${id}`);
  dispatch({ type: "delete_blogpost", payload: id });
};
export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
  []
);
