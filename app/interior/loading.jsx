import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-amber-500 animate-spin" />
    </div>
  )
}
