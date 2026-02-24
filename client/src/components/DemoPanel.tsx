/**
 * DemoPanel Component
 * Design: Modern EdTech - Split panel for code + live preview
 * Purpose: Show Less code on the left and rendered CSS effect on the right
 */
import { useState } from "react";
import { Eye, Code2, Check, Copy } from "lucide-react";

interface DemoPanelProps {
  lessCode: string;
  cssOutput?: string;
  preview: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

// Token types for syntax highlighting
type TokenType = "comment" | "at-rule" | "variable" | "string" | "number" | "property" | "selector" | "color" | "function" | "punctuation" | "text";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // Comments
    if (remaining.startsWith("//")) {
      tokens.push({ type: "comment", value: remaining });
      break;
    }

    // @variable declarations and at-rules
    const atMatch = remaining.match(/^(@[\w-]+)/);
    if (atMatch) {
      const atRules = ["@import", "@media", "@keyframes", "@font-face", "@supports", "@charset", "@namespace", "@page"];
      const isAtRule = atRules.includes(atMatch[1]);
      tokens.push({ type: isAtRule ? "at-rule" : "variable", value: atMatch[1] });
      remaining = remaining.slice(atMatch[1].length);
      continue;
    }

    // Strings
    const stringMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
    if (stringMatch) {
      tokens.push({ type: "string", value: stringMatch[1] });
      remaining = remaining.slice(stringMatch[1].length);
      continue;
    }

