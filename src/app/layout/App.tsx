import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/basket/BasketPage";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import OrderPage from "../../features/orders/OrderPage";
import { useStoreContext } from "../context/StoreContext";
import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../store/configureStore";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";
import { PrivateLogin, PrivateRoute } from "./PrivateRoute";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);


  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);


  const [mode, setMode] = useState(false);
  const modeDisplay = mode ? "dark" : "light";

  const handleMode = () => setMode(!mode);

  const theme = createTheme({
    palette: {
      mode: modeDisplay,
      background: {
        default: modeDisplay === "light" ? "#f0f5f7" : "#384348",
      },
    },
  });

  if (loading) return <LoadingComponent message="Initilize App....." />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline />
        <Header handleMode={handleMode} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                <PrivateLogin>
                  <Login />
                </PrivateLogin>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order" element={<OrderPage/>}/>
            </Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}