import React from 'react';
import PageHeader from '../../../_components/PageHeader';
import ProductForm from '../../../_components/ProductForm';
import prisma from '@/src/db/db';


const EditProductPage = async ({ params }) => {
    const id = await params.id;
    console.log(id);
    const product = await prisma.products.findUnique({
        where: { product_id: id }
    });
  return ( 
  <>
    <PageHeader>Edit Product</PageHeader>
    <ProductForm product={product}/>
  </>
  )
}

export default EditProductPage