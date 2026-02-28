const projectParticipations = (state = [], action) => {
  switch (action.type) {
    case 'ALL_PARTICIPATIONS':
      return action.payload;
    case 'APPROVE_PARTICIPATION':
      return state.map(participation => participation._id === action.payload ? { ...participation, status: "approved" } : participation);
    case 'REJECT_PARTICIPATION':
      return state.map(participation => participation._id === action.payload ? { ...participation, status: "rejected" } : participation);
    default:
      return state;
  }
}

export default projectParticipations