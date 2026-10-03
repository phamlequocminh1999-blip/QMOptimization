let isLoginMode = true;

function switchTab(mode) {
    isLoginMode = (mode === 'login');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const nameField = document.getElementById('nameField');
    const submitBtn = document.getElementById('submitBtn');

    if (isLoginMode) {
        tabLogin.className = "flex-1 py-2 text-sm font-semibold rounded-md bg-brand-500 text-black transition-all shadow-md";
        tabRegister.className = "flex-1 py-2 text-sm font-semibold rounded-md text-slate-400 hover:text-white transition-all";
        nameField.classList.add('hidden');
        submitBtn.innerText = "Đăng Nhập Hệ Thống";
    } else {
        tabRegister.className = "flex-1 py-2 text-sm font-semibold rounded-md bg-brand-500 text-black transition-all shadow-md";
        tabLogin.className = "flex-1 py-2 text-sm font-semibold rounded-md text-slate-400 hover:text-white transition-all";
        nameField.classList.remove('hidden');
        submitBtn.innerText = "Tạo Tài Khoản Mới";
    }
}

function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('fullname').value || username.split('@')[0];
    
    // Mô phỏng lưu đăng nhập vào LocalStorage
    localStorage.setItem('qminh_user', name);
    
    // Chuyển hướng về trang chủ
    window.location.href = 'index.html';
}