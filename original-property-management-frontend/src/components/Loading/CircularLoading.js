import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import './Loading.scss';

export const CircularLoading = (props) => {
  return (
    <Box component={'div'} className='loading' sx={{ p:2}}>
      <CircularProgress size={props.size ? props.size : '1rem'}  />
    </Box>
  );
}