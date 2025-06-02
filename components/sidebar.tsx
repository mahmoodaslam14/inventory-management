"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import {
  BarChart3,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Products", href: "/products", icon: Package },
  { title: "Sales", href: "/sales", icon: ShoppingCart },
  { title: "Purchases", href: "/purchases", icon: ShoppingCart },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Receipts", href: "/receipts", icon: FileText },
  // { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-[64px] left-0 w-60 h-[calc(100vh-64px)] border-r border-sidebar-border bg-sidebar text-sidebar-foreground z-40">
      <nav className="h-full py-6 px-4 flex flex-col gap-1">
        {sidebarItems.map(({ href, title, icon: Icon }, index) => {
          const isActive = pathname === href;

          return (
            <Link
              key={index}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
