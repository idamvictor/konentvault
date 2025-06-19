import { forwardRef } from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export const DropdownDialogTrigger = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuItem>
>((props, ref) => {
  return <DropdownMenuItem ref={ref} {...props} />
})

DropdownDialogTrigger.displayName = "DropdownDialogTrigger"
