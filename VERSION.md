
## v0.9.1

日期：

2026-06-20

完成：

* utils.js 成立
* pointInText() 迁移完成
* getTopText() 迁移完成
* getDistance() 迁移完成
* getAngle() 迁移完成

归位完成：

* opacityBtn.onclick
* opacityMinus.onclick
* opacityPlus.onclick

迁移完成：

* textBtn.onclick
  templateEditor.js → textEditor.js

验收：

* touch.js 检查通过
* text.js 检查通过
* templateEditor.js 检查通过

状态：

MOODAY 第一轮模块分家基本完成
# MOODAY Editor
2026-0607
v1.9.8 规划版本

已确定：
- 8按钮编辑面板
- 6按钮主菜单
- 横向滚动二级菜单
- 韩系手账风方向
- 手绘点缀风方向
- 普通照片产品流程
- 普通相框产品流程
- 魔镜灯光画产品流程

待开发：
- 保存功能
- 产品菜单
- 二级滚动菜单
- 装饰系统
- 点缀系统
# VERSION

## v1.6

已完成

✓ 长按文字编辑

✓ Google Fonts接入

字体：

- 기본체
- 감성체
- 로맨틱
- 베이비
- 무비
- 러블리

✓ 颜色选择

✓ ColorPanel迁移到 editorMenuArea

✓ 字体菜单与颜色菜单共用顶部菜单区

✓ 保存功能

✓ 模板功能

✓ 灯光模式

待完成：

- 字号
- 描边
- 阴影
- 透明度

VERSION.md
V1.5

新增

- Layout4
- Layout5
- templateItem3
- templateItem4

优化

- templateDrawer 高度调整
- drawer-item 间距调整

修复

- 镜子模式覆盖图片
- 模板抽屉遮挡打印按钮

V1.1

✓ Layout1
✓ Layout2
✓ Layout3
✓ Layout4
✓ Layout5

模板系统结构确定

V1.1 Layout 1 定版

主标题
rx:0.07 ry:0.10 size:28

左下标题
rx:0.04 ry:0.82 size:14

左下说明
rx:0.06 ry:0.89 size:10

右下标题
rx:0.66 ry:0.85 size:16

右下说明
rx:0.60 ry:0.95 size:12

状态：
已定版
## V1.0 Stable

日期：2026-06-03

### 已完成

* 五文字块系统
* 文字边界自动校正
* 左对齐系统
* 韩文模板测试版
* 镜子模式隐藏文字
* 镜子模式隐藏装饰
* 灯光模式恢复正常
* 图片框恢复正常
* render.js 结构修复
* draw() 函数恢复正常
2026-06-03

修复：
从镜子模式返回照片模式后图片无法显示问题

原因：
lightMode 未重置

解决：
photoBtn.onclick 增加

lightMode = 0;
### 当前稳定状态

照片模式：

* 图片显示
* 文字显示
* 装饰显示

灯光模式：

* 白光正常
* 暖光正常
* 日光正常

镜子模式：

* 灰镜显示
* 白框显示
* 文字隐藏
* 装饰隐藏

### 下一阶段

* 五种模板排版系统
* 韩文模板库
* 中文模板库
* 中韩语言切换
* 字体系统

# VERSION
v0.9.6

完成：

✓ Relative Position V1

新增：

* titleText 支持 rx、ry
* subTitleText 支持 rx、ry
* thirdText 支持 rx、ry

功能：

* 拖动文字时自动记录 rx、ry
* render.js 根据 rx、ry 自动计算 x、y
* 文字开始跟随 VisibleArea 比例变化
* 照片模式与魔镜模式切换时，文字位置同步跟随

已验证：

* 文字跟随可视区域移动
* 固定 XY 架构开始升级为 Relative Position 架构

待优化：

* 比例换算精度优化
* SafeArea 统一边界系统（10px）
* 文字边界框定位替代中心点定位

v0.9.5

新增：

模式切换自动适配

照片模式自动铺满照片区域

魔镜模式自动铺满魔镜区域

修复：

切换模式后顶部露白问题
## v0.9.4

完成：

* 三文案块系统
* 自动换行
* 模板菜单
* 六大主题
* 氛围系统
* 魔镜模式
* 装饰系统V1

新增：

* ARCHITECTURE.md
* VisibleArea架构正式确认
* Frame架构正式确认
* SafeArea架构正式确认

优化：

* 魔镜灯光画外框整体下移10px
* 魔镜模式视觉居中优化
* 编辑区域视觉平衡优化

开发中：

* SafeArea
* 边界限制
* 装饰拖动

下一版本目标：

v0.9.5

* SafeArea完成
* 文字边界统一
* 装饰拖动完成

发布日期：

2026-06-01
