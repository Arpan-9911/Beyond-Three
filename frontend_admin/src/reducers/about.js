const initialState = {
  founder: null,
  whoWeAre: null,
  missionVision: null,
  documents: [],
  faqs: [],
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {

    // ================= GET ABOUT =================
    case "GET_ABOUT":
      return {
        ...state,
        founder: action.payload.founder || null,
        whoWeAre: action.payload.whoWeAre || null,
        missionVision: action.payload.missionVision || null,
        documents: action.payload.documents || [],
        faqs: action.payload.faqs || [],
      };

    // ================= UPDATE MAIN SECTIONS =================
    case "UPDATE_FOUNDER":
      return { ...state, founder: action.payload };

    case "UPDATE_WHO_WE_ARE":
      return { ...state, whoWeAre: action.payload };

    case "UPDATE_MISSION_VISION":
      return { ...state, missionVision: action.payload };

    // ================= DOCUMENTS =================
    case "ADD_DOCUMENT":
      return { ...state, documents: [...state.documents, action.payload] };

    case "DELETE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter(
          (_, index) => index !== action.payload
        ),
      };

    // ================= FAQS =================
    case "ADD_FAQ":
      return { ...state, faqs: [...state.faqs, action.payload] };

    case "UPDATE_FAQ":
      return {
        ...state,
        faqs: state.faqs.map((faq, i) =>
          i === action.payload.id
            ? action.payload.data
            : faq
        ),
      };

    case "DELETE_FAQ":
      return {
        ...state,
        faqs: state.faqs.filter(
          (_, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default aboutReducer;