/**
 * 登录密码验证模块
 */

// 等待 DOM 加载完成后再执行
document.addEventListener('DOMContentLoaded', function() {
    // 密码配置
    const PASSWORD = "20081213";

    // 获取 DOM 元素
    const passwordInput = document.getElementById('password');
    const loginBox = document.getElementById('login-box');
    const mainContent = document.getElementById('main');
    const errorMsg = document.getElementById('error-msg');

    /**
     * 校验密码并处理登录成功/失败
     */
    window.checkPassword = function() {
        var password = passwordInput.value;
        
        if (password === PASSWORD) {
            // 隐藏登录框
            loginBox.style.display = 'none';
            // 显示主内容
            mainContent.style.display = 'block';
            // 启动动画
            startAnimation();
        } else {
            // 显示错误信息
            errorMsg.style.display = 'block';
            // 清空输入框
            passwordInput.value = '';
        }
    };

    // 监听回车键
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // 自动聚焦到密码输入框
    passwordInput.focus();
});