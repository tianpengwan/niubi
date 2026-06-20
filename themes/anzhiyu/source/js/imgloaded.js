// 首页一图流加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
(function() {
    class ProgressiveLoad {
      constructor(smallSrc, largeSrc) {
        this.smallSrc = smallSrc;
        this.largeSrc = largeSrc;
        this.initTpl();
        this.container.addEventListener('animationend', () => {
          this.smallStage.style.display = 'none'; 
        }, {once: true});
      }

      initTpl() {
        this.container = document.createElement('div');
        this.smallStage = document.createElement('div');
        this.largeStage = document.createElement('div');
        this.smallImg = new Image();
        this.largeImg = new Image();
        this.container.className = 'pl-container';
        this.smallStage.className = 'pl-img pl-blur';
        this.largeStage.className = 'pl-img';
        this.container.appendChild(this.smallStage);
        this.container.appendChild(this.largeStage);
        this.smallImg.onload = this._onSmallLoaded.bind(this);
        this.largeImg.onload = this._onLargeLoaded.bind(this);
      }

      progressiveLoad() {
        this.smallImg.src = this.smallSrc;
        this.largeImg.src = this.largeSrc;
      }

      _onLargeLoaded() {
        this.largeStage.classList.add('pl-visible');
        this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
      }

      _onSmallLoaded() {
        this.smallStage.classList.add('pl-visible');
        this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
      }
    }

    const executeLoad = (config, target) => {
      console.log('执行渐进背景替换');
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const loader = new ProgressiveLoad(
        isMobile ? config.mobileSmallSrc : config.smallSrc,
        isMobile ? config.mobileLargeSrc : config.largeSrc
      );
      if (target.children[0]) {
        target.insertBefore(loader.container, target.children[0]);
      }
      loader.progressiveLoad();
    };

    const ldconfig = {
      light: {
        smallSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
        largeSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
        mobileSmallSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
        mobileLargeSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
        enableRoutes: ['/'],
      },
      dark: {
        smallSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',
        largeSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',
        mobileSmallSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',
        mobileLargeSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',
        enableRoutes: ['/'],
      },
    };

    const getCurrentTheme = () => {
      return document.documentElement.getAttribute('data-theme');
    }

    // 新增：校验当前页面是否允许渲染一图流
    function isAllowRoute(config) {
      const path = location.pathname;
      return config.enableRoutes.some(route => path === route || path === route + 'index.html');
    }

    function initProgressiveLoad(config) {
      // 不在允许页面直接退出
      if (!isAllowRoute(config)) return;

      const container = document.querySelector('.pl-container');
      if (container) container.remove();
      const target = document.getElementById('page-header');
      if (target && target.classList.contains('full_page')) {
        executeLoad(config, target);
      }
    }

    // 切换主题
    const onThemeChange = () => {
      const currentTheme = getCurrentTheme();
      const config = ldconfig[currentTheme];
      initProgressiveLoad(config);
    }

    // PJAX跳转完成
    function onPJAXComplete() {
      const currentTheme = getCurrentTheme();
      const config = ldconfig[currentTheme];
      initProgressiveLoad(config);
    }

    // 页面首次加载
    document.addEventListener("DOMContentLoaded", function () {
      const initTheme = getCurrentTheme();
      const initConfig = ldconfig[initTheme];
      initProgressiveLoad(initConfig);
    });

    // PJAX监听
    document.addEventListener("pjax:complete", onPJAXComplete);

    // 监听明暗主题切换
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === "data-theme") {
          onThemeChange();
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
})();
