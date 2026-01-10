import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-colors duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variants = {
      primary: `
        bg-[#2563EB] text-white
        hover:bg-[#1D4ED8] active:bg-[#1E40AF]
        focus-visible:ring-[#2563EB]
      `,
      secondary: `
        bg-[var(--bg-muted)] text-[var(--text-primary)] border border-[var(--border-soft)]
        hover:bg-gray-200 active:bg-gray-300
        focus-visible:ring-gray-400
      `,
      danger: `
        bg-[#DC2626] text-white
        hover:bg-[#B91C1C] active:bg-[#991B1B]
        focus-visible:ring-[#DC2626]
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
