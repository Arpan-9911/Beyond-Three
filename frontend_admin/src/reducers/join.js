const JoinReducer = (state = [], action) => {
  switch (action.type) {
    case "ALL_JOIN_REQUESTS":
      return action.payload;
    case "ACCEPT_JOIN_REQUEST":
      return state.map((request) =>
        request._id === action.payload ? { ...request, status: "approved" } : request
      );
    case "REJECT_JOIN_REQUEST":
      return state.map((request) =>
        request._id === action.payload ? { ...request, status: "rejected" } : request
      );
    default:
      return state;
  }
};

export default JoinReducer;