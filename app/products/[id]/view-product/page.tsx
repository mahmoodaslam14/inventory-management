"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ViewProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem("editProduct");
    if (storedProduct) {
      const parsedProduct = JSON.parse(storedProduct);
      setProduct(parsedProduct);
    }
  }, []);

  //   useEffect(() => {
  //     if (product?.id) {
  //       setFormData({
  //         name: product.name || "",
  //         barcode: product.barcode || "",
  //         category: product.category || "",
  //         price: product.price?.toString() || "",
  //         cost: product.costPrice?.toString() || "",
  //         stock: product.stock?.toString() || "",
  //         unit: product.unit || "",
  //       });
  //     }
  //   }, [product?.id]);

  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       const res = await fetch(`/api/products/${id}`);
  //       const data = await res.json();
  //       setProduct(data);
  //     };
  //     fetchProduct();
  //   }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">View Product</h1>
        <Button onClick={() => router.push(`/products/${id}/edit-product`)}>
          Edit Product
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>Product Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Barcode:</strong> {product.barcode}
          </div>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <div>
            <strong>Unit:</strong> {product.unit}
          </div>
          <div>
            <strong>Selling Price:</strong> ${Number(product.price).toFixed(2)}
          </div>
          <div>
            <strong>Cost Price:</strong> $
            {Number(product.costPrice || "0").toFixed(2)}
          </div>
          <div>
            <strong>Stock:</strong> {product.stock}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
