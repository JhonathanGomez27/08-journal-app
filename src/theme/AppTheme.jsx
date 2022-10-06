import theme from "./theme"
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
