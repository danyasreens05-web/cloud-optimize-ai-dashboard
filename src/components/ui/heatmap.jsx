import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

const Heatmap = ({ data, className = '' }) => {
  // Transform data for heatmap visualization
  const processedData = data.map((item, index) => ({
    ...item,
    x: item.hour,
    y: item.provider,
    z: item.latency, // Use latency as intensity
    requests: item.requests
  }));

  const getIntensityColor = (value) => {
    // Color scale from green (low latency) to red (high latency)
    if (value < 30) return '#10b981'; // green
    if (value < 50) return '#84cc16'; // light green
    if (value < 70) return '#eab308'; // yellow
    if (value < 90) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{data.provider}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Hour: {data.hour}:00</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Latency: {data.z}ms</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Requests: {data.requests}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          data={processedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
        >
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 23]}
            tickCount={24}
            tickFormatter={(value) => `${value}:00`}
            stroke="#6b7280"
          />
          <YAxis
            type="category"
            dataKey="y"
            stroke="#6b7280"
            width={120}
          />
          <ZAxis type="number" dataKey="z" range={[50, 400]} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter dataKey="z">
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getIntensityColor(entry.z)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center mt-4 space-x-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Latency:</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-xs text-gray-500">{'<'}30ms</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-xs text-gray-500">30-70ms</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-xs text-gray-500">70ms+</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
