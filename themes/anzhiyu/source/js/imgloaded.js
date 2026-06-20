// 首页一图流渐进加载
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
      this.smallImg.src = this.smallSrc;
      this.largeImg.src = this.largeSrc;
    }
    _onSmallLoaded() {
      this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
    }
    _onLargeLoaded() {
      this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
      this.largeStage.classList.add('fade-in');
    }
    render(target) {
      target.appendChild(this.container);
    }
  }

  // ========== 在这里修改你的图片地址 ==========
  const ldconfig = {
    light: {
      smallSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',    // 浅色 模糊小图
      largeSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',      // 浅色 高清大图
      mobileSmallSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png', // 手机浅色小图
      mobileLargeSrc: 'https://cftcr2.20010501.xyz/PicHoro/dji_fly_20250818_192634_0066_1755516756630_aeb.png',   // 手机浅色大图
      enableRoutes: ['/'] // 仅首页生效
    },
    dark: {
      smallSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
      largeSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
      mobileSmallSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.pngg',
      mobileLargeSrc: 'https://cftcr2.20010501.xyz/PicHoro/P20251112-100225.png',
      enableRoutes: ['/']
    }
  };

  function getConfig() {
    const htmlClass = document.documentElement.className;
    const isDark = htmlClass.includes('dark');
    const isMobile = window.innerWidth < 768;
    const route = location.pathname;
    const cfg = isDark ? ldconfig.dark : ldconfig.light;
    if (!cfg.enableRoutes.includes(route)) return null;
    return isMobile ? {
      small: cfg.mobileSmallSrc,
      large: cfg.mobileLargeSrc
    } : {
      small: cfg.smallSrc,
      large: cfg.largeSrc
    };
  }

  function init() {
    const cfg = getConfig();
    if (!cfg) return;
    const bannerDom = document.getElementById('page-header');
    if (!bannerDom) return;
    bannerDom.style.background = 'unset';
    const loadIns = new ProgressiveLoad(cfg.small, cfg.large);
    loadIns.render(bannerDom);
  }
  window.addEventListener('load', init);
  document.addEventListener('pjax:complete', init);
})();
