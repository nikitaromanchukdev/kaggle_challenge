import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  linksList: {
    display: 'flex',
  },

  navLinkWrapper: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },


  navLinkSelected: {
    textDecoration: 'underline',
  },
}));


export const useSelectStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
  },
  select: {
    color: 'white',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(4)}px ${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
  },
}));
