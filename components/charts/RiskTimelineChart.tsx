'use client'

import { memo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { RiskLevel } from '@/data/dummyAnalytics'

interface RiskTimelineChartProps {
  data: RiskLevel[]
  title?: string
}

const RISK_COLORS = {
  high: { stroke: '#EF4444', fill: '#EF4444' },
  medium: { stroke: '#F59E0B', fill: '#F59E0B' },
  low: { stroke: '#10B981', fill: '#10B981' },
}

function RiskTimelineChartComponent({ data, title = 'Risk Level Timeline' }: RiskTimelineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradient-high" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={RISK_COLORS.high.fill} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={RISK_COLORS.high.fill} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradient-medium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={RISK_COLORS.medium.fill} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={RISK_COLORS.medium.fill} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradient-low" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={RISK_COLORS.low.fill} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={RISK_COLORS.low.fill} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--border-soft)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'var(--border-soft)' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                iconType="circle"
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="high"
                name="High Risk"
                stroke={RISK_COLORS.high.stroke}
                fill="url(#gradient-high)"
                strokeWidth={2}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="medium"
                name="Medium Risk"
                stroke={RISK_COLORS.medium.stroke}
                fill="url(#gradient-medium)"
                strokeWidth={2}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="low"
                name="Low Risk"
                stroke={RISK_COLORS.low.stroke}
                fill="url(#gradient-low)"
                strokeWidth={2}
                stackId="1"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export const RiskTimelineChart = memo(RiskTimelineChartComponent)
