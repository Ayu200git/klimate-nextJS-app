"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface HourlyChartProps {
  hourly: any[];
}

export default function HourlyChart({ hourly }: HourlyChartProps) {
  const data = hourly.slice(0, 24).map((h) => ({
    time: new Date(h.dt * 1000).getHours() + ":00",
    temp: Math.round(h.temp)
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
