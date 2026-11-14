# Hakuei's Blog

以 Hexo 7.2.0 與本地 Vivia 主題建立的靜態部落格。

## 本機操作

需要 Node.js 與 npm。使用支援 `node --test` 的 Node.js 版本執行回歸檢查。

```sh
npm ci
npm test
npm run clean
npm run build
npm run server
```

預覽網址預設為 http://localhost:4000。建置輸出在 `public/`。

## 內容與設定

- `source/_posts/`：Markdown 文章。
- `source/about/index.md`：關於我頁面。
- `source/images/`：圖片。
- `_config.yml`：網站設定、永久連結與部署目標。
- `_config.vivia.yml`：主題與評論設定。
- `themes/vivia/`：實際使用的本地主題，包含客製修改，必須納入 Git。

新增文章：`npx hexo new "文章名稱"`。

含 Vue `{{ }}` 範例且不需要 Hexo 標籤的文章，可在 frontmatter 加上
`disableNunjucks: true`，避免範例被當成模板解析；該文章也會停用 Hexo 的模板標籤。

## Git 與部署

本儲存庫管理原始碼、文章、圖片、設定、主題與 lockfile。
`node_modules/`、`public/`、`db.json`、`.deploy_git/` 與環境變數檔案不納入版本管理。

目前尚未設定原始碼儲存庫 remote。之後應將原始碼備份到 GitHub，並明確區分原始碼與部署產物。

`npm run deploy` 會執行遠端寫入。現有 `_config.yml` 目標是
`https://github.com/hakuei0115/hakuei_blog` 的 `master` 分支；舊 `.deploy_git/`
的 remote 則指向另一個儲存庫。正式部署前需釐清目標與 GitHub Pages 設定。
本次修復未部署，也未修改既有部署目錄。

`source/CNAME` 保留自訂網域 `hakueiweb.site`。Valine 的瀏覽器端設定會出現在生成頁面中。

## 回歸檢查

`npm test` 驗證 Vue 文章可渲染並保留雙大括號範例，以及分類樹的深度限制。
`npm run clean && npm run build` 驗證整站能從乾淨的快取重新生成。
