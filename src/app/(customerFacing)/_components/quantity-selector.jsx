import { Minus, Plus } from "lucide-react"
import { Button } from "@/src/components/ui/button"


export function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={onDecrease} disabled={quantity <= 1} className="h-8 w-8">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button variant="outline" size="icon" onClick={onIncrease} className="h-8 w-8">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

