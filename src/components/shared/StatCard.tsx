import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  count: number
  icon: LucideIcon
  color: string
  textColor?: string
  index?: number
  className?: string
}

export const StatCard = ({
  title,
  count,
  icon: Icon,
  color,
  textColor = 'text-white',
  index = 0,
  className = '',
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
    >
      <Card className={`text-center hover-lift shadow-card border-0 bg-white dark:bg-gray-800 cursor-pointer ${className}`}>
        <CardContent className="p-4">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
            <Icon className={`w-6 h-6 ${textColor}`} />
          </div>
          <h3 className="font-semibold text-foreground mb-1 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-primary">{count}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
