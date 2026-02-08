const newsReducer = (state = [], action) => {
  switch (action.type) {
    case "ALL_NEWS":
      return action.payload;
    case "ADD_NEWS":
      return [action.payload, ...state];
    case "DELETE_NEWS":
      return state.filter((news) => news._id !== action.payload);
    case "UPDATE_NEWS":
      return state.map((news) => (news._id === action.payload._id ? action.payload : news));
    default:
      return state;
  }
};

export default newsReducer;