import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { Product } from "../../App/models/Product";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import agent from "../../App/api/agent";
import { useStoreContext } from "../../App/context/StoreContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(!loading);
    agent.Basket.addItem(productId)
      .then((basket)=>setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
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
          image={product.pictureUrl}
          sx={{ backgroundSize: "contain", bgcolor: "#F1EFDC" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            onClick={() =>handleAddItem(product.id)}
            size="small"
          >
            Add to cart
          </LoadingButton>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
