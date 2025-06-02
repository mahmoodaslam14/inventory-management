"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Barcode, Minus, Plus, Printer, Save } from "lucide-react";

export default function NewSalePage() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([
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
      stock: 10,
      unit: "litre",
    },
  ]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [saleItems, setSaleItems] = useState<
    Array<{
      id: number;
      productId: number;
      name: string;
      price: number;
      quantity: number;
      unit: string;
      total: number;
    }>
  >([]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    // Fetch products and customers
    const fetchData = async () => {
      try {
        const [productsRes, customersRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/customers"),
        ]);

        if (productsRes.ok && customersRes.ok) {
          const productsData = await productsRes.json();
          const customersData = await customersRes.json();

          setProducts(productsData);
          setCustomers(customersData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addItem = () => {
    if (!selectedProduct) return;

    const productId = Number.parseInt(selectedProduct);
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    const qty = Number.parseFloat(quantity) || 1;
    const total = product.price * qty;

    setSaleItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        unit: product.unit,
        total,
      },
    ]);

    setSelectedProduct("");
    setQuantity("1");
  };

  const removeItem = (id: number) => {
    setSaleItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return saleItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    const discountValue = Number.parseFloat(discount) || 0;
    return (subtotal * discountValue) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (saleItems.length === 0) {
      alert("Please add at least one item to the sale");
      return;
    }

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customer !== "walk-in" ? customer : null,
          items: saleItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
          subtotal: calculateSubtotal(),
          discount: calculateDiscount(),
          total: calculateTotal(),
          paymentMethod,
        }),
      });

      if (response.ok) {
        // Redirect back to sales page
        router.push("/sales");
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Failed to create sale"}`);
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      alert("Failed to create sale. Please try again.");
    }
  };

  const handleScanBarcode = () => {
    // In a real app, this would integrate with a barcode scanner
    alert("Connect your barcode scanner and scan a product");
  };

  const handlePrintReceipt = () => {
    // In a real app, this would print a receipt
    alert("Receipt printing functionality would be implemented here");
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">New Sale</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">New Sale</h1>
        <Button variant="outline" onClick={handlePrintReceipt}>
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Select a customer or create a new one.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walk-in">Walk-in Customer</SelectItem>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                        {c.balance > 0 ? `(Balance: ₹${c.balance})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="credit">Store Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
              <CardDescription>
                Scan barcode or select products to add to the sale.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                        >
                          {product.name} - ₹{product.price}/{product.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-24 space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={handleScanBarcode}
                    variant="outline"
                    className="mb-[1px]"
                  >
                    <Barcode className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-end">
                  <Button type="button" onClick={addItem} className="mb-[1px]">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Sale Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Total (₹)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleItems.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground"
                      >
                        No items added yet. Add products to the sale.
                      </TableCell>
                    </TableRow>
                  ) : (
                    saleItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex-col items-end gap-2">
              <div className="flex w-full max-w-xs flex-col gap-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount (%):</span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    className="w-20"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <span>Discount Amount:</span>
                  <span>₹{calculateDiscount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Complete Sale
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
