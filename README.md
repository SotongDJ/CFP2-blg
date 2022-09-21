# 非官方百靈果播放室 | Unofficial podcast player for Bailingguo podcast

位於[墨玉程市](https://xn--2os22eixx6na.xn--kpry57d/)的非官方[百靈果](https://www.bailingguonews.com/)播放室

為了更方便的重聽百靈果，所以寫了一個網站以篩選想聽的集數。

In order to make it easier to listen to Bailingguo podcast, I wrote a website to facilitate the selection of the episodes I want to listen to.

## 網站 | Website

- 完整網址：[https://👌.深海墨客.台灣/](https://xn--xp8h.xn--2os22eixx6na.xn--kpry57d/)

  > 為了避免網路釣魚，大部分瀏覽器**拒絕**在域名上顯示表情符號（“👌”），而是以 Punycode（“xn--xp8h”）的形式顯示
  >
  > Most browsers **choose** to display emoji ("👌") in punycode form ("xn--xp8h") to prevent phising

- 短網址：[https://trth.nl/?blg](https://trth.nl/?blg)

## 特點 | Features

- 選擇標籤，播放標籤底下的集數 | Select the tag and play the podcasts under that tag
- 點擊圖標快速切換到其他平台 | Click the button and redirect to other platform
- 能以 PWA 的形式安裝到系統內 | Can be installed into the system as a PWA

  - 藉由 PWA 的技術，安裝到系統後就有類似系統原生 App 的體驗（如通知欄播放控制面板、系統層級播放控制等等）

    > "Progressive Web Apps (PWAs) are web apps that use service workers, manifests, and other web-platform features in combination with progressive enhancement to give users an experience on par with native apps." - [Progressive web apps (PWAs) | MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
    >
    > “漸進式網絡應用程式（Progressive web app）使用當代 web API，並以漸進增強策略，建立跨平台 web 應用程式。 這些程式提供了能讓用戶體驗，逼近於原生程式的功能。” - [漸進式網絡應用程式 | MDN](https://developer.mozilla.org/zh-TW/docs/Web/Progressive_web_apps)

- 本服務無收集任何使用者資訊 | No user's information is collected at website

  - 本站屬於靜態網站
  - 本站沒有使用任何追蹤腳本
  - 本站託管在 GitHub Pages 上
  - 依照 GitHub Pages 的揭露，瀏覽本站時 GitHub 會收集用戶的 IP 地址以作安全之用

    > "When a GitHub Pages site is visited, the visitor's IP address is logged and stored for security purposes, regardless of whether the visitor has signed into GitHub or not. For more information about GitHub's security practices, see GitHub Privacy Statement." - [Data collection - About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection)

- 使用者的資料保存在瀏覽器內 | User data is stored in the browser

  - 本站使用瀏覽器的本地緩存空間以暫存使用者目前播放的隊列和集數
  - 無法轉移到其他瀏覽器或設備

- 可隨系統設定調整黑夜模式 | Follow system dark mode settings
- 可以子母畫面控制播放控制（公開測試中）| Able to use Picture-in-picture mode control playback (Public BETA)

## 幫助 | Help

- 請前往：<https://github.com/SotongDJ/cfp2-blg/wiki>

## TO DO

- ~~自動更新集數~~（已完成）
- 離線播放
  - 用網頁瀏覽器緩存 podcast 音檔的機制複雜，目前仍不支援離線播放的功能
- 修正火狐瀏覽器（Firefox）的顯示風格
- 自行繪製播放列
- 可自行調整播放對列
