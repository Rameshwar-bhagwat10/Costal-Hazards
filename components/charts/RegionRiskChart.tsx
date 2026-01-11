'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const regionData = [
  { region: 'Mumbai Coast', risk: 85, color: '#EF4444' },
  { region: 'Tamil Nadu', risk: 78, color: '#EF4444' },
  { region: 'Goa Coast', risk: 65, color: '#F59E0B' },
  { region: 'Kerala Coast', risk: 52, color: '#F59E0B' },
  { region: 'Gujarat Coast', risk: 38, color: '#10B981' },
]

export function RegionRiskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={regionData}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--border-soft)' }}
              />
              <YAxis
                type="category"
                dataKey="region"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--border-soft)' }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [`${value}%`, 'Risk Level']}
              />
              <Bar dataKey="risk" radius={[0, 4, 4, 0]} barSize={20}>
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#EF4444]" />
            <span className="text-text-secondary">High (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#F59E0B]" />
            <span className="text-text-secondary">Medium (40-70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#10B981]" />
            <span className="text-text-secondary">Low (&lt;40%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
