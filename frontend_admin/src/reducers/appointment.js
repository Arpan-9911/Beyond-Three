const appointmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_APPOINTMENTS':
      return action.payload;
    case 'UPDATE_APPOINTMENT_STATUS':
      return state.map(appointment => appointment._id === action.payload._id ? action.payload : appointment);
    default:
      return state;
  }
};

export default appointmentReducer;