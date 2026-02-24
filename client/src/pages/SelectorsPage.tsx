/**
 * SelectorsPage Component
 * Design: Modern EdTech - Dark theme with split panel demos
 * Purpose: Interactive guide for Less/CSS selectors
 */
import { selectorCategories } from "@/data/selectors";
import SectionHeader from "@/components/SectionHeader";
import InfoCard from "@/components/InfoCard";
import DemoPanel from "@/components/DemoPanel";

// Preview components for each selector demo
function TypeSelectorPreview() {
  return (
    <div className="space-y-2 w-full">
      <p style={{ color: "#e2e8f0", lineHeight: "1.6", fontSize: "14px" }}>
        这是一个 &lt;p&gt; 元素，被类型选择器 <code style={{ color: "#60a5fa", fontFamily: "var(--font-mono)", fontSize: "12px" }}>p</code> 选中。
      </p>
      <h3 style={{ fontWeight: "bold", color: "#60a5fa", fontSize: "16px" }}>
        这是 &lt;h3&gt; 元素，被 <code style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>h1, h2, h3</code> 选中
      </h3>
    </div>
  );
}

function ClassSelectorPreview() {
  return (
    <div className="space-y-2">
      <button
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: "#3b82f6",
          color: "white",
          cursor: "pointer",
          border: "none",
          fontSize: "14px",
        }}
      >
        .button
      </button>
      <button
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: "#1d4ed8",
          color: "white",
          cursor: "pointer",
          border: "none",
          fontSize: "14px",
          marginLeft: "8px",
        }}
      >
        .button.active
      </button>
    </div>
  );
}

function DescendantSelectorPreview() {
  return (
    <div
      style={{
        padding: "16px",
        background: "#1e293b",
        borderRadius: "8px",
        border: "1px solid #334155",
      }}
    >
      <p style={{ color: "#94a3b8", marginBottom: "8px", fontSize: "13px" }}>
        .card p — 后代 p 元素
      </p>
      <div style={{ fontSize: "18px", fontWeight: 600, color: "#e2e8f0" }}>
        .card .title — 后代类元素
      </div>
    </div>
  );
}

function ChildSelectorPreview() {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
      {["菜单项 1", "菜单项 2", "菜单项 3"].map((item, i) => (
        <li
          key={i}
          style={{
            padding: "8px 12px",
            borderBottom: "1px solid #334155",
            color: "#e2e8f0",
            fontSize: "13px",
          }}
        >
          <a style={{ color: "#e2e8f0", textDecoration: "none" }}>{item}</a>
        </li>
      ))}
    </ul>
  );
}

function PseudoClassPreview() {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        style={{
          background: "#3b82f6",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = "#2563eb";
          (e.target as HTMLElement).style.transform = "translateY(-1px)";
          (e.target as HTMLElement).style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = "#3b82f6";
          (e.target as HTMLElement).style.transform = "";
          (e.target as HTMLElement).style.boxShadow = "";
        }}
      >
        悬停我 (:hover)
      </button>
      <button
        style={{
          background: "#ef4444",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "not-allowed",
          fontSize: "13px",
          opacity: 0.5,
        }}
        disabled
      >
        已禁用 (:disabled)
      </button>
    </div>
  );
}

