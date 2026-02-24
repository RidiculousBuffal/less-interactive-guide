/**
 * Home Page - Main layout for the Less Interactive Guide
 * Design: Modern EdTech - Dark theme with sidebar navigation
 * Layout: Fixed sidebar (260px) + scrollable main content
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { BookOpen, Layers, Zap, Menu, X } from "lucide-react";
import Sidebar, { NavSection } from "@/components/Sidebar";
import OverviewPage from "./OverviewPage";
import SelectorsPage from "./SelectorsPage";
import FeaturesPage from "./FeaturesPage";

type ActivePage = "overview" | "selectors" | "features";

const navSections: NavSection[] = [
  {
    id: "main",
    title: "导航",
    icon: <BookOpen size={12} />,
    items: [
      { id: "overview", title: "概览" },
    ],
  },
  {
    id: "selectors-nav",
    title: "选择器",
    icon: <Layers size={12} />,
    items: [
      { id: "basic-selectors", title: "基础选择器", badge: "4" },
      { id: "combinator-selectors", title: "组合选择器", badge: "4" },
      { id: "pseudo-classes", title: "伪类选择器", badge: "5" },
      { id: "pseudo-elements", title: "伪元素选择器", badge: "4" },
      { id: "attribute-selectors", title: "属性选择器", badge: "2" },
      { id: "css-modules-specific", title: "CSS Modules 特有", badge: "2" },
    ],
  },
  {
    id: "features-nav",
    title: "Less 语法特性",
    icon: <Zap size={12} />,
    items: [
      { id: "variables", title: "变量 (Variables)", badge: "4" },
      { id: "nesting", title: "嵌套 (Nesting)", badge: "3" },
      { id: "mixins", title: "混入 (Mixins)", badge: "4" },
      { id: "operations-functions", title: "运算与函数", badge: "3" },
      { id: "extend", title: "继承 (Extend)", badge: "2" },
      { id: "import-scope", title: "导入与作用域", badge: "2" },
      { id: "maps-detached", title: "映射与分离规则集", badge: "2" },
    ],
  },
];

// Selector IDs that belong to the selectors page
const selectorIds = new Set([
  "basic-selectors", "combinator-selectors", "pseudo-classes",
  "pseudo-elements", "attribute-selectors", "css-modules-specific",
  "type-selector", "class-selector", "id-selector", "universal-selector",
  "descendant-selector", "child-selector", "adjacent-sibling", "general-sibling",
  "state-pseudo", "structural-pseudo", "form-pseudo", "not-pseudo", "is-where-has",
  "before-after", "first-line-letter", "selection-placeholder", "scrollbar",
  "attr-presence", "attr-value", "local-global", "composes",
]);

// Feature IDs that belong to the features page
const featureIds = new Set([
  "variables", "nesting", "mixins", "operations-functions", "extend",
  "import-scope", "maps-detached",
  "basic-variables", "variable-interpolation", "variable-variables", "property-as-variable",
  "basic-nesting", "parent-selector-ampersand", "media-query-nesting",
  "basic-mixin", "parametric-mixin", "mixin-guards", "mixin-rest-args",
  "operations", "color-functions", "string-functions",
  "basic-extend", "extend-all",
  "import-rules", "scope",
  "maps", "detached-rulesets",
]);

export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>("overview");
  const [activeNavId, setActiveNavId] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const handleNavigate = useCallback((id: string) => {
    setActiveNavId(id);
    setMobileMenuOpen(false);

    if (id === "overview") {
      setActivePage("overview");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Determine which page to show
    const targetPage = selectorIds.has(id) ? "selectors" : "features";

    if (activePage !== targetPage) {
      setActivePage(targetPage);
      // Wait for page to render, then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          isScrollingRef.current = true;
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => { isScrollingRef.current = false; }, 800);
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        isScrollingRef.current = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
    }
  }, [activePage]);

  // Update active nav item on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const allIds = activePage === "selectors"
        ? Array.from(selectorIds)
        : activePage === "features"
        ? Array.from(featureIds)
        : [];

      let currentId = "";
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentId = id;
          }
        }
      }

      if (currentId && currentId !== activeNavId) {
        setActiveNavId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePage, activeNavId]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.02 265)" }}>
      {/* Mobile menu toggle */}
      <button
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-lg flex items-center justify-center lg:hidden"
        style={{
          background: "oklch(0.18 0.025 265)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          color: "oklch(0.85 0.01 265)",
        }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "oklch(0 0 0 / 0.5)" }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:block ${mobileMenuOpen ? "block" : "hidden"}`}
        style={{ zIndex: 40 }}
      >
        <Sidebar
          sections={navSections}
          activeId={activeNavId}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Main content */}
      <main
        ref={mainRef}
        className="min-h-screen"
        style={{ paddingLeft: "260px" }}
      >
        {/* Page content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {activePage === "overview" && (
            <OverviewPage onNavigate={handleNavigate} />
          )}
          {activePage === "selectors" && <SelectorsPage />}
          {activePage === "features" && <FeaturesPage />}
        </div>
      </main>

      {/* Mobile: no sidebar padding */}
      <style>{`
        @media (max-width: 1023px) {
          main {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
