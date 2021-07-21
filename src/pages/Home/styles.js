import { makeStyles } from '@material-ui/core/styles';

export const useHomePageStyles = makeStyles((theme) => {
  const isMobile = theme.breakpoints.down('sm');

  const rootVerticalSpacing = isMobile ? 1 : 2;
  const rootHorizontalSpacing = isMobile ? 2 : 3;

  return {
    root: {
      flexGrow: 1,
      padding: `${theme.spacing(rootVerticalSpacing)}px ${theme.spacing(rootHorizontalSpacing)}px`,
      width: '100%',
      margin: 0,
    },

    paper: {
      height: '100%',
      position: 'relative',
      flexGrow: 1,
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },

    title: {
      textTransform: 'capitalize',
    },
  };
});