function NthChildPreview() {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%", borderRadius: "8px", overflow: "hidden" }}>
      {["第 1 项 (:first-child)", "第 2 项 (:nth-child(even))", "第 3 项 (:nth-child(odd))", "第 4 项 (:nth-child(even))", "第 5 项 (:last-child)"].map((item, i) => (
        <li
          key={i}
          style={{
            padding: "8px 12px",
            fontSize: "12px",
            background: i === 0 ? "#1e3a5f" : i === 4 ? "#1e293b" : i % 2 === 0 ? "#0f172a" : "#1e293b",
            color: i === 0 ? "#60a5fa" : "#94a3b8",
            borderRadius: i === 0 ? "8px 8px 0 0" : i === 4 ? "0 0 8px 8px" : "0",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function BeforeAfterPreview() {
  return (
    <div className="space-y-3">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          padding: "4px 12px",
          background: "#1e3a5f",
          borderRadius: "20px",
          color: "#60a5fa",
          fontSize: "13px",
        }}
      >
        <span style={{ marginRight: "6px", color: "#f59e0b" }}>✦</span>
        ::before 示例
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "2px",
            background: "linear-gradient(to right, transparent, #3b82f6, transparent)",
          }}
        />
      </div>
    </div>
  );
}

function AttributeSelectorPreview() {
  return (
    <div className="space-y-2 w-full">
      <a
        href="https://github.com"
        target="_blank"
        style={{ color: "#f0f6fc", fontSize: "13px", display: "block" }}
      >
        ⬡ github.com (a[href*="github"])
      </a>
      <a
        href="https://example.com"
        style={{ color: "#60a5fa", fontSize: "13px", display: "block" }}
      >
        example.com 🔒 (a[href^="https"])
      </a>
      <a
        href="/doc.pdf"
        style={{ color: "#ef4444", fontSize: "13px", display: "block" }}
      >
        document.pdf [PDF] (a[href$=".pdf"])
      </a>
    </div>
  );
}

function GlobalLocalPreview() {
  return (
    <div className="space-y-2">
      <div
        className="local-example"
        style={{
          padding: "8px 12px",
          background: "#1e3a5f",
          borderRadius: "6px",
          color: "#60a5fa",
          fontSize: "13px",
        }}
      >
        :local(.localClass) — 哈希化的局部类名
      </div>
      <div
        style={{
          padding: "8px 12px",
          background: "#1e3a5f",
          borderRadius: "6px",
          color: "#10b981",
          fontSize: "13px",
          border: "1px solid #10b981",
        }}
      >
        :global(.globalClass) — 不哈希化的全局类名
      </div>
    </div>
  );
}

const previewComponents: Record<string, React.ReactNode> = {
  "type-selector": <TypeSelectorPreview />,
  "class-selector": <ClassSelectorPreview />,
  "id-selector": (
    <div
      id="header-demo"
      style={{ height: "50px", background: "#1e293b", display: "flex", alignItems: "center", padding: "0 16px", borderRadius: "8px", width: "100%" }}
    >
      <span style={{ color: "#94a3b8", fontSize: "13px" }}>#header — ID 选择器</span>
    </div>
  ),
  "universal-selector": (
    <div style={{ padding: "12px", background: "#1e293b", borderRadius: "8px", width: "100%" }}>
      <p style={{ margin: 0, fontFamily: "inherit", fontSize: "13px", color: "#94a3b8" }}>
        * — 所有元素都继承字体
      </p>
    </div>
  ),
  "descendant-selector": <DescendantSelectorPreview />,
  "child-selector": <ChildSelectorPreview />,
  "adjacent-sibling": (
    <div style={{ width: "100%" }}>
      <label style={{ display: "block", color: "#94a3b8", marginBottom: "4px", fontSize: "12px" }}>
        label + input 相邻兄弟
      </label>
      <input
        type="text"
        placeholder="input 元素"
        style={{
          border: "1px solid #334155",
          padding: "8px",
          borderRadius: "4px",
          background: "#0f172a",
          color: "#e2e8f0",
          fontSize: "13px",
          width: "100%",
        }}
      />
    </div>
  ),
  "general-sibling": (
    <div style={{ width: "100%" }}>
      <h4 style={{ color: "#e2e8f0", marginBottom: "8px", fontSize: "14px" }}>h2 标题</h4>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "4px 0" }}>h2 ~ p 兄弟段落 1</p>
      <p style={{ color: "#94a3b8", fontSize: "13px", margin: "4px 0" }}>h2 ~ p 兄弟段落 2</p>
    </div>
  ),
  "state-pseudo": <PseudoClassPreview />,
  "structural-pseudo": <NthChildPreview />,
  "form-pseudo": (
    <div style={{ width: "100%" }}>
      <input
        type="email"
        placeholder="输入邮箱（:valid/:invalid）"
        required
        style={{
          border: "2px solid #334155",
          padding: "8px 12px",
          borderRadius: "6px",
          background: "#0f172a",
          color: "#e2e8f0",
          fontSize: "13px",
          width: "100%",
          borderLeft: "3px solid #f59e0b",
        }}
      />
    </div>
  ),
  "not-pseudo": (
    <div className="flex gap-2">
      {["首页", "关于", "联系", "博客"].map((item, i) => (
        <span
          key={i}
          style={{
            color: i === 0 ? "#60a5fa" : "rgba(148, 163, 184, 0.7)",
            fontSize: "13px",
            padding: "4px 8px",
            borderBottom: i === 0 ? "2px solid #60a5fa" : "none",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  ),
  "is-where-has": (
    <div style={{ width: "100%" }}>
      <h2 style={{ fontFamily: "var(--font-display)", lineHeight: "1.3", color: "#e2e8f0", fontSize: "16px", marginBottom: "8px" }}>
        :is(h1, h2, h3) 统一标题样式
      </h2>
      <div style={{ padding: "8px 12px", borderRadius: "8px", background: "#1e293b", fontSize: "13px", color: "#94a3b8" }}>
        :where(.card, .panel) 零优先级通用样式
      </div>
    </div>
  ),
  "before-after": <BeforeAfterPreview />,
  "first-line-letter": (
    <div style={{ maxWidth: "280px" }}>
      <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#94a3b8" }}>
        <span style={{ fontSize: "3em", fontWeight: 700, float: "left", lineHeight: "0.8", margin: "0.1em 0.1em 0 0", color: "#60a5fa" }}>L</span>
        ess 是一个 CSS 预处理器，它扩展了 CSS 语言，增加了变量、嵌套、混入等特性。
      </p>
    </div>
  ),
  "selection-placeholder": (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        placeholder="::placeholder 自定义占位符样式"
        style={{
          border: "1px solid #334155",
          padding: "8px 12px",
          borderRadius: "6px",
          background: "#0f172a",
          color: "#e2e8f0",
          fontSize: "13px",
          width: "100%",
        }}
      />
      <p style={{ fontSize: "12px", color: "#475569", marginTop: "8px", fontStyle: "italic" }}>
        选中此文本可看到 ::selection 效果
      </p>
    </div>
  ),
  "scrollbar": (
    <div
      style={{
        width: "100%",
        height: "100px",
        overflowY: "auto",
        background: "#0f172a",
        borderRadius: "6px",
        padding: "8px",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <p key={i} style={{ fontSize: "12px", color: "#475569", margin: "4px 0" }}>
          滚动内容行 {i + 1} — 自定义滚动条样式
        </p>
      ))}
    </div>
  ),
  "attr-presence": <AttributeSelectorPreview />,
  "attr-value": <AttributeSelectorPreview />,
  "local-global": <GlobalLocalPreview />,
  "composes": (
    <div className="flex gap-2 flex-wrap">
      <button style={{ padding: "8px 16px", borderRadius: "6px", background: "#3b82f6", color: "white", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500, transition: "all 0.2s" }}>
        primaryButton
      </button>
      <button style={{ padding: "8px 16px", borderRadius: "6px", background: "#ef4444", color: "white", border: "none", fontSize: "13px", cursor: "pointer", fontWeight: 500, transition: "all 0.2s" }}>
        dangerButton
      </button>
    </div>
  ),
};

export default function SelectorsPage() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <SectionHeader
        id="selectors-intro"
        title="选择器 (Selectors)"
        subtitle="在 .module.less 文件中，你可以使用所有标准 CSS 选择器，同时还有 Less 特有的父选择器 & 和 CSS Modules 特有的 :global()、:local() 语法。"
        badge="Selectors"
        badgeColor="green"
        level={1}
      />

      <InfoCard type="info" title="CSS Modules 作用域说明">
        在 <code style={{ fontFamily: "var(--font-mono)", color: "oklch(0.75 0.2 260)", fontSize: "0.85em" }}>.module.less</code> 文件中，
        <strong>类选择器</strong>和 <strong>ID 选择器</strong>默认会被哈希化为唯一的局部类名，
        而<strong>类型选择器</strong>（如 <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>p</code>、<code style={{ fontFamily: "var(--font-mono)", fontSize: "0.85em" }}>div</code>）
        默认是全局的。使用 <code style={{ fontFamily: "var(--font-mono)", color: "oklch(0.75 0.2 260)", fontSize: "0.85em" }}>:global()</code> 可以显式声明全局作用域。
      </InfoCard>

      {selectorCategories.map((category) => (
        <section key={category.id} className="space-y-6">
          <SectionHeader
            id={category.id}
            title={category.title}
            subtitle={category.description}
            level={2}
          />

          <div className="space-y-6">
            {category.selectors.map((selector) => (
              <div key={selector.id} className="space-y-3">
                <SectionHeader
                  id={selector.id}
                  title={selector.title}
                  subtitle={selector.description}
                  level={3}
                />

                <DemoPanel
                  lessCode={selector.lessCode}
                  cssOutput={selector.cssOutput}
                  preview={
                    previewComponents[selector.id] || (
                      <div style={{ color: "oklch(0.5 0.01 265)", fontSize: "13px" }}>
                        效果预览
                      </div>
                    )
                  }
                />

                {selector.note && (
                  <InfoCard type="tip" title="注意事项">
                    {selector.note}
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
