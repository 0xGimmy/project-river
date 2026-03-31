# Awesome 100 / 超讚100選

幫 100 個沒網站、沒資源、但還在做事的 NGO/公益組織免費做 one-pager 網站。

## 關聯專案

- 超讚指南 (`/Users/puravida/Developer/hypercerts_guide`) — 母站，showcase 頁面會從本 repo 的 `manifest.json` 自動撈資料顯示
- NGO 網站做完 → manifest 更新 → 超讚指南自動出現，不需手動寫文章

## 架構決策

- **本 repo（project_river → 內部代號 awesome_hundred）**= 宣傳頁 + 模板 + 產生工具 + manifest.json，部署到 `awesome100.hypercerts.guide`
- **每個 NGO = 獨立 repo（`awesome100-<slug>`）**，各自部署到 `<slug>.hypercerts.guide`
- **manifest.json** 記錄所有 NGO 狀態，供超讚指南主站讀取
- **部署：** Cloudflare Pages（免費），每個 repo 各自接
- **轉移：** 整個 repo 就是完整的靜態網站，直接給 NGO

## 模板系統（待實作）

- 3 套風格變體，結構一致
- Sections: Hero → About → Impact → Gallery → CTA → Footer
- Data-driven: 讀 config.yaml 渲染，不需寫 code

## Trust Chain

- Wave 1：直接認識的 NGO，免驗證
- Wave 2+：需填介紹人（任何超讚指南上的組織）

## 設計語言

- 共用超讚指南設計系統 (P1 墨綠+米白)，但允許個別 NGO 配色
- Fonts: Noto Serif TC (headings) + Inter (body)
- 風格：溫暖、接地氣、不要 AI 感

## 成本

| 項目 | 估算 |
|---|---|
| 架站時間 | ~150hr（~1hr/站） |
| AI 工具 | ~$300/yr |
| 溝通時間 | 100-200hr |
| 維護（域名） | $2000-3000/yr |
| Hosting | $0 (Cloudflare) |

## 工作原則

- 不分 phase，直接開幹
- 不主動聯絡 NGO，留聯絡方式讓他們來找
- Google Sheet 追進度，manifest.json 當資料源，兩者分開
