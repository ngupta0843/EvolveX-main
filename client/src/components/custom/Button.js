import { styled } from '@mui/system'
import { Button } from '@mui/material';

export const CustomButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  color: '#1d1b31',
  background: '#ffffff',
  border: '2px solid #1d1b31',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  marginTop: theme.spacing(1),
  textTransform: 'capitalize',
  fontWeight: '600',
  outline: 'none',
  borderRadius: '10px',
  '&:hover': {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4)',
    background: '#f5f5f5',
    border: '2px solid #1d1b31'
  },
  '&.Mui-disabled': {
    color: '#a6a6a6',
    background: '#e0e0e0',
    border: '2px solid rgba(0, 0, 0, 0.4)'
  }
}));