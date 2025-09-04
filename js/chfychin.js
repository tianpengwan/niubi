var leonus = {
    linkCom: e => {
        var t = document.querySelector(".el-textarea__inner");
        "bf" == e ? (t.value = "```yml\n", t.value += "- name: \n  link: \n  avatar: \n  descr: \n  siteshot: ", t.value += "\n```", t.setSelectionRange(15, 15)) : (t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\n站点截图：", t.setSelectionRange(5, 5)), t.focus()
    },
    owoBig: () => {
        if (!document.getElementById("post-comment") || document.body.clientWidth < 768) return;
        let e = 1,
            t = "",
            o = document.createElement("div"),
            n = document.querySelector("body");
        o.id = "owo-big", n.appendChild(o), new MutationObserver((l => {
            for (let a = 0; a < l.length; a++) {
                let i = l[a].addedNodes,
                    s = "";
                if (2 == i.length && "OwO-body" == i[1].className) s = i[1];
                else {
                    if (1 != i.length || "tk-comment" != i[0].className) continue;
                    s = i[0]
                }
                s.onmouseover = l => {
                    e && ("OwO-body" == s.className && "IMG" == l.target.tagName || "tk-owo-emotion" == l.target.className) && (e = 0, t = setTimeout((() => {
                        let e = 3 * l.path[0].clientHeight,
                            t = 3 * l.path[0].clientWidth,
                            a = l.x - l.offsetX - (t - l.path[0].clientWidth) / 2,
                            i = l.y - l.offsetY;
                        a + t > n.clientWidth && (a -= a + t - n.clientWidth + 10), a < 0 && (a = 10), o.style.cssText = `display:flex; height:${e}px; width:${t}px; left:${a}px; top:${i}px;`, o.innerHTML = `<img src= "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onerror="this.onerror=null,this.src=&quot;/img/404.jpg&quot;" data-lazy-src="${l.target.src}">`
                    }), 300))
                }, s.onmouseout = () => {
                    o.style.display = "none", e = 1, clearTimeout(t)
                }
            }
        })).observe(document.getElementById("post-comment"), {
            subtree: !0,
            childList: !0
        })
    },
};

/*---纪念日start---*/

// anniversary.js

function initializeAnniversary() {
    function LunarDate(Year, Month, Day) {
        try {
            let solar = Lunar.fromYmdHms(Year, Month, Day, 0, 0, 0).getSolar();
            return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
        } catch (error) {
            return LunarDate(Year, Month, Day - 1);
        }
    }
    // 计算两个日期之间的天数差
    function daysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.ceil((date2 - date1) / oneDay);
    }
    // 剩余天数
    function daysLeft(dateStr, isLunar) {
        const [Year, Month, Day] = dateStr.split("-").map(Number);
        let now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let anniversaryDate;
        if (isLunar) {
            anniversaryDate = LunarDate(now.getFullYear(), Month, Day);
            if (anniversaryDate < now) {
                anniversaryDate = LunarDate(now.getFullYear() + 1, Month, Day);
            }
        } else {
            anniversaryDate = new Date(now.getFullYear(), Month - 1, Day);
            if (anniversaryDate < now) {
                anniversaryDate = new Date(now.getFullYear() + 1, Month - 1, Day);
            }
        }
        return daysBetween(now, anniversaryDate);
    }
    // 经过天数
    function totalDays(dateStr, isLunar) {
        const [Year, Month, Day] = dateStr.split("-").map(Number);
        let now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startDate;
        if (isLunar) {
            startDate = LunarDate(Year, Month, Day);
        } else {
            startDate = new Date(Year, Month - 1, Day);
        }
        return daysBetween(startDate, now);
    }
    // 返回目标或起始日期以及星期几
    function targetDate(dateStr, isLunar) {
        const [Year, Month, Day] = dateStr.split("-").map(Number);
        let now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let anniversaryDate;
        if (isLunar) {
            anniversaryDate = LunarDate(now.getFullYear(), Month, Day);
            if (anniversaryDate < now) {
                anniversaryDate = LunarDate(now.getFullYear() + 1, Month, Day);
            }
        } else {
            anniversaryDate = new Date(now.getFullYear(), Month - 1, Day);
            if (anniversaryDate < now) {
                anniversaryDate = new Date(now.getFullYear() + 1, Month - 1, Day);
            }
        }
        // 获取星期几
        const weekDay = anniversaryDate.toLocaleDateString('zh-CN', { weekday: 'long' });
        // 返回年月日加星期几
        const year = anniversaryDate.getFullYear();
        const month = (anniversaryDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
        const day = anniversaryDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day} (${weekDay})`; // 使用'-'作为分隔符
        //   return anniversaryDate.toDateString();  // 直接返回斜杆日期
        // return anniversaryDate.toLocaleDateString('zh-CN');
    }
    // 返回目标或起始日期（根据 displayMode）
    function targetOrStartDate(dateStr, isLunar, displayMode) {
        if (displayMode === "elapsed") {
            return dateStr; // 如果是elapsed模式，直接返回配置的日期（起始日）
        } else {
            return targetDate(dateStr, isLunar); // 否则，显示目标日期和星期几
        }
    }

    const countdownElements = document.querySelectorAll(".countdown");
    const totalDaysElements = document.querySelectorAll(".total-days");
    const targetDateElements = document.querySelectorAll(".target-date");

    countdownElements.forEach(function (elem) {
        const dateStr = elem.getAttribute("data-date");
        const isLunar = elem.hasAttribute("data-lunar");
        const displayMode = elem.getAttribute("data-display-mode"); // 获取 display_mode
        let daysText;
        if (displayMode === "elapsed") {
            // 显示已经过去的天数
            daysText = totalDays(dateStr, isLunar);
            elem.nextElementSibling.textContent = "天了"; // 显示“天了”
        } else {
            // 显示剩余天数
            daysText = daysLeft(dateStr, isLunar);
            elem.nextElementSibling.textContent = "天后"; // 显示“天后”
        }
        elem.textContent = daysText;
    });

    totalDaysElements.forEach(function (elem) {
        const dateStr = elem.getAttribute("data-date");
        const isLunar = elem.hasAttribute("data-lunar");
        elem.textContent = totalDays(dateStr, isLunar);
    });

    // 显示目标或起始日期
    targetDateElements.forEach(function (elem) {
        const dateStr = elem.getAttribute("data-date");
        const isLunar = elem.hasAttribute("data-lunar");
        const displayMode = elem.getAttribute("data-display-mode"); // 获取 display_mode
        elem.textContent = targetOrStartDate(dateStr, isLunar, displayMode);
    });
}

// 初始页面加载
document.addEventListener("DOMContentLoaded", initializeAnniversary);

// 适配 pjax
document.addEventListener("pjax:complete", initializeAnniversary);

/*---纪念日end---*/

/*---页脚添加动物start---*/

function initFooterAnimal() {
    const footerAnimal = document.getElementById('footer-animal');
    if (footerAnimal) {
        footerAnimal.remove();
    }

    const footerBar = document.querySelector('#footer-bar');
    if (!footerBar) {
        console.error('找不到指定元素');
        return;
    }

    const newFooterAnimal = document.createElement('div');
    newFooterAnimal.id = 'footer-animal';
    newFooterAnimal.innerHTML = `
        <img class="animal entered loaded"
            src="https://i1.wp.com/ruom.wuaze.com/i/2024/10/19/473503.webp"
            alt="动物" />
    `;
    footerBar.insertAdjacentElement('beforebegin', newFooterAnimal);

    if (!document.getElementById('footer-animal-style')) {
        const style = document.createElement('style');
        style.id = 'footer-animal-style';
        style.textContent = `
            #footer-animal {
                position: relative;
            }
            #footer-animal::before {
                content: '';
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 36px;
                background: url(https://i1.wp.com/ruom.wuaze.com/i/2024/10/19/351933.webp) repeat center / auto 100%;
                box-shadow: 0 4px 7px rgba(0,0,0,.15);
            }
            .animal {
                position: relative;
                max-width: min(974px, 100vw);
                margin: 0 auto;
                display: block;
            }
            #footer-bar {
                margin-top: 0 !important;
            }
            @media screen and (max-width: 1023px) {
                #footer-animal::before {
                    height: 4vw;
                }
            }
            [data-theme=dark] #footer-animal {
                filter: brightness(.8);
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', initFooterAnimal);

document.addEventListener('pjax:complete', initFooterAnimal);

/*---页脚添加动物end---*/

/* 欢迎信息 start */
const Bornforthis = {
    // 欢迎语
    setWelcome_info: async () => {
        let ipStore = saveToLocal.get('location');

        try {
            if (!ipStore) {
                const response = await fetch(`https://ip-api.chfychin.cn/Local`);
                // const response = await fetch(`https://api.qjqq.cn/api/Local`);
                const data = await response.json();

                // if (data.code === "Success") {
                // if (data.code === "200") {
                if (data.msg === "success") {
                    // console.info(data);
                    ipStore = data;
                    /*
                    第一行代码 将 location 的值保存到本地存储中，有效期为 24 小时。
                    第二行代码 将 location 的值保存到本地存储中，有效期为 0.5 秒。
                    */
                    saveToLocal.set('location', ipStore, 3600 * 24);
                    // saveToLocal.set('location', ipStore, 0.5);
                    Bornforthis.showWelcome(ipStore);
                }
            } else {
                Bornforthis.showWelcome(ipStore);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    },
    //根据经纬度计算两点距离(点1经度,点1纬度,点2经度,点2纬度)
    getDistance: (e1, n1, e2, n2) => {
        const R = 6371
        const { sin, cos, asin, PI, hypot } = Math
        let getPoint = (e, n) => {
            e *= PI / 180
            n *= PI / 180
            return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
        }
        let a = getPoint(e1, n1)
        let b = getPoint(e2, n2)
        let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
        let r = asin(c / 2) * 2 * R
        return Math.round(r);
    },
    //根据国家、省份、城市信息自定义欢迎语
    showWelcome: (ipStore) => {
        const WelcomeInfo = document.getElementById("welcome-info"),
            // IP = ipStore.ip || "未知";
            IP = ipStore.data.ip || "未知";
        // let dist = Bornforthis.getDistance(填写你的经度, 填写你的纬度, ipStore.data.lng, ipStore.data.lat),
        let dist = Bornforthis.getDistance(114.348666, 36.066304, ipStore.data.lng, ipStore.data.lat),
            address,
            welcome_info;
        //根据国家、省份、城市信息自定义欢迎语
        //海外地区不支持省份及城市信息
        switch (ipStore.data.country) {
            case "日本":
                welcome_info = "よろしく，一起去看樱花吗";
                break;
            case "美国":
                welcome_info = "Make America Great Again";
                break;
            case "英国":
                welcome_info = "想同你一起夜乘伦敦眼";
                break;
            case "俄罗斯":
                welcome_info = "干了这瓶伏特加";
                break;
            case "法国":
                welcome_info = "C'est La Vie";
                break;
            case "德国":
                welcome_info = "Die Zeit verging im Fluge";
                break;
            case "澳大利亚":
                welcome_info = "一起去大堡礁吧";
                break;
            case "加拿大":
                welcome_info = "拾起一片枫叶赠予你";
                break;
            case "中国":
                address = ipStore.data.prov + " " + ipStore.data.city + " " + ipStore.data.district;
                switch (ipStore.data.prov) {
                    case "北京市":
                        address = "北京市";
                        welcome_info = "北——京——欢迎你";
                        break;
                    case "天津市":
                        address = "天津市";
                        welcome_info = "讲段相声吧";
                        break;
                    case "重庆市":
                        address = "重庆市";
                        welcome_info = "高德地图:已到达重庆，下面交给百度地图导航"
                        break;
                    case "河北省":
                        welcome_info = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山";
                        break;
                    case "山西省":
                        welcome_info = "展开坐具长三尺，已占山河五百余";
                        break;
                    case "内蒙古自治区":
                        welcome_info = "天苍苍，野茫茫，风吹草低见牛羊";
                        break;
                    case "辽宁省":
                        welcome_info = "我想吃烤鸡架";
                        break;
                    case "吉林省":
                        welcome_info = "状元阁就是东北烧烤之王";
                        break;
                    case "黑龙江省":
                        welcome_info = "很喜欢哈尔滨大剧院";
                        break;
                    case "上海市":
                        address = "上海市";
                        welcome_info = "众所周知，中国只有两个城市";
                        break;
                    case "江苏省":
                        switch (ipStore.data.city) {
                            case "南京市":
                                welcome_info = "欢迎来自安徽省南京市的小伙伴";
                                break;
                            case "苏州市":
                                welcome_info = "上有天堂，下有苏杭";
                                break;
                            case "泰州市":
                                welcome_info = "这里也是我的故乡";
                                break;
                            default:
                                welcome_info = "散装是必须要散装的";
                                break;
                        }
                        break;
                    case "浙江省":
                        welcome_info = "东风渐绿西湖柳，雁已还人未南归";
                        break;
                    case "安徽省":
                        welcome_info = "蚌埠住了，芜湖起飞";
                        break;
                    case "福建省":
                        welcome_info = "井邑白云间，岩城远带山";
                        break;
                    case "江西省":
                        welcome_info = "落霞与孤鹜齐飞，秋水共长天一色";
                        break;
                    case "山东省":
                        welcome_info = "遥望齐州九点烟，一泓海水杯中泻";
                        break;
                    case "湖北省":
                        welcome_info = "来碗热干面";
                        break;
                    case "湖南省":
                        welcome_info = "74751，长沙斯塔克";
                        break;
                    case "广东省":
                        welcome_info = "老板来两斤福建人";
                        break;
                    case "广西壮族自治区":
                        welcome_info = "桂林山水甲天下";
                        break;
                    case "海南省":
                        welcome_info = "朝观日出逐白浪，夕看云起收霞光";
                        break;
                    case "四川省":
                        welcome_info = "康康川妹子";
                        break;
                    case "贵州省":
                        welcome_info = "茅台，学生，再塞200";
                        break;
                    case "云南省":
                        welcome_info = "玉龙飞舞云缠绕，万仞冰川直耸天";
                        break;
                    case "西藏自治区":
                        welcome_info = "躺在茫茫草原上，仰望蓝天";
                        break;
                    case "陕西省":
                        welcome_info = "来份臊子面加馍";
                        break;
                    case "甘肃省":
                        welcome_info = "羌笛何须怨杨柳，春风不度玉门关";
                        break;
                    case "青海省":
                        welcome_info = "牛肉干和老酸奶都好好吃";
                        break;
                    case "宁夏回族自治区":
                        welcome_info = "大漠孤烟直，长河落日圆";
                        break;
                    case "新疆维吾尔自治区":
                        welcome_info = "驼铃古道丝绸路，胡马犹闻唐汉风";
                        break;
                    case "台湾省":
                        welcome_info = "我在这头，大陆在那头";
                        break;
                    case "香港特别行政区":
                        address = "香港特别行政区";
                        welcome_info = "永定贼有残留地鬼嚎，迎击光非岁玉";
                        break;
                    case "澳门特别行政区":
                        address = "澳门特别行政区";
                        welcome_info = "性感荷官，在线发牌";
                        break;
                    default:
                        welcome_info = "带我去你的城市逛逛吧";
                        break;
                }
                break;
            default:
                welcome_info = "带我去你的国家看看吧";
                break;
        }
        //判断时间
        let timeChange,
            date = new Date();
        if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>🌤️上午好，一日之计在于晨</span>";
        else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>☀️中午好，该摸鱼吃午饭了</span>";
        else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>🕞下午好，懒懒地睡个午觉吧</span>";
        else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>🍵三点几啦，饮茶先啦</span>";
        else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>🌇夕阳无限好，只是近黄昏</span>";
        else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>🌔晚上好，夜生活嗨起来</span>";
        else timeChange = "🌌夜深了，早点休息，少熬夜";

        //自定义文本需要放的位置
        WelcomeInfo && (WelcomeInfo.innerHTML = `🙋欢迎来自 <strong>${address}</strong> 的小伙伴<br>
    😊<strong>${welcome_info}</strong><br>
    🗺️您距离 <strong>Chfy</strong> 约有 <strong>${dist}</strong> 公里！<br>
    当前IP地址为：<br>
    <strong style="font-size:12px;"><psw>${IP}</psw></strong><br>
    <strong>${timeChange}！</strong>`);

    }
}

/* 欢迎信息 end */

/* countdown start */

const CountdownTimer = (() => {
    const config = {
        targetDate: "2025-12-20",
        targetName: "考研倒计时",
        units: {
            day: { text: "今日", divider: 1, unit: "小时" },
            week: { text: "本周", divider: 24, unit: "天" },
            month: { text: "本月", divider: 24, unit: "天" },
            year: { text: "本年", divider: 24, unit: "天" }
        }
    };

    function getTimeUnit(unit) {
        const now = new Date();
        const start = new Date(now.setHours(0, 0, 0, 0));
        const end = new Date(now.setHours(23, 59, 59, 999));

        if (unit === 'day') {
            const currentHour = new Date().getHours();
            const remaining = 24 - currentHour;
            const percentage = (currentHour / 24) * 100;

            return {
                name: config.units[unit].text,
                remaining: remaining,
                percentage: percentage.toFixed(2),
                unit: config.units[unit].unit
            };
        }

        const ranges = {
            week: () => {
                const currentDay = start.getDay();
                const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
                start.setDate(start.getDate() + mondayOffset);
                end.setDate(start.getDate() + 6);
            },
            month: () => {
                start.setDate(1);
                end.setMonth(end.getMonth() + 1, 0);
            },
            year: () => {
                start.setMonth(0, 1);
                end.setMonth(11, 31);
            }
        };
        ranges[unit]?.();

        const total = unit === "day" ? 24 : Math.floor((end - start) / 86400000) + 1;
        const passed = Math.floor((now - start) / (3600000 * config.units[unit].divider));
        const percentage = (passed / total) * 100;

        return {
            name: config.units[unit].text,
            remaining: total - passed,
            percentage: percentage.toFixed(2),
            unit: config.units[unit].unit
        };
    }

    function updateCountdown() {
        const elements = ['eventName', 'eventDate', 'daysUntil', 'countRight']
            .map(id => document.getElementById(id));

        if (elements.some(el => !el)) return;

        const [eventName, eventDate, daysUntil, countRight] = elements;
        const timeData = Object.keys(config.units).reduce((acc, unit) => ({ ...acc, [unit]: getTimeUnit(unit) }), {});
        const daysRemaining = Math.round((new Date(config.targetDate) - new Date().setHours(0, 0, 0, 0)) / 86400000);

        eventName.textContent = config.targetName;
        eventDate.textContent = config.targetDate;
        daysUntil.textContent = daysRemaining;
        countRight.innerHTML = Object.entries(timeData)
            .map(([_, item]) => `
                <div class="cd-count-item">
                    <div class="cd-item-name">${item.name}</div>
                    <div class="cd-item-progress">
                        <div class="cd-progress-bar" style="width: ${item.percentage}%; opacity: ${item.percentage / 100}"></div>
                        <span class="cd-percentage ${item.percentage >= 46 ? 'cd-many' : ''}">${item.percentage}%</span>
                        <span class="cd-remaining ${item.percentage >= 60 ? 'cd-many' : ''}">
                            <span class="cd-tip">还剩</span>${item.remaining}<span class="cd-tip">${item.unit}</span>
                        </span>
                    </div>
                </div>
            `).join('');
    }

    function injectStyles() {
        const styles = `
            .card-countdown .item-content {
                display: flex;
            }
            .cd-count-left {
                position: relative;
                display: flex;
                flex-direction: column;
                margin-right: 0.8rem;
                line-height: 1.5;
                align-items: center;
                justify-content: center;
            }
            .cd-count-left .cd-text {
                font-size: 14px;
            }
            .cd-count-left .cd-name {
                font-weight: bold;
                font-size: 18px;
            }
            .cd-count-left .cd-time {
                font-size: 30px;
                font-weight: bold;
                color: var(--anzhiyu-main);
            }
            .cd-count-left .cd-date {
                font-size: 12px;
                opacity: 0.6;
            }
            .cd-count-left::after {
                content: "";
                position: absolute;
                right: -0.8rem;
                width: 2px;
                height: 80%;
                background-color: var(--anzhiyu-main);
                opacity: 0.5;
            }
            .cd-count-right {
                flex: 1;
                margin-left: .8rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .cd-count-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 24px;
            }
            .cd-item-name {
                font-size: 14px;
                margin-right: 0.8rem;
                white-space: nowrap;
            }
            .cd-item-progress {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                height: 100%;
                width: 100%;
                border-radius: 8px;
                background-color: var(--anzhiyu-background);
                overflow: hidden;
            }
            .cd-progress-bar {
                height: 100%;
                border-radius: 8px;
                background-color: var(--anzhiyu-main);
            }
            .cd-percentage,
            .cd-remaining {
                position: absolute;
                font-size: 12px;
                margin: 0 6px;
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }
            .cd-many {
                color: #fff;
            }
            .cd-remaining {
                opacity: 0;
                transform: translateX(10px);
            }
            .card-countdown .item-content:hover .cd-remaining {
                transform: translateX(0);
                opacity: 1;
            }
            .card-countdown .item-content:hover .cd-percentage {
                transform: translateX(-10px);
                opacity: 0;
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    let timer;
    const start = () => {
        injectStyles();
        updateCountdown();
        timer = setInterval(updateCountdown, 600000);
    };

    ['pjax:complete', 'DOMContentLoaded'].forEach(event => document.addEventListener(event, start));
    document.addEventListener('pjax:send', () => timer && clearInterval(timer));

    return { start, stop: () => timer && clearInterval(timer) };
})();

/* countdown end */