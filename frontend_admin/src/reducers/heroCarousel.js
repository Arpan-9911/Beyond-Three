const heroReducer = (state = [], action) => {
  switch (action.type) {
    case "ALL_HERO_CAROUSEL":
      return action.payload;
    case "ADD_HERO_CAROUSEL":
      return [...state, action.payload];
    case "DELETE_HERO_CAROUSEL":
      return state.filter((slide) => slide._id !== action.payload);
    case "UPDATE_HERO_CAROUSEL":
      return state.map((slide) => (slide._id === action.payload._id ? action.payload : slide));
    default:
      return state;
  }
};

export default heroReducer;