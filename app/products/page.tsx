"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  const handleEditClick = (product: any) => {
    localStorage.setItem("editProduct", JSON.stringify(product));
    router.push(`/products/${product.id}/edit-product`);
  };
  
  const handleViewClick = (product: any) => {
    localStorage.setItem("viewProduct", JSON.stringify(product));
    router.push(`/products/${product.id}/view-product`);
  };

  const products = [
    {
      id: 1,
      name: "Rice Basmati",
      barcode: "8901234567890",
      category: "Groceries",
      price: 120,
      stock: 5,
      unit: "kg",
    },
    {
      id: 2,
      name: "Toor Dal",
      barcode: "8901234567891",
      category: "Groceries",
      price: 90,
      stock: 3,
      unit: "kg",
    },
    {
      id: 3,
      name: "Cooking Oil",
      barcode: "8901234567892",
      category: "Groceries",
      price: 150,
      stock: 2,
      unit: "liter",
    },
    {
      id: 4,
      name: "Sugar",
      barcode: "8901234567893",
      category: "Groceries",
      price: 45,
      stock: 10,
      unit: "kg",
    },
    {
      id: 5,
      name: "Tea Powder",
      barcode: "8901234567894",
      category: "Groceries",
      price: 80,
      stock: 8,
      unit: "packet",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Products</h1>
        <Link href="/products/add-new-product">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>
            Manage your product inventory, prices, and stock levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.barcode}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock <= 5 ? "text-red-500 font-medium" : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell className="text-center">
                    {/* <Link href={`/products/${product.id}/view-product`}> */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewClick(product)}
                    >
                      View
                    </Button>
                    {/* </Link> */}
                    {/* </TableCell>
                  <TableCell className="text-right"> */}
                    {/* <Link href={`/products/${product.id}/edit-product`}> */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                    {/* </Link> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
