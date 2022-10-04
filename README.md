# Unofficial podcast player for Bailingguo podcast

The unofficial podcast player for [Bailingguo](https://www.bailingguonews.com/) podcast, located in [墨玉程市](https://xn--2os22eixx6na.xn--kpry57d/)

In order to make it easier to listen to Bailingguo podcast, I wrote a website to facilitate the selection of the episodes I want to listen to.

## 漢文版本

- **[README](https://github.com/SotongDJ/CFP2-blg/blob/main/README.hant.md)**

## Website

- Full link：[https://👌.深海墨客.台灣/](https://xn--xp8h.xn--2os22eixx6na.xn--kpry57d/)

  > Most browsers **choose** to display emoji ("👌") in punycode form ("xn--xp8h") to prevent phising

- Shortened link：[https://trth.nl/?blg](https://trth.nl/?blg)

## Features

- Select the tag and play the podcasts under that tag
- Click the button and redirect to other platform
- Can be installed into the system as a PWA

  - By using the Progressive Web App (PWA) technique, this player can be installed on the operating system (Windows, macOS, Linux, Chrome OS, iOS, and Android) and have user experiences similar to the native app (like playback control in the notification bar, system level playback control)

    > "Progressive Web Apps (PWAs) are web apps that use service workers, manifests, and other web-platform features in combination with progressive enhancement to give users an experience on par with native apps." - [Progressive web apps (PWAs) | MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

- No user's information is collected at this website

  - This site is a static website
  - This site does not use any tracking scripts
  - This site is hosted on GitHub Pages
  - According to GitHub Pages, GitHub collects users' IP addresses for security purposes when browsing this site

    > "When a GitHub Pages site is visited, the visitor's IP address is logged and stored for security purposes, regardless of whether the visitor has signed into GitHub or not. For more information about GitHub's security practices, see GitHub Privacy Statement." - [Data collection - About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection)

- User data is stored in the browser

  - This site uses the browser's local cache space to temporarily store the queue and episodes currently played by the user
  - Cannot transfer to other browsers or devices

- Follow system dark mode settings
- Able to switch to high contrast theme
- Able to use Picture-in-picture mode control playback (Public BETA)

## Help

- Go to：<https://github.com/SotongDJ/cfp2-blg/wiki>

## TO DO

- ~~auto-update episodes~~（archived）
- ~~fix other browser's theme~~（archived）
- ~~design high contrast theme~~（archived）
- ~~month tag~~（archived）
- episode detail info
  - include youtube shorts/teaser
- share button
  - episode share
  - tag share
- customize playback control UI
- able to customize playback queue
- offline playback
  - use browser to cache podcast and manage downloaded content are too complicated
  - offline playback is may support in future
