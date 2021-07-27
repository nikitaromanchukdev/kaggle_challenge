import { Grid, Paper, Typography } from '@material-ui/core';
import SurveysByCountry from 'pages/Home/components/SurveysByCountry/SurveysByCountry';
import React from 'react';

import useStyles from './styles';

const TITLE = 'survey overview';

const Details = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      component="section"
      spacing={2}
      className={classes.root}
    >
      <Grid item xs={12} container>
        <Typography variant="h4" component="h1" className={classes.title}>
          {TITLE}
        </Typography>
      </Grid>

      <Grid
        item
        container
        xs={12}
        spacing={2}
        direction="column"
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <SurveysByCountry />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};


export default Details;
