import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "User refused identity", value: 28 },
  { name: "Incorrect caller identity", value: 22 },
  { name: "Unsupported language", value: 18 },
  { name: "Assistant language mismatch", value: 17 },
  { name: "Customer hostility", value: 15 },
];

const COLORS = [
  "#7C6CFF",
  "#38E8C6",
  "#4DA3FF",
  "#F5A524",
  "#E5533D",
];

export default function SadPathChart() {
  return (
    <section className="px-4 sm:px-8 lg:px-20 py-8 sm:py-12 lg:py-16">
      <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-primary/10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Sad Path Analysis
        </h2>

        <div className="w-full h-[350px] sm:h-[400px] lg:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius="40%"
                outerRadius="65%"
                paddingAngle={3}
                label={({ value }) => `${value}%`}
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: '#151A2C',
                  border: '1px solid #7C6CFF',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '8px 12px'
                }}
                itemStyle={{ color: '#38E8C6' }}
              />
              
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: '12px',
                  paddingTop: '20px'
                }}
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs sm:text-sm opacity-60 text-center mt-4 px-4">
          Breakdown of common failure paths observed in production voice calls.
        </p>
      </div>
    </section>
  );
}