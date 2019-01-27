# XML

## 什么是 XML

XML(可扩展标记语言)，是一种互联网的数据和文档格式；

标记标识一种在文档内表达文档本身结构的方式；

XML 源于一门主要用于发布信息的、名为 SGML(标准通用标记语言)的标记语言，XML 和 HTML 都继承很多 SGML 的特性；

## XML 、HTML 与 SGML

XML 是 SGML 的一个子集，HTML 是一个 SGML 应用；

SVG 使用 XML 表达操作，它是一个 XML 的应用；

### 预定义

XML 预定义较少，HTML 有一套预定义元素系统；

从这一点看，HTML 可以说是 XML 的子集，如果 HTML 是一门具体的标记语言，XML 则可以说是标记语言的零件，例如把它比作可打印字符，SVG 和 HTML 就是具体的一门语言；

## XML 文档结构剖析

- XML 声明

- 元素

元素通常由起始标签和结束标签组成，XML 文档必须包含一个根元素，根元素的名称定义 XML 文档的类型；

- DTD

DTD(文档类型定义)是在特定的文档中告知允许的元素和属性以及约束它们在该文档类型中的显示顺序；

DTD 包含定义元素类型和属性列表的声明；

DTD 声明文档的根元素而不是 DTD 本身，有效的 XML 处理器必须要检查输入文档的 DTD，如果无效文档要被拒绝；

- XML 命名空间



```xml
<!--XML 声明，用于告诉处理应用我们使用的是哪个版本的 XML以及文档使用的字符编码-->
<?xml version="1.0" encoding="us-ascii"?>
<!DOCTYPE authors SYSTEM "http://example.com/authors.dtd">
<authros>
    <person id="teren">
        <name>Teren Yeung</name>
        <nationality>China</nationality>
    </person>
</authros>


```