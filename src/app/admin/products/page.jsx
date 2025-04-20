
import PageHeader from "../_components/PageHeader";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatIndianCurrency, formatIndianNumber } from "@/src/lib/formatter";
import prisma from "@/src/db/db";

const AdminProductPage = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Products</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
};

async function ProductTable() {
  const products = await prisma.products.findMany({
    select: {
      product_id: true,
      name: true,
      price: true,
      price: true,
      stock: true,
      _count: { select: { order_items: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length == 0)
    return <p>No Product Found.</p>;

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {products.map((product) => {
          return (
            <TableRow key={product.product_id}>
              <TableCell>
                {product.stock ? (
                  <>
                    <CheckCircle2 className=""/>
                    <span className="sr-only">Available</span>
                  </>
                ) : (
                  <>
                    <XCircle className="stroke-destructive"/>
                    <span className="sr-only">Unavailable</span>
                  </>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatIndianCurrency(product.price)}</TableCell>
              <TableCell>{formatIndianNumber(product._count.order_items)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${product.product_id}/edit`}>
                        Edit
                      </Link>
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default AdminProductPage;
