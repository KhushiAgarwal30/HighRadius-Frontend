import { InputLabel, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import humanHand from './assets/human-machine-hand-homepage.svg';
import { UnaunthenticatedNavBar } from './components';

const useStyles = makeStyles({
  flip: {
    transform: 'scale(-1,1)',
  },
  wrapper: {
    transform: 'translateY(-10%)',
  },
  formWrapper: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
  targetText: {
    padding: '2rem 2rem 2rem 3.75rem',
    background: '#8FD163',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    color: 'white',
    alignSelf: 'flex-start',
  },
  formStyles: {
    flex: '1',
    '& form': {
      width: '50%',
      margin: '0 auto',
      transform: 'translateY(-70%)',
    },
  },
});

export default function UnauthenticatedApp() {
  const styles = useStyles();
  return (
    <>
      <UnaunthenticatedNavBar />
      <div className={styles.wrapper}>
        <img className={styles.flip} src={humanHand} alt='Human Hand' />
      </div>
      <div className={styles.formWrapper}>
        <Typography className={styles.targetText} variant='h3'>
          ORDER MANAGEMENT APPLICATION
        </Typography>
        <div className={styles.formStyles}>
          <form>
            <Typography
              display='block'
              style={{ marginBottom: '2rem', color: '#666666' }}
              variant='h5'>
              Sign In
            </Typography>
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel style={{ marginBottom: '0.5rem' }} htmlFor='username'>
                Username
              </InputLabel>
              <TextField
                fullWidth
                id='username'
                style={{
                  background: '#DBF3FA',
                  borderRadius: '5px',
                  paddingTop: '0.75rem',
                }}
                required
              />
            </div>
            <div>
              <InputLabel style={{ marginBottom: '0.5rem' }} htmlFor='password'>
                Password
              </InputLabel>
              <TextField
                style={{
                  background: '#DBF3FA',
                  borderRadius: '5px',
                  paddingTop: '0.75rem',
                }}
                fullWidth
                id='password'
                type='password'
                required
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
