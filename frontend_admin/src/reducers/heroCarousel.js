const initialState = {
  heading: { en: "", hi: "" },
  images: [],
  quotes: [],
};

const heroReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_HERO_SECTION":
      return { ...state, ...action.payload };

    case "SAVE_HEADING":
      return { ...state, heading: action.payload.heading };

    case "SAVE_IMAGES":
      return { ...state, images: action.payload.images };

    case "SAVE_QUOTES":
      return { ...state, quotes: action.payload.quotes };

    default:
      return state;
  }
};

export default heroReducer;