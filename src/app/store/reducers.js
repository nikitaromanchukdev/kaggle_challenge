import { surveyActionTypes, metaActionTypes } from './actions';

const DEFAULT_ITEM_QUANTITY = 100;

const surveysInitiallState = {
  displayQuantity: DEFAULT_ITEM_QUANTITY,
  filters: {
    country: '',
    noEmployees: '',
  },

  options: [
    { label: DEFAULT_ITEM_QUANTITY, value: 100 },
    { label: '500', value: 500 },
    { label: 'All', value: '' },
  ],
  data: [],
};

export const surveys = (state = surveysInitiallState, action) => {
  const { payload, type } = action;

  switch (type) {
    case surveyActionTypes.setDisplayQuantity: {
      const { value } = state.options.find((o) => o.label === payload);

      return {
        ...state,
        displayQuantity: value,
      };
    }

    case surveyActionTypes.setFilters:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload,
        },
      };

    case surveyActionTypes.setSurveyData:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
};


const metaDataInitialState = {
  fetching: false,
  error: null,
};

export const metaData = (state = metaDataInitialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case metaActionTypes.setFetchingState:
      return {
        ...state,
        fetching: payload,
      };

    case metaActionTypes.setError:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
