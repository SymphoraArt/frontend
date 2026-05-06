import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle, CheckCircle, AlertCircle } from "lucide-react";

export default function HuntPromptPopover({ children }: { children: React.ReactNode }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = () => {
    if (url.trim().toLowerCase() === "test") {
      setStatus("error");
    } else if (url.trim() !== "") {
      setStatus("success");
    }
  };

  return (
    <Popover onOpenChange={(open) => { if (!open) { setUrl(""); setStatus("idle"); } }}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end" sideOffset={8}>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-sm">Hunt a prompt</h4>
          <div className="relative group">
            <HelpCircle size={14} className="text-muted-foreground cursor-help" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-popover border text-popover-foreground text-xs rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              Drop the link to an X or Instagram post that contains a prompt.
              If approved, you earn 50% of the artist's revenue every time someone generates with it, until the original artist connects their socials and claims the account. Then the payout transfers to them and you'll receive artist fan points for potential goodies.
            </div>
          </div>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle className="text-green-500 mb-2" size={32} />
            <p className="text-sm font-medium">Submitted for review.</p>
            <p className="text-xs text-muted-foreground mt-1">You'll earn 50% of generations once accepted.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground">
              Enter the URL of an X or Instagram post to claim 50% affiliate earnings.
            </p>
            <div>
              <input
                type="text"
                placeholder="https://x.com/..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setStatus("idle");
                }}
                className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-primary transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
              {status === "error" && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                  <AlertCircle size={12} />
                  <span>This link has already been added. Please enter a different link.</span>
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
              disabled={!url.trim()}
            >
              Submit URL
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
