import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps<T> {
  data: T[];
  dataKey: keyof T;
  xAxisKey: keyof T;
  title?: string;
  color?: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({ 
  data, 
  dataKey, 
  xAxisKey, 
  title, 
  color = '#8884d8' 
}) => {
  return (
    <div className="w-full h-80">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;