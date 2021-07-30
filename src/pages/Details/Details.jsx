import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import WorkInterfere from './components/WorkInterfere/WorkInterfere';
import Benefits from './components/Benefits/Benefits';
import useStyles from './styles';
import FiltersForm from './components/FiltersForm/FiltersForm';
import MentalVsPhysical from './components/MentalVsPhysical/MentalVsPhysical';
import CareOptions from './components/CareOptions/CareOptions';
import StatisticsByAge from './components/StatisticsByAge/StatisticsByAge';


const TITLE = 'survey details';


const Details = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();

  return (
    <Grid
      container
      component="section"
      spacing={2}
      className={classes.root}
      direction={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems={isMobile ? 'center' : 'stretch'}
    >
      <Grid className={classes.nestedContainer} item xs={12} container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant="h4" component="h1" className={classes.title}>
            {TITLE}
          </Typography>
        </Grid>

        <Grid item md={9} xs={12}>
          <Paper className={classes.paper}>
            <FiltersForm />
          </Paper>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        md={6}
        spacing={2}
        direction="column"
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <StatisticsByAge />
          </Paper>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        md={6}
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MentalVsPhysical />
          </Paper>
        </Grid>

        <Grid
          className={classes.nestedContainer}
          item
          container
          xs={12}
          spacing={2}
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Benefits />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <CareOptions />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <WorkInterfere />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
