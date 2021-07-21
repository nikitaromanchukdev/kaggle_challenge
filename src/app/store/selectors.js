import { createSelector } from 'reselect';

const dataSelector = (state) => state.surveys.data;

export const countriesSelector = createSelector(
  dataSelector,
  (surveys) => surveys.reduce(
    ((result, { country }) => (result.includes(country) ? result : [ ...result, country ])),
    []
  )
);

export const surveysByCountriesSelector = createSelector(
  dataSelector,
  countriesSelector,
  (surveys, countries) => countries
    .reduce(
      (result, country) => {
        const countryPayload = {
          country,
          data: surveys.filter((survey) => survey.country === country),
        };

        return [ ...result, countryPayload ];
      },
      []
    )
);
