import React, { memo, useEffect } from 'react';
import {
  AppBar,
  Select,
  Typography,
  Toolbar,
  MenuItem,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import routes from 'app/AppRouter/routes';
import { loadSurveys, surveyActionTypes } from 'app/store/actions';

import useStyles, { useSelectStyles } from './styles';

const Header = () => {
  const quantity = useSelector((state) => {
    const { displayQuantity, options } = state.surveys;

    return options.find(({ value }) => value === displayQuantity);
  });

  const options = useSelector((state) => state.surveys.options);
  const displayQuantity = useSelector((state) => state.surveys.displayQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSurveys({ limit: displayQuantity }));
  }, [ dispatch, displayQuantity ]);

  const changeHandler = (ev) => {
    dispatch({
      type: surveyActionTypes.setDisplayQuantity,
      payload: ev.target.value,
    });
  };

  const classes = useStyles();
  const selectClasses = useSelectStyles();

  return (
    <header className="appHeader">
      <AppBar position="static">
        <Toolbar className={classes.linksList}>
          {routes.map(({ key, link, exact = false }) => (
            <Typography className={classes.navLinkWrapper} variant="h6" color="inherit" key={key}>
              <NavLink
                className="navLink"
                activeClassName={classes.navLinkSelected}
                to={link}
                exact={exact}
              >
                {key}
              </NavLink>
            </Typography>
          )) }

          <Select
            className={selectClasses.select}
            label="Option"
            value={quantity?.label}
            onChange={changeHandler}
          >
            {options.length && options.map((o) => (
              <MenuItem key={o.value} value={o.label}>{o.label}</MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default memo(Header);
