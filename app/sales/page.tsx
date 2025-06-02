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
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function SalesPage() {
  // This would normally come from your database
  const sales = [
    {
      id: "INV-001",
      date: "2023-05-10",
      customer: "Rahul Sharma",
      amount: 1250.0,
      status: "Paid",
      items: 5,
    },
    {
      id: "INV-002",
      date: "2023-05-09",
      customer: "Priya Patel",
      amount: 850.0,
      status: "Pending",
      items: 3,
    },
    {
      id: "INV-003",
      date: "2023-05-08",
      customer: "Amit Kumar",
      amount: 450.0,
      status: "Paid",
      items: 2,
    },
    {
      id: "INV-004",
      date: "2023-05-07",
      customer: "Neha Singh",
      amount: 1800.0,
      status: "Paid",
      items: 7,
    },
    {
      id: "INV-005",
      date: "2023-05-06",
      customer: "Vikram Mehta",
      amount: 650.0,
      status: "Pending",
      items: 4,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Sales</h1>
        <Link href="/sales/add-new-sale">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Sale
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>
            View and manage all your sales transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.items}</TableCell>
                  <TableCell>{sale.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={sale.status === "Paid" ? "default" : "secondary"}
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/sales/${sale.id}/view-sale`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
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
