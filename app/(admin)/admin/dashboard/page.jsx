import React from "react";
import Link from "next/link";
import {
  LuTrendingUp,
  LuShoppingBag,
  LuUsers,
  LuDollarSign,
  LuPlus,
  LuArrowUpRight,
  LuPackageCheck,
  LuLayers,
} from "react-icons/lu";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Sales Revenue",
      value: "$48,290.00",
      change: "+14.2%",
      isPositive: true,
      icon: LuDollarSign,
      color: "from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.5%",
      isPositive: true,
      icon: LuShoppingBag,
      color: "from-[#F04438]/20 to-red-500/10 text-[#F04438] dark:text-[#FF6B60]",
    },
    {
      title: "Active Products",
      value: "432",
      change: "+4.1%",
      isPositive: true,
      icon: LuPackageCheck,
      color: "from-blue-500/20 to-indigo-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Customers",
      value: "3,890",
      change: "+12.0%",
      isPositive: true,
      icon: LuUsers,
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    },
  ];

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create product listings with variants & pricing",
      href: "#",
      icon: LuPlus,
    },
    {
      title: "View All Orders",
      description: "Review, process & fulfill customer orders",
      href: "#",
      icon: LuShoppingBag,
    },
    {
      title: "Manage Categories",
      description: "Organize catalog taxonomy and shoe series",
      href: "#",
      icon: LuLayers,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4f0343] via-[#7d0c54] to-[#3b0632] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#F04438] animate-ping" />
            StepUp Management Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back to Admin Dashboard
          </h1>
          <p className="text-sm text-white/80 leading-relaxed">
            Monitor real-time store analytics, order fulfillment, product catalog, and customer metrics at a glance.
          </p>
        </div>

        {/* Decorative background glow elements */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#F04438]/20 blur-3xl" />
        <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-border"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.title}
              </span>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <LuTrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              href={action.href}
              className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-5 sm:p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-[#F04438]/50 hover:shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F04438]/10 text-[#F04438] transition-colors group-hover:bg-[#F04438] group-hover:text-white">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <LuArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F04438]" />
                </div>
                <h4 className="font-semibold text-base text-foreground group-hover:text-[#F04438] transition-colors pt-2">
                  {action.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;