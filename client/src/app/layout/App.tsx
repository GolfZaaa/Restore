import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';
import React, { useState } from 'react'
import Catalog from '../../features/catalog/Catalog';
import ProductCart from '../../features/catalog/ProductCart';
import Header from './Header'



export default function App() {
  const [mode, setMode] = useState(false)

  const displayMode = mode ? 'light': 'dark'

  const darkTheme = createTheme({
    palette: {
      mode: displayMode
    },
  });

  const handlemode=()=>setMode(!mode)

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Header handlemode = {handlemode}/>
        <Container>
        <Catalog/>
        </Container>
      </ThemeProvider>
      </>
  )
}
