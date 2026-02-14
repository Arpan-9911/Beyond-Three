const toursReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_TOURS':
      return action.payload;
    case 'ADD_TOUR':
      return [action.payload, ...state];
    case 'UPDATE_TOUR':
      return state.map(tour => tour._id === action.payload._id ? action.payload : tour);
    case 'DELETE_TOUR':
      return state.filter(tour => tour._id !== action.payload);
    default:
      return state;
  }
};

export default toursReducer;