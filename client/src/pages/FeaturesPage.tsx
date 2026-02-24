/**
 * FeaturesPage Component
 * Design: Modern EdTech - Dark theme with split panel demos
 * Purpose: Interactive guide for Less syntax features
 */
import { featureCategories } from "@/data/features";
import SectionHeader from "@/components/SectionHeader";
import InfoCard from "@/components/InfoCard";
import DemoPanel from "@/components/DemoPanel";

// Preview components for each feature demo
function VariablesPreview() {
  return (
    <div className="space-y-2">
      <button
        style={{
          background: "#3b82f6",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          fontSize: "13px",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        @primary-color 按钮
      </button>
      <button
        style={{
          background: "#ef4444",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          fontSize: "13px",
          cursor: "pointer",
          fontWeight: 500,
          marginLeft: "8px",
        }}
      >
        @danger-color 按钮
      </button>
    </div>
  );
}

function InterpolationPreview() {
  return (
    <div className="space-y-2 w-full">
      <div
        style={{
          background: "#1e293b",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
          color: "#94a3b8",
        }}
      >
        <div style={{ color: "#60a5fa" }}>.card</div>
        <div style={{ color: "#10b981" }}>.card-dark</div>
        <div style={{ color: "#f59e0b" }}>color: #60a5fa</div>
        <div style={{ color: "#f59e0b" }}>border-top: 2px solid #334155</div>
      </div>
    </div>
  );
}

function NestingPreview() {
  return (
    <nav
      style={{
        display: "flex",
        background: "#1e293b",
        padding: "0 8px",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      {["首页", "关于", "文档"].map((item, i) => (
        <a
          key={i}
          href="#"
          style={{
            display: "block",
            padding: "10px 12px",
            color: i === 0 ? "#e2e8f0" : "#94a3b8",
            textDecoration: "none",
            fontSize: "13px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#e2e8f0")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = i === 0 ? "#e2e8f0" : "#94a3b8")}
        >
          {item}
        </a>
      ))}
    </nav>
  );
}

function AmpersandPreview() {
  return (
    <div className="flex gap-2 flex-wrap">
      {[
        { label: ".button", bg: "#3b82f6" },
        { label: ".button--primary", bg: "#3b82f6" },
        { label: ".button--danger", bg: "#ef4444" },
        { label: ".button--ghost", bg: "transparent", border: "1px solid #60a5fa", color: "#60a5fa" },
      ].map((item, i) => (
        <button
          key={i}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            background: item.bg,
            color: item.color || "white",
            border: item.border || "none",
            fontSize: "12px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function MixinPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#1e293b",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        width: "100%",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
        el.style.transform = "";
      }}
    >
      <span style={{ color: "#94a3b8", fontSize: "13px" }}>
        悬停查看 .box-shadow() 混入效果
      </span>
    </div>
  );
}

function ColorFunctionPreview() {
  const primary = "#3b82f6";
  const colors = [
    { label: "lighten 40%", bg: "#c3d9fd", text: "#1e293b" },
    { label: "lighten 20%", bg: "#7fb0fb", text: "#1e293b" },
    { label: "base", bg: primary, text: "white" },
    { label: "darken 10%", bg: "#1a6ef4", text: "white" },
    { label: "darken 30%", bg: "#0a3a9e", text: "white" },
  ];

  return (
    <div className="flex w-full rounded-lg overflow-hidden">
      {colors.map((c, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: c.bg,
            padding: "8px 4px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "9px", color: c.text, fontFamily: "var(--font-mono)", opacity: 0.8 }}>
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function OperationsPreview() {
  return (
    <div className="w-full space-y-2">
      <div style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
        <div>@base: 8px</div>
        <div style={{ color: "#60a5fa" }}>padding: 8px → @base</div>
        <div style={{ color: "#60a5fa" }}>margin: 16px → @base * 2</div>
        <div style={{ color: "#60a5fa" }}>gap: 4px → @base / 2</div>
      </div>
      <div className="flex gap-1">
        <div style={{ flex: 4, height: "20px", background: "#3b82f6", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "10px", color: "white" }}>col-4 (33%)</span>
        </div>
        <div style={{ flex: 8, height: "20px", background: "#10b981", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "10px", color: "white" }}>col-8 (67%)</span>
        </div>
      </div>
    </div>
  );
}

function ExtendPreview() {
  return (
    <div className="space-y-2 w-full">
      {[
        { label: ".info-card", borderColor: "#3b82f6", color: "#60a5fa" },
        { label: ".warning-card", borderColor: "#f59e0b", color: "#fbbf24" },
        { label: ".error-card", borderColor: "#ef4444", color: "#f87171" },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: `1px solid ${item.borderColor}`,
            background: "#1e293b",
            color: item.color,
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
          }}
        >
          {item.label} — 继承 .base-card 样式
        </div>
      ))}
    </div>
  );
}

function ScopePreview() {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", width: "100%" }}>
      <div style={{ color: "#f59e0b" }}>@color: red (全局)</div>
      <div style={{ marginLeft: "16px", marginTop: "4px" }}>
        <div style={{ color: "#60a5fa" }}>.outer → color: blue</div>
        <div style={{ marginLeft: "16px", marginTop: "4px" }}>
          <div style={{ color: "#10b981" }}>.inner → color: green</div>
        </div>
        <div style={{ marginLeft: "16px", marginTop: "4px" }}>
          <div style={{ color: "#60a5fa" }}>.sibling → color: blue</div>
        </div>
      </div>
    </div>
  );
}

function MapsPreview() {
  return (
    <div className="space-y-2 w-full">
      <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "#94a3b8" }}>
        #colors() 映射：
      </div>
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "primary", color: "#3b82f6" },
          { key: "secondary", color: "#10b981" },
          { key: "danger", color: "#ef4444" },
          { key: "warning", color: "#f59e0b" },
        ].map((item) => (
          <div
            key={item.key}
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              background: item.color,
              color: "white",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
            }}
          >
            [{item.key}]
          </div>
        ))}
      </div>
    </div>
  );
}