    // Numbers with units
    const numberMatch = remaining.match(/^(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|fr|ch|ex|cm|mm|in|pt|pc)?)/);
    if (numberMatch) {
      tokens.push({ type: "number", value: numberMatch[1] });
      remaining = remaining.slice(numberMatch[1].length);
      continue;
    }

    // CSS properties (word followed by colon, not selector)
    const propMatch = remaining.match(/^([\w-]+)(\s*:)(?!:)/);
    if (propMatch && !remaining.startsWith(".") && !remaining.startsWith("#") && !remaining.startsWith("&") && !remaining.startsWith(":")) {
      tokens.push({ type: "property", value: propMatch[1] });
      tokens.push({ type: "punctuation", value: propMatch[2] });
      remaining = remaining.slice(propMatch[0].length);
      continue;
    }

    // Selectors (.class, #id, &, :pseudo, element before {)
    const selectorMatch = remaining.match(/^([.#&:*][\w-:()[\]="'~^$|*+>]*|[a-zA-Z][\w-]*(?=\s*[{,>~+]))/);
    if (selectorMatch) {
      tokens.push({ type: "selector", value: selectorMatch[1] });
      remaining = remaining.slice(selectorMatch[1].length);
      continue;
    }

    // Color values
    const colorMatch = remaining.match(/^(#[0-9a-fA-F]{3,8})/);
    if (colorMatch) {
      tokens.push({ type: "color", value: colorMatch[1] });
      remaining = remaining.slice(colorMatch[1].length);
      continue;
    }

    // CSS functions / mixin calls
    const funcMatch = remaining.match(/^([\w-]+)(\()/);
    if (funcMatch) {
      tokens.push({ type: "function", value: funcMatch[1] });
      tokens.push({ type: "punctuation", value: funcMatch[2] });
      remaining = remaining.slice(funcMatch[0].length);
      continue;
    }

    // Punctuation
    const punctMatch = remaining.match(/^([{}();,>~+*[\]])/);
    if (punctMatch) {
      tokens.push({ type: "punctuation", value: punctMatch[1] });
      remaining = remaining.slice(1);
      continue;
    }

    // Default: single char as text
    tokens.push({ type: "text", value: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  "comment": "oklch(0.5 0.01 265)",
  "at-rule": "oklch(0.75 0.18 300)",
  "variable": "oklch(0.75 0.22 25)",
  "string": "oklch(0.75 0.18 140)",
  "number": "oklch(0.75 0.18 60)",
  "property": "oklch(0.75 0.2 260)",
  "selector": "oklch(0.75 0.18 165)",
  "color": "oklch(0.75 0.18 60)",
  "function": "oklch(0.75 0.2 260)",
  "punctuation": "oklch(0.55 0.01 265)",
  "text": "oklch(0.85 0.01 265)",
};

function HighlightedCode({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <>
      {lines.map((line, lineIndex) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={lineIndex} style={{ minHeight: "1.5em" }}>
            {tokens.map((token, tokenIndex) => (
              <span
                key={tokenIndex}
                style={{
                  color: tokenColors[token.type],
                  fontStyle: token.type === "comment" ? "italic" : "normal",
                }}
              >
                {token.value}
              </span>
            ))}
          </div>
        );
      })}
    </>
  );
}

export default function DemoPanel({
  lessCode,
  cssOutput,
  preview,
  title,
  description,
  className = "",
}: DemoPanelProps) {
  const [activeTab, setActiveTab] = useState<"less" | "css">("less");
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === "less" || !cssOutput ? lessCode : cssOutput;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: "oklch(0.14 0.022 265)",
        border: "1px solid oklch(1 0 0 / 0.1)",
      }}
    >
      {/* Header */}
      {(title || description) && (
        <div
          className="px-5 py-3"
          style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}
        >
          {title && (
            <h4
              className="text-sm font-semibold mb-0.5"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.92 0.01 265)" }}
            >
              {title}
            </h4>
          )}
          {description && (
            <p className="text-xs" style={{ color: "oklch(0.55 0.01 265)" }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Code */}
        <div style={{ borderRight: "1px solid oklch(1 0 0 / 0.08)" }}>
          {/* Tab bar */}
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}
          >
            <div className="flex">
              <button
                onClick={() => setActiveTab("less")}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all duration-150"
                style={{
                  color: activeTab === "less" ? "oklch(0.75 0.18 165)" : "oklch(0.5 0.01 265)",
                  borderBottom: activeTab === "less" ? "2px solid oklch(0.65 0.18 165)" : "2px solid transparent",
                  background: "transparent",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Code2 size={11} />
                .less
              </button>
              {cssOutput && (
                <button
                  onClick={() => setActiveTab("css")}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all duration-150"
                  style={{
                    color: activeTab === "css" ? "oklch(0.75 0.2 260)" : "oklch(0.5 0.01 265)",
                    borderBottom: activeTab === "css" ? "2px solid oklch(0.65 0.2 260)" : "2px solid transparent",
                    background: "transparent",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <Code2 size={11} />
                  编译后 .css
                </button>
              )}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs px-3 py-2 transition-all duration-200"
              style={{
                color: copied ? "oklch(0.65 0.18 165)" : "oklch(0.45 0.01 265)",
                background: "transparent",
              }}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "已复制" : "复制"}
            </button>
          </div>

          {/* Code display */}
          <div className="overflow-auto" style={{ maxHeight: "380px" }}>
            <pre
              className="p-4 text-sm leading-relaxed m-0"
              style={{
                fontFamily: "var(--font-mono)",
                background: "transparent",
                fontSize: "12.5px",
              }}
            >
              <code>
                <HighlightedCode code={currentCode} />
              </code>
            </pre>
          </div>
        </div>

        {/* Right: Preview */}
        <div>
          <div
            className="flex items-center gap-1.5 px-4 py-2.5"
            style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}
          >
            <Eye size={11} style={{ color: "oklch(0.5 0.01 265)" }} />
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.5 0.01 265)", fontFamily: "var(--font-mono)" }}
            >
              效果预览
            </span>
          </div>
          <div
            className="p-5 flex items-start justify-center"
            style={{ background: "oklch(0.1 0.015 265)", minHeight: "120px" }}
          >
            {preview}
          </div>
        </div>
      </div>
    </div>
  );
}
