import { Box, AppBar, Toolbar, IconButton, Typography, Button, Switch, Grid, Badge, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';


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


export default function Header(props : any) {
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
              onChange={props.handlemode}
              color="default"
            />
            <MenuIcon />

            <Typography variant="h6" component="div">Google</Typography>
          </Box>

          <List sx={{display:"flex"}}>
            {midLinks.map(({title,path})=>(
            <ListItem key={title} component={NavLink} to={path} sx={navStyles} >{title}</ListItem>))}
          </List>

          
          <Box sx={{display:"flex", alignItems:"center" }}>
            <IconButton size='large' color='inherit'>
            <Badge color="secondary" badgeContent={4}>
            <ShoppingCartIcon />
            </Badge>
            </IconButton>

            <List sx={{display:"flex"}}>
            {rightLinks.map(({title,path})=>(
            <ListItem key={title} component={NavLink} to={path} sx={navStyles} >{title}</ListItem>))}
          </List>

          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
