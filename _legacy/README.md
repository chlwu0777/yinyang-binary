# 二进制之道 · 完整网站

此文件夹包含运行「二进制之道」网站所需的全部文件。

## 文件结构

```
完整网站/
├── index.html                    # 入口页面
├── tao-of-binary_1.jsx           # 主组件
├── tao-of-binary-lines.preview.js # 六十四卦爻辞数据
├── portraits/                     # 先贤头像
│   ├── fuxi.png       (伏羲)
│   ├── kingwen.png    (周文王)
│   ├── confucius.png  (孔子)
│   ├── shaoyong.png   (邵雍)
│   ├── takashima.png  (高岛吞象)
│   ├── wilhelm.png    (卫礼贤)
│   └── jung.png       (荣格)
└── README.md
```

## 启动方式

在终端中进入此文件夹，运行：

```bash
cd 完整网站
python3 -m http.server 8080
```

然后在浏览器打开：**http://localhost:8080**

即可浏览完整网站（含首页、先贤、六十四卦、游戏等）。