const previewComponents: Record<string, React.ReactNode> = {
  "basic-variables": <VariablesPreview />,
  "variable-interpolation": <InterpolationPreview />,
  "variable-variables": (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#94a3b8" }}>
      <div>@theme-color: "primary"</div>
      <div style={{ color: "#60a5fa" }}>@@theme-color → @primary → #3b82f6</div>
      <div style={{ marginTop: "8px", padding: "8px", background: "#1e293b", borderRadius: "6px" }}>
        <span style={{ color: "#3b82f6" }}>color: #3b82f6</span>
      </div>
    </div>
  ),
  "property-as-variable": (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>
      <div style={{ padding: "8px 12px", background: "#1e293b", borderRadius: "6px", border: "2px solid #60a5fa" }}>
        <div style={{ color: "#60a5fa" }}>color: #60a5fa</div>
        <div style={{ color: "#60a5fa" }}>background-color: #60a5fa (= $color)</div>
      </div>
    </div>
  ),
  "basic-nesting": <NestingPreview />,
  "parent-selector-ampersand": <AmpersandPreview />,
  "media-query-nesting": (
    <div style={{ width: "100%", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
      <div style={{ color: "#94a3b8" }}>响应式字体大小：</div>
      <div style={{ color: "#60a5fa", marginTop: "4px" }}>mobile: 24px</div>
      <div style={{ color: "#10b981" }}>tablet: 36px</div>
      <div style={{ color: "#f59e0b" }}>desktop: 48px</div>
    </div>
  ),
  "basic-mixin": (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#1e293b",
        borderRadius: "8px",
        border: "1px solid #334155",
        width: "100%",
      }}
    >
      <span style={{ color: "#94a3b8", fontSize: "13px" }}>
        .flex-center() 混入效果
      </span>
    </div>
  ),
  "parametric-mixin": <MixinPreview />,
  "mixin-guards": (
    <div className="space-y-2 w-full">
      <div style={{ background: "#f0f9ff", padding: "8px 12px", borderRadius: "6px", color: "#1e293b", fontSize: "13px" }}>
        亮色背景 → 深色文字 (lightness &gt; 50%)
      </div>
      <div style={{ background: "#0f172a", padding: "8px 12px", borderRadius: "6px", color: "#f8fafc", fontSize: "13px", border: "1px solid #334155" }}>
        暗色背景 → 浅色文字 (lightness &le; 50%)
      </div>
    </div>
  ),
  "mixin-rest-args": (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#94a3b8" }}>
      <div style={{ color: "#60a5fa" }}>transition: color 0.2s ease,</div>
      <div style={{ color: "#60a5fa", paddingLeft: "12px" }}>background 0.3s ease,</div>
      <div style={{ color: "#60a5fa", paddingLeft: "12px" }}>transform 0.4s cubic-bezier(...);</div>
    </div>
  ),
  "operations": <OperationsPreview />,
  "color-functions": <ColorFunctionPreview />,
  "string-functions": (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", width: "100%" }}>
      <div style={{ color: "#94a3b8" }}>数学函数：</div>
      <div style={{ color: "#60a5fa" }}>ceil(2.4px) → 3px</div>
      <div style={{ color: "#60a5fa" }}>floor(2.6px) → 2px</div>
      <div style={{ color: "#60a5fa" }}>round(0.567, 2) → 0.57</div>
      <div style={{ color: "#10b981", marginTop: "4px" }}>颜色信息：</div>
      <div style={{ color: "#10b981" }}>hue(#3b82f6) → 217°</div>
    </div>
  ),
  "basic-extend": <ExtendPreview />,
  "extend-all": (
    <div className="space-y-1 w-full">
      {[".btn", ".my-button"].map((cls, i) => (
        <div key={i} style={{ display: "flex", gap: "8px" }}>
          <button style={{ padding: "6px 12px", borderRadius: "6px", background: i === 1 ? "#3b82f6" : "transparent", color: i === 1 ? "white" : "#94a3b8", border: "1px solid #334155", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-mono)" }}>
            {cls}
          </button>
        </div>
      ))}
      <div style={{ fontSize: "11px", color: "#475569", fontFamily: "var(--font-mono)" }}>
        两者共享 padding, border-radius, :hover, :active
      </div>
    </div>
  ),
  "import-rules": (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", width: "100%" }}>
      {[
        { keyword: "@import", color: "#f59e0b", desc: "基础导入" },
        { keyword: "@import (reference)", color: "#60a5fa", desc: "只导入不输出" },
        { keyword: "@import (once)", color: "#10b981", desc: "只导入一次" },
        { keyword: "@import (css)", color: "#94a3b8", desc: "保持为 CSS" },
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: "4px" }}>
          <span style={{ color: item.color }}>{item.keyword}</span>
          <span style={{ color: "#475569" }}> — {item.desc}</span>
        </div>
      ))}
    </div>
  ),
  "scope": <ScopePreview />,
  "maps": <MapsPreview />,
  "detached-rulesets": (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", width: "100%" }}>
      <div style={{ color: "#94a3b8" }}>@mobile-styles 变量存储规则集：</div>
      <div style={{ marginLeft: "12px", color: "#60a5fa" }}>font-size: 14px</div>
      <div style={{ marginLeft: "12px", color: "#60a5fa" }}>padding: 8px</div>
      <div style={{ marginTop: "8px", color: "#94a3b8" }}>@desktop-styles：</div>
      <div style={{ marginLeft: "12px", color: "#10b981" }}>font-size: 16px</div>
      <div style={{ marginLeft: "12px", color: "#10b981" }}>display: flex</div>
    </div>
  ),
};

