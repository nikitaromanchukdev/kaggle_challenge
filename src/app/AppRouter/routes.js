import Details from 'pages/Details/Details';
import Home from 'pages/Home/Home';

export default [
  {
    path: '/',
    link: '/',
    key: 'Home',
    component: Home,
    exact: true,
  },
  {
    path: '/details/:surveyId',
    link: '/details',
    key: 'Details',
    component: Details,
  },
];
