import {React, useContext} from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import BreadCrum from '../Components/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox';
import RelatedProduct from '../Components/RelatedProduct';

export default function Product() {
  const { all_product } = useContext(ShopContext);
  const {ProductId } = useParams();
  const Product = all_product.find((e)=> e.id === Number(ProductId))
  return (
    <div className="flex flex-col gap-6 px-4 md:px-16 py-8">
      <BreadCrum  Product = {Product}/>
      <ProductDisplay Product ={Product} />
      <DescriptionBox productId={Product?.id} />
      <RelatedProduct />
    </div>
  )
}
