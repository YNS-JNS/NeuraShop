import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartProps<T> {
  data: T[];
  dataKey: keyof T;
  xAxisKey: keyof T;
  title?: string;
  color?: string;
}

const CustomAreaChart: React.FC<AreaChartProps> = ({ 
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
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            fill={color}
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;