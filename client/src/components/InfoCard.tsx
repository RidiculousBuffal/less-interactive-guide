/**
 * InfoCard Component
 * Design: Modern EdTech - Glassmorphism cards
 * Purpose: Display key information, tips, and notes
 */
import { Info, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

type CardType = "info" | "warning" | "tip" | "success";

interface InfoCardProps {
  type?: CardType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const cardConfig = {
  info: {
    icon: Info,
    borderColor: "oklch(0.65 0.2 260)",
    bgColor: "oklch(0.65 0.2 260 / 0.08)",
    iconColor: "oklch(0.65 0.2 260)",
    titleColor: "oklch(0.75 0.2 260)",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "oklch(0.75 0.18 60)",
    bgColor: "oklch(0.75 0.18 60 / 0.08)",
    iconColor: "oklch(0.75 0.18 60)",
    titleColor: "oklch(0.8 0.18 60)",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "oklch(0.7 0.18 300)",
    bgColor: "oklch(0.7 0.18 300 / 0.08)",
    iconColor: "oklch(0.7 0.18 300)",
    titleColor: "oklch(0.75 0.18 300)",
  },
  success: {
    icon: CheckCircle,
    borderColor: "oklch(0.65 0.18 165)",
    bgColor: "oklch(0.65 0.18 165 / 0.08)",
    iconColor: "oklch(0.65 0.18 165)",
    titleColor: "oklch(0.7 0.18 165)",
  },
};

export default function InfoCard({
  type = "info",
  title,
  children,
  className = "",
}: InfoCardProps) {
  const config = cardConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg p-4 ${className}`}
      style={{
        background: config.bgColor,
        borderLeft: `3px solid ${config.borderColor}`,
      }}
    >
      <div className="flex gap-3">
        <Icon
          size={16}
          className="flex-shrink-0 mt-0.5"
          style={{ color: config.iconColor }}
        />
        <div className="flex-1 min-w-0">
          {title && (
            <div
              className="text-sm font-semibold mb-1"
              style={{
                color: config.titleColor,
                fontFamily: "var(--font-display)",
              }}
            >
              {title}
            </div>
          )}
          <div className="text-sm" style={{ color: "oklch(0.7 0.01 265)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
