import { makeStyles } from '@material-ui/core/styles';

import hrcLogo from '../assets/hrc-logo.svg';

const useStyles = makeStyles({
  nav: {
    margin: '0.8rem',
  },
  image: {
    paddingLeft: '0.8rem',
  },
});

export default function NavBar() {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <img className={classes.image} src={hrcLogo} alt='High Radius Logo' />
    </nav>
  );
}
