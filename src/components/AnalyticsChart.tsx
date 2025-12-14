import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import EditModal from "./EditModal";

const dummyData = [
  { label: "Mon", calls: 120 },
  { label: "Tue", calls: 160 },
  { label: "Wed", calls: 140 },
  { label: "Thu", calls: 180 },
  { label: "Fri", calls: 150 },
];

export default function AnalyticsChart() {
  const [data, setData] = useState(dummyData);
  const [open, setOpen] = useState(false);

  return (
    <section className="px-4 sm:px-8 lg:px-20 py-8 sm:py-12 lg:py-16">
      <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
            Daily Call Volume
          </h2>
          <button
            onClick={() => setOpen(true)}
            className="bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-lg transition-colors duration-200 font-medium"
          >
            Edit Values
          </button>
        </div>

        <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="label" 
                stroke="#7C6CFF" 
                tick={{ fill: '#a0a0a0', fontSize: 12 }}
              />
              <YAxis 
                stroke="#7C6CFF" 
                tick={{ fill: '#a0a0a0', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#151A2C', 
                  border: '1px solid #7C6CFF',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelStyle={{ color: '#38E8C6' }}
              />
              <Line 
                dataKey="calls" 
                stroke="#7C6CFF" 
                strokeWidth={3} 
                dot={{ fill: '#38E8C6', r: 5 }}
                activeDot={{ r: 7, fill: '#38E8C6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {open && (
        <EditModal
          close={() => setOpen(false)}
          setData={setData}
        />
      )}
    </section>
  );
}