import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/Contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFound";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

export default function App() {
 // const { setBasket } = useStoreContext(); //ควบคุมสเตทด้วย React context to Centralize
 const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true);
  const {fullscreen} = useAppSelector(state=>state.screen)

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [dispatch]);



  const [mode, setMode] = useState(true);
  const displayMode = mode ? "light" : "dark";
  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  if (loading) return <LoadingComponent message="Initilize App....." />;
  
  const handleMode = () => setMode(!mode);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CssBaseline />
        <Header handleMode={handleMode} />

        {fullscreen ? <>{mainroute}</> : <Container sx={{marginTop:2}} >{mainroute}</Container>}

      </ThemeProvider>
    </>
  );
}


const mainroute =  <Routes>
<Route path="/" element={<HomePage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/catalog" element={<Catalog />} />
<Route path="/catalog/:id" element={<ProductDetails />} />
<Route path="/" element={<NotFound/>} />
<Route path="/" element={<ServerError />} />
<Route path="/basket" element={<BasketPage/>} />
<Route path="/checkout" element={<CheckoutPage/>} />
</Routes>
