const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_REVIEWS':
      return action.payload;
    case "APPROVE_REVIEW":
      return state.map((review) =>
        review._id === action.payload
          ? { ...review, status: "approved" }
          : review
      );

    case "REJECT_REVIEW":
      return state.map((review) =>
        review._id === action.payload
          ? { ...review, status: "rejected" }
          : review
      );
    default:
      return state;
  }
};

export default reviewReducer