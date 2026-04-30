const mediaReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_MEDIA':
      return action.payload
    case 'ADD_MEDIA':
      return [...state, action.payload]
    case 'DELETE_MEDIA':
      return state.filter(media => media._id !== action.payload)
    case 'MAKE_FEATURED':
      return state.map(media => media._id === action.payload ? { ...media, featured: !media.featured } : media)
    default:
      return state
  }
}

export default mediaReducer