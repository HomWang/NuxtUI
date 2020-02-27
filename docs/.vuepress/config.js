const path = require('path');
const fs = require('fs');
module.exports = {
  title: "Hom Wang",
  description: "Vue.js、Nuxt.js、Node.js、Flutter",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/img/logo.png"
      }
    ],
    [
      "script",
      {
        charset: "utf-8",
        "data-ad-client": "ca-pub-1278878529686299",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      }
    ]
  ],
  themeConfig: {
    sidebarDepth: 3,
    nav: [{
        text: '主页',
        link: '/'
      },
      {
        text: 'Nuxt.js',
        link: '/nuxt/introduction'
      },
      {
        text: 'Javascript',
        link: '/Javascript/introduction'
      },
      {
        text: '了解更多',
        items: [{
            text: 'Github',
            link: 'https://github.com/516310460'
          },
          {
            text: '码云',
            link: 'https://gitee.com/jakeWangHong'
          },
          {
            text: '简书',
            link: 'https://www.jianshu.com/u/0cd8d9f167dc'
          },
          {
            text: 'Vue.js',
            link: 'https://vuejs.org/'
          },
          {
            text: 'Nuxt.js',
            link: 'https://nuxtjs.org/'
          },
        ]
      }
    ],
    sidebar: {
      "/nuxt/": [
        "introduction",
        {
          title: '官方模块',
          collapsable: false,
          children: genSidebarConfig("nuxt/OfficialModules", true),
        },
        // {
        //   title: '社区模块',
        //   collapsable: false,
        //   children: genSidebarConfig("nuxt/CommunityModules", true),
        // },
        {
          title: '其他模块',
          collapsable: false,
          children: genSidebarConfig("nuxt/OtherModules", true),
        }, {
          title: '工具',
          collapsable: false,
          children: genSidebarConfig("nuxt/Tools", true),
        }, {
          title: '教程',
          collapsable: false,
          children: genSidebarConfig("nuxt/Tutorials", true),
        }
      ],
      "/Javascript/": [
        "introduction",
        {
          title: '代码重构',
          collapsable: false,
          children: genSidebarConfig("Javascript/Case", true),
        }
      ],
    }
  },
  sass: {
    indentedSyntax: true
  },
};

function genSidebarConfig(dir, hasSub) {
  let p = path.join(__dirname, '../', dir);
  let files = fs.readdirSync(p);
  let subDir = hasSub ? dir.split('/')[1] : '';
  files = files.map(item => {
    item = subDir ? subDir + '/' + path.basename(item, '.md') : path.basename(item, '.md');
    return item;
  });
  return files;
}