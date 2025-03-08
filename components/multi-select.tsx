"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [filteredOptions, setFilteredOptions] = React.useState<string[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const filtered = options.filter(
      (option) => !selected.includes(option) && option.toLowerCase().includes(inputValue.toLowerCase()),
    )
    setFilteredOptions(filtered)
  }, [options, selected, inputValue])

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleSelect = (option: string) => {
    onChange([...selected, option])
    setInputValue("")
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      <div
        className="border border-input bg-background px-3 py-2 text-sm rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((item) => (
            <Badge key={item} variant="secondary" className="rounded-sm bg-secondary text-primary">
              {item}
              <button
                className="ml-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleUnselect(item)
                }}
              >
                <X className="h-3 w-3 text-primary hover:text-primary/80" />
              </button>
            </Badge>
          ))}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : ""}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 min-w-[120px]"
          />
        </div>
      </div>
      {open && filteredOptions.length > 0 && (
        <div className="absolute w-full z-10 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="max-h-60 overflow-auto p-1">
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-primary hover:text-white"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

