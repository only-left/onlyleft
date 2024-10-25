/**
 * 登录密码验证模块
 */

// 密码配置
const PASSWORD = "20081213";

/**
 * 校验密码并处理登录成功/失败
 */
function checkPassword() {
    var password = document.getElementById('password').value;
    
    if (password === PASSWORD) {
        // 隐藏登录框
        document.getElementById('login-box').style.display = 'none';
        // 显示主内容
        document.getElementById('main').style.display = 'block';
        // 启动动画
        startAnimation();
    } else {
        // 显示错误信息
        document.getElementById('error-msg').style.display = 'block';
        // 清空输入框
        document.getElementById('password').value = '';
    }
}

// 监听回车键
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// 页面加载完成后自动聚焦到密码输入框
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('password').focus();
});