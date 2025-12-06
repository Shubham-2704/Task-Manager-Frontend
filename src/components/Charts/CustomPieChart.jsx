import { PieChart, Pie, Cell } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  Pending: { label: "Pending", color: "#8D51FF" },
  "In Progress": { label: "In Progress", color: "#00B8DB" },
  Completed: { label: "Completed", color: "#7BCE00" },
};

function CustomPieChart({ data }) {
  return (
    <ChartContainer
      key={JSON.stringify(data)}
      config={chartConfig}
      className="h-[325px] w-full"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />

        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={130}
          labelLine={false}
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={chartConfig[entry.status].color} />
          ))}
        </Pie>

        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
}

export default CustomPieChart;
