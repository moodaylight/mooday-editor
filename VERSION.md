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
