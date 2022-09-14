import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Badge,
  List,
  ListItem,
  Switch,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "catalog", path: "/catalog" },
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
  typography: "h6",
  "&:hover": {
  color: "grey.500",
  },
  "&.active": {
  color: "text.secondary",
  },
  };

export default function Header(props: any) {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Switch
              defaultChecked
              onChange={props.handleMode}
              color="default"
            />
            <MenuIcon />
            <Typography variant="h6" component="div">
              AN515-51
            </Typography>
          </Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem key={title} component={NavLink} to={path} sx={navStyles}>
                {" "}
                {title}{" "}
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge color="secondary" badgeContent={20} sx={{ mr: 1 }}>
              <ShoppingCartIcon />
            </Badge>

            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem key={title} component={NavLink} to={path}>
                  {" "}
                  {title}{" "}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
