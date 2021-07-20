import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  navLinkWrapper: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },

  navLink: {

  },

  navLinkSelected: {
    textDecoration: 'underline',
  },
}));


export const useSelectStyles = makeStyles(() => ({
  select: {
    color: 'white',
    marginLeft: 'auto',
  },
}));
