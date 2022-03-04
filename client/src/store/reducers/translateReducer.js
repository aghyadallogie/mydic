import { LOADING, TRANSLATE, TRANSLATE_FAIL } from "../actions/types";

const initialState = {
  translations: [],
  isLoading: false,
  errMsg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
        return {
          ...state,
          isLoading: true,
        };
    case TRANSLATE:
      return {
        ...state,
        isLoading: false,
        translations: action.payload,
        errMsg: '',
      };
    case TRANSLATE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
      };
    default:
      return state;
  }
}
