import _ from 'lodash';
import { createSelector } from 'reselect';

const dataSelector = (state) => state.surveys.data;

export const countriesSelector = createSelector(
  dataSelector,
  (surveys) => surveys.reduce(
    ((result, { country }) => (result.includes(country) ? result : [ ...result, country ])),
    []
  )
);

export const gendersSelector = createSelector(
  dataSelector,
  (surveys) => surveys.reduce(
    ((result, { gender }) => (result.includes(gender) ? result : [ ...result, gender ])),
    []
  )
);

export const surveysByCountriesSelector = createSelector(
  dataSelector,
  (surveys) => Object
    .entries(_.groupBy(surveys, 'country'))
    .map(([ country, data ]) => ({ country, data }))
);

export const surveysByGenderSelector = createSelector(
  dataSelector,
  (surveys) => Object
    .entries(_.groupBy(surveys, 'gender'))
    .map(([ gender, data ]) => ({ gender, data }))
);


export const gendersByCountriesSelector = createSelector(
  dataSelector,
  (data) => {
    const separator = '+/+';

    const map = _.groupBy(data, (e) => `${e.country}${separator}${e.gender}`);

    const countryGenderArray = Object.entries(map)
      .map(([ key, surveys ]) => {
        const [ country, gender ] = key.split(separator);

        return { country, gender, data: surveys };
      });

    return _.groupBy(countryGenderArray, 'gender');
  }
);
