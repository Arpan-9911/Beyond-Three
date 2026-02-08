const projectCategories = (state = [], action) => {
  switch (action.type) {
    case 'ALL_PROJECT_CATEGORIES':
      return action.payload
    case 'ADD_PROJECT_CATEGORY':
      return [...state, action.payload];
    case 'DELETE_PROJECT_CATEGORY':
      return state.filter(category => category._id !== action.payload);
    default:
      return state;
  }
}

export default projectCategories;