# company-site-yu

公司英文产品展示站。Astro 静态站 + Web3Forms 询盘表单，部署在 Cloudflare Pages（Direct Upload）。

需要 Node ≥ 22.22。

## 常用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地开发，访问 http://localhost:4321 |
| `npm run build` | 类型检查 + 内容校验 + 构建到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run deploy` | 构建并发布到 Cloudflare Pages |

## 日常维护

### 新增 / 修改产品

1. 把图片放到 `src/assets/products/<产品slug>/`，例如 `1.jpg`、`2.jpg`（第一张是封面，建议正方形，原图直接放即可，构建时会自动压缩成 WebP）
2. 在 `src/content/products/` 新建 `<产品slug>.md`，文件名就是网址：`/products/<产品slug>/`。照着现有文件填：

```md
---
title: 产品名
category: image-intensifier-tubes   # 对应 src/content/categories/ 下的文件名
images:
  - ../../assets/products/<产品slug>/1.jpg
summary: 一两句话简介（≤200 字符，用于列表卡片和搜索引擎描述）
specs:
  - { name: FOM, value: "2300+" }   # 参数值一律加引号
featured: true    # 可选，是否在首页推荐
order: 1          # 可选，越小越靠前
---

正文（Markdown，可写段落、列表、加粗）
```

3. `npm run dev` 看效果 → `npm run deploy` 发布 → 提交并推送到 Gitee

漏填必填项（图片、规格等）时 `npm run build` 会直接报错并指出是哪个文件的哪个字段，错误内容不会被发布。

### 新增分类

在 `src/content/categories/` 新建 `<分类slug>.json`（name / description / cover / order），封面图放 `src/assets/categories/`。

### 修改公司信息 / 联系方式 / About

全部在 `src/data/site.json`。`whatsapp` 只写数字（含国家码，不要 `+` 和空格），`whatsappDisplay` 是页面上展示的格式。

## 上线前必须替换的占位内容

- [ ] `astro.config.mjs` 里的 `site` → 正式域名（sitemap、canonical、分享卡片都依赖它）
- [ ] `src/data/site.json` → 公司名、邮箱、WhatsApp、地址、About 文案
- [ ] `src/data/site.json` 的 `web3formsKey` → 在 https://web3forms.com 用接收询盘的邮箱申请
- [ ] `src/content/products/`、`src/content/categories/` 的示例产品和分类
- [ ] `src/assets/` 下所有 PLACEHOLDER 占位图
- [ ] `public/favicon.svg`、`public/favicon.ico` → 公司 Logo

## 首次发布

```bash
npx wrangler login
npm run deploy
```

第一次 deploy 时会提示创建 Pages 项目，完成后得到 `company-site-yu.pages.dev` 预览地址。先在这个地址上把所有页面过一遍，并真实提交一次询盘，确认邮箱能收到。

### 绑定域名（域名上可能有企业邮箱，务必按顺序做）

1. 在原注册商后台导出或截图**全部** DNS 记录，用 `nslookup -type=MX 你的域名` 记下当前邮箱记录
2. Cloudflare 控制台 → Add a domain，逐条核对自动导入的记录，重点是 MX、TXT（SPF/DKIM）
3. 到原注册商把 NS 改成 Cloudflare 给的两个地址，等待生效
4. Pages 项目 → Custom domains，绑定根域名和 `www`
5. 再查一次 MX，并给公司邮箱发一封测试邮件
6. 提交 Google Search Console，并提交 `https://你的域名/sitemap-index.xml`

## 以后升级为可视化后台

内容格式已兼容 Sveltia CMS。届时把仓库迁移到 GitHub，新建一个关联 Git 的 Pages 项目并改绑域名，再加上 `public/admin/` 即可。切换前先让国内同事实测后台的登录和保存。
