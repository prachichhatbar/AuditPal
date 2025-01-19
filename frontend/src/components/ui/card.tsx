"use client"

import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className="rounded-lg border bg-white shadow p-4"
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }