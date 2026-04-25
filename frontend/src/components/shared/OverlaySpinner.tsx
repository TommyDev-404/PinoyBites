import { Loader2 } from "lucide-react"
import {
      Dialog,
      DialogContent,
} from "@/components/ui/dialog"

type OverlaySpinnerProps = {
      open: boolean
      message: string
}

export default function OverlaySpinner({ open, message }: OverlaySpinnerProps) {
      return (
            <Dialog open={open} onOpenChange={() => {}}>
                  <DialogContent showCloseButton={false} className="flex flex-col items-center justify-center gap-4 p-8 text-center w-45">
                        
                        <Loader2 className="animate-spin w-10 h-10 text-amber-600" />

                        <p className="text-sm font-medium text-muted-foreground">
                              {message}
                        </p>

                  </DialogContent>
            </Dialog>
      )
}