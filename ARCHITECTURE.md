
2026-06-14
MOODAY

Version

0.8.0

重大更新：

- Product Config 架构上线
- 多产品编辑器支持
- 按钮动态配置
- 六产品体系确定

下一版本：

0.9.0

计划：

- statusPanel
- 规格系统
- 风格系统
- 灯光系统
2026-06-14
# MOODAY Architecture

当前架构：

Home
｜
├─ 普通照片
├─ 相框照片
├─ 证件照
├─ 魔镜灯光画
├─ 头像
└─ 手机壁纸

↓

Product Config

↓

Editor

↓

Button System

↓

Feature Modules

模块规划：

upload
clarity
frame
mood
text
style
light
background
optimize
adjust
preview
submit
download
home
2026-0607
编辑器架构

一级菜单（固定）
- 产品
- 模板
- 边框
- 预览
- 保存
- 导出

二级菜单
- 横向滚动 Scroll
- 根据一级菜单动态切换

编辑面板（固定8按钮）
- 字体
- 颜色
- 大小
- 描边
- 阴影
- 透明度
- 装饰
- 点缀

画布策略
- 竖版产品：画布居中
- 横版产品：画布靠上，菜单上移
- 后期支持横屏编辑模式
# 项目结构

index.html

页面结构

style.css

界面样式

script.js

主逻辑入口

render.js

画布渲染

text.js

文字系统

image.js

图片系统

light.js

灯光系统

state.js

状态管理

touch.js

触摸交互

config.js

配置文件

# MOODAY 编辑器核心架构原则
模板系统

applyTemplate(index)

0 → layout1
1 → layout2
2 → layout3
3 → layout4
4 → layout5

五块文字结构

titleText
leftBottomText
subTitleText
thirdText
rightSubText

# 2026-06-01 正式确认

## 一、核心原则

MOODAY 所有编辑元素：

照片

文字

装饰

灯光

模板

不得以 Canvas 固定坐标作为基准。

不得使用大量写死：

x = 110

y = 60

之类的绝对坐标方案。

未来统一采用：

可视区域（Visible Area）驱动架构。

---

## 二、层级结构

MOODAY 编辑器结构：

Frame
↓

Visible Area
↓

Safe Area
↓

Photo
Text
Decoration

---

## 三、Frame（产品外框）

Frame 代表产品实际外框。

例如：

魔镜灯光画外框

未来景深画外框

未来光栅画外框

Frame 只负责：

产品尺寸

产品比例

产品方向

---

## 四、Visible Area（可视区域）

Visible Area 为用户实际可看到的区域。

也是：

编辑区域

导出区域

打印区域

统一基准。

原则：

所有内容均以 Visible Area 为基准。

而不是 Canvas 为基准。

---

## 五、Safe Area（安全区域）

Safe Area 建立于 Visible Area 内部。

例如：

距离边框 10px

形成：

上边距

下边距

左边距

右边距

安全区域。

文字与装饰不得超出 Safe Area。

---

## 六、文字系统原则

未来：

主文案

辅助文案

情绪文案

均以 Safe Area 为基准。

不允许使用固定：

x = 110

y = 60

作为最终方案。

默认位置允许存在。

但本质属于：

推荐位置。

用户可自由拖动。

系统只负责边界限制。

---

## 七、装饰系统原则

未来：

爱心

花朵

星星

叶子

光点

全部以 Safe Area 为活动范围。

允许自由拖动。

禁止超出安全区域。

---

## 八、照片系统原则

照片模式：

# Visible Area

编辑区域

魔镜模式：

Frame
↓

Visible Area
↓

编辑区域

用户始终编辑 Visible Area。

---

## 九、横版与竖版原则

MOODAY 不存在：

横版产品

竖版产品

两套系统。

本质是：

同一产品

旋转方向不同。

例如：

12 × 17.5

竖版

↓

17.5 × 12

横版

仅修改：

Frame Width

Frame Height

Visible Area 自动重新计算。

其它系统保持不变。

---

## 十、未来产品扩展

未来新增：

魔镜灯光画

四层景深画

光栅画

叶雕艺术

统一采用：

Frame
↓

Visible Area
↓

Safe Area

架构。

无需重新开发坐标系统。

---

## 十一、开发铁律

以后新增功能时：

优先考虑：

相对于 Visible Area

相对于 Safe Area

进行定位。

避免继续增加大量绝对坐标。

核心目标：

边框变化时，

所有元素自动跟随变化。

实现：

一次开发

长期复用。

---
## 十二、产品规格原则

所有产品规格：

12×17.5
15×20
20×30

均以 Frame 为基础。

切换规格时：

自动重新计算 VisibleArea。

照片自动填满 VisibleArea。

文字与装饰保持在 SafeArea 内。

禁止依赖固定 XY 坐标。

## 十二、MOODAY 坐标系统

Frame
↓
VisibleArea
↓
SafeArea
↓
Relative Position (rx, ry)
↓
Render

原则：

1. 不再依赖固定 x、y 坐标
2. 文字、装饰使用 rx、ry 相对坐标
3. 切换规格时自动按比例适配
4. SafeArea 四边统一保留 10px 边距
5. 所有元素禁止拖出 SafeArea

状态：

正式确认。

后续开发全部遵循本原则。

版本：

MOODAY Architecture V1
2026-06-01
