import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from "react-router-dom"
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { Google } from "@mui/icons-material"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout/AuthLayout"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store"

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({email, password})
    dispatch(checkingAuthentication(email, password));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  const onEmailPasswordSignIn = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  }


  return (
    <AuthLayout title='Login'>
      <form aria-label='submit-form'
       onSubmit={onEmailPasswordSignIn} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@mail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contrasena"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              inputProps={{
                'data-testid': 'password'
              }}
              onChange={onInputChange}
              value={password}
            />
          </Grid>

          <Grid container display={!!errorMessage ? '' : 'none'}
            sx={{mt:1}}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant="contained" disabled={isAuthenticating} aria-label="google-btn" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>
                  Google
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
