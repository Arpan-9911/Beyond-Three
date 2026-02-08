const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_EVENTS':
      return action.payload
    case 'ADD_EVENT':
      return [...state, action.payload]
    case 'DELETE_EVENT':
      return state.filter((event) => event._id !== action.payload)
    case 'UPDATE_EVENT':
      return state.map((event) => (event._id === action.payload._id ? action.payload : event))
    default:
      return state
  }
}

export default eventsReducer