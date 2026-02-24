/**
 * Less syntax features data for the interactive guide
 */

export interface FeatureDemo {
  id: string;
  title: string;
  description: string;
  lessCode: string;
  cssOutput?: string;
  note?: string;
}

export interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  features: FeatureDemo[];
}

export const featureCategories: FeatureCategory[] = [
  {
    id: "variables",
    title: "变量 (Variables)",
    description: "Less 变量使用 @ 符号声明，可以存储颜色、数值、字符串等任何值，并在整个文件中复用。",
    features: [
      {
        id: "basic-variables",
        title: "基础变量声明与使用",
        description: "使用 @ 符号声明变量，可以存储任何 CSS 值。变量支持懒加载，声明顺序不影响使用。",
        lessCode: `// 颜色变量
@primary-color: #3b82f6;
@danger-color: #ef4444;
@text-color: #e2e8f0;
@bg-color: #0f172a;

// 数值变量
@base-font-size: 14px;
@border-radius: 6px;
@spacing-unit: 8px;

// 字符串变量
@font-family: 'Inter', sans-serif;

// 使用变量
.button {
  background: @primary-color;
  color: white;
  font-size: @base-font-size;
  border-radius: @border-radius;
  padding: @spacing-unit (@spacing-unit * 2);
  font-family: @font-family;
  
  &.danger {
    background: @danger-color;
  }
}

.text {
  color: @text-color;
  background: @bg-color;
}`,
        cssOutput: `.button {
  background: #3b82f6;
  color: white;
  font-size: 14px;
  border-radius: 6px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
}

.button.danger {
  background: #ef4444;
}

.text {
  color: #e2e8f0;
  background: #0f172a;
}`,
      },
      {
        id: "variable-interpolation",
        title: "变量插值 (Variable Interpolation)",
        description: "使用 @{variable} 语法将变量插入到选择器名、属性名或 URL 中。",
        lessCode: `// 变量插值 - 用于选择器名
@component: card;
@theme: dark;

.@{component} {
  // 生成 .card
  background: #1e293b;
}

.@{component}-@{theme} {
  // 生成 .card-dark
  background: #0f172a;
}

// 用于属性名
@property: color;
@direction: top;

.element {
  @{property}: #60a5fa;
  border-@{direction}: 2px solid #334155;
  // 生成: color: #60a5fa; border-top: 2px solid #334155;
}

// 用于 URL
@images-path: "/assets/images";

.hero {
  background-image: url("@{images-path}/hero.jpg");
}`,
        cssOutput: `.card {
  background: #1e293b;
}

.card-dark {
  background: #0f172a;
}

.element {
  color: #60a5fa;
  border-top: 2px solid #334155;
}

.hero {
  background-image: url("/assets/images/hero.jpg");
}`,
      },
      {
        id: "variable-variables",
        title: "变量的变量 (Variable Variables)",
        description: "使用 @@ 语法，可以用一个变量的值作为另一个变量的名称，实现动态变量引用。",
        lessCode: `// 变量的变量
@primary: #3b82f6;
@secondary: #10b981;
@danger: #ef4444;

// 通过字符串变量引用颜色变量
@theme-color: primary;

.themed-element {
  // @@theme-color 等同于 @primary
  color: @@theme-color;
}

// 实际应用：主题系统
@current-theme: dark;

@dark-bg: #0f172a;
@dark-text: #e2e8f0;
@light-bg: #ffffff;
@light-text: #1e293b;

.container {
  background: @@current-theme-bg;
  color: @@current-theme-text;
}`,
        cssOutput: `.themed-element {
  color: #3b82f6;
}

.container {
  background: #0f172a;
  color: #e2e8f0;
}`,
      },
      {
        id: "property-as-variable",
        title: "属性作为变量 ($prop)",
        description: "使用 $property 语法，将当前作用域中的 CSS 属性值作为变量引用，避免重复书写。",
        lessCode: `// 属性作为变量 - v3.0.0+
.widget {
  color: #60a5fa;
  // 使用 $color 引用上面定义的 color 属性值
  background-color: $color;
  // 等同于 background-color: #60a5fa;
}

// 更实用的例子
.button {
  background: #3b82f6;
  border: 2px solid $background;
  // border 颜色与背景色相同
  
  &:hover {
    background: #2563eb;
    border-color: $background;
  }
}

// 注意：Less 使用当前作用域内的最后一个定义
.block {
  color: red;
  .inner {
    background: $color; // 使用 blue（最后定义的值）
  }
  color: blue;
}`,
        cssOutput: `.widget {
  color: #60a5fa;
  background-color: #60a5fa;
}

.button {
  background: #3b82f6;
  border: 2px solid #3b82f6;
}

.button:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.block {
  color: red;
  color: blue;
}
.block .inner {
  background: blue;
}`,
      },
    ],
  },
  {
    id: "nesting",
    title: "嵌套 (Nesting)",
    description: "Less 的嵌套语法允许你在选择器内部嵌套其他选择器，使代码结构更清晰，避免重复书写父选择器。",
    features: [
      {
        id: "basic-nesting",
        title: "基础嵌套",
        description: "在选择器内部直接嵌套子选择器，Less 会自动生成对应的后代选择器。",
        lessCode: `// 基础嵌套
.nav {
  display: flex;
  background: #1e293b;
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  li {
    position: relative;
    
    a {
      display: block;
      padding: 12px 16px;
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: #e2e8f0;
      }
    }
  }
}`,
        cssOutput: `.nav {
  display: flex;
  background: #1e293b;
}

.nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav li {
  position: relative;
}

.nav li a {
  display: block;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.nav li a:hover {
  color: #e2e8f0;
}`,
      },
      {
        id: "parent-selector-ampersand",
        title: "父选择器引用 (&)",
        description: "& 符号代表父选择器，可用于创建伪类、伪元素、BEM 命名、状态类等，是 Less 最强大的特性之一。",
        lessCode: `// & 的多种用法
.button {
  padding: 8px 16px;
  background: #3b82f6;
  
  // 伪类
  &:hover { background: #2563eb; }
  &:active { background: #1d4ed8; }
  
  // 修饰符类 (BEM)
  &--primary { background: #3b82f6; }
  &--danger { background: #ef4444; }
  &--ghost {
    background: transparent;
    border: 1px solid currentColor;
  }
  
  // 子元素 (BEM)
  &__icon { margin-right: 6px; }
  &__text { font-weight: 500; }
  
  // 状态类
  &.is-loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  // 多个 & - 生成所有组合
  & + & { margin-left: 8px; }
  
  // & 在后面 - 反转选择器顺序
  .dark-theme & {
    background: #1e40af;
  }
}`,
        cssOutput: `.button { padding: 8px 16px; background: #3b82f6; }
.button:hover { background: #2563eb; }
.button:active { background: #1d4ed8; }
.button--primary { background: #3b82f6; }
.button--danger { background: #ef4444; }
.button--ghost { background: transparent; border: 1px solid currentColor; }
.button__icon { margin-right: 6px; }
.button__text { font-weight: 500; }
.button.is-loading { opacity: 0.7; pointer-events: none; }
.button + .button { margin-left: 8px; }
.dark-theme .button { background: #1e40af; }`,
      },
      {
        id: "media-query-nesting",
        title: "媒体查询嵌套",
        description: "在 Less 中，可以将 @media 查询嵌套在选择器内部，使响应式代码更易于维护。",
        lessCode: `// 媒体查询嵌套
.container {
  width: 100%;
  padding: 0 16px;
  
  // 嵌套的媒体查询
  @media (min-width: 640px) {
    padding: 0 24px;
  }
  
  @media (min-width: 1024px) {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }
}

.hero {
  font-size: 24px;
  
  @media (min-width: 768px) {
    font-size: 36px;
  }
  
  @media (min-width: 1024px) {
    font-size: 48px;
  }
}`,
        cssOutput: `.container { width: 100%; padding: 0 16px; }
@media (min-width: 640px) { .container { padding: 0 24px; } }
@media (min-width: 1024px) { .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; } }
.hero { font-size: 24px; }
@media (min-width: 768px) { .hero { font-size: 36px; } }
@media (min-width: 1024px) { .hero { font-size: 48px; } }`,
      },
    ],
  },
  {
    id: "mixins",
    title: "混入 (Mixins)",
    description: "Mixins 是 Less 中的代码复用机制，可以将一组属性集合定义为可复用的代码块，支持参数、默认值和条件逻辑。",
    features: [
      {
        id: "basic-mixin",
        title: "基础混入",
        description: "定义可复用的样式块，在其他规则中通过名称调用。",
        lessCode: `// 定义混入
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

// 使用混入
.card {
  .flex-center();
  padding: 24px;
}

.title {
  .text-truncate();
  max-width: 200px;
}

.container {
  .clearfix();
}`,
        cssOutput: `.flex-center { display: flex; align-items: center; justify-content: center; }
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.clearfix::after { content: ""; display: table; clear: both; }
.card { display: flex; align-items: center; justify-content: center; padding: 24px; }
.title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px; }
.container::after { content: ""; display: table; clear: both; }`,
      },
      {
        id: "parametric-mixin",
        title: "参数化混入",
        description: "混入可以接受参数，支持默认值，使其更加灵活和通用。",
        lessCode: `// 带参数的混入
.border-radius(@radius: 6px) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

// 多参数混入
.transition(@property: all, @duration: 0.2s, @easing: ease) {
  transition: @property @duration @easing;
}

// 带默认值的混入
.box-shadow(
  @x: 0,
  @y: 4px,
  @blur: 12px,
  @spread: 0,
  @color: rgba(0, 0, 0, 0.15)
) {
  box-shadow: @x @y @blur @spread @color;
}

// 使用参数化混入
.card {
  .border-radius(12px);
  .transition(transform, 0.3s, cubic-bezier(0.4, 0, 0.2, 1));
  .box-shadow();
  
  &:hover {
    .box-shadow(0, 8px, 24px, 0, rgba(0, 0, 0, 0.25));
    transform: translateY(-2px);
  }
}

.avatar {
  .border-radius(50%);
}`,
        cssOutput: `.card {
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
}

.card:hover {
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.avatar {
  border-radius: 50%;
}`,
      },
      {
        id: "mixin-guards",
        title: "混入守卫 (Mixin Guards)",
        description: "使用 when 关键字为混入添加条件，根据参数值决定是否应用样式，类似于 if/else 逻辑。",
        lessCode: `// 混入守卫
.text-color(@color) when (lightness(@color) > 50%) {
  // 亮色背景使用深色文字
  color: #1e293b;
}

.text-color(@color) when (lightness(@color) <= 50%) {
  // 暗色背景使用浅色文字
  color: #f8fafc;
}

// 使用
.light-bg {
  background: #f0f9ff;
  .text-color(#f0f9ff); // 亮色，使用深色文字
}

.dark-bg {
  background: #0f172a;
  .text-color(#0f172a); // 暗色，使用浅色文字
}

// 多条件守卫
.size(@n) when (@n > 0) and (@n < 5) {
  font-size: (@n * 4px);
}

.size(@n) when (@n >= 5) {
  font-size: (@n * 3px);
}`,
        cssOutput: `.light-bg { background: #f0f9ff; color: #1e293b; }
.dark-bg { background: #0f172a; color: #f8fafc; }`,
      },
      {
        id: "mixin-rest-args",
        title: "可变参数混入 (@arguments, @rest)",
        description: "@arguments 包含所有传入的参数，@rest 包含剩余参数，用于处理不定数量的参数。",
        lessCode: `// @arguments - 代表所有参数
.box-shadow(@x, @y, @blur, @color) {
  // @arguments 等于 "@x @y @blur @color"
  box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}

.card {
  .box-shadow(0, 4px, 12px, rgba(0,0,0,0.2));
}

// @rest - 剩余参数
.multi-transition(@first, @rest...) {
  transition: @first, @rest;
}

.element {
  .multi-transition(
    color 0.2s ease,
    background 0.3s ease,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)
  );
}`,
        cssOutput: `.card {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  -webkit-box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.element {
  transition: color 0.2s ease, background 0.3s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}`,
      },
    ],
  },
  {
    id: "operations-functions",
    title: "运算与函数",
    description: "Less 支持数学运算和丰富的内置函数，可以动态计算颜色、尺寸等值。",
    features: [
      {
        id: "operations",
        title: "数学运算",
        description: "Less 支持加、减、乘、除运算，可以对数值、颜色和变量进行计算。",
        lessCode: `// 数值运算
@base: 8px;
@columns: 12;
@gutter: 16px;

.spacing {
  padding: @base;
  margin: @base * 2;
  gap: @base / 2;
}

// 计算列宽
.col-6 {
  width: (100% / @columns * 6);
}

.col-4 {
  width: (100% / @columns * 4);
}

// 颜色运算
@base-color: #3b82f6;

.element {
  // 颜色加法（通道相加）
  border-color: @base-color + #111;
  // 颜色减法
  background: @base-color - #222;
}

// 单位转换
@width: 100px;
.container {
  width: @width * 2;       // 200px
  padding: @width / 10;    // 10px
  margin: @width + 20px;   // 120px
}`,
        cssOutput: `.spacing {
  padding: 8px;
  margin: 16px;
  gap: 4px;
}

.col-6 { width: 50%; }
.col-4 { width: 33.33333333%; }

.element {
  border-color: #4c93ff;
  background: #196de4;
}

.container {
  width: 200px;
  padding: 10px;
  margin: 120px;
}`,
      },
      {
        id: "color-functions",
        title: "颜色函数",
        description: "Less 提供了丰富的颜色操作函数，可以基于已有颜色生成新颜色，实现主题系统。",
        lessCode: `// 颜色函数
@primary: #3b82f6;

.palette {
  // 亮度调整
  lightest: lighten(@primary, 40%);    // 非常浅
  lighter: lighten(@primary, 20%);     // 较浅
  base: @primary;                       // 基础色
  darker: darken(@primary, 10%);       // 较深
  darkest: darken(@primary, 30%);      // 非常深
  
  // 饱和度调整
  saturated: saturate(@primary, 20%);
  desaturated: desaturate(@primary, 20%);
  
  // 透明度
  alpha-50: fade(@primary, 50%);
  alpha-20: fade(@primary, 20%);
  
  // 混合颜色
  mixed: mix(@primary, #ef4444, 50%);
  
  // 色调旋转
  rotated: spin(@primary, 30);
  
  // 灰度
  greyscale: greyscale(@primary);
  
  // 对比色
  contrast: contrast(@primary, #000, #fff);
}`,
        cssOutput: `.palette {
  lightest: #c3d9fd;
  lighter: #7fb0fb;
  base: #3b82f6;
  darker: #1a6ef4;
  darkest: #0a3a9e;
  saturated: #2278ff;
  desaturated: #558cec;
  alpha-50: rgba(59, 130, 246, 0.5);
  alpha-20: rgba(59, 130, 246, 0.2);
  mixed: #9560ee;
  rotated: #3bb6f6;
  greyscale: #8c8c8c;
  contrast: #ffffff;
}`,
      },
      {
        id: "string-functions",
        title: "字符串与数学函数",
        description: "Less 还提供了字符串处理和数学计算函数，如 escape、e、format 等。",
        lessCode: `// 数学函数
.element {
  width: ceil(2.4px);      // 3px - 向上取整
  height: floor(2.6px);    // 2px - 向下取整
  opacity: round(0.567, 2); // 0.57 - 四舍五入
  font-size: abs(-14px);   // 14px - 绝对值
  padding: max(8px, 12px); // 12px - 最大值
  margin: min(8px, 12px);  // 8px - 最小值
}

// 类型判断函数
.check {
  is-color: iscolor(#fff);      // true
  is-number: isnumber(14px);    // true
  is-string: isstring("hello"); // true
  is-keyword: iskeyword(bold);  // true
  is-pixel: ispixel(14px);      // true
  is-percentage: ispercentage(50%); // true
}

// 颜色信息函数
@color: #3b82f6;
.info {
  hue: hue(@color);           // 色相 (0-360)
  saturation: saturation(@color); // 饱和度
  lightness: lightness(@color);   // 亮度
  red: red(@color);           // 红色通道
  green: green(@color);       // 绿色通道
  blue: blue(@color);         // 蓝色通道
  alpha: alpha(@color);       // 透明度
}`,
      },
    ],
  },
  {
    id: "extend",
    title: "继承 (Extend)",
    description: ":extend 伪类允许一个选择器继承另一个选择器的所有样式，与 Mixins 不同，它通过合并选择器来减少 CSS 输出体积。",
    features: [
      {
        id: "basic-extend",
        title: "基础继承",
        description: "使用 :extend() 让一个选择器继承另一个选择器的样式，生成的 CSS 会合并选择器而不是复制属性。",
        lessCode: `// 基础继承
.base-card {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
}

// 继承 .base-card 的所有样式
.info-card:extend(.base-card) {
  border-color: #3b82f6;
  color: #60a5fa;
}

.warning-card:extend(.base-card) {
  border-color: #f59e0b;
  color: #fbbf24;
}

.error-card:extend(.base-card) {
  border-color: #ef4444;
  color: #f87171;
}`,
        cssOutput: `/* 选择器被合并，不复制属性 */
.base-card,
.info-card,
.warning-card,
.error-card {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
}

.info-card {
  border-color: #3b82f6;
  color: #60a5fa;
}

.warning-card {
  border-color: #f59e0b;
  color: #fbbf24;
}

.error-card {
  border-color: #ef4444;
  color: #f87171;
}`,
        note: "Extend 与 Mixin 的区别：Mixin 会复制属性到每个使用它的地方（CSS 体积较大），而 Extend 会合并选择器（CSS 体积更小，但不能传递参数）。",
      },
      {
        id: "extend-all",
        title: "继承所有实例 (extend all)",
        description: "使用 all 关键字可以继承一个选择器的所有实例，包括其在其他选择器中的出现。",
        lessCode: `// extend all - 继承所有实例
.btn {
  padding: 8px 16px;
  border-radius: 6px;
}

.btn:hover {
  opacity: 0.9;
}

.btn:active {
  transform: scale(0.98);
}

// 继承 .btn 的所有实例（包括 :hover 和 :active）
.my-button:extend(.btn all) {
  background: #3b82f6;
  color: white;
}`,
        cssOutput: `.btn,
.my-button {
  padding: 8px 16px;
  border-radius: 6px;
}

.btn:hover,
.my-button:hover {
  opacity: 0.9;
}

.btn:active,
.my-button:active {
  transform: scale(0.98);
}

.my-button {
  background: #3b82f6;
  color: white;
}`,
      },
    ],
  },
  {
    id: "import-scope",
    title: "导入与作用域",
    description: "Less 的 @import 规则和作用域机制，控制变量和混入的可见范围。",
    features: [
      {
        id: "import-rules",
        title: "@import 导入规则",
        description: "Less 扩展了 CSS 的 @import，支持多种导入关键字来控制导入行为。",
        lessCode: `// 基础导入
@import "variables.less";
@import "mixins.less";
@import "base.less";

// 导入关键字
// reference - 只导入，不输出到 CSS
@import (reference) "mixins.less";

// once - 只导入一次（默认行为）
@import (once) "variables.less";

// multiple - 允许多次导入
@import (multiple) "theme.less";

// less - 强制作为 Less 文件处理
@import (less) "some-file.css";

// css - 保持为 CSS @import，不处理
@import (css) "external.css";

// inline - 直接包含文件内容，不处理
@import (inline) "legacy.css";

// 变量插值用于路径
@theme: "dark";
@import "@{theme}/styles.less";`,
        note: "@import (reference) 是最常用的导入方式，它允许你使用其他文件中的变量和混入，但不会将那些文件的样式输出到最终 CSS 中。",
      },
      {
        id: "scope",
        title: "作用域 (Scope)",
        description: "Less 变量有块级作用域，内层变量会遮蔽外层同名变量，且变量支持懒加载（声明顺序不影响使用）。",
        lessCode: `// 作用域示例
@color: red; // 全局变量

.outer {
  @color: blue; // 外层局部变量
  
  color: @color; // blue
  
  .inner {
    @color: green; // 内层局部变量
    color: @color; // green
  }
  
  .sibling {
    color: @color; // blue（使用外层变量）
  }
}

// 懒加载 - 变量可以在使用后声明
.lazy {
  width: @lazy-width;
}

@lazy-width: 200px; // 在使用后声明，仍然有效

// 最后定义生效
@var: 1;
.class {
  @var: 2;
  .inner {
    @var: 3;
    value: @var; // 3（使用最后定义的值）
    @var: 4;     // 这里重新定义
    // 实际输出：value: 4
  }
  value: @var; // 2
}`,
        cssOutput: `.outer { color: blue; }
.outer .inner { color: green; }
.outer .sibling { color: blue; }
.lazy { width: 200px; }
.class { value: 2; }
.class .inner { value: 4; }`,
      },
    ],
  },
  {
    id: "maps-detached",
    title: "映射与分离规则集",
    description: "Less 的高级特性，允许将规则集作为数据结构使用，实现更复杂的样式逻辑。",
    features: [
      {
        id: "maps",
        title: "映射 (Maps)",
        description: "Less 3.5+ 支持将混入和规则集作为映射（类似 JavaScript 对象），通过键名访问值。",
        lessCode: `// 映射 - 使用混入作为键值对存储
#colors() {
  primary: #3b82f6;
  secondary: #10b981;
  danger: #ef4444;
  warning: #f59e0b;
  text: #e2e8f0;
  bg: #0f172a;
}

// 访问映射中的值
.button {
  background: #colors[primary];
  color: #colors[text];
  
  &.danger {
    background: #colors[danger];
  }
}

// 主题映射
#theme() {
  font-size: 14px;
  border-radius: 6px;
  spacing: 8px;
}

.card {
  font-size: #theme[font-size];
  border-radius: #theme[border-radius];
  padding: #theme[spacing];
}`,
        cssOutput: `.button {
  background: #3b82f6;
  color: #e2e8f0;
}

.button.danger {
  background: #ef4444;
}

.card {
  font-size: 14px;
  border-radius: 6px;
  padding: 8px;
}`,
      },
      {
        id: "detached-rulesets",
        title: "分离规则集 (Detached Rulesets)",
        description: "将一组 CSS 规则存储在变量中，然后在需要时调用，实现更灵活的代码复用。",
        lessCode: `// 分离规则集 - 将规则集存储在变量中
@mobile-styles: {
  font-size: 14px;
  padding: 8px;
  display: block;
};

@desktop-styles: {
  font-size: 16px;
  padding: 16px;
  display: flex;
};

// 使用分离规则集
.component {
  @mobile-styles();
  
  @media (min-width: 1024px) {
    @desktop-styles();
  }
}

// 作为参数传递
.apply-theme(@theme) {
  @theme();
}

@dark-theme: {
  background: #0f172a;
  color: #e2e8f0;
};

.dark-section {
  .apply-theme(@dark-theme);
}`,
        cssOutput: `.component {
  font-size: 14px;
  padding: 8px;
  display: block;
}

@media (min-width: 1024px) {
  .component {
    font-size: 16px;
    padding: 16px;
    display: flex;
  }
}

.dark-section {
  background: #0f172a;
  color: #e2e8f0;
}`,
      },
    ],
  },
];
