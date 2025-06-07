import axios from 'axios';
import { useEffect, useState } from 'react'
import ProductCard from '../components/products/productCard';
import { BaseUrl, type Product } from '../constant';

const Products = () => {
 
const [products, setProducts] = useState<Product[]>([]);
  //  const [search, setSearch] = useState("");
  //  const [categoryId, setCategoryId] = useState();
  //  const [page, setPage] = useState(1);
  //  const limit = 8;
 
   const fetchProducts = async () => {
     try {
       const res = await axios.get(`${BaseUrl}/product`, {
        //  params: { search, categoryId, page, limit },
       });
       setProducts(res.data.product); 
     } catch (err) {
       console.error("Error fetching products", err);
     }
   };
 
   useEffect(()=>{
     fetchProducts()
   },[])
 
 
 
   return (
     <div className="p-4 grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-4 gap-6">
       {products.map((product) => (
         <ProductCard
           key={product.id}
           product={product}
         />
       ))}
     </div>
   )
 }


export default Products
