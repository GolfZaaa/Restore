import axios from "axios";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { Product } from "../../App/models/Product";
import ProductList from "./ProductList";


export default function Catalog() {
  const [products,setProduct] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    agent.catalog.list()
    .then((response : any)=>setProduct(response))
    .catch((error)=>console.log(error))
    .finally(()=>setLoading(false))
  }, [])
  
  if (loading) return <LoadingComponent message="Loading Products....." />;
  
  return (
    <>
    <ProductList products={products}/>
    </>
  );
}


