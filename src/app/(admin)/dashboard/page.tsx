"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  IoWalletOutline,
  IoCartOutline,
  IoPeopleOutline,
  IoStatsChartOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { BASE_URL } from "@/helper/BASE_URL";

const COLORS = ["#8B3D52", "#C48C5D", "#D9C582", "#632A3B"];

const DashboardOverview: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // আপনার API URL অনুযায়ী কল
        const response = await axios.get(`${BASE_URL}/order/admin-stats`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // আইকন ম্যাপার (API থেকে আসা স্ট্রিং অনুযায়ী আইকন দেখানো)
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "wallet":
        return <IoWalletOutline />;
      case "cart":
        return <IoCartOutline />;
      case "people":
        return <IoPeopleOutline />;
      case "stats":
        return <IoStatsChartOutline />;
      default:
        return <IoStatsChartOutline />;
    }
  };

  if (!isMounted || loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B3D52]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.stats.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <span className="text-xl text-gray-400">
                {getIcon(item.icon)}
              </span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-1">Sales Overview</h4>
          <p className="text-[10px] text-gray-400 mb-6 uppercase">
            Monthly Revenue
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.charts?.salesOverview}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{ fill: "#f9f9f9" }} />
                <Bar
                  dataKey="value"
                  fill="#8B3D52"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-1">Revenue Trend</h4>
          <p className="text-[10px] text-gray-400 mb-6 uppercase">
            Growth Tracker
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.charts?.salesOverview}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B3D52"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8B3D52" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Bottom Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-6">Recent Orders</h4>
          <div className="space-y-6">
            {data?.recentOrders.map((order: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-full text-gray-400 text-xl">
                    {order.status === "Pending" ? (
                      <IoTimeOutline />
                    ) : (
                      <IoCheckmarkCircleOutline className="text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.user?.firstName} {order.user?.lastName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">
                    ${order.totalAmount}
                  </p>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${order.status === "Pending" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-6">
            Top Performing Products
          </h4>
          <div className="space-y-6">
            {data?.topProducts.map((item: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {item.img ? (
                    <img
                      src={item.img}
                      className="w-12 h-12 rounded-lg object-cover"
                      alt={item.name}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                      No Img
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.sales} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">
                    ${item.revenue}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Revenue
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
