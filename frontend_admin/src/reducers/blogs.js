const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_BLOGS':
      return action.payload;
    case 'ADD_BLOG':
      return [action.payload, ...state];
    case 'DELETE_BLOG':
      return state.filter((blog) => blog._id !== action.payload);
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog._id === action.payload._id ? action.payload : blog
      );
    default:
      return state;
  }
};

export default blogsReducer;