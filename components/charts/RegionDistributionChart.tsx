'use client'

import { memo } from 'react'
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
import type { RegionCount } from '@/data/dummyAnalytics'

interface RegionDistributionChartProps {
  data: RegionCount[]
  title?: string
}

const RISK_COLORS = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
}

function RegionDistributionChartComponent({ data, title = 'Regional Distribution' }: RegionDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--border-soft)' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="region"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--border-soft)' }}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value, name, props) => {
                  const item = props.payload as RegionCount
                  return [
                    <span key="value">
                      {value} reports
                      <span className={`ml-2 text-xs ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ({item.change >= 0 ? '+' : ''}{item.change}%)
                      </span>
                    </span>,
                    'Reports'
                  ]
                }}
              />
              <Bar dataKey="reports" radius={[0, 4, 4, 0]} barSize={24}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.riskLevel]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: RISK_COLORS.high }} />
            <span className="text-[var(--text-secondary)]">High Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: RISK_COLORS.medium }} />
            <span className="text-[var(--text-secondary)]">Medium Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: RISK_COLORS.low }} />
            <span className="text-[var(--text-secondary)]">Low Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const RegionDistributionChart = memo(RegionDistributionChartComponent)
