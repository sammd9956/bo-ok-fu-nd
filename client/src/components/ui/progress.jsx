import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}) {
  
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-6 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}>
      {/* <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }} /> */}

      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="flex h-full items-center justify-center bg-primary text-xs font-medium text-white px-2 transition-all"
        style={{ width: `${value}%` }}
      >
        {value}%
      </ProgressPrimitive.Indicator>

    </ProgressPrimitive.Root>
  );
}

export { Progress }