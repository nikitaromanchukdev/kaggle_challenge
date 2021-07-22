import { DEFUALT_URI } from 'api/config';
import formatQueryString from 'utils/formatQueryString';
import formatSurveyFields from 'utils/formatSurveyFields';

export const surveyActionTypes = {
  setDisplayQuantity: 'SET_DISPLAY_QUANTITY',
  setSurveyData: 'SET_DATA',
};

export const metaActionTypes = {
  setFetchingState: 'SET_FETCH',
  setError: 'SET_ERROR',
};

const setFetchingState = (newState) => ({
  type: metaActionTypes.setFetchingState,
  payload: newState,
});

const setErrorState = (newState = null) => ({
  type: metaActionTypes.setError,
  payload: newState,
});


export const loadSurveys = (query = {}) => async (dispatch) => {
  dispatch(setErrorState());
  dispatch(setFetchingState(true));

  try {
    const queryString = formatQueryString(query);

    const data = await fetch(`${DEFUALT_URI}?${queryString}`)
      .then((response) => response.json())
      .then((surveys) => surveys.map(formatSurveyFields));

    dispatch({ type: surveyActionTypes.setSurveyData, payload: data });
  } catch (err) {
    dispatch(setErrorState(err));
  } finally {
    dispatch(setFetchingState(false));
  }
};
