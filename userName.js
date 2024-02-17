import { createStore } from 'redux';

const initialState = {
    userNameValue: '',
    resultsValue: 0,
    TotalMarks: 0,
    className: '',
    department: '',
    program: '',
    studNo: '',
    subject: '',
    term: '',
  };
 
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, userNameValue: action.payload };
      case 'SET_RESULTS_VALUE':
        return { ...state, totalScore: action.payload };
      case 'SET_TOTAL_MARKS':
        return { ...state, TotalMarks: action.payload };
      case 'SET_CLASS_NAME':
        return { ...state, className: action.payload };
      case 'SET_DEPARTMENT':
        return { ...state, department: action.payload };
      case 'SET_PROGRAM':
        return { ...state, program: action.payload };
      case 'SET_STUDNO':
        return { ...state, studNo: action.payload };
      case 'SET_SUBJECT':
        return { ...state, subject: action.payload };
      case 'SET_TERM':
        return { ...state, term: action.payload };
      default:
        return state;
    }
  };
  
  const store = createStore(reducer);
  
  export default store;