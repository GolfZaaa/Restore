import { ThemeProvider } from '@emotion/react';
import { Home } from '@mui/icons-material';
import { Container, createTheme, CssBaseline } from '@mui/material';
import { light } from '@mui/material/styles/createPalette';
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductCart from '../../features/catalog/ProductCart';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
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
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/catalog/:id' element={<ProductDetails/>} />
        </Routes>
        </Container>
      </ThemeProvider>
      </>
  )
}
