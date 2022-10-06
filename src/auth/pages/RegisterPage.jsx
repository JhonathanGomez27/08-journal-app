import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from "react-router-dom"
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { useForm } from "../../hooks"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"
import { useMemo } from "react"

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener un @.'],
  password: [(value) => value.length >= 6, 'El password debe tener mas de 6 digitos.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status])

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  // console.log(displayNameValid)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Nombre completo" type="text" placeholder="Jhon doe" fullWidth
              name="displayName"
              onChange={onInputChange}
              value={displayName}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="correo" type="email" placeholder="Correo@mail.com" fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmited}
              helperText={emailValid} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="contraseña" type="password" placeholder="Contraseña" fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid} />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12}
              display={ !!errorMessage ? '': 'none' }>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuth}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
