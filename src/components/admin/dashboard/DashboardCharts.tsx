"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ['#fbbf24', '#60a5fa', '#34d399', '#f87171']; // PENDING, SHIPPING, COMPLETED, CANCELLED

export function RevenueChart({ data, filter }: { data: any[]; filter?: string }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a1a1aa', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a1a1aa', fontSize: 12 }}
            tickFormatter={(value: any) => `${(value / 1000).toLocaleString('vi-VN')}k`}
          />
          <Tooltip 
            formatter={(value: any) => [`${value.toLocaleString('vi-VN')} đ`, "Doanh thu"]}
            contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
            itemStyle={{ color: '#3b82f6' }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: '#1E1E1E' }}
            activeDot={{ r: 6, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OrderStatusChart({ data }: { data: any[] }) {
  return (
    <div className="h-[280px] w-full flex justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#a1a1aa', fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
