import { helpTranslate } from "../helpers";
import { LOADING, TRANSLATE, TRANSLATE_FAIL } from "./types";

export const translateAction = (userId, word) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const response = await helpTranslate(userId, word);
    dispatch({
      type: TRANSLATE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: TRANSLATE_FAIL,
      payload: error.response.data,
    });
  }
};
