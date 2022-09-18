import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStoreContext } from '../../App/context/StoreContext';
import { Box } from '@mui/system';
import { currencyFormat } from '../../App/util/util';
import { LoadingButton } from '@mui/lab';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useState } from 'react';
import agent from '../../App/api/agent';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import BasketSummary from './BasketSummary';


export default function BasketPage() {
  //name ใช้ควบคุม LoadingButton ให้หมุนเพียงจุดเดียว ณ เวลาใดเวลาหนึ่ง
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });





  //โหลดค่าตั้งต้นแล้วที่ App.tsx
  const { basket, setBasket, removeItem } = useStoreContext();




  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
     agent.Basket.removeItem(productId, quantity)
       .then(() => removeItem(productId, quantity))
       .catch((error) => console.log(error))
       .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  

  function handleRemove()
  {
    setStatus({...status,loading:true})
  }


  return (
      <>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}} />

                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>

              {/* บวก ลบ สินค้า */}
              <TableCell align="center">
                <LoadingButton loading={status.loading && status.name ==="rem" + item.productId.toString()} onClick={()=>handleRemoveItem(item.productId,1,"rem"+item.productId.toString())}>
                  <Remove/> 
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={status.loading && status.name ==="add" + item.productId.toString()} onClick={()=>handleAddItem(item.productId,"add"+item.productId.toString())}>
                  <Add/> 
                </LoadingButton>
                </TableCell>

              <TableCell align="right">{currencyFormat(item.price * item.quantity)}
              <LoadingButton loading={status.loading && status.name ==="del" + item.productId.toString()} onClick={()=>handleRemoveItem(item.productId,item.quantity,"del"+item.productId.toString())}>
                  <Delete/> 
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
             <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>

      </>
  );
}
