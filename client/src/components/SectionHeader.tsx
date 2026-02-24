/**
 * SectionHeader Component
 * Design: Modern EdTech - Dark theme with gradient accents
 * Purpose: Display section titles with visual hierarchy
 */
interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: "blue" | "green" | "orange" | "purple";
  level?: 1 | 2 | 3;
}

const badgeColors = {
  blue: { bg: "oklch(0.65 0.2 260 / 0.15)", text: "oklch(0.75 0.2 260)" },
  green: { bg: "oklch(0.65 0.18 165 / 0.15)", text: "oklch(0.65 0.18 165)" },
  orange: { bg: "oklch(0.75 0.18 60 / 0.15)", text: "oklch(0.75 0.18 60)" },
  purple: { bg: "oklch(0.7 0.18 300 / 0.15)", text: "oklch(0.7 0.18 300)" },
};

export default function SectionHeader({
  id,
  title,
  subtitle,
  badge,
  badgeColor = "blue",
  level = 2,
}: SectionHeaderProps) {
  const colors = badgeColors[badgeColor];

  if (level === 1) {
    return (
      <div id={id} className="mb-8 scroll-mt-8">
        <div className="flex items-center gap-3 mb-3">
          {badge && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: colors.bg,
                color: colors.text,
                fontFamily: "var(--font-mono)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <h1
          className="text-3xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, oklch(0.92 0.01 265), oklch(0.75 0.2 260))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base" style={{ color: "oklch(0.6 0.015 265)" }}>
            {subtitle}
          </p>
        )}
        <div
          className="mt-4 h-px"
          style={{
            background: "linear-gradient(to right, oklch(0.65 0.2 260 / 0.5), transparent)",
          }}
        />
      </div>
    );
  }

  if (level === 2) {
    return (
      <div id={id} className="mb-5 scroll-mt-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-1 h-6 rounded-full flex-shrink-0"
            style={{
              background: "linear-gradient(to bottom, oklch(0.65 0.2 260), oklch(0.65 0.18 165))",
            }}
          />
          <h2
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              color: "oklch(0.92 0.01 265)",
            }}
          >
            {title}
          </h2>
          {badge && (
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{
                background: colors.bg,
                color: colors.text,
                fontFamily: "var(--font-mono)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm ml-4" style={{ color: "oklch(0.6 0.015 265)" }}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div id={id} className="mb-4 scroll-mt-8">
      <h3
        className="text-base font-semibold flex items-center gap-2"
        style={{
          fontFamily: "var(--font-display)",
          color: "oklch(0.85 0.01 265)",
        }}
      >
        <span style={{ color: "oklch(0.65 0.18 165)" }}>▸</span>
        {title}
        {badge && (
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{
              background: colors.bg,
              color: colors.text,
              fontFamily: "var(--font-mono)",
            }}
          >
            {badge}
          </span>
        )}
      </h3>
      {subtitle && (
        <p className="text-xs mt-1 ml-4" style={{ color: "oklch(0.55 0.01 265)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
