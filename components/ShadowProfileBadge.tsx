import React from "react";
import { Badge } from "@/components/ui/badge";

interface ShadowProfileBadgeProps {
  unclaimedAmount: number;
}

export default function ShadowProfileBadge({ unclaimedAmount }: ShadowProfileBadgeProps) {
  // Determine tier string
  let tier = "";
  if (unclaimedAmount >= 10000) tier = "$10,000+";
  else if (unclaimedAmount >= 5000) tier = "$5,000+";
  else if (unclaimedAmount >= 1000) tier = "$1,000+";
  else if (unclaimedAmount >= 500) tier = "$500+";
  else if (unclaimedAmount >= 100) tier = "$100+";
  else if (unclaimedAmount >= 10) tier = "$10+";
  else return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      {/* Butterfly Icon (SVG) */}
      <div className="text-pink-500" title="Unclaimed Artist Profile">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M12 10c-3-2-6-5-9-3 3 7 7 5 9 5" />
          <path d="M12 10c3-2 6-5 9-3-3 7-7 5-9 5" />
          <path d="M12 12c-3 2-6 5-9 3 3-7 7-5 9-5" />
          <path d="M12 12c3 2 6 5 9 3-3-7-7-5-9-5" />
        </svg>
      </div>
      <Badge variant="outline" className="bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200 text-pink-700 text-xs font-mono">
        {tier} unclaimed
      </Badge>
    </div>
  );
}
