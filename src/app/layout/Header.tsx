import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";
import SignedinMenu from "./SignedinMenu";


const midLinks = [
  { title: "products", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  fontSize: '4em',
  fontFamily:' "Montez", "cursive" ',
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header(props: any) {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector(state=>state.basket)
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
              TEE-StORE
            </Typography>
            <Switch onChange={props.handleMode} />
          </Box>

          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

          <Box display="flex" alignItems="center">
            <IconButton
              component={Link}
              to="/basket"
              aria-label="cart"
              sx={{ color: "inherit" }}
              size="large"
            >
              <Badge badgeContent={itemCount} color="warning">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (
              <SignedinMenu />
            ) : (
              <List sx={{ display: "flex" }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={{ color: "inherit", typography: "h6" }}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}

          </Box>
        </Toolbar>
      </AppBar>
    </>
  ); }