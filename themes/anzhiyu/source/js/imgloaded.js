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
      // 大图渐显过渡结束后，再隐藏小图，避免闪烁
      this.largeStage.addEventListener('transitionend', () => {
        this.smallStage.style.display = 'none';
      }, { once: true });
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
      this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
      // 确保样式渲染后再加类，稳定触发过渡动画
      requestAnimationFrame(() => {
        this.largeStage.classList.add('pl-visible');
      });
    }

    _onSmallLoaded() {
      this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
      requestAnimationFrame(() => {
        this.smallStage.classList.add('pl-visible');
      });
    }
  }

  const executeLoad = (config, target) => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const loader = new ProgressiveLoad(
      isMobile ? config.mobileSmallSrc : config.smallSrc,
      isMobile ? config.mobileLargeSrc : config.largeSrc
    );
    if (target.children[0]) {
      target.insertBefore(loader.container, target.children[0]);
    } else {
      target.appendChild(loader.container);
    }
    loader.progressiveLoad();
  };

  const ldconfig = {
    light: {
      smallSrc: '/img/b.jpg', // 浅色模式 低分辨率小图
      largeSrc: '/img/P20251112-100225.png', // 浅色模式 高清大图
      mobileSmallSrc: '/img/b.jpg',
      mobileLargeSrc: '/img/P20251112-100225.png',
      enableRoutes: ['/'],
    },
    dark: {
      smallSrc: '/img/y.png', // 深色模式 低分辨率小图
      largeSrc: '/img/dji_fly_20250818_192634_0066_1755516756630_aeb.png',
      mobileSmallSrc: '/img/y.png',
      mobileLargeSrc: '/img/dji_fly_20250818_192634_0066_1755516756630_aeb.png',
      enableRoutes: ['/'],
    },
  };

  // 获取当前主题
  const getCurrentTheme = () => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  // 判断当前路由是否启用
  const isRouteEnabled = (config) => {
    return config.enableRoutes.includes(location.pathname);
  }

  // 初始化渐进加载
  function initProgressiveLoad() {
    const currentTheme = getCurrentTheme();
    const config = ldconfig[currentTheme];
    if (!config || !isRouteEnabled(config)) return;

    // 移除旧容器，避免重复
    const oldContainer = document.querySelector('.pl-container');
    if (oldContainer) oldContainer.remove();

    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      executeLoad(config, target);
    }
  }

  // 全局只绑定一次事件，避免重复监听
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressiveLoad);
  } else {
    initProgressiveLoad();
  }

  // PJAX跳转后重新初始化
  document.addEventListener('pjax:complete', initProgressiveLoad);

  // 监听主题切换
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === "data-theme") {
        initProgressiveLoad();
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]  
  });

})();
