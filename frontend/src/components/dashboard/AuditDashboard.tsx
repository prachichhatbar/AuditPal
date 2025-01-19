"use client"

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import Toast from '@/app/Toast';
import {
  LineChart, Line, BarChart, Bar, 
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer
} from 'recharts';

interface DashboardData {
  total_transactions: number;
  high_risk_transactions: number;
  risk_percentage: number;
  amount_statistics: {
    total_amount: number;
    average_amount: number;
    max_amount: number;
  };
  department_statistics: Array<{
    department: string;
    transaction_count: number;
    total_amount: number;
    average_risk_score: number;
  }>;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const AuditDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [chartType, setChartType] = useState('bar');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success'
  });
  const [newTransaction, setNewTransaction] = useState({
    transaction_date: "",
    department: "",
    transaction_type: "",
    amount: ""
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/analytics/summary');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to fetch dashboard data', 'error');
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchDashboardData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5001/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      // Reset form regardless of response
      setNewTransaction({
        transaction_date: "",
        department: "",
        transaction_type: "",
        amount: ""
      });

      // Show success message and refresh data
      showToast('Transaction has been recorded successfully!', 'success');
      await fetchDashboardData();
      
    } catch (error) {
      console.error('Error submitting transaction:', error);
      showToast('Failed to submit transaction', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 text-gray-800">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Audit Analytics Dashboard</h1>
      
      <Card className="p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="datetime-local"
                value={newTransaction.transaction_date}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  transaction_date: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <select
                value={newTransaction.department}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  department: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="treasury">Treasury</option>
                <option value="trading">Trading</option>
                <option value="operations">Operations</option>
                <option value="compliance">Compliance</option>
                <option value="risk_management">Risk Management</option>
                <option value="investment_banking">Investment Banking</option>
                <option value="retail_banking">Retail Banking</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select
                value={newTransaction.transaction_type}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  transaction_type: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="international">International</option>
                <option value="domestic">Domestic</option>
                <option value="manual_adjustment">Manual Adjustment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  amount: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 shadow-sm
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Transaction'}
          </button>
        </form>
      </Card>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Transactions</h3>
          <p className="text-4xl font-bold text-blue-600">{data.total_transactions}</p>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Risk Level</h3>
          <p className={`text-4xl font-bold ${data.risk_percentage > 50 ? 'text-red-600' : 'text-green-600'}`}>
            {data.risk_percentage.toFixed(1)}%
          </p>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Amount</h3>
          <p className="text-4xl font-bold text-blue-600">
            ${data.amount_statistics.total_amount.toLocaleString()}
          </p>
        </Card>
      </div>

      <Card className="p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Department Risk Analysis</h3>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' && (
              <BarChart data={data.department_statistics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" tick={{ fill: '#374151' }} />
                <YAxis tick={{ fill: '#374151' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="average_risk_score" fill="#6366f1" name="Risk Score" />
                <Bar dataKey="transaction_count" fill="#34d399" name="Transactions" />
              </BarChart>
            )}
            {chartType === 'line' && (
              <LineChart data={data.department_statistics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" tick={{ fill: '#374151' }} />
                <YAxis tick={{ fill: '#374151' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="average_risk_score" stroke="#6366f1" name="Risk Score" />
                <Line type="monotone" dataKey="transaction_count" stroke="#34d399" name="Transactions" />
              </LineChart>
            )}
            {chartType === 'area' && (
              <AreaChart data={data.department_statistics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="department" tick={{ fill: '#374151' }} />
                <YAxis tick={{ fill: '#374151' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="average_risk_score" fill="#6366f1" stroke="#4f46e5" name="Risk Score" />
                <Area type="monotone" dataKey="transaction_count" fill="#34d399" stroke="#059669" name="Transactions" />
              </AreaChart>
            )}
            {chartType === 'pie' && (
              <PieChart>
                <Pie
                  data={data.department_statistics}
                  dataKey="transaction_count"
                  nameKey="department"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#6366f1"
                  label
                >
                  {data.department_statistics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#34d399', '#f59e0b'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AuditDashboard;