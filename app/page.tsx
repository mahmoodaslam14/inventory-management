import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Purchases
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,765</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Value
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,678</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Customer Loans
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,210</div>
              <p className="text-xs text-muted-foreground">
                -8% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Monthly Sales Overview</CardTitle>
              <CardDescription>
                Sales performance for the current year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Sales chart will appear here
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest transactions and inventory changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">New Sale</p>
                    <p className="text-sm text-muted-foreground">
                      $1,250 - Customer: Rahul Sharma
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">2m ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Inventory Update
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Added 25 units of Rice Basmati
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">1h ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Price Update
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Updated prices for 5 products
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">3h ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/sales/new">
                <Button className="w-full">New Sale</Button>
              </Link>
              <Link href="/purchases/new">
                <Button variant="outline" className="w-full">
                  New Purchase
                </Button>
              </Link>
              <Link href="/products/new">
                <Button variant="outline" className="w-full">
                  Add Product
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Rice Basmati</span>
                  <span className="text-sm font-medium text-red-500">
                    5 units left
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Toor Dal</span>
                  <span className="text-sm font-medium text-red-500">
                    3 units left
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cooking Oil</span>
                  <span className="text-sm font-medium text-red-500">
                    2 units left
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Rahul Sharma</span>
                  <span className="text-sm font-medium text-amber-500">
                    $1,200
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Priya Patel</span>
                  <span className="text-sm font-medium text-amber-500">
                    $850
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Amit Kumar</span>
                  <span className="text-sm font-medium text-amber-500">
                    $450
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
