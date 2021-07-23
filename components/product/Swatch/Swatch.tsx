import Button, { ButtonProps } from '@components/ui/Button'

import { Check } from '@components/icons'
import React from 'react'

interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = React.memo(
  ({
    active,
    className,
    color = '',
    label = null,
    variant = 'size',
    ...props
  }) => {
    variant = variant?.toLowerCase()

    if (label) {
      label = label?.toLowerCase()
    }

 

    return (
      <Button
        aria-label="Variant Swatch"
        {...(label && color && { title: label })}
        style={color ? { backgroundColor: color } : {}}
        {...props}
      >
        {color && active && (
          <span>
            <Check />
          </span>
        )}
        {!color ? label : null}
      </Button>
    )
  }
)

export default Swatch
