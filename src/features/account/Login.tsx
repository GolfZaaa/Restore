import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';
import { createBrowserHistory } from 'history';

export default function Login() {
  const dispatch = useAppDispatch();
  const history = createBrowserHistory();
    const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors, isValid },
    } = useForm<{ username: ""; password: "" }>({ mode: "all" });
  
    //FieldValues คือ ค่าทั้งหมดภายใน Form
    async function submitForm(data: FieldValues) {
      try {
       await dispatch(signInUser(data)); 
       history.push('/catalog');
      } catch (error) {
       console.log(error)
      }
   }
 

  
    return (
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="User name"
              autoFocus
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }