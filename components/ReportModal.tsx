import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flag, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReportModal({ children, title = "Report this item" }: { children: React.ReactNode, title?: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!reason) return;
    
    // Mock submit
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep the community safe. Our admins will review this shortly.",
    });
    
    setOpen(false);
    setTimeout(() => {
      setReason("");
      setDetails("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-destructive h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Why are you reporting this?</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 text-sm border rounded-md outline-none focus:border-primary"
            >
              <option value="" disabled>Select a reason...</option>
              <option value="obscene">Obscene or Inappropriate Content</option>
              <option value="impersonation">Impersonation</option>
              <option value="hate">Hate Speech</option>
              <option value="spam">Spam / Scam</option>
              <option value="copyright">Copyright Violation</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional details (optional)</label>
            <textarea
              placeholder="Provide more context for our admins..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-2 text-sm border rounded-md outline-none focus:border-primary min-h-[100px]"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!reason}
            className="w-full py-2 bg-destructive text-destructive-foreground font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Submit Report
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
