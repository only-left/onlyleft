/**
 * 工具函数模块
 */

/**
 * 调整画布大小以适应窗口
 */
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

/**
 * 计算并显示在一起的时间
 * @param {Date} startDate - 在一起的开始时间
 */
function timeElapse(date) {
    let current = new Date();
    let seconds = Math.floor((current - date) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    months %= 12;
    days %= 30;
    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    const clockElement = document.getElementById("clock");
    if (clockElement) {
        clockElement.innerHTML = `${years}年${months}月${days}天${hours}小时${minutes}分${seconds}秒`;
    }
}

// 监听窗口大小变化
window.addEventListener('resize', resizeCanvas);

// 页面加载完成后调整画布大小
window.addEventListener('load', resizeCanvas);