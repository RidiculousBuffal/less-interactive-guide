/**
 * OverviewPage Component
 * Design: Modern EdTech - Hero section with feature cards
 * Purpose: Introduction and overview of the Less interactive guide
 */
import { ArrowRight, Layers, Zap, Code2, BookOpen, Palette, Box } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  color: string;
  bgColor: string;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, count, color, bgColor, onClick }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 rounded-xl transition-all duration-200 group"
      style={{
        background: "oklch(0.16 0.025 265)",
        border: "1px solid oklch(1 0 0 / 0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = `1px solid ${color}40`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid oklch(1 0 0 / 0.08)";
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: bgColor }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 265)" }}
            >
              {title}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: bgColor, color }}
            >
              {count} 项
            </span>
          </div>
          <p className="text-xs" style={{ color: "oklch(0.55 0.01 265)" }}>
            {description}
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-1 mt-3 text-xs font-medium"
        style={{ color }}
      >
        开始学习
        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
}

interface OverviewPageProps {
  onNavigate: (id: string) => void;
}

export default function OverviewPage({ onNavigate }: OverviewPageProps) {
  const selectorCards = [
    { id: "basic-selectors", title: "基础选择器", count: 4, desc: "类型、类、ID、通用选择器" },
    { id: "combinator-selectors", title: "组合选择器", count: 4, desc: "后代、子、相邻兄弟、通用兄弟" },
    { id: "pseudo-classes", title: "伪类选择器", count: 5, desc: "状态、结构、表单、否定、现代伪类" },
    { id: "pseudo-elements", title: "伪元素选择器", count: 4, desc: "::before/after、::first-line、::selection" },
    { id: "attribute-selectors", title: "属性选择器", count: 2, desc: "属性存在、属性值精确/模糊匹配" },
    { id: "css-modules-specific", title: "CSS Modules 特有", count: 2, desc: ":global()、:local()、composes" },
  ];

  const featureCards = [
    { id: "variables", title: "变量", count: 4, desc: "变量声明、插值、变量的变量、属性变量" },
    { id: "nesting", title: "嵌套", count: 3, desc: "基础嵌套、& 父选择器、媒体查询嵌套" },
    { id: "mixins", title: "混入 (Mixins)", count: 4, desc: "基础混入、参数化、守卫、可变参数" },
    { id: "operations-functions", title: "运算与函数", count: 3, desc: "数学运算、颜色函数、字符串函数" },
    { id: "extend", title: "继承 (Extend)", count: 2, desc: "基础继承、继承所有实例" },
    { id: "import-scope", title: "导入与作用域", count: 2, desc: "@import 关键字、变量作用域" },
    { id: "maps-detached", title: "映射与分离规则集", count: 2, desc: "Maps、Detached Rulesets" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <div
        className="rounded-2xl p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.18 0.04 265) 0%, oklch(0.15 0.03 200) 100%)",
          border: "1px solid oklch(1 0 0 / 0.1)",
        }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.2 260), transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.18 165), transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(0.65 0.2 260 / 0.15)",
                color: "oklch(0.75 0.2 260)",
                fontFamily: "var(--font-mono)",
              }}
            >
              .module.less
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(0.65 0.18 165 / 0.15)",
                color: "oklch(0.65 0.18 165)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Interactive Guide
            </div>
          </div>

          <h1
            className="text-3xl font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, oklch(0.95 0.01 265), oklch(0.75 0.2 260))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Less 选择器与语法特性
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "oklch(0.65 0.01 265)" }}>
            一份完整的 <code style={{ fontFamily: "var(--font-mono)", color: "oklch(0.75 0.18 165)", fontSize: "0.9em" }}>.module.less</code> 交互式指南，
            涵盖所有选择器类型和 Less 语法特性，每个知识点都配有代码示例和实时效果演示。
          </p>

          <div className="flex gap-6 mt-6">
            {[
              { label: "选择器类型", value: "6 类 22 种", color: "oklch(0.65 0.18 165)" },
              { label: "语法特性", value: "7 类 20 项", color: "oklch(0.65 0.2 260)" },
              { label: "代码示例", value: "42 个", color: "oklch(0.7 0.18 300)" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "oklch(0.5 0.01 265)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selectors section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.65 0.18 165 / 0.15)" }}
          >
            <Layers size={16} style={{ color: "oklch(0.65 0.18 165)" }} />
          </div>
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 265)" }}
            >
              选择器 (Selectors)
            </h2>
            <p className="text-xs" style={{ color: "oklch(0.5 0.01 265)" }}>
              6 个类别，22 种选择器类型
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {selectorCards.map((card) => (
            <FeatureCard
              key={card.id}
              icon={<Code2 size={18} />}
              title={card.title}
              description={card.desc}
              count={card.count}
              color="oklch(0.65 0.18 165)"
              bgColor="oklch(0.65 0.18 165 / 0.12)"
              onClick={() => onNavigate(card.id)}
            />
          ))}
        </div>
      </div>

      {/* Features section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.65 0.2 260 / 0.15)" }}
          >
            <Zap size={16} style={{ color: "oklch(0.65 0.2 260)" }} />
          </div>
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 265)" }}
            >
              Less 语法特性
            </h2>
            <p className="text-xs" style={{ color: "oklch(0.5 0.01 265)" }}>
              7 个类别，20 项核心特性
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {featureCards.map((card) => (
            <FeatureCard
              key={card.id}
              icon={<Zap size={18} />}
              title={card.title}
              description={card.desc}
              count={card.count}
              color="oklch(0.65 0.2 260)"
              bgColor="oklch(0.65 0.2 260 / 0.12)"
              onClick={() => onNavigate(card.id)}
            />
          ))}
        </div>
      </div>

      {/* Quick reference table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid oklch(1 0 0 / 0.08)" }}
      >
        <div
          className="px-5 py-4"
          style={{
            background: "oklch(0.14 0.022 265)",
            borderBottom: "1px solid oklch(1 0 0 / 0.08)",
          }}
        >
          <h3
            className="text-sm font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 265)" }}
          >
            快速参考：Less vs CSS Modules
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "oklch(0.13 0.02 265)" }}>
                {["特性", "Less 语法", "编译后 CSS", "说明"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold"
                    style={{ color: "oklch(0.55 0.01 265)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["变量", "@primary: #3b82f6", "直接替换为值", "Less 编译时处理"],
                ["嵌套", ".parent { .child {} }", ".parent .child {}", "自动生成后代选择器"],
                ["父选择器", ".btn { &:hover {} }", ".btn:hover {}", "& 代表父选择器"],
                ["混入", ".mixin(); ", "复制属性", "代码复用"],
                ["继承", ":extend(.base)", "合并选择器", "减少 CSS 体积"],
                ["局部类名", ".myClass", ".myClass_a1b2c3", "CSS Modules 哈希化"],
                ["全局类名", ":global(.cls)", ".cls", "不哈希化"],
                ["样式组合", "composes: base", "多类名合并", "CSS Modules 特有"],
              ].map(([feature, less, css, note], i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? "oklch(0.14 0.022 265)" : "oklch(0.13 0.02 265)",
                    borderTop: "1px solid oklch(1 0 0 / 0.05)",
                  }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: "oklch(0.85 0.01 265)" }}>
                    {feature}
                  </td>
                  <td className="px-4 py-3">
                    <code
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "oklch(0.75 0.18 165)",
                        background: "oklch(0.65 0.18 165 / 0.1)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {less}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <code
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "oklch(0.75 0.2 260)",
                        background: "oklch(0.65 0.2 260 / 0.1)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {css}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "oklch(0.55 0.01 265)" }}>
                    {note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
