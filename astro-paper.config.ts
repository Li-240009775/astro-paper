import { defineAstroPaperConfig } from "./src/types/config";

// TODO: 请根据你的真实信息替换以下占位内容
export default defineAstroPaperConfig({
  site: {
    // 请替换为你的最终站点地址(例如 SJTU GitLab Pages 生成的 URL)
    url: "https://wuzn001.pages.sjtu.edu.cn/",
    title: "李培轩的个人主页",
    description: "这里是李培轩的个人主页,记录学习、生活与思考。",
    author: "李培轩",
    profile: "https://github.com/Li-240009775",
    ogImage: "default-og.jpg",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://git.sjtu.edu.cn/wuzn001/astro-paper/-/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/Li-240009775" },
    { name: "mail", url: "mailto:lpx2026362990@sjtu.edu.cn" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://api.whatsapp.com/send?text=" },
    { name: "x", url: "https://twitter.com/intent/tweet?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
