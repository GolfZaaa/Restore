import { Grid } from '@mui/material'
import React from 'react'
import { Product } from '../../app/models/Product'
import ProductCart from './ProductCart'

interface Props {
  products : Product[]
}

export default function ProductList({products} : Props) {
  return (
    
    <>
        
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {products.map((product) => (
    <Grid item xs={4} sm={4} md={4} key={product.id}>
      <ProductCart product={product}/>
    </Grid>
  ))}
</Grid>

    </>
    
    
  )
}
