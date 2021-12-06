/**
 * 需要对某一规则忽略时，可以使用 stylelint-disable 来处理，比如
 * \/* stylelint-disable color-no-hex *\/
 * 基于 stylelint-config-standard
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {
    'number-leading-zero': 'never',
    // 以下排序参考 https://github.com/sasstools/sass-lint/blob/develop/lib/config/property-sort-orders/smacss.yml 和 Bootstrap 并做了调整
    'order/properties-order': [
      // 伪类内容
      'content',

      // Layout
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'box-sizing',
      'display',

      // Flex Layout
      'flex', // flex属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto
      'flex-align',
      'flex-basis', // 设置主轴上的初始大小
      'flex-direction',
      'flex-wrap',
      'flex-flow', // flex-direction 和 flex-wrap 的简写形式，默认值为row nowrap
      'flex-shrink',
      'flex-grow',
      'flex-order',
      'flex-pack',
      'align-content',
      'align-items',
      'align-self',
      'justify-content',
      'order',

      // Box
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',

      // Border
      'border',
      'border-width',
      'border-style',
      'border-color',
      'border-top',
      'border-top-width',
      'border-top-style',
      'border-top-color',
      'border-right',
      'border-right-width',
      'border-right-style',
      'border-right-color',
      'border-bottom',
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color',
      'border-left',
      'border-left-width',
      'border-left-style',
      'border-left-color',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-image',
      'border-image-source',
      'border-image-slice',
      'border-image-width',
      'border-image-outset',
      'border-image-repeat',
      'border-spacing',
      'border-collapse',

      // 描边
      'outline',
      'outline-width',
      'outline-style',
      'outline-color',
      'outline-offset',
      'box-shadow',

      // Overflow
      'overflow',
      'overflow-x',
      'overflow-y',
      '-webkit-overflow-scrolling',
      '-ms-overflow-style',

      // 浮动
      'float',
      'clear',

      // 列布局
      'columns',
      'column-count',
      'column-fill',
      'column-gap',
      'column-rule',
      'column-rule-width',
      'column-rule-style',
      'column-rule-color',
      'column-span',
      'column-width',

      // grid 布局
      'grid',
      'grid-after',
      'grid-area',
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-auto-rows',
      'grid-before',
      'grid-column',
      'grid-column-end',
      'grid-column-gap',
      'grid-column-start',
      'grid-columns',
      'grid-end',
      'grid-gap',
      'grid-row',
      'grid-row-end',
      'grid-row-gap',
      'grid-row-start',
      'grid-rows',
      'grid-start',
      'grid-template',
      'grid-template-areas',
      'grid-template-columns',
      'grid-template-rows',

      // 字体和排版
      'font',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'font-variant', // 定义小型大写字母
      'font-size-adjust', // 调整字体大小，目前只有 Firefox 实现了
      'font-stretch', // 为字体定义一个正常或经过伸缩变形的字体外观
      'font-effect',
      'font-emphasize', // 目前浏览器不支持
      'font-emphasize-position',
      'font-emphasize-style',
      'font-smooth',
      'font-smoothing',
      '-moz-osx-font-smoothing',
      '-webkit-font-smoothing',
      'src',
      'hyphens', // 断行时连字符的处理
      'line-height',

      // 前景和背景
      'color',
      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-attachment',
      'background-position',
      'background-position-x',
      'background-position-y',
      'background-clip',
      'background-origin',
      'background-size',
      'filter', // 过滤
      'clip',

      // 填充和边框
      'fill', // svg 中填充
      'stroke',
      'stroke-width',
      'stroke-linecap',
      'stroke-dasharray',
      'stroke-dashoffset',

      // 文本
      'text-align',
      'text-align-last',
      'text-emphasis', // 目前 Firefox 和 Chrome 浏览器支持
      'text-emphasis-color',
      'text-emphasis-style',
      'text-emphasis-position',
      'text-decoration',
      'text-indent',
      'text-justify',
      'text-outline',
      'text-overflow',
      'text-overflow-ellipsis',
      'text-overflow-mode',
      'text-shadow',
      'text-transform',
      'text-wrap',
      'text-rendering', // 文本渲染，https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-rendering
      '-webkit-text-size-adjust',
      '-ms-text-size-adjust',
      'letter-spacing',
      '-webkit-line-clamp',
      'word-break',
      'word-spacing',
      'word-wrap',
      'overflow-wrap',
      'tab-size',
      'white-space',
      'vertical-align',
      'direction', // 设置文本的显示方向
      'unicode-bidi', // 设置文本方向

      // List
      'list-style',
      'list-style-position',
      'list-style-type',
      'list-style-image',

      // 其他布局样式
      'table-layout',
      'empty-cells',
      'caption-side',

      // 动画
      'opacity',
      '-ms-interpolation-mode',
      'perspective', // 元素被查看位置的视图
      'animation',
      'animation-name',
      'animation-duration',
      'animation-play-state',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'transform',
      'transform-box', // 布局框，https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-box
      'transform-origin',
      'transform-style', // 设置元素的子元素是位于 3D 空间中还是平面中，https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style
      'backface-visibility',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'will-change', // https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change

      // 鼠标和DOM元素是否可以选择或触发事件
      'cursor',
      'pointer-events',
      'user-select',

      // Other
      'resize',
      'touch-action',
      'visibility',
      'quotes',
      'counter-reset',
      'counter-increment',
      'nav-index',
      'nav-up',
      'nav-right',
      'nav-down',
      'nav-left',
      'appearance', // 设置元素的默认展示样式
      'speak',
      'zoom',

      // 打印属性
      'orphans',
      'page-break-after',
      'page-break-before',
      'page-break-inside',
      'widows',
    ],
  },
};
