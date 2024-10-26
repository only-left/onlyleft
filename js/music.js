// music.js
(function() {
    function initBackgroundMusic() {
        var audio = document.querySelector('#bgMusic');
        
        // 确保循环播放
        audio.loop = true;

        // 设置音量（可选）
        audio.volume = 0.5;  // 设置音量为50%
        
        // 处理可能的自动播放失败情况
        var playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(function(error) {
                console.log("Autoplay prevented");
            });
        }
    }

    // 当文档加载完成后初始化音乐
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundMusic);
    } else {
        initBackgroundMusic();
    }
})();