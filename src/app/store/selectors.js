import _ from 'lodash';
import { createSelector } from 'reselect';

const SEPARATOR_SYMBOL = '+/+';

// base selectors
const dataSelector = (state) => state.surveys.data;
export const filtersSelector = (state) => state.surveys.filters;

export const activeFiltersSelector = createSelector(
  filtersSelector,
  (filters) => Object
    .entries(filters)
    .filter(([ , filterValue ]) => !!filterValue)
    .reduce((result, [ filterKey, filterValue ]) => ({ ...result, [filterKey]: filterValue }), {})
);

export const filteredDataSelector = createSelector(
  [ dataSelector, activeFiltersSelector ],
  (surveys, filters) => _.filter(surveys, filters)
);


// primitive selectors
export const countriesSelector = createSelector(
  dataSelector,
  (surveys) => _.uniqBy(surveys, 'country').map((s) => s.country)
);

export const employeesQuantitySelector = createSelector(
  dataSelector,
  (surveys) => _.uniqBy(surveys, 'noEmployees')
    .map((s) => s.noEmployees)
    .sort((prev, next) => (prev.length > next.length ? 1 : -1))
);

export const withWorkInterfereSelector = createSelector(
  filteredDataSelector,
  (surveys) => surveys.filter((s) => s.workInterfere !== 'Never')
);


// complex selectors

export const treatmentSelector = createSelector(
  filteredDataSelector,
  withWorkInterfereSelector,
  (surveysTotal, withInterfere) => ({
    proportion: withInterfere.length / surveysTotal.length,
    data: Object
      .entries(_.groupBy(withInterfere, 'treatment'))
      .map(([ treatment, data ]) => ({
        treatment,
        data,
        proportion: (data.length / withInterfere.length) * 100,
      })),
  })
);

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


export const benefitsSelector = createSelector(
  dataSelector,
  (surveysTotal) => ({
    data: Object.entries(_.groupBy(surveysTotal, 'benefits')).map(([
      benefits,
      data,
    ]) => ({
      benefits,
      data,
      proportion: (data.length / surveysTotal.length) * 100,
    })),
  })
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
