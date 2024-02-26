# CFP2-BLG 百靈果播放室

位於[墨玉程市](https://xn--2os22eixx6na.xn--kpry57d/)的非官方[百靈果](https://www.bailingguonews.com/)播放室

為了更方便的重聽百靈果，所以寫了一個網站以篩選想聽的集數。

![Homepage of CuttleFish Podcast Player for Bailingguo podcast](/docs/ss/landscape-light-high.png "Homepage with light and high contrast theme")

## English version

- **[README](https://github.com/SotongDJ/CFP2-blg/blob/main/README.md)**

## 網站

- 完整網址：[https://👌.深海墨客.台灣/](https://xn--xp8h.xn--2os22eixx6na.xn--kpry57d/)

  > 為了避免網路釣魚，大部分瀏覽器**拒絕**在域名上顯示表情符號（“👌”），而是以 Punycode（“xn--xp8h”）的形式顯示

- 短網址：[https://trth.nl/?blg](https://trth.nl/?blg)
- 後台 git repo: <https://github.com/SotongDJ/CFP2>

## 特點 | Features

- 選擇標籤，播放標籤底下的集數
- 點擊圖標快速切換到其他平台
- 能以 PWA 的形式安裝到系統內
  - 藉由漸進式網路應用程式（Progressive Web App，PWA）的技術，安裝到系統（Windows, macOS, Linux, Chrome OS, iOS, and Android），就能有類似系統原生 App 的體驗（如通知欄播放控制面板、系統層級播放控制等等）

    > "Progressive Web Apps (PWAs) are web apps that use service workers, manifests, and other web-platform features in combination with progressive enhancement to give users an experience on par with native apps." - [Progressive web apps (PWAs) | MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

- 本服務無收集任何使用者資訊
  - 本站屬於靜態網站
  - 本站沒有使用任何追蹤腳本
  - 本站託管在 GitHub Pages 上
  - 依照 GitHub Pages 的揭露，瀏覽本站時 GitHub 會收集用戶的 IP 地址以作安全之用

    > "When a GitHub Pages site is visited, the visitor's IP address is logged and stored for security purposes, regardless of whether the visitor has signed into GitHub or not. For more information about GitHub's security practices, see GitHub Privacy Statement." - [Data collection - About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection)

- 使用者的資料保存在瀏覽器內
  - 本站使用瀏覽器的本地緩存空間以暫存使用者目前播放的隊列和集數
  - 無法轉移到其他瀏覽器或設備
- 可隨系統設定調整黑夜模式
- 提供高對比度主題風格
- 可以子母畫面控制播放控制（公開測試中）

## 幫助

- 請查閱：<https://github.com/SotongDJ/cfp2-blg/wiki>
- 私訊我：<https://www.instagram.com/cfp2_blg>

## LICENSE

- 本網站所使用的字體（Noto Sans Mono、Noto Sans TC）均經由 SIL Open Font License 1.1 釋出
  - 請前往 <https://fonts.google.com/attribution> 查閱更多細節
- 本網站所使用的圖標（Font Awesome Free）經由 CC BY 4.0 License 和 SIL Open Font License 1.1 釋出
  - 請前往 <https://fontawesome.com/license/free> 查閱更多細節

## TO DO

- [x] ~~自動更新集數~~（已完成）
- [x] ~~修正其他瀏覽器的顯示風格~~（已完成）
- [x] ~~設計不同顏色主題風格~~（已完成）
- [x] ~~設計不同對比度主題風格~~（已完成）
- [x] ~~月份標籤~~（已完成）
- [x] ~~分享按鈕~~（已完成）
  - [x] ~~標簽分享~~（已完成）
  - [x] ~~單集分享~~（已完成）
- [x] ~~單集介紹~~（已完成）
  - [x] ~~Podcast 單集介紹~~（已完成）
  - [ ] 整合 YouTube 精華片段（部分完成）
- [x] ~~自製播放列~~（已完成）
- [ ] 可自行調整播放隊列
- [ ] 離線播放
  - 用網頁瀏覽器緩存 podcast 音檔的機制複雜，目前仍不支援離線播放的功能
  - 未來可能支援離線播放
