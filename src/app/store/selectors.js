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

// export const gendersSelector = createSelector(
//   dataSelector,
//   (surveys) => surveys.reduce(
//     ((result, { gender }) => (result.includes(gender) ? result : [ ...result, gender ])),
//     []
//   )
// );

export const surveysByCountriesSelector = createSelector(
  dataSelector,
  (surveys) => Object
    .entries(_.groupBy(surveys, 'country'))
    .map(([ country, data ]) => ({ country, data }))
);

// export const surveysByGenderSelector = createSelector(
//   dataSelector,
//   (surveys) => Object
//     .entries(_.groupBy(surveys, 'gender'))
//     .map(([ gender, data ]) => ({ gender, data }))
// );

const SEPARATOR_SYMBOL = '+/+';

export const gendersByCountriesSelector = createSelector(
  dataSelector,
  (data) => {
    const map = _.groupBy(data, (e) => `${e.country}${SEPARATOR_SYMBOL}${e.gender}`);

    const countryGenderArray = Object.entries(map)
      .map(([ key, surveys ]) => {
        const [ country, gender ] = key.split(SEPARATOR_SYMBOL);

        return { country, gender, data: surveys };
      });

    return _.groupBy(countryGenderArray, 'gender');
  }
);

const COMPARISON_AGE = 40;
export const ageByCountriesSelector = createSelector(
  dataSelector,
  (data) => {
    const map = _.groupBy(data, (e) => {
      const output = e.age >= COMPARISON_AGE
        ? 'Above'
        : 'Beyond';

      return `${output} ${COMPARISON_AGE} y.o.${SEPARATOR_SYMBOL}${e.country}`;
    });

    const countryGenderArray = Object.entries(map)
      .map(([ key, surveys ]) => {
        const [ ageMarker, country ] = key.split(SEPARATOR_SYMBOL);

        return ({ country, ageMarker, data: surveys });
      });

    return _.groupBy(countryGenderArray, 'ageMarker');
  }
);

export const familyHistoryByCountriesSelector = createSelector(
  dataSelector,
  (data) => {
    const map = _.groupBy(data, (e) => `${e.country}${SEPARATOR_SYMBOL}${e.familyHistory}`);

    const countryGenderArray = Object.entries(map)
      .map(([ key, surveys ]) => {
        const [ country, familyHistory ] = key.split(SEPARATOR_SYMBOL);

        return { country, familyHistory, data: surveys };
      });

    return _.groupBy(countryGenderArray, 'familyHistory');
  }
);


export const selectByCountry = (
  selectionKey
) => createSelector(
  dataSelector,
  (data) => {
    const mapObject = _.groupBy(
      data,
      (survey) => `${survey.country}${SEPARATOR_SYMBOL}${survey[selectionKey]}`
    );

    const keyedArray = Object.entries(mapObject)
      .map(([ key, values ]) => {
        const [ country, selectionKeyValue ] = key.split(SEPARATOR_SYMBOL);

        return { country, [selectionKey]: selectionKeyValue, data: values };
      });

    return _.groupBy(keyedArray, selectionKey);
  }
);
