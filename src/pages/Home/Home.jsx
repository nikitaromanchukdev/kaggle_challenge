import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';

import { loadSurveys } from 'app/store/actions';
import { useHomePageStyles } from './styles';

const TITLE = 'survey overview';

const Home = () => {
  const dispatch = useDispatch();
  const displayQuantity = useSelector((state) => state.surveys.displayQuantity);

  useEffect(() => {
    dispatch(loadSurveys({ limit: displayQuantity }));
  }, [ dispatch, displayQuantity ]);

  const homePageClasses = useHomePageStyles();

  return (
    <Grid container component="section" spacing={3} className={homePageClasses.root}>
      <Grid item xs={12}>
        <h1 className={homePageClasses.title}>{TITLE}</h1>
      </Grid>

      <Grid item xs={12} md={6} container spacing={3}>
        <Grid item xs={12} container>
          <Paper className={homePageClasses.paper} style={{ position: 'relative' }}>
            chart-0
          </Paper>
        </Grid>
      </Grid>


      <Grid item container xs={12} md={6} spacing={3}>
        <Grid item xs={12} container>
          <Paper className={homePageClasses.paper}>chart-1</Paper>
        </Grid>

        <Grid item xs={12} container>
          <Paper className={homePageClasses.paper}>chart-2</Paper>
        </Grid>

        <Grid item xs={12} container>
          <Paper className={homePageClasses.paper}>chart-3</Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
