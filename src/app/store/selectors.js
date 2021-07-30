import _ from 'lodash';
import { createSelector } from 'reselect';
import { roundToPrecision } from 'utils/math';

const SEPARATOR_SYMBOL = '+/+';
const COMPARISON_AGE = 40;

const AGE_GROUPS = [
  { key: 50, label: '50+' },
  { key: 40, label: '40+' },
  { key: 30, label: '30+' },
  { key: 25, label: '25+' },
  { key: 20, label: '20+' },
  { key: 0, label: 'Below 20' },
];

// shared grouping functions
const getDataByKey = (fieldKey) => (surveys) => Object
  .entries(_.groupBy(surveys, fieldKey))
  .map(([ fieldKeyValue, data ]) => ({
    key: fieldKeyValue,
    data,
    proportion: (data.length / surveys.length),
    quantity: data.length,
  }));

const groupByAgeGroups = (o) => {
  const ageGroupMatched = AGE_GROUPS.find((group) => o.key >= group.key);

  if (!ageGroupMatched) {
    return AGE_GROUPS.find((g) => !g.key).label;
  }

  return ageGroupMatched.label;
};


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


// primitive data selectors
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
  (filteredSurveys) => filteredSurveys.filter((s) => s.workInterfere !== 'Never')
);

export const careOptionsSelector = createSelector(
  filteredDataSelector,
  getDataByKey('careOptions')
);

export const benefitsSelector = createSelector(
  filteredDataSelector,
  getDataByKey('benefits')
);

export const ageSelector = createSelector(
  filteredDataSelector,
  getDataByKey('age')
);

// complex data selectors
export const withWorkInterfereByAge = createSelector(
  filteredDataSelector,
  (filteredSurveys) => {
    const ages = getDataByKey('age')(filteredSurveys);
    const agesGrouped = _.groupBy(ages, groupByAgeGroups);

    const agesWithWorkInterfere = getDataByKey(
      (o) => `${o.workInterfere}${SEPARATOR_SYMBOL}${o.age}`
    )(filteredSurveys);

    const workInterfereByAges = agesWithWorkInterfere
      .map(({ key, data }) => {
        const [ workInterfere, age ] = key.split(SEPARATOR_SYMBOL);

        return {
          data,
          workInterfere,
          age,
          key: age,
        };
      });

    const workInterfereByAgeGroups = Object
      .entries(_.groupBy(
        workInterfereByAges,
        (o) => `${groupByAgeGroups(o)}${SEPARATOR_SYMBOL}${o.workInterfere}`
      ))
      .map(([ key, data ]) => {
        const [ ageGroup, workInterfere ] = key.split(SEPARATOR_SYMBOL);

        return {
          workInterfere,
          ageGroup,
          quantity: data.reduce(
            (result, di) => result + di.data.length,
            0
          ),
          data,
          ageGroupKey: AGE_GROUPS.find((g) => g.label === ageGroup).key,
        };
      });

    const surveysByAgeGroups = Object
      .entries(agesGrouped)
      .map(([ ageGroup, data ]) => ({
        quantity: data.reduce(
          (result, di) => result + roundToPrecision(di.quantity),
          0
        ),
        ageGroup,
        ageGroupKey: AGE_GROUPS.find((g) => g.label === ageGroup).key,
      }));

    return {
      workInterfereByAgeGroups: getDataByKey('workInterfere')(workInterfereByAgeGroups),
      surveysByAgeGroups: _.sortBy(surveysByAgeGroups, 'ageGroupKey'),
    };
  }
);

export const treatmentWithWorkInterfereSelector = createSelector(
  filteredDataSelector,
  withWorkInterfereSelector,
  (filteredSurveys, withInterfere) => ({
    proportion: withInterfere.length / filteredSurveys.length,
    data: getDataByKey('treatment')(withInterfere),
  })
);

export const mentalPhysicalSelector = createSelector(
  filteredDataSelector,
  getDataByKey('mentalVsPhysical')
);

export const surveysByCountriesSelector = createSelector(
  dataSelector,
  (surveys) => Object
    .entries(_.groupBy(surveys, 'country'))
    .map(([ country, data ]) => ({ country, data }))
);

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
