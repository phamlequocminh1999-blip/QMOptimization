// Kiểm tra trạng thái đăng nhập để đồng bộ Avatar / Tên (Giống trang chủ)
function checkLogin() {
    const userMenu = document.getElementById('userMenu');
    const user = localStorage.getItem('qminh_user');

    if (user) {
        userMenu.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-sm text-slate-300">Chào, <b class="text-brand-500">${user}</b></span>
                <button onclick="logout()" class="text-xs bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition">Đăng xuất</button>
            </div>
        `;
    } else {
        userMenu.innerHTML = `
            <a href="login.html" class="text-xs bg-brand-500 hover:bg-brand-600 text-black font-bold px-4 py-2 rounded-lg transition glow-button">
                Đăng nhập
            </a>
        `;
    }
}

// Xử lý Đăng xuất
function logout() {
    localStorage.removeItem('qminh_user');
    window.location.reload();
}

// Xử lý hiệu ứng khi gửi form liên hệ
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn trang reload
    
    const issueType = document.getElementById('issueType').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Đổi trạng thái nút thành Đang tải
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi đi...';
    submitBtn.disabled = true;
    
    // Giả lập thời gian gửi (1.5 giây)
    setTimeout(() => {
        alert('Cảm ơn bạn! Yêu cầu hỗ trợ về: "' + issueType + '" đã được gửi thành công. Đội ngũ QMinhOTM sẽ phản hồi bạn qua Email sớm nhất.');
        document.getElementById('contactForm').reset(); // Xóa trắng form
        
        // Khôi phục nút
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Khởi chạy khi load xong trang
window.addEventListener('DOMContentLoaded', () => {
    checkLogin();
});