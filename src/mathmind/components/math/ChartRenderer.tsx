import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface ChartFunction {
  name: string;
  color?: string;
  points: [number, number][];
}

interface ChartData {
  type?: string;
  title?: string;
  functions: ChartFunction[];
  xLabel?: string;
  yLabel?: string;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function ChartRenderer({ raw }: { raw: string }) {
  let data: ChartData;

  try {
    data = JSON.parse(raw.trim());
  } catch {
    return (
      <div className="my-3 p-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30">
        <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
          ⚠ No se pudo renderizar la gráfica (JSON inválido)
        </p>
        <pre className="text-xs text-red-600 dark:text-red-500 font-mono overflow-x-auto whitespace-pre-wrap">
          {raw}
        </pre>
      </div>
    );
  }

  if (!data.functions?.length) return null;

  const xSet = new Set<number>();
  data.functions.forEach(fn => fn.points.forEach(([x]) => xSet.add(x)));
  const xValues = [...xSet].sort((a, b) => a - b);

  const rows = xValues.map(x => {
    const row: Record<string, number> = { x };
    data.functions.forEach(fn => {
      const pt = fn.points.find(([px]) => px === x);
      if (pt !== undefined) row[fn.name] = pt[1];
    });
    return row;
  });

  return (
    <div className="my-3 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-white dark:bg-gray-900">
      {data.title && (
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
          {data.title}
        </p>
      )}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={rows} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="x"
            type="number"
            domain={['auto', 'auto']}
            label={data.xLabel ? { value: data.xLabel, position: 'insideBottom', offset: -2 } : undefined}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={['auto', 'auto']}
            label={data.yLabel ? { value: data.yLabel, angle: -90, position: 'insideLeft' } : undefined}
            tick={{ fontSize: 12 }}
            width={40}
          />
          <Tooltip
            formatter={(value: number, name: string) => [value.toFixed(3), name]}
            labelFormatter={(x: number) => `x = ${x}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {data.functions.map((fn, i) => (
            <Line
              key={fn.name}
              type="monotone"
              dataKey={fn.name}
              stroke={fn.color ?? COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
