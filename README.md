# DONGSHENG® Fire Equipment — 外贸独立站

**Fujian Nanan Sheng Xin Lian Fa Fire Equipment Factory（福建省南安市省新联发消防设备厂）**
品牌：东盛 DONGSHENG® · 域名：lianfafire.com

项目制作：**郑在出海 | Warren | 微信：HK-1912**

---

## 一、项目结构

```
lianfafire-site/
├── index.html                    # 首页
├── about.html                    # 公司介绍（产能全链条）
├── products.html                 # 产品总览
├── product-fire-hose-8-65-25.html    # 有衬里消防水带 8-65-25
├── product-fire-hose-10-65-25.html   # 高压消防水带 10-65-25
├── product-fire-hose-reel.html       # 消防软管卷盘（EN 694）
├── product-fire-nozzle.html          # 直流水枪 QZ3.5/7.5 + KY65
├── product-sprinkler-zstz15.html     # 玻璃球洒水喷头 ZSTZ15
├── product-nh-couplings.html         # NH 美标接头 1.5"/2.5"
├── product-agri-hose.html            # 农用平铺水带
├── product-upvc-check-valve.html     # UPVC 止回阀
├── contact.html                  # 联系页（询盘表单）
├── faq.html                      # 常见问题（含 FAQ Schema）
├── privacy.html                  # 隐私政策
├── assets/
│   ├── styles.css                # 设计系统（响应式）
│   ├── script.js                 # 交互（导航/表单/FAQ/语言切换）
│   └── i18n.js                   # 5 语言翻译数据（EN/RU/PT/HI/ZH）
├── robots.txt
├── sitemap.xml
└── llms.txt
```

## 二、本地预览

任意静态服务器即可，例如：

```bash
npx serve .
# 或
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 三、部署到 GitHub + Cloudflare Pages

### 3.1 GitHub
1. 新建仓库：`gh repo create lianfafire-site --public`（或网页创建）
2. 上传：`git init && git add . && git commit -m "Initial site" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`

### 3.2 Cloudflare Pages
1. Cloudflare 控制台 → **Workers & Pages → Create → Pages → Connect to Git**，选择该仓库
2. Build settings：**Framework preset: None**，Build command 留空，Output directory 填 `.`
3. Save & Deploy → 获得 `xxx.pages.dev` 预览域名

### 3.3 绑定自定义域名 lianfafire.com
- Cloudflare Pages → 项目 → **Custom domains → Add**，输入 `lianfafire.com` 和 `www.lianfafire.com`
- 到域名注册商（若在 Cloudflare 则自动）把域名 DNS 托管到 Cloudflare：
  - Apex：`lianfafire.com` → A 记录指向 Cloudflare Pages 提供的 IP（页面会提示）
  - 或 CNAME：`www` → `lianfafire-site.pages.dev`
- Cloudflare 橙色云朵开启（代理），等待 SSL 生效（自动，约 1-5 分钟）

> 若域名不在 Cloudflare：把注册商的 NS 改成 Cloudflare 分配的 2 个 NS（DNS 托管），等待生效后同上绑定。

## 四、上线后 Checklist

- [ ] 用 [Google Search Console](https://search.google.com/search-console) 验证 `lianfafire.com`，提交 `https://lianfafire.com/sitemap.xml`
- [ ] 用 Bing Webmaster 提交同一 sitemap
- [ ] 检查首页/产品页能否正常抓取（Search Console → URL 检查）
- [ ] 建议把询盘表单接入表单服务（Formspree / Basin / 或 Cloudflare Workers）替换当前 mailto 方案（当前方案会打开用户本地邮箱客户端）
- [ ] 替换产品图为自有高清图（当前引用自用户图册的 alicdn 临时链接，建议下载到 assets/images/ 本地化）

## 五、内容维护说明

- **多语言**：全站 UI 支持 EN/RU/PT/HI/ZH 切换，翻译集中在 `assets/i18n.js`；产品正文保持英文（B2B 通用）
- **产品**：新增产品 = 复制一个 `product-*.html` 改内容 + 更新 `products.html`/`index.html` 卡片 + `sitemap.xml` + `llms.txt`
- **联系信息**：`lianfafire@163.com`、WhatsApp `+86-18606051302` 已内置全站

## 六、变更日志

| 日期 | 内容 |
|---|---|
| 2026-08-31 | v1.0 建站完成：14 页面 + 8 产品详情 + 5 语言切换 + SEO/GEO 资产（robots/sitemap/llms/JSON-LD） |
