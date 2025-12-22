"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { formatCurrency } from "@/lib/utils"

interface PriceRangeSliderProps {
  min: number
  max: number
  value: { min: number; max: number }
  onChange: (value: { min: number; max: number }) => void
  step?: number
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 100
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue.max - step)
    const newValue = { min: newMin, max: localValue.max }
    setLocalValue(newValue)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue.min + step)
    const newValue = { min: localValue.min, max: newMax }
    setLocalValue(newValue)
  }

  const handleMouseUp = () => {
    onChange(localValue)
  }

  const minPercentage = ((localValue.min - min) / (max - min)) * 100
  const maxPercentage = ((localValue.max - min) / (max - min)) * 100

  return (
    <div className="space-y-4">
      {/* Dual Range Slider */}
      <div className="relative h-2">
        {/* Track Background */}
        <div className="absolute h-2 w-full rounded-full bg-gray-200" />

        {/* Active Track */}
        <div
          className="absolute h-2 rounded-full bg-gold"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue.min}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="pointer-events-none absolute h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue.max}
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="pointer-events-none absolute h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow"
        />
      </div>

      {/* Value Display */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Mínimo</span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(localValue.min)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-500">Máximo</span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(localValue.max)}
          </span>
        </div>
      </div>
    </div>
  )
}