export default function FeaturesPage() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <SectionHeader
        id="features-intro"
        title="Less 语法特性"
        subtitle="Less 是一个 CSS 预处理器，它在标准 CSS 基础上增加了变量、嵌套、混入、运算、函数等编程特性，让样式代码更易于维护和复用。"
        badge="Features"
        badgeColor="blue"
        level={1}
      />

      <InfoCard type="tip" title="Less 与 CSS Modules 的关系">
        在 React/Vue 项目中，<code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>.module.less</code> 文件同时享有
        <strong> Less 的编程特性</strong>（变量、混入、嵌套等）和 <strong>CSS Modules 的局部作用域</strong>。
        Less 先将代码编译为 CSS，再由 CSS Modules 处理类名哈希化。
      </InfoCard>

      {featureCategories.map((category) => (
        <section key={category.id} className="space-y-6">
          <SectionHeader
            id={category.id}
            title={category.title}
            subtitle={category.description}
            level={2}
          />

          <div className="space-y-6">
            {category.features.map((feature) => (
              <div key={feature.id} className="space-y-3">
                <SectionHeader
                  id={feature.id}
                  title={feature.title}
                  subtitle={feature.description}
                  level={3}
                />

                <DemoPanel
                  lessCode={feature.lessCode}
                  cssOutput={feature.cssOutput}
                  preview={
                    previewComponents[feature.id] || (
                      <div style={{ color: "oklch(0.5 0.01 265)", fontSize: "13px" }}>
                        效果预览
                      </div>
                    )
                  }
                />

                {feature.note && (
                  <InfoCard type="tip" title="注意事项">
                    {feature.note}
                  </InfoCard>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
