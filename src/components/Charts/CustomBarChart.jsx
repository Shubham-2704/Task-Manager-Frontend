import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Task Priority",
    color: "#00BC7D",
  },
};

const CustomBarChart = ({ data }) => {
  // Function to alternate colors
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#00BC7D";
      case "Medium":
        return "#FE9900";
      case "High":
        return "#FF1F57";
      default:
        return "#00BC7D";
    }
  };

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data}>
        <CartesianGrid stroke="none" />

        <XAxis
          dataKey="priority"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        <Bar
          dataKey="count"
          // name="Task Count"
          // fill="var(--color-count)"
          radius={[10, 10, 0, 0]}
          //   activeDot={{ r: 8, fill: "yellow" }}
          //   activeStyle={{ fill: "green" }}
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default CustomBarChart;
