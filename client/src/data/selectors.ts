/**
 * Selectors data for the interactive guide
 * Contains all selector types with Less code examples and CSS output
 */

export interface SelectorDemo {
  id: string;
  title: string;
  description: string;
  lessCode: string;
  cssOutput?: string;
  note?: string;
}

export interface SelectorCategory {
  id: string;
  title: string;
  description: string;
  selectors: SelectorDemo[];
}

export const selectorCategories: SelectorCategory[] = [
  {
    id: "basic-selectors",
    title: "基础选择器",
    description: "CSS 和 Less 中最基本的选择器类型，构成所有复杂选择器的基础。",
    selectors: [
      {
        id: "type-selector",
        title: "类型选择器 (Type Selector)",
        description: "通过 HTML 元素名称选择元素。在 CSS Modules 中，类型选择器默认是全局的，不会被哈希化。",
        lessCode: `// 类型选择器 - 选择所有 <p> 元素
p {
  color: #e2e8f0;
  line-height: 1.6;
  font-size: 14px;
}

// 多个类型选择器
h1, h2, h3 {
  font-weight: bold;
  color: #60a5fa;
}`,
        cssOutput: `p {
  color: #e2e8f0;
  line-height: 1.6;
  font-size: 14px;
}

h1, h2, h3 {
  font-weight: bold;
  color: #60a5fa;
}`,
        note: "在 .module.less 中，类型选择器不会被哈希化，会影响全局样式。建议配合 :local() 或嵌套在类选择器内使用。",
      },
      {
        id: "class-selector",
        title: "类选择器 (Class Selector)",
        description: "通过 class 属性选择元素。这是 CSS Modules 的核心，默认会被哈希化为唯一的局部作用域类名。",
        lessCode: `// 类选择器 - 在 CSS Modules 中会被哈希化
.button {
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

// 多类选择器
.button.active {
  background-color: #1d4ed8;
}`,
        cssOutput: `/* 编译后类名会被哈希化 */
.button_a1b2c3 {
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
}

.button_a1b2c3.active_d4e5f6 {
  background-color: #1d4ed8;
}`,
        note: "CSS Modules 会将 .button 转换为类似 .button_a1b2c3 的唯一类名，避免全局命名冲突。",
      },
      {
        id: "id-selector",
        title: "ID 选择器 (ID Selector)",
        description: "通过元素的 id 属性选择唯一元素。在 CSS Modules 中，ID 选择器也会被局部化。",
        lessCode: `// ID 选择器
#header {
  height: 60px;
  background: #1e293b;
  display: flex;
  align-items: center;
}

// ID 与类组合
#header .nav-item {
  color: #94a3b8;
  padding: 0 12px;
}`,
        cssOutput: `#header_xyz123 {
  height: 60px;
  background: #1e293b;
  display: flex;
  align-items: center;
}

#header_xyz123 .nav-item_abc456 {
  color: #94a3b8;
  padding: 0 12px;
}`,
        note: "ID 在页面中应唯一，CSS Modules 中 ID 选择器也会被哈希化。但通常在组件化开发中，类选择器比 ID 选择器更常用。",
      },
      {
        id: "universal-selector",
        title: "通用选择器 (Universal Selector)",
        description: "* 选择所有元素，常用于重置样式或在特定上下文中应用全局规则。",
        lessCode: `// 通用选择器 - 选择所有元素
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// 在特定容器内使用通用选择器
.container {
  * {
    font-family: inherit;
  }
}`,
        cssOutput: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container * {
  font-family: inherit;
}`,
      },
    ],
  },
  {
    id: "combinator-selectors",
    title: "组合选择器",
    description: "通过元素之间的关系来选择元素，包括后代、子元素、相邻兄弟等关系。",
    selectors: [
      {
        id: "descendant-selector",
        title: "后代选择器 (Descendant Combinator)",
        description: "选择某元素内部的所有指定后代元素（不限层级深度），使用空格分隔。",
        lessCode: `// 后代选择器 - 选择 .card 内所有 p 元素
.card {
  padding: 16px;
  
  p {
    // 在 Less 中，嵌套自动生成后代选择器
    color: #94a3b8;
    margin-bottom: 8px;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
  }
}`,
        cssOutput: `/* 编译后 */
.card {
  padding: 16px;
}

.card p {
  color: #94a3b8;
  margin-bottom: 8px;
}

.card .title {
  font-size: 18px;
  font-weight: 600;
}`,
        note: "Less 的嵌套语法会自动生成后代选择器，这是 Less 最常用的特性之一。",
      },
      {
        id: "child-selector",
        title: "子选择器 (Child Combinator >)",
        description: "只选择直接子元素，不选择更深层的后代。使用 > 符号。",
        lessCode: `// 子选择器 - 只选择直接子元素
.menu {
  list-style: none;
  
  > li {
    // 只选择 .menu 的直接 li 子元素
    padding: 8px 12px;
    border-bottom: 1px solid #334155;
    
    > a {
      // 只选择 li 的直接 a 子元素
      color: #e2e8f0;
      text-decoration: none;
    }
  }
}`,
        cssOutput: `.menu {
  list-style: none;
}

.menu > li {
  padding: 8px 12px;
  border-bottom: 1px solid #334155;
}

.menu > li > a {
  color: #e2e8f0;
  text-decoration: none;
}`,
      },
      {
        id: "adjacent-sibling",
        title: "相邻兄弟选择器 (Adjacent Sibling +)",
        description: "选择紧跟在指定元素之后的第一个同级兄弟元素。使用 + 符号。",
        lessCode: `// 相邻兄弟选择器
.form-group {
  margin-bottom: 16px;
  
  label {
    display: block;
    color: #94a3b8;
    margin-bottom: 4px;
  }
  
  // label 后面紧跟的 input
  label + input {
    border: 1px solid #334155;
    padding: 8px;
    border-radius: 4px;
  }
}

// 段落后面的段落去掉上边距
p + p {
  margin-top: 0;
}`,
        cssOutput: `.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  color: #94a3b8;
  margin-bottom: 4px;
}

.form-group label + input {
  border: 1px solid #334155;
  padding: 8px;
  border-radius: 4px;
}

p + p {
  margin-top: 0;
}`,
      },
      {
        id: "general-sibling",
        title: "通用兄弟选择器 (General Sibling ~)",
        description: "选择指定元素之后的所有同级兄弟元素（不限紧邻）。使用 ~ 符号。",
        lessCode: `// 通用兄弟选择器
.checkbox {
  display: none;
  
  // 选中 checkbox 后，其后所有 .panel 兄弟元素
  &:checked ~ .panel {
    display: block;
    animation: fadeIn 0.3s ease;
  }
}

h2 ~ p {
  // h2 之后的所有同级 p 元素
  color: #94a3b8;
  font-size: 14px;
}`,
        cssOutput: `.checkbox {
  display: none;
}

.checkbox:checked ~ .panel {
  display: block;
  animation: fadeIn 0.3s ease;
}

h2 ~ p {
  color: #94a3b8;
  font-size: 14px;
}`,
      },
    ],
  },
  {
    id: "pseudo-classes",
    title: "伪类选择器",
    description: "基于元素的状态或位置来选择元素，而不是基于其名称、属性或内容。",
    selectors: [
      {
        id: "state-pseudo",
        title: "状态伪类 (:hover, :focus, :active)",
        description: "根据用户交互状态选择元素。在 Less 中使用 & 符号与父选择器组合。",
        lessCode: `// 状态伪类 - 使用 & 引用父选择器
.btn {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
  
  &:focus {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(0);
    background: #1d4ed8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}`,
        cssOutput: `.btn {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn:focus {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}

.btn:active {
  transform: translateY(0);
  background: #1d4ed8;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
      },
      {
        id: "structural-pseudo",
        title: "结构伪类 (:nth-child, :first-child, :last-child)",
        description: "根据元素在其父元素中的位置来选择元素。",
        lessCode: `// 结构伪类
.list {
  li {
    padding: 8px 12px;
    
    &:first-child {
      border-radius: 8px 8px 0 0;
      background: #1e3a5f;
    }
    
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
    
    // 奇数行
    &:nth-child(odd) {
      background: #1e293b;
    }
    
    // 偶数行
    &:nth-child(even) {
      background: #0f172a;
    }
    
    // 每3个中的第2个
    &:nth-child(3n+2) {
      color: #60a5fa;
    }
    
    // 最后3个元素
    &:nth-last-child(-n+3) {
      opacity: 0.7;
    }
  }
}`,
        cssOutput: `.list li { padding: 8px 12px; }
.list li:first-child { border-radius: 8px 8px 0 0; background: #1e3a5f; }
.list li:last-child { border-radius: 0 0 8px 8px; }
.list li:nth-child(odd) { background: #1e293b; }
.list li:nth-child(even) { background: #0f172a; }
.list li:nth-child(3n+2) { color: #60a5fa; }
.list li:nth-last-child(-n+3) { opacity: 0.7; }`,
      },
      {
        id: "form-pseudo",
        title: "表单伪类 (:checked, :valid, :required)",
        description: "专门用于表单元素的状态伪类，可以实现纯 CSS 的交互效果。",
        lessCode: `// 表单伪类
.form {
  input {
    border: 2px solid #334155;
    padding: 8px 12px;
    border-radius: 6px;
    transition: border-color 0.2s;
    
    &:required {
      border-left: 3px solid #f59e0b;
    }
    
    &:valid {
      border-color: #10b981;
    }
    
    &:invalid:not(:placeholder-shown) {
      border-color: #ef4444;
    }
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }
  
  input[type="checkbox"] {
    &:checked + label {
      color: #10b981;
      text-decoration: line-through;
    }
  }
}`,
      },
      {
        id: "not-pseudo",
        title: "否定伪类 (:not())",
        description: "选择不符合指定选择器的元素，可以接受复杂的选择器参数。",
        lessCode: `// :not() 否定伪类
.nav {
  a {
    color: #94a3b8;
    
    // 选择所有非 active 的链接
    &:not(.active) {
      opacity: 0.7;
    }
    
    // 选择非最后一个
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}

// 选择非禁用的按钮
button:not(:disabled) {
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
}`,
        cssOutput: `.nav a { color: #94a3b8; }
.nav a:not(.active) { opacity: 0.7; }
.nav a:not(:last-child) { margin-right: 16px; }
button:not(:disabled) { cursor: pointer; }
button:not(:disabled):hover { opacity: 0.9; }`,
      },
      {
        id: "is-where-has",
        title: "现代伪类 (:is(), :where(), :has())",
        description: "CSS Level 4 新增的强大伪类，:is() 和 :where() 简化选择器列表，:has() 实现父元素选择。",
        lessCode: `// :is() - 匹配列表中任意一个选择器
:is(h1, h2, h3, h4) {
  font-family: var(--font-display);
  line-height: 1.3;
}

// :where() - 与 :is() 类似但优先级为 0
:where(.card, .panel, .modal) {
  border-radius: 8px;
  overflow: hidden;
}

// :has() - 选择包含特定子元素的父元素
.form-group {
  // 包含 input:required 的 .form-group
  &:has(input:required) {
    label::after {
      content: " *";
      color: #ef4444;
    }
  }
  
  // 包含 input:valid 的 .form-group
  &:has(input:valid) {
    border-color: #10b981;
  }
}`,
      },
    ],
  },
  {
    id: "pseudo-elements",
    title: "伪元素选择器",
    description: "伪元素允许你为元素的特定部分添加样式，或在元素前后插入内容。",
    selectors: [
      {
        id: "before-after",
        title: "::before 和 ::after",
        description: "在元素内容的前面或后面插入生成内容。这是 CSS 中最常用的伪元素。",
        lessCode: `// ::before 和 ::after
.badge {
  position: relative;
  display: inline-block;
  padding: 4px 12px;
  background: #1e3a5f;
  border-radius: 20px;
  color: #60a5fa;
  
  // 在文字前添加图标
  &::before {
    content: "✦";
    margin-right: 6px;
    color: #f59e0b;
  }
  
  // 添加装饰线
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: linear-gradient(to right, transparent, #3b82f6, transparent);
  }
}

// 引用样式
blockquote {
  &::before {
    content: '"';
    font-size: 4em;
    color: #334155;
    line-height: 0;
    vertical-align: -0.4em;
  }
}`,
      },
      {
        id: "first-line-letter",
        title: "::first-line 和 ::first-letter",
        description: "分别选择文本的第一行和第一个字符，常用于排版效果。",
        lessCode: `// ::first-line 和 ::first-letter
.article {
  p {
    &::first-line {
      font-weight: 600;
      color: #e2e8f0;
      letter-spacing: 0.05em;
    }
  }
  
  // 首字下沉效果
  > p:first-of-type {
    &::first-letter {
      font-size: 3.5em;
      font-weight: 700;
      float: left;
      line-height: 0.8;
      margin: 0.1em 0.1em 0 0;
      color: #60a5fa;
    }
  }
}`,
      },
      {
        id: "selection-placeholder",
        title: "::selection 和 ::placeholder",
        description: "::selection 自定义文本选中样式，::placeholder 自定义输入框占位符样式。",
        lessCode: `// ::selection - 文本选中样式
::selection {
  background: rgba(59, 130, 246, 0.3);
  color: #e2e8f0;
}

.code-block {
  ::selection {
    background: rgba(16, 185, 129, 0.3);
  }
}

// ::placeholder - 输入框占位符
.input {
  color: #e2e8f0;
  
  &::placeholder {
    color: #475569;
    font-style: italic;
  }
  
  &:focus::placeholder {
    color: #64748b;
  }
}`,
      },
      {
        id: "scrollbar",
        title: "::scrollbar 系列",
        description: "自定义滚动条样式（WebKit 浏览器支持），包括滚动条轨道、滑块等部分。",
        lessCode: `// 自定义滚动条
.scroll-container {
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0f172a;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 3px;
    
    &:hover {
      background: #475569;
    }
  }
  
  &::-webkit-scrollbar-corner {
    background: #0f172a;
  }
}`,
      },
    ],
  },
  {
    id: "attribute-selectors",
    title: "属性选择器",
    description: "根据元素的属性或属性值来选择元素，提供了强大的无类名选择能力。",
    selectors: [
      {
        id: "attr-presence",
        title: "属性存在选择器 [attr]",
        description: "选择具有指定属性的元素，无论属性值是什么。",
        lessCode: `// 属性存在选择器
// 选择所有有 href 属性的 a 元素
a[href] {
  color: #60a5fa;
  text-decoration: underline;
}

// 选择有 disabled 属性的元素
[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

// 选择有 data-tooltip 属性的元素
[data-tooltip] {
  position: relative;
  cursor: help;
  
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  &:hover::after {
    opacity: 1;
  }
}`,
      },
      {
        id: "attr-value",
        title: "属性值选择器 [attr=value]",
        description: "精确匹配属性值，以及各种模糊匹配方式（前缀、后缀、包含等）。",
        lessCode: `// 精确匹配
input[type="text"] {
  border: 1px solid #334155;
}

input[type="submit"] {
  background: #3b82f6;
  color: white;
}

// 包含匹配 [attr*=value]
a[href*="github"] {
  color: #f0f6fc;
  
  &::before {
    content: "⬡ ";
  }
}

// 前缀匹配 [attr^=value]
a[href^="https"] {
  // 所有 HTTPS 链接
  &::after {
    content: " 🔒";
    font-size: 0.8em;
  }
}

// 后缀匹配 [attr$=value]
a[href$=".pdf"] {
  // 所有 PDF 链接
  color: #ef4444;
  
  &::after {
    content: " [PDF]";
    font-size: 0.75em;
  }
}

// 单词匹配 [attr~=value]
[class~="highlight"] {
  background: rgba(251, 191, 36, 0.2);
}

// 连字符前缀匹配 [attr|=value]
[lang|="zh"] {
  // 匹配 zh, zh-CN, zh-TW 等
  font-family: "PingFang SC", sans-serif;
}`,
      },
    ],
  },
  {
    id: "css-modules-specific",
    title: "CSS Modules 特有语法",
    description: "CSS Modules 在标准 CSS 基础上扩展的特有语法，用于控制作用域和样式复用。",
    selectors: [
      {
        id: "local-global",
        title: ":local() 和 :global()",
        description: ":local() 声明局部作用域（默认），:global() 声明全局作用域，不会被哈希化。",
        lessCode: `// :global() - 声明全局样式，不会被哈希化
// 常用于覆盖第三方组件库样式
:global {
  .ant-btn {
    border-radius: 6px;
  }
  
  .ant-modal-content {
    background: #1e293b;
  }
}

// 也可以单独使用
:global(.some-global-class) {
  color: #60a5fa;
}

// :local() - 显式声明局部（通常不需要，因为默认就是局部）
:local(.myLocalClass) {
  color: #10b981;
}

// 混合使用
.wrapper {
  // .wrapper 是局部的
  
  :global(.ant-input) {
    // 在 .wrapper 内部，覆盖 ant-input 的全局样式
    background: #0f172a;
    color: #e2e8f0;
  }
}`,
        note: "在实际开发中，:global() 最常用于覆盖第三方 UI 库（如 Ant Design、Element Plus）的样式，而不破坏 CSS Modules 的局部作用域。",
      },
      {
        id: "composes",
        title: "composes 样式组合",
        description: "composes 允许一个类继承另一个类的所有样式，类似于 Less 的 extend，但在 CSS Modules 层面实现。",
        lessCode: `// 基础样式
.baseButton {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

// 通过 composes 继承基础样式
.primaryButton {
  composes: baseButton;
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
  }
}

.dangerButton {
  composes: baseButton;
  background: #ef4444;
  color: white;
  
  &:hover {
    background: #dc2626;
  }
}

// 从其他文件导入并组合
.specialButton {
  composes: baseButton from './shared.module.less';
  color: #f59e0b;
}`,
        note: "composes 在 JavaScript 层面实现，会将多个类名合并。例如 styles.primaryButton 的值可能是 'primaryButton_a1b2 baseButton_c3d4'。",
      },
    ],
  },
];
