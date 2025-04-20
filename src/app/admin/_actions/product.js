
"use server";

import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import prisma from "@/src/db/db";

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().int().min(0),
  RRP: z.coerce.number().min(0).optional(),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState, formData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  console.log(result)
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log(data);

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  // Generate unique product_id
  const productId = crypto.randomUUID();

  await prisma.products.create({
    data: {
      product_id: productId,  // Assign the unique product_id
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      RRP: data.RRP,
      main_image: imagePath,
    },
  });

  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export async function updateProduct(id, prevState, formData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  console.log(result)
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await prisma.products.findUnique({ where: { product_id: id } })


  if (product == null) return notFound();

  var imagePath = product.main_image;
  console.log("datas: ",product, imagePath, id)
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  }

  await prisma.products.update({
    where: { product_id: id },
    data: {
      // Assign the unique product_id
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      RRP: data.RRP,
      main_image: imagePath,
    },
  });

  redirect("/admin/products");
}