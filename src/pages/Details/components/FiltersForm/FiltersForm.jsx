import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { setFilters } from 'app/store/actions';
import { countriesSelector, employeesQuantitySelector, filtersSelector } from 'app/store/selectors';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  containerMobile: {
    flexDirection: 'column',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  resetButton: {
    marginLeft: 'auto',
  },
  resetButtonMobile: {
    marginLeft: 0,
  },
}));

const FiltersForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const countries = useSelector(countriesSelector);
  const empoyeeQuantities = useSelector(employeesQuantitySelector);

  const changeFilters = (values) => dispatch(setFilters(values));

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <section className={`${classes.container} ${isMobile && classes.containerMobile}`}>
      <FormControl className={classes.formControl}>
        <InputLabel id="country-select-label">
          Country
        </InputLabel>

        <Select
          labelId="country-select-label"
          id="country-select"
          value={filters.country}
          onChange={(ev) => { changeFilters({ country: ev.target.value }); }}
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
          onChange={(ev) => { changeFilters({ noEmployees: ev.target.value }); }}
        >
          <MenuItem value="">None</MenuItem>
          {empoyeeQuantities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="secondary"
        className={`${classes.resetButton} ${isMobile && classes.resetButtonMobile}`}
        onClick={() => { changeFilters(); }}
      >
        Reset
      </Button>
    </section>
  );
};

export default memo(FiltersForm);
