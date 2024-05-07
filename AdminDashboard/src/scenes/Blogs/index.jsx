import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Blog.css";

export default function TextFields() {
  return (
    <div className='blog'>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Title" color="secondary" focused cla/>
      <br />
      <TextField label="Content" variant="filled" color="success" focused width="100px" />
    </Box>
    </div>
  );
}