"use client";

import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import React, { useActionState, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { addProduct, updateProduct } from '../_actions/product';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';

const ProductForm = ({ product }) => {
  const [error, action] = useActionState(
    product == null ? addProduct : updateProduct.bind(null, product.product_id),
    {}
  )
  const [price, setPrice] = useState(product?.price);
  const [RRP, setRRP] = useState(product?.RRP);
  const [stock, setStock] = useState(product?.stock);
  const [categoryId, setCategoryId] = useState(product?.category_id);

  return (
    <form action={action} className="space-y-8 m-10">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required defaultValue={product?.name} />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input type="number" id="price" name="price" required value={price} onChange={(e) => setPrice(Number(e.target.value) || undefined)} />
        {error.price && <div className="text-destructive">{error.price}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="RRP">RRP</Label>
        <Input type="number" id="RRP" name="RRP" value={RRP} onChange={(e) => setRRP(Number(e.target.value) || undefined)} />
      </div>
      {error.RRP && <div className="text-destructive">{error.RRP}</div>}

      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input type="number" id="stock" name="stock" required value={stock} onChange={(e) => setStock(Number(e.target.value) || undefined)} />
      </div>
      {error.stock && <div className="text-destructive">{error.stock}</div>}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" name="description" required defaultValue={product?.description}/>
      </div>
      {error.description && <div className="text-destructive">{error.description}</div>}


      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select id="category" name="category_id" required value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="1">Hair Care</option>
        </select>
      </div>
      {error.category_id && <div className="text-destructive">{error.description}</div>}


      <div className="space-y-2">
        <Label htmlFor="image">Main Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && <Image src={product.main_image} height='400' width='400' alt='Product Image' />}
      </div>
      {error.image && <div className="text-destructive">{error.image}</div>}


      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default ProductForm;
