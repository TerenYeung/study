# 第十二章 SVG 动画

## 动画时间

SVG 动画用到的动画时钟在 SVG 加载完成时开始启动计时，当用户离开页面时停止计时；

## 同步动画

## 重复动作

see p166

## 多级动画时间

当一个动画有多个值时，动画的持续时间就是一次通过所有值得时间，默认情况下，动画的持续时间被划分为每个过渡周期等长的片段，例如有 3 个颜色过渡，总持续时间为 4s，则每个过渡持续 4/3 秒；

keyTimes 属性可以让我们以其他方式划分持续时间，keyTimes 的格式是以分号分隔的列表，必须和 values 条目相同；

对时间的更多控制可以通过 calcMode 属性完成，calcMode 可能有以下四个值：

paced、linear、discrete、spline

## keyPoints 和 keyTimes

## 使用 CSS 处理 SVG 动画

CSS 中给动画元素设置的属性包括：

```txt

animation-name: @keyframes 说明符名称
animation-duration: 动画持续时间
animation-timing-function: 动画在每一动画周期中的执行节奏
animation-iteration-count: 动画重复次数，infinite 表示无限循环
animation-direction: 动画是正向执行还是反向执行，以及是否在二者中交替执行
animation-play-state: running 或 paused
animation-delay: 多久后开始动画
animation-fill-mode: 动画不再执行时使用什么属性，forwards 是动画结束时属性值，backward 是动画开始时的属性值

```