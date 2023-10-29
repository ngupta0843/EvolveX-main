import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 50,
  },
  card: {
    border: '2px solid black',
    borderRadius: '10px',
    minHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  paper: {
    borderRadius: 4,
    border: '3px solid black',
    overflow: 'hidden',
  },
  content: {
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});