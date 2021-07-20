import React, { memo } from 'react';
import {
  AppBar,
  Select,
  Typography,
  Toolbar,
  MenuItem,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';


import routes from 'app/AppRouter/routes';

import useStyles, { useSelectStyles } from './styles';

const Header = () => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();

  const options = [
    { value: '100', label: '100' },
    { value: '500', label: '500' },
    { value: 'all', label: 'All' },
  ];

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
            value={options[0].value}
            onChange={console.log}
          >
            {
              options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))
            }
          </Select>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default memo(Header);
