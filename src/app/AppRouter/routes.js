import Home from 'pages/Home/Home';
import Details from 'pages/Details/Details';

export default [
  {
    path: '/',
    link: '/',
    key: 'Home',
    component: Home,
    exact: true,
  },
  {
    path: '/details',
    link: '/details',
    key: 'Details',
    component: Details,
  },
];
