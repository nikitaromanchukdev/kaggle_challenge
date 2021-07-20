import { makeStyles } from '@material-ui/core/styles';

export const useHomePageStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },

  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  title: {
    textTransform: 'capitalize',
  },
}));
