import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

import { setFilters } from 'app/store/actions';
import { countriesSelector, employeesQuantitySelector, filtersSelector } from 'app/store/selectors';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FiltersForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const countries = useSelector(countriesSelector);
  const empoyeeQuantities = useSelector(employeesQuantitySelector);

  const classes = useStyles();

  return (
    <section>
      <FormControl className={classes.formControl}>
        <InputLabel id="country-select-label">Country</InputLabel>

        <Select
          labelId="country-select-label"
          id="country-select"
          value={filters.country}
          onChange={(ev) => { dispatch(setFilters({ country: ev.target.value })); }}
        >
          <MenuItem value="">None</MenuItem>
          {countries.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="employees-select-label">Employees</InputLabel>

        <Select
          labelId="employees-select-label"
          id="employees-select"
          value={filters.noEmployees}
          onChange={(ev) => { dispatch(setFilters({ noEmployees: ev.target.value })); }}
        >
          <MenuItem value="">None</MenuItem>
          {empoyeeQuantities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>
    </section>
  );
};

export default memo(FiltersForm);
