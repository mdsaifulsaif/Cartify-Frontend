"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  IoSearchOutline, 
  IoReloadOutline, 
  IoPeopleOutline, 
  IoCheckmarkCircleOutline, 
  IoBanOutline, 
  IoCalendarOutline,
  IoEllipsisVertical
} from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BASE_URL } from "@/helper/BASE_URL";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/customers?page=${currentPage}&searchTerm=${searchTerm}&status=${statusFilter}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setCustomers(response.data.data.customers);
        setStats(response.data.data.stats);
        setPagination(response.data.meta);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/customers/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(`User is now ${newStatus}`);
        fetchCustomers();
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 font-sans pb-10 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 italic uppercase tracking-tighter">
            Customers
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manage and monitor your customer base</p>
        </div>
        <button onClick={() => fetchCustomers()} className="p-2 hover:rotate-180 transition-all duration-500 text-gray-400">
          <IoReloadOutline size={20} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Customers" value={stats?.totalCustomers} icon={<IoPeopleOutline />} color="text-blue-500" loading={loading} />
        <StatCard label="Active" value={stats?.active} icon={<IoCheckmarkCircleOutline />} color="text-green-500" loading={loading} />
        <StatCard label="Blocked" value={stats?.blocked} icon={<IoBanOutline />} color="text-red-500" loading={loading} />
        <StatCard label="New This Month" value={stats?.newThisMonth} icon={<IoCalendarOutline />} color="text-purple-500" loading={loading} />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:max-w-md">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:bg-white focus:ring-1 focus:ring-black/5 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border-none rounded-lg py-2.5 px-4 text-xs font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-black/5"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Location</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5">Joined Date</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-6 py-4"><Skeleton height={20} /></td></tr>
                ))
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-gray-400 italic">No customers found</td></tr>
              ) : (
                customers.map((customer: any) => (
                  <tr key={customer._id} className="hover:bg-gray-50/40 transition-colors whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={customer.avatar?.url} alt="" className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">{customer.firstName} {customer.lastName}</span>
                          <span className="text-[10px] text-gray-400">{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                      {customer.phoneNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                      {customer.shippingAddress?.country || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                        customer.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-semibold">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleStatusChange(customer._id, customer.status === 'active' ? 'blocked' : 'active')}
                        className={`text-[9px] px-4 py-2 rounded-full font-bold uppercase tracking-widest transition-all ${
                          customer.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-black text-white hover:bg-zinc-800'
                        }`}
                      >
                        {customer.status === 'active' ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-black">{customers.length}</span> of <span className="text-black">{pagination?.total || 0}</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 border border-gray-100 rounded-xl disabled:opacity-20 hover:bg-gray-50 transition-all"
            >
              <FiChevronLeft />
            </button>
            <span className="text-[10px] font-black italic">PAGE {currentPage}</span>
            <button
              disabled={currentPage >= (pagination?.totalPage || 1)}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 border border-gray-100 rounded-xl disabled:opacity-20 hover:bg-gray-50 transition-all"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, loading }: any) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>{icon}</div>
      <span className="text-2xl font-black tracking-tighter">
        {loading ? <Skeleton width={30} /> : value || 0}
      </span>
    </div>
    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
  </div>
);

export default CustomerPage;