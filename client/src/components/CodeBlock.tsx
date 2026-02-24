/**
 * CodeBlock Component
 * Design: Modern EdTech - Dark theme with syntax highlighting
 * Purpose: Display Less/CSS code with syntax highlighting and copy functionality
 */
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: "less" | "css" | "js";
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

// Simple tokenizer for Less/CSS syntax highlighting
function tokenizeLess(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, lineIndex) => {
    const tokens = tokenizeLine(line);
    return (
      <div key={lineIndex} className="code-line">
        {tokens}
        {"\n"}
      </div>
    );
  });
}

function tokenizeLine(line: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let remaining = line;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Comments
    if (remaining.startsWith("//")) {
      result.push(
        <span key={keyIndex++} className="token-comment">
          {remaining}
        </span>
      );
      remaining = "";
      continue;
    }

    // @variable declarations and at-rules
    const atMatch = remaining.match(/^(@[\w-]+)/);
    if (atMatch) {
      const isAtRule = ["@import", "@media", "@keyframes", "@mixin", "@include", "@extend", "@each", "@for", "@if", "@else", "@while", "@return", "@charset", "@namespace", "@font-face", "@page", "@supports"].includes(atMatch[1]);
      result.push(
        <span key={keyIndex++} className={isAtRule ? "token-at" : "token-variable"}>
          {atMatch[1]}
        </span>
      );
      remaining = remaining.slice(atMatch[1].length);
      continue;
    }

    // Strings
    const stringMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
    if (stringMatch) {
      result.push(
        <span key={keyIndex++} className="token-string">
          {stringMatch[1]}
        </span>
      );
      remaining = remaining.slice(stringMatch[1].length);
      continue;
    }

    // Numbers with units
    const numberMatch = remaining.match(/^(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?)/);
    if (numberMatch) {
      result.push(
        <span key={keyIndex++} className="token-number">
          {numberMatch[1]}
        </span>
      );
      remaining = remaining.slice(numberMatch[1].length);
      continue;
    }

    // CSS properties (word followed by colon)
    const propMatch = remaining.match(/^([\w-]+)(\s*:)/);
    if (propMatch && !remaining.startsWith(".") && !remaining.startsWith("#") && !remaining.startsWith("&")) {
      result.push(
        <span key={keyIndex++} className="token-property">
          {propMatch[1]}
        </span>
      );
      result.push(
        <span key={keyIndex++} className="token-punctuation">
          {propMatch[2]}
        </span>
      );
      remaining = remaining.slice(propMatch[0].length);
      continue;
    }

    // Selectors (.class, #id, &, element)
    const selectorMatch = remaining.match(/^([.#&][\w-]*|[a-zA-Z][\w-]*(?=\s*[{,>~+]))/);
    if (selectorMatch) {
      result.push(
        <span key={keyIndex++} className="token-selector">
          {selectorMatch[1]}
        </span>
      );
      remaining = remaining.slice(selectorMatch[1].length);
      continue;
    }

    // Color values
    const colorMatch = remaining.match(/^(#[0-9a-fA-F]{3,8})/);
    if (colorMatch) {
      result.push(
        <span key={keyIndex++} className="token-value">
          {colorMatch[1]}
        </span>
      );
      remaining = remaining.slice(colorMatch[1].length);
      continue;
    }

    // CSS functions
    const funcMatch = remaining.match(/^([\w-]+)(\()/);
    if (funcMatch) {
      result.push(
        <span key={keyIndex++} className="token-mixin">
          {funcMatch[1]}
        </span>
      );
      result.push(
        <span key={keyIndex++} className="token-punctuation">
          {funcMatch[2]}
        </span>
      );
      remaining = remaining.slice(funcMatch[0].length);
      continue;
    }

    // Punctuation
    const punctMatch = remaining.match(/^([{}();,>~+*])/);
    if (punctMatch) {
      result.push(
        <span key={keyIndex++} className="token-punctuation">
          {punctMatch[1]}
        </span>
      );
      remaining = remaining.slice(1);
      continue;
    }

    // Default: plain text
    result.push(
      <span key={keyIndex++} style={{ color: "oklch(0.85 0.01 265)" }}>
        {remaining[0]}
      </span>
    );
    remaining = remaining.slice(1);
  }

  return result;
}

export default function CodeBlock({
  code,
  language = "less",
  title,
  showLineNumbers = true,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={`code-block overflow-hidden ${className}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: "oklch(0.1 0.018 265)",
          borderBottom: "1px solid oklch(1 0 0 / 0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.22 25)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.75 0.18 60)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.18 165)" }} />
          </div>
          {title && (
            <span
              className="text-xs"
              style={{ color: "oklch(0.55 0.01 265)", fontFamily: "var(--font-mono)" }}
            >
              {title}
            </span>
          )}
          {!title && (
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                color: "oklch(0.65 0.18 165)",
                background: "oklch(0.65 0.18 165 / 0.15)",
                fontFamily: "var(--font-mono)",
              }}
            >
              .{language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-all duration-200"
          style={{
            color: copied ? "oklch(0.65 0.18 165)" : "oklch(0.55 0.01 265)",
            background: copied ? "oklch(0.65 0.18 165 / 0.1)" : "transparent",
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "已复制" : "复制"}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre
          className="p-4 text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-mono)",
            color: "oklch(0.85 0.01 265)",
            margin: 0,
          }}
        >
          <code>
            {showLineNumbers ? (
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i}>
                      <td
                        className="select-none pr-4 text-right"
                        style={{
                          color: "oklch(0.4 0.01 265)",
                          minWidth: "2.5rem",
                          verticalAlign: "top",
                          paddingTop: 0,
                          paddingBottom: 0,
                          userSelect: "none",
                          fontSize: "0.8em",
                          lineHeight: "inherit",
                        }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ verticalAlign: "top", paddingTop: 0, paddingBottom: 0 }}>
                        {tokenizeLine(line)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              tokenizeLess(code)
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
