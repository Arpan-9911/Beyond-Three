const mediaReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_MEDIA':
      return action.payload
    case 'ADD_MEDIA':
      return [...state, action.payload]
    case 'DELETE_MEDIA':
      return state.filter(media => media._id !== action.payload)
    default:
      return state
  }
}

export default mediaReducer