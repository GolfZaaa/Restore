import { Card, CardMedia, CardContent, Typography, Button, CardHeader, Avatar, IconButton, CardActions } from '@mui/material'
import React from 'react'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Product } from '../../app/models/Product';
import { Link } from 'react-router-dom';

interface Props {
  product : Product
}

export default function ProductCart({product} : Props) {

  return (
    

    <Card sx={{ maxWidth:"100%" }}>
    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name.at(0)?.toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.pictureUrl}
        subheader={product.name}
      />


    <CardMedia
      component="img"
      alt="green iguana"
      height="140"
      sx={{bgcolor:"#f8eaf1"}}
      image={product.pictureUrl}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {(product.price/100).toFixed(2)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {(product.brand)} / {(product.type)}
      </Typography>
    </CardContent>

    <CardActions>
      <Button size="small">Add to Cart</Button>
      <Button size="small" component={Link} to={`/catalog/${product.id}`}> View </Button>
    </CardActions>
  </Card>
    
  );
}