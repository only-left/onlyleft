/**
 * 音乐播放控制模块
 */

// DOM元素
const audio = document.getElementById('bgMusic');
const musicControl = document.querySelector('.music-control');

// 播放状态
let isPlaying = false;

/**
 * 切换音乐播放/暂停
 */
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicControl.classList.remove('playing');
    } else {
        audio.play().catch(function(error) {
            console.log("播放失败:", error);
        });
        musicControl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// 尝试自动播放（需要用户交互）
document.addEventListener('click', function() {
    if (!isPlaying) {
        audio.play().catch(function(error) {
            console.log("播放失败:", error);
        });
    }
}, { once: true });

// 监听音频播放状态
audio.addEventListener('playing', function() {
    isPlaying = true;
    musicControl.classList.add('playing');
});

audio.addEventListener('pause', function() {
    isPlaying = false;
    musicControl.classList.remove('playing');
});

// 处理页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        audio.pause();
    } else if (isPlaying) {
        audio.play().catch(function(error) {
            console.log("播放失败:", error);
        });
    }
});