import { Button, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { CounterState, decrement, increment } from './counterReducer';

export default function ContactPage() {
  const dispatch = useAppDispatch()
  const {data,title} =  useAppSelector(state => state.counter)
 
  return (
    <>
    <Typography variant="h2">
      {title} {data}
    </Typography>
    <Button sx={{m:2}} variant='contained' onClick={()=>dispatch(increment(1))}>+</Button>
    <Button variant='contained' onClick={()=>dispatch(decrement(1))}>-</Button>
    <Button sx={{m:2}} variant='contained' onClick={()=>dispatch(increment(5))}>+5</Button>
    </>
  );
}
