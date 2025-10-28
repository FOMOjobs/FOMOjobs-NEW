import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface GradientHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  backButtonText?: string
  backButtonLink?: string
  children?: ReactNode
  className?: string
}

export const GradientHeader = ({
  title,
  subtitle,
  showBackButton = false,
  backButtonText = 'Powrót do strony głównej',
  backButtonLink = '/',
  children,
  className = '',
}: GradientHeaderProps) => {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 via-orange-500 to-yellow-400 py-20 ${className}`}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {showBackButton && (
            <Link
              to={backButtonLink}
              className="inline-flex items-center gap-2 text-white hover:underline mb-6 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              {backButtonText}
            </Link>
          )}

          <h1 className="text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {children}
        </motion.div>
      </div>
    </div>
  )
}
