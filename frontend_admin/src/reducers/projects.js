const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_PROJECTS':
      return action.payload;
    case 'ADD_PROJECT':
      return [...state, action.payload];
    case 'DELETE_PROJECT':
      return state.filter(project => project._id !== action.payload);
    case 'UPDATE_PROJECT':
      return state.map(project => project._id === action.payload._id ? action.payload : project);
    default:
      return state;
  }
};

export default projectsReducer;