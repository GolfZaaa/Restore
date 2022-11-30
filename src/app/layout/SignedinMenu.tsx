import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { signOut } from '../../features/account/accountSlice';
import { clearBasket } from '../../features/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

export default function SignedinMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.account);
  
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button onClick={handleClick} color="inherit" sx={{ typography: "h6" }}>
          {user?.email}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem component={Link} to="/order">
            My orders
          </MenuItem>
          <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
            localStorage.removeItem("savepath");
          }}
        >
          Logout
        </MenuItem>
        </Menu>
      </>
    );
  }
  