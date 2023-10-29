import {
    Card,
    CardContent,
    CardHeader,
    Typography
  } from '@mui/material'
  import { styled } from '@mui/system';
  import React from 'react'
  import { useStyles } from './styles'
  
  const CardCustomized = styled(Card)(({ theme }) => ({
    borderRadius: 6,
    border: '2px solid black',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)'
    }
  }));
  
  export default function CustomCard(props) {
    const { title, text, action } = props;
    const classes = useStyles()
  
    return (
      <CardCustomized sx={{ background: 'background.main' }}>
        <CardHeader
          className={classes.cardHeader}
          sx={{ bgcolor: 'secondary.main' }}
          title={
            <Typography sx={{ textAlign: 'center' }} variant="h5">
              {title}
            </Typography>
          }
          action={action ? action : null}
        />
        <CardContent>{text}</CardContent>
      </CardCustomized>
    )
  }