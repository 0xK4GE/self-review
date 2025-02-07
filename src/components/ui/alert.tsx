"use client"

import * as React from "react"

interface AlertProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Alert({ className = "", title, description, children }: AlertProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`} role="alert">
      {title && <h5 className="mb-1 font-medium">{title}</h5>}
      {description && <div className="text-sm text-gray-600">{description}</div>}
      {children}
    </div>
  )
}

export function AlertTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h5 className={`mb-1 font-medium ${className}`}>
      {children}
    </h5>
  )
}

export function AlertDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      {children}
    </div>
  )
}