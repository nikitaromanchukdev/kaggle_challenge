import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import BarChart from 'components/Charts/BarChart/BarChart';

import useStyles from './styles';
import WorkInterfere from './components/WorkInterfere/WorkInterfere';


const TITLE = 'survey details';

const data = {
  labels: [ '1', '2', '3', '4', '5', '6' ],
  datasets: [
    {
      label: '# of Red Votes',
      data: [ 12, 19, 3, 5, 2, 3 ],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [ 2, 3, 20, 5, 1, 4 ],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: '# of Green Votes',
      data: [ 3, 10, 13, 15, 22, 30 ],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const Home = () => {
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
      <Grid item xs={12} container>
        <Typography variant="h4" component="h1" className={classes.title}>
          {TITLE}
        </Typography>
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
          <Paper className={classes.paper} />
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
            <BarChart
              data={data}
              options={{
                indexAxis: 'y',
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <BarChart
              data={data}
            />
          </Paper>
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

export default Home;
