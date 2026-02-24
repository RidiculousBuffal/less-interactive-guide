/**
 * Sidebar Navigation Component
 * Design: Modern EdTech - Dark theme with glassmorphism
 * Purpose: Fixed left sidebar for navigating between sections
 */
import { useState, useEffect } from "react";
import { ChevronRight, BookOpen, Layers, Zap } from "lucide-react";

export interface NavSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  items: NavItem[];
}

export interface NavItem {
  id: string;
  title: string;
  badge?: string;
}

interface SidebarProps {
  sections: NavSection[];
  activeId: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ sections, activeId, onNavigate }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.id))
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen overflow-y-auto z-40 flex flex-col"
      style={{
        width: "260px",
        background: "oklch(0.11 0.02 265)",
        borderRight: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      {/* Logo / Header */}
      <div
        className="px-5 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.2 260), oklch(0.65 0.18 165))",
              fontFamily: "var(--font-mono)",
              color: "white",
            }}
          >
            L
          </div>
          <div>
            <div
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 265)" }}
            >
              Less 交互式指南
            </div>
            <div className="text-xs" style={{ color: "oklch(0.5 0.01 265)" }}>
              .module.less
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            {/* Section header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
              style={{
                color: "oklch(0.5 0.01 265)",
                letterSpacing: "0.08em",
              }}
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span>{section.title}</span>
              </div>
              <ChevronRight
                size={12}
                className="transition-transform duration-200"
                style={{
                  transform: expandedSections.has(section.id)
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              />
            </button>

            {/* Section items */}
            {expandedSections.has(section.id) && (
              <div className="mt-1 space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-150"
                      style={{
                        background: isActive
                          ? "oklch(0.65 0.2 260 / 0.15)"
                          : "transparent",
                        color: isActive
                          ? "oklch(0.75 0.2 260)"
                          : "oklch(0.65 0.01 265)",
                        borderLeft: isActive
                          ? "2px solid oklch(0.65 0.2 260)"
                          : "2px solid transparent",
                      }}
                    >
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded flex-shrink-0 ml-1"
                          style={{
                            background: "oklch(0.65 0.18 165 / 0.15)",
                            color: "oklch(0.65 0.18 165)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
      >
        <div className="text-xs" style={{ color: "oklch(0.4 0.01 265)" }}>
          基于 Less.js 官方文档整理
        </div>
      </div>
    </aside>
  );
}
