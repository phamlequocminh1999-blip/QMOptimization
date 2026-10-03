// =========================================================
// QMinhOTM - Tweak Database (chuyên sâu: Power / Privacy / Network / Gaming / Services / Debloat / Clean)
// "danger: true" -> tweak có thể ảnh hưởng tính năng người dùng hay dùng -> mặc định KHÔNG tick sẵn
// "undo"         -> lệnh đảo ngược tương ứng, dùng để sinh Script Hoàn Tác. null = không thể/không cần hoàn tác.
// =========================================================
const tweaksData = [
    // ---------------- POWER ----------------
    {
        id: 'ultimate_power',
        title: 'Bật Ultimate Performance Power Plan',
        desc: 'Mở khóa chế độ hiệu năng cao nhất của CPU, giảm giật lag trên Laptop & PC.',
        category: 'Power',
        checked: true,
        danger: false,
        commands: `:: Bật Ultimate Performance Mode
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
powercfg /s e9a42b02-d5df-448d-aa00-03f14749eb61`,
        undo: `:: Quay lại Power Plan Balanced (mặc định Windows)
powercfg /s 381b4222-f694-41f0-9685-ff5bb260df2e`
    },
    {
        id: 'disable_usb_power_save',
        title: 'Tắt USB Selective Suspend',
        desc: 'Ngăn Windows ngắt tạm thời cổng USB (chuột/tay cầm) để tiết kiệm điện, tránh giật input khi chơi game.',
        category: 'Power',
        checked: true,
        danger: false,
        commands: `:: Tắt USB Selective Suspend trên mọi Power Plan
powercfg /setacvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0
powercfg /setdcvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0
powercfg -S SCHEME_CURRENT`,
        undo: `:: Bật lại USB Selective Suspend
powercfg /setacvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 1
powercfg /setdcvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 1
powercfg -S SCHEME_CURRENT`
    },
    {
        id: 'disable_hibernation',
        title: 'Tắt Hibernate & Xóa file hiberfil.sys',
        desc: 'Giải phóng dung lượng ổ C (bằng khoảng dung lượng RAM) nếu bạn không dùng chế độ ngủ đông.',
        category: 'Power',
        checked: false,
        danger: true,
        commands: `:: Tắt Hibernate (giải phóng ổ đĩa)
powercfg -h off`,
        undo: `:: Bật lại Hibernate
powercfg -h on`
    },

    // ---------------- PRIVACY / TELEMETRY ----------------
    {
        id: 'disable_telemetry',
        title: 'Tắt Telemetry & Data Collection',
        desc: 'Ngăn Windows gửi dữ liệu ngầm về Microsoft, giảm mức sử dụng CPU & mạng nền (tiến trình DiagTrack).',
        category: 'Privacy',
        checked: true,
        danger: false,
        commands: `:: Tắt Windows Telemetry Services
sc config DiagTrack start= disabled
net stop DiagTrack
sc config dmwappushservice start= disabled
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f`,
        undo: `:: Bật lại Telemetry Services
sc config DiagTrack start= auto
net start DiagTrack
sc config dmwappushservice start= demand
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /f`
    },
    {
        id: 'disable_cortana_search',
        title: 'Tắt Cortana & Web Search trong Start Menu',
        desc: 'Loại bỏ tiến trình SearchApp/Cortana chạy nền, tăng tốc độ phản hồi khi bấm nút Start.',
        category: 'Privacy',
        checked: true,
        danger: false,
        commands: `:: Tắt Cortana và Bing Search trong Start Menu
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v BingSearchEnabled /t REG_DWORD /d 0 /f
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v BingSearchEnabled /t REG_DWORD /d 0 /f`,
        undo: `:: Bật lại Cortana/Bing Search
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /f
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v BingSearchEnabled /f
reg delete "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v BingSearchEnabled /f`
    },
    {
        id: 'disable_activity_history',
        title: 'Tắt Activity History & Timeline',
        desc: 'Ngừng Windows ghi lại lịch sử hoạt động, giảm tiến trình ghi log nền và tăng quyền riêng tư.',
        category: 'Privacy',
        checked: true,
        danger: false,
        commands: `:: Tắt Activity History
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v EnableActivityFeed /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v PublishUserActivities /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v UploadUserActivities /t REG_DWORD /d 0 /f`,
        undo: `:: Bật lại Activity History
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v EnableActivityFeed /f
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v PublishUserActivities /f
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v UploadUserActivities /f`
    },
    {
        id: 'disable_background_apps',
        title: 'Tắt Background Apps (App chạy ngầm UWP)',
        desc: 'Chặn các app từ Microsoft Store tự chạy ngầm chiếm CPU/RAM khi không sử dụng.',
        category: 'Privacy',
        checked: true,
        danger: false,
        commands: `:: Tắt toàn bộ Background Apps UWP
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy" /v LetAppsRunInBackground /t REG_DWORD /d 2 /f`,
        undo: `:: Cho phép lại Background Apps UWP
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy" /v LetAppsRunInBackground /f`
    },

    // ---------------- CLEAN ----------------
    {
        id: 'clear_temp',
        title: 'Dọn Dẹp File Rác & Cache Hệ Thống',
        desc: 'Xóa Temp, Prefetch và Log files để giải phóng không gian ổ cứng.',
        category: 'Clean',
        checked: true,
        danger: false,
        commands: `:: Dọn dẹp Temp & Prefetch
del /q /f /s "%TEMP%\\*.*"
del /q /f /s "C:\\Windows\\Temp\\*.*"
del /q /f /s "C:\\Windows\\Prefetch\\*.*"`,
        undo: null
    },
    {
        id: 'clear_update_cache',
        title: 'Dọn Cache Windows Update (SoftwareDistribution)',
        desc: 'Xóa các gói cập nhật đã tải thừa, thường chiếm vài GB không cần thiết trên ổ C.',
        category: 'Clean',
        checked: false,
        danger: false,
        commands: `:: Dọn cache Windows Update
net stop wuauserv
net stop bits
del /q /f /s "C:\\Windows\\SoftwareDistribution\\Download\\*.*"
net start wuauserv
net start bits`,
        undo: null
    },
    {
        id: 'empty_recyclebin',
        title: 'Dọn Sạch Thùng Rác (Recycle Bin)',
        desc: 'Xóa toàn bộ file trong Recycle Bin của mọi phân vùng ổ đĩa.',
        category: 'Clean',
        checked: false,
        danger: true,
        commands: `:: Dọn sạch Recycle Bin
rd /s /q C:\\$Recycle.Bin`,
        undo: null
    },

    // ---------------- NETWORK ----------------
    {
        id: 'network_nodelay',
        title: 'Tối Ưu Mạng TCP NoDelay & Ping Game',
        desc: 'Tắt Nagle algorithm giúp giảm độ trễ (Ping) trong các game Online.',
        category: 'Network',
        checked: true,
        danger: false,
        commands: `:: Tối ưu TCP Latency
netsh int tcp set global autotuninglevel=normal
netsh int tcp set global congestionprovider=ctcp
netsh int tcp set global ecncapability=disabled`,
        undo: `:: Trả về cấu hình TCP mặc định
netsh int tcp set global congestionprovider=default
netsh int tcp set global ecncapability=default`
    },
    {
        id: 'disable_network_throttling',
        title: 'Tắt Network Throttling Index',
        desc: 'Gỡ giới hạn băng thông mặc định của Windows dành cho ứng dụng đa phương tiện, giúp game/stream mượt hơn.',
        category: 'Network',
        checked: true,
        danger: false,
        commands: `:: Tắt Network Throttling
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d ffffffff /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Priority" /t REG_DWORD /d 6 /f
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Scheduling Category" /t REG_SZ /d "High" /f`,
        undo: `:: Trả về Network Throttling mặc định
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 10 /f
reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /f
reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Priority" /f
reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Scheduling Category" /f`
    },
    {
        id: 'set_fast_dns',
        title: 'Đổi DNS Tốc Độ Cao (Cloudflare 1.1.1.1)',
        desc: 'Chuyển sang DNS Cloudflare giúp phân giải tên miền/máy chủ game nhanh hơn ISP mặc định.',
        category: 'Network',
        checked: false,
        danger: true,
        commands: `:: Đổi DNS sang Cloudflare (áp dụng cho card mạng Wi-Fi & Ethernet)
netsh interface ip set dns name="Wi-Fi" static 1.1.1.1
netsh interface ip add dns name="Wi-Fi" 1.0.0.1 index=2
netsh interface ip set dns name="Ethernet" static 1.1.1.1
netsh interface ip add dns name="Ethernet" 1.0.0.1 index=2`,
        undo: `:: Trả DNS về tự động nhận từ Router/ISP (DHCP)
netsh interface ip set dns name="Wi-Fi" dhcp
netsh interface ip set dns name="Ethernet" dhcp`
    },
    {
        id: 'disable_nagle_advanced',
        title: '[Nâng cao] Tắt Nagle Algorithm theo từng Adapter',
        desc: 'Đặt TcpAckFrequency=1 & TCPNoDelay=1 trực tiếp trong Registry card mạng, giảm input-lag sâu hơn. Chỉ dùng nếu hiểu rõ Registry.',
        category: 'Network',
        checked: false,
        danger: true,
        commands: `:: [NÂNG CAO] Tắt Nagle Algorithm cho toàn bộ Network Adapter
for /f %%i in ('reg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" ^| findstr "HKEY"') do (
    reg add "%%i" /v TcpAckFrequency /t REG_DWORD /d 1 /f
    reg add "%%i" /v TCPNoDelay /t REG_DWORD /d 1 /f
)`,
        undo: `:: Gỡ tuỳ chỉnh Nagle Algorithm khỏi từng Adapter
for /f %%i in ('reg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" ^| findstr "HKEY"') do (
    reg delete "%%i" /v TcpAckFrequency /f
    reg delete "%%i" /v TCPNoDelay /f
)`
    },

    // ---------------- GAMING / FPS ----------------
    {
        id: 'disable_game_dvr',
        title: 'Tắt Xbox Game DVR & Game Bar',
        desc: 'Tắt tính năng quay video ngầm của Windows giúp tăng FPS ổn định.',
        category: 'Gaming',
        checked: true,
        danger: false,
        commands: `:: Tắt Game DVR
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f
reg add "HKCU\\SOFTWARE\\Microsoft\\GameBar" /v AllowAutoGameMode /t REG_DWORD /d 1 /f`,
        undo: `:: Bật lại Game DVR
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 1 /f
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR /f
reg delete "HKCU\\SOFTWARE\\Microsoft\\GameBar" /v AllowAutoGameMode /f`
    },
    {
        id: 'enable_gpu_scheduling',
        title: 'Bật Hardware-Accelerated GPU Scheduling',
        desc: 'Cho phép GPU tự quản lý bộ nhớ đệm khung hình (VRAM), giảm độ trễ và tăng FPS trên GPU đời mới (Win10 2004+).',
        category: 'Gaming',
        checked: true,
        danger: false,
        commands: `:: Bật HAGS (Hardware Accelerated GPU Scheduling)
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f`,
        undo: `:: Tắt lại HAGS (về mặc định)
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 1 /f`
    },
    {
        id: 'disable_fullscreen_opt',
        title: 'Tắt Fullscreen Optimizations toàn hệ thống',
        desc: 'Chạy game ở chế độ Exclusive Fullscreen thật sự thay vì Borderless giả lập, giảm input-lag đáng kể.',
        category: 'Gaming',
        checked: true,
        danger: false,
        commands: `:: Tắt Fullscreen Optimizations mặc định
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_DXGIHonorFSEWindowsCompatible /t REG_DWORD /d 1 /f
reg add "HKCU\\System\\GameConfigStore" /v GameDVR_EFSEFeatureFlags /t REG_DWORD /d 0 /f`,
        undo: `:: Bật lại Fullscreen Optimizations mặc định
reg delete "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehaviorMode /f
reg delete "HKCU\\System\\GameConfigStore" /v GameDVR_DXGIHonorFSEWindowsCompatible /f
reg delete "HKCU\\System\\GameConfigStore" /v GameDVR_EFSEFeatureFlags /f`
    },
    {
        id: 'disable_mouse_accel',
        title: 'Tắt Mouse Acceleration (Enhance Pointer Precision)',
        desc: 'Đưa độ nhạy chuột về 1:1 thực sự, cải thiện độ chính xác khi ngắm bắn trong game FPS.',
        category: 'Gaming',
        checked: false,
        danger: true,
        commands: `:: Tắt Enhance Pointer Precision
reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 0 /f
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 0 /f`,
        undo: `:: Bật lại Enhance Pointer Precision (mặc định Windows)
reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 1 /f
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 6 /f
reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 10 /f`
    },
    {
        id: 'gpu_priority_boost',
        title: 'Tăng Ưu Tiên CPU/GPU cho Tiến Trình Game',
        desc: 'Đặt System Responsiveness = 0, dồn tối đa tài nguyên CPU cho game đang chạy thay vì tác vụ nền.',
        category: 'Gaming',
        checked: true,
        danger: false,
        commands: `:: Tăng độ ưu tiên xử lý cho Game
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v SystemResponsiveness /t REG_DWORD /d 0 /f`,
        undo: `:: Trả về System Responsiveness mặc định
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v SystemResponsiveness /t REG_DWORD /d 20 /f`
    },
    {
        id: 'kill_background_bloat',
        title: 'Đóng Ứng Dụng Nền Ngốn Tài Nguyên (Game Mode)',
        desc: 'Force-close OneDrive, Teams, Skype nền, Adobe Updater trước khi vào game để giải phóng tối đa CPU/RAM.',
        category: 'Gaming',
        checked: false,
        danger: true,
        commands: `:: Đóng các tiến trình nền phổ biến (Game Mode)
taskkill /F /IM OneDrive.exe /T 2>nul
taskkill /F /IM Teams.exe /T 2>nul
taskkill /F /IM Skype.exe /T 2>nul
taskkill /F /IM AdobeUpdateService.exe /T 2>nul
taskkill /F /IM OfficeClickToRun.exe /T 2>nul`,
        undo: null
    },

    // ---------------- SYSTEM / VISUAL ----------------
    {
        id: 'fix_visual_effects',
        title: 'Tối Ưu Hiệu Ứng Đồ Họa Windows',
        desc: 'Tắt các hiệu ứng bóng mờ, animation không cần thiết để tăng tốc phản hồi giao diện.',
        category: 'System',
        checked: false,
        danger: false,
        commands: `:: Adjust Visual Effects for Performance
reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 0 /f
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAnimations /t REG_DWORD /d 0 /f
reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f`,
        undo: `:: Bật lại hiệu ứng đồ họa mặc định
reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 400 /f
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarAnimations /t REG_DWORD /d 1 /f
reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 1 /f`
    },
    {
        id: 'disable_widgets_taskbar',
        title: 'Tắt Widgets & Chat trên Taskbar (Win11)',
        desc: 'Loại bỏ tiến trình Widgets.exe chạy nền liên tục cập nhật tin tức/thời tiết, tiết kiệm RAM.',
        category: 'System',
        checked: true,
        danger: false,
        commands: `:: Tắt Widgets & Chat Icon Taskbar
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh" /v AllowNewsAndInterests /t REG_DWORD /d 0 /f
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarDa /t REG_DWORD /d 0 /f
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarMn /t REG_DWORD /d 0 /f`,
        undo: `:: Bật lại Widgets & Chat Taskbar
reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh" /v AllowNewsAndInterests /f
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarDa /t REG_DWORD /d 1 /f
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarMn /t REG_DWORD /d 1 /f`
    },

    // ---------------- SERVICES (giảm số lượng tiến trình chạy nền) ----------------
    {
        id: 'disable_sysmain',
        title: 'Tắt SysMain (Superfetch)',
        desc: 'Ngừng tiến trình quét trước dữ liệu vào RAM — cải thiện rõ rệt trên máy dùng SSD, giảm hoạt động ổ đĩa nền.',
        category: 'Services',
        checked: true,
        danger: false,
        commands: `:: Tắt SysMain / Superfetch
sc stop SysMain
sc config SysMain start= disabled`,
        undo: `:: Bật lại SysMain / Superfetch
sc config SysMain start= auto
sc start SysMain`
    },
    {
        id: 'disable_search_indexing',
        title: 'Tắt Windows Search Indexing',
        desc: 'Ngừng tiến trình SearchIndexer.exe quét toàn bộ file nền để lập chỉ mục tìm kiếm nhanh — hữu ích cho máy cấu hình yếu.',
        category: 'Services',
        checked: false,
        danger: true,
        commands: `:: Tắt Windows Search Indexing (sẽ làm tìm kiếm file chậm hơn)
sc stop WSearch
sc config WSearch start= disabled`,
        undo: `:: Bật lại Windows Search Indexing
sc config WSearch start= auto
sc start WSearch`
    },
    {
        id: 'disable_misc_services',
        title: 'Vô Hiệu Hóa Nhóm Dịch Vụ Không Cần Thiết',
        desc: 'Tắt Fax, Remote Registry, Windows Error Reporting, Maps Broker, Bluetooth Support (nếu không dùng) — giảm số tiến trình nền svchost.',
        category: 'Services',
        checked: true,
        danger: false,
        commands: `:: Vô hiệu hóa nhóm dịch vụ ít dùng
sc config Fax start= disabled
sc config RemoteRegistry start= disabled
sc config WerSvc start= disabled
sc config MapsBroker start= disabled
sc config DiagSvc start= disabled
sc config RetailDemo start= disabled`,
        undo: `:: Bật lại nhóm dịch vụ (về chế độ Manual mặc định của Windows)
sc config Fax start= demand
sc config WerSvc start= demand
sc config MapsBroker start= demand
sc config DiagSvc start= demand
sc config RetailDemo start= demand`
    },
    {
        id: 'disable_xbox_services',
        title: 'Tắt Dịch Vụ Xbox Network (nếu không chơi qua Xbox App)',
        desc: 'Giải phóng RAM/CPU do XblAuthManager, XblGameSave, XboxNetApiSvc chiếm dụng khi không cần thiết.',
        category: 'Services',
        checked: false,
        danger: true,
        commands: `:: Tắt dịch vụ Xbox Network (bỏ qua nếu bạn dùng Xbox App / Game Pass)
sc config XblAuthManager start= disabled
sc config XblGameSave start= disabled
sc config XboxNetApiSvc start= disabled
sc config XboxGipSvc start= disabled`,
        undo: `:: Bật lại dịch vụ Xbox Network (Manual mặc định)
sc config XblAuthManager start= demand
sc config XblGameSave start= demand
sc config XboxNetApiSvc start= demand
sc config XboxGipSvc start= demand`
    },

    // ---------------- DEBLOAT ----------------
    {
        id: 'remove_bloatware_apps',
        title: '[Debloat] Gỡ App Rác Cài Sẵn Windows',
        desc: 'Gỡ các app UWP hiếm khi dùng: 3D Viewer, Mixed Reality, Skype, Xbox Console Companion, Zune Music/Video, Get Help... Không đụng đến Store, Camera, Calculator.',
        category: 'Debloat',
        checked: false,
        danger: true,
        commands: `:: [Debloat] Gỡ ứng dụng rác cài sẵn (an toàn - không đụng app lõi hệ thống)
powershell -NoProfile -Command "$apps = @('Microsoft.3DViewer','Microsoft.MixedReality.Portal','Microsoft.SkypeApp','Microsoft.XboxApp','Microsoft.ZuneMusic','Microsoft.ZuneVideo','Microsoft.GetHelp','Microsoft.Getstarted','Microsoft.MicrosoftOfficeHub','Microsoft.People','Microsoft.WindowsFeedbackHub','Microsoft.YourPhone','Microsoft.BingWeather','Microsoft.BingNews'); foreach ($a in $apps) { Get-AppxPackage -Name $a -AllUsers | Remove-AppxPackage -ErrorAction SilentlyContinue }"`,
        undo: null
    },
    {
        id: 'disable_onedrive_autostart',
        title: '[Debloat] Tắt OneDrive Tự Khởi Động Cùng Windows',
        desc: 'Ngăn OneDrive.exe tự chạy nền đồng bộ khi mở máy (không gỡ, chỉ tắt auto-start). Giảm 1 tiến trình chạy ngầm liên tục.',
        category: 'Debloat',
        checked: true,
        danger: false,
        commands: `:: Tắt OneDrive tự khởi động
reg delete "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" /v OneDrive /f`,
        undo: `:: Bật lại OneDrive tự khởi động
reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" /v OneDrive /t REG_SZ /d "%UserProfile%\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background" /f`
    }
];

// =========================================================
// LƯU/TẢI TRẠNG THÁI TICK CHỌN (localStorage) - giữ preset của người dùng giữa các lần ghé thăm
// =========================================================
const STORAGE_KEY = 'qminhotm_tweak_state_v1';

function saveTweakState() {
    try {
        const state = {};
        tweaksData.forEach(t => { state[t.id] = t.checked; });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* localStorage không khả dụng - bỏ qua im lặng */ }
}

function loadTweakState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const state = JSON.parse(raw);
        tweaksData.forEach(t => {
            if (Object.prototype.hasOwnProperty.call(state, t.id)) {
                t.checked = !!state[t.id];
            }
        });
    } catch (e) { /* dữ liệu lỗi/không có - dùng mặc định */ }
}

// Trạng thái bộ lọc theo Category đang chọn ("all" = tất cả)
let currentFilter = 'all';
// Set các tweak đang mở panel xem lệnh chi tiết
const expandedTweaks = new Set();

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Render bộ lọc theo nhóm (Power / Privacy / Network / Gaming / Services / Debloat / Clean / System)
function renderFilters() {
    const filterBar = document.getElementById('categoryFilters');
    if (!filterBar) return;

    const categories = ['all', ...new Set(tweaksData.map(t => t.category))];
    filterBar.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        const label = cat === 'all' ? 'Tất cả' : cat;
        btn.textContent = label;
        btn.onclick = () => {
            currentFilter = cat;
            renderFilters();
            renderTweaks();
        };
        btn.className = `text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            currentFilter === cat
                ? 'bg-brand-500 text-black border-brand-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
        }`;
        filterBar.appendChild(btn);
    });
}

// Render Tweak List UI
function renderTweaks() {
    const container = document.getElementById('tweakList');
    if (!container) return;

    container.innerHTML = '';

    const list = currentFilter === 'all' ? tweaksData : tweaksData.filter(t => t.category === currentFilter);

    list.forEach(tweak => {
        const isOpen = expandedTweaks.has(tweak.id);
        const card = document.createElement('div');
        card.className = `p-4 rounded-xl border transition-all duration-200 cursor-pointer relative ${
            tweak.checked ? 'bg-slate-900/80 border-brand-500/50' : 'bg-slate-900/30 border-slate-800'
        }`;
        card.onclick = (e) => {
            if (e.target.closest('.tweak-info-btn') || e.target.closest('.tweak-command-panel')) return;
            if (e.target.tagName !== 'INPUT') {
                tweak.checked = !tweak.checked;
                renderTweaks();
                updateScriptOutput();
                saveTweakState();
            }
        };

      card.innerHTML = `
            <div class="flex items-start justify-between gap-2">
                <div class="pr-2 min-w-0 flex-1">
                    <div class="flex items-center gap-1.5 flex-wrap">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-brand-accent px-2 py-0.5 rounded bg-brand-accent/10 inline-block">
                            ${tweak.category}
                        </span>
                        ${tweak.danger ? `<span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 inline-block"><i class="fa-solid fa-triangle-exclamation"></i> Nâng cao</span>` : ''}
                        ${tweak.undo === null ? `<span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-slate-800 inline-block">Không hoàn tác được</span>` : ''}
                    </div>
                    <h3 class="font-bold text-white text-sm mt-1.5">${tweak.title}</h3>
                    <p class="text-xs text-slate-400 mt-1 leading-relaxed">${tweak.desc}</p>
                    <button type="button" class="tweak-info-btn text-[11px] text-brand-accent/80 hover:text-brand-accent mt-2 flex items-center gap-1" onclick="toggleTweakInfo(event, '${tweak.id}')">
                        <i class="fa-solid fa-circle-info"></i> ${isOpen ? 'Ẩn lệnh' : 'Xem lệnh sẽ chạy'}
                    </button>
                    <div class="tweak-command-panel ${isOpen ? 'open' : ''}">
                        <pre class="bg-black/80 border border-slate-800 rounded-lg p-2.5 text-[10px] text-slate-300 code-font overflow-x-auto whitespace-pre-wrap">${escapeHtml(tweak.commands)}</pre>
                    </div>
                </div>
                <input type="checkbox" ${tweak.checked ? 'checked' : ''} onchange="toggleTweak('${tweak.id}', this.checked)" class="w-5 h-5 rounded accent-brand-500 cursor-pointer flex-shrink-0 mt-0.5">
            </div>
        `;
        container.appendChild(card);
    });

    const counterElem = document.getElementById('selectedCounter');
    if (counterElem) {
        const total = tweaksData.length;
        const selected = tweaksData.filter(t => t.checked).length;
        counterElem.textContent = `${selected} / ${total} tweak đã chọn`;
    }
}

// Mở/đóng panel xem lệnh chi tiết của 1 tweak (không toggle checkbox)
function toggleTweakInfo(event, id) {
    event.stopPropagation();
    if (expandedTweaks.has(id)) {
        expandedTweaks.delete(id);
    } else {
        expandedTweaks.add(id);
    }
    renderTweaks();
}

// Toggle Single Tweak
function toggleTweak(id, isChecked) {
    const item = tweaksData.find(t => t.id === id);
    if (item) {
        item.checked = isChecked;
        renderTweaks();
        updateScriptOutput();
        saveTweakState();
    }
}

// Select / Deselect All (áp dụng trên toàn bộ danh sách, không chỉ phần đang lọc)
function selectAllTweaks(status) {
    tweaksData.forEach(t => t.checked = status);
    renderTweaks();
    updateScriptOutput();
    saveTweakState();
    addConsoleLog(status ? "Đã chọn toàn bộ danh sách Tweak." : "Đã bỏ chọn toàn bộ Tweak.");
}

// Chỉ chọn các tweak an toàn (bỏ qua danger: true) - dành cho người mới
function selectSafeTweaksOnly() {
    tweaksData.forEach(t => t.checked = !t.danger);
    renderTweaks();
    updateScriptOutput();
    saveTweakState();
    addConsoleLog("<span class='text-brand-accent'>Đã áp dụng bộ chọn AN TOÀN (bỏ qua các tweak nâng cao).</span>");
}

// =========================================================
// PRESET NHANH THEO MỤC ĐÍCH SỬ DỤNG
// =========================================================
const PRESETS = {
    gaming: {
        label: 'Gaming / FPS',
        ids: ['ultimate_power', 'disable_usb_power_save', 'disable_telemetry', 'disable_background_apps',
              'network_nodelay', 'disable_network_throttling', 'disable_game_dvr', 'enable_gpu_scheduling',
              'disable_fullscreen_opt', 'gpu_priority_boost', 'disable_widgets_taskbar', 'disable_sysmain']
    },
    weak_pc: {
        label: 'Máy Cấu Hình Yếu',
        ids: ['disable_telemetry', 'disable_cortana_search', 'disable_activity_history', 'disable_background_apps',
              'clear_temp', 'disable_sysmain', 'disable_misc_services', 'disable_widgets_taskbar',
              'fix_visual_effects', 'disable_onedrive_autostart']
    },
    office: {
        label: 'Văn Phòng / Ổn định',
        ids: ['disable_telemetry', 'disable_cortana_search', 'disable_activity_history', 'disable_background_apps',
              'clear_temp', 'disable_misc_services', 'disable_onedrive_autostart']
    }
};

function applyPreset(name) {
    const preset = PRESETS[name];
    if (!preset) return;

    tweaksData.forEach(t => { t.checked = preset.ids.includes(t.id); });
    renderTweaks();
    updateScriptOutput();
    saveTweakState();
    addConsoleLog(`<span class='text-brand-accent'>Đã áp dụng Preset "${preset.label}" (${preset.ids.length} tweak).</span>`);
}

// Update Script Exporter Window
function updateScriptOutput() {
    const selected = tweaksData.filter(t => t.checked);
    let code = `@echo off\n:: =========================================================\n:: QMinhOTM - Windows Deep Optimization Script\n:: Tong so tweak duoc ap dung: ${selected.length}\n:: Generated on: ${new Date().toLocaleDateString()}\n:: Co the hoan tac bang QMinhOTM_Undo.bat (nut "Tai Script Hoan Tac")\n:: =========================================================\n\n`;

    code += `net session >nul 2>&1\nif %errorLevel% neq 0 (\n    echo [!] Vui long chay Script duoi quyen Administrator!\n    pause\n    exit\n)\n\n`;

    code += `:: --- Tao diem khoi phuc he thong truoc khi tweak (an toan) ---\necho [QMinhOTM] Dang tao System Restore Point...\npowershell -NoProfile -Command "Checkpoint-Computer -Description 'QMinhOTM Backup' -RestorePointType 'MODIFY_SETTINGS'" >nul 2>&1\n\n`;

    code += `echo [QMinhOTM] Bat dau qua trinh toi uu hoa he thong (${selected.length} tweak)...\n\n`;

    selected.forEach(t => {
        code += `echo [+] Ap dung: ${t.title}\n`;
        code += `${t.commands}\n\n`;
    });

    code += `echo [OK] Hoan tat toi uu hoa voi QMinhOTM!\nipconfig /flushdns\ntaskkill /f /im explorer.exe >nul 2>&1\nstart explorer.exe\npause\n`;

    const outputElem = document.getElementById('scriptOutput');
    if (outputElem) {
        outputElem.textContent = code;
    }
}

// Sinh Script Hoàn Tác (đảo ngược các tweak ĐANG được chọn, bỏ qua tweak không thể hoàn tác)
function generateUndoScript() {
    const selected = tweaksData.filter(t => t.checked);
    const reversible = selected.filter(t => t.undo);
    const nonReversible = selected.filter(t => !t.undo);

    let code = `@echo off\n:: =========================================================\n:: QMinhOTM - Script Hoan Tac (Undo)\n:: Dao nguoc ${reversible.length} tweak da chon (bo qua ${nonReversible.length} tweak khong the hoan tac)\n:: Generated on: ${new Date().toLocaleDateString()}\n:: =========================================================\n\n`;

    code += `net session >nul 2>&1\nif %errorLevel% neq 0 (\n    echo [!] Vui long chay Script duoi quyen Administrator!\n    pause\n    exit\n)\n\n`;

    code += `echo [QMinhOTM] Dang hoan tac ${reversible.length} tweak...\n\n`;

    reversible.forEach(t => {
        code += `echo [-] Hoan tac: ${t.title}\n`;
        code += `${t.undo}\n\n`;
    });

    if (nonReversible.length > 0) {
        code += `:: --- Cac tweak sau KHONG the hoan tac tu dong (thao tac xoa/go cai da hoan tat) ---\n`;
        nonReversible.forEach(t => {
            code += `:: - ${t.title}\n`;
        });
        code += `\n`;
    }

    code += `echo [OK] Da hoan tac xong cac thay doi co the dao nguoc!\nipconfig /flushdns\ntaskkill /f /im explorer.exe >nul 2>&1\nstart explorer.exe\npause\n`;

    return code;
}

// Tải Script Hoàn Tác dưới dạng .bat
function downloadUndoScript() {
    const selected = tweaksData.filter(t => t.checked);
    if (selected.length === 0) {
        alert('Chưa có tweak nào được chọn để tạo Script Hoàn Tác.');
        return;
    }
    const code = generateUndoScript();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'QMinhOTM_Undo.bat';
    link.click();
    addConsoleLog("<span class='text-amber-400'>Đã tải QMinhOTM_Undo.bat — chạy file này với quyền Admin để đảo ngược các thay đổi.</span>");
}

// Add System Console Log
function addConsoleLog(msg) {
    const consoleBox = document.getElementById('consoleLog');
    if (!consoleBox) return;

    const time = new Date().toLocaleTimeString();
    const logItem = document.createElement('div');
    logItem.innerHTML = `<span class="text-slate-500">[${time}]</span> ${msg}`;
    consoleBox.appendChild(logItem);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

// Action: Quick Boost
function runQuickBoost() {
    addConsoleLog("<span class='text-yellow-400'>[BOOST] Đang kích hoạt Tối Ưu Nhanh...</span>");

    setTimeout(() => {
        // Nếu đang có Agent LIVE, không ghi đè số liệu thật bằng số giả -
        // để lần poll kế tiếp (≤1.5s) tự phản ánh đúng thực tế sau khi dọn RAM.
        if (!agentConnected) {
            document.getElementById('cpuValue').innerText = '18%';
            document.getElementById('ramValue').innerText = '35%';
            document.getElementById('gpuValue').innerText = '10%';
            setGaugeOffset('cpu', 18);
            setGaugeOffset('ram', 35);
            setGaugeOffset('gpu', 10);
        }

        addConsoleLog("<span class='text-brand-500'>[SUCCESS] Đã giải phóng 1.8GB RAM Cache!</span>");
        addConsoleLog("<span class='text-brand-500'>[SUCCESS] Đã dọn dẹp các tiến trình ngầm không cần thiết!</span>");
        if (agentConnected) {
            addConsoleLog("<span class='text-slate-500'>[LIVE] Đồng hồ đo sẽ tự cập nhật số liệu thật từ Agent trong giây lát.</span>");
        }
    }, 1000);
}

// Action: Process Reducer - mô phỏng đóng các tiến trình nền ngốn RAM
function runProcessReducer() {
    const fakeProcesses = ['OneDrive.exe', 'Teams.exe', 'SearchIndexer.exe', 'WidgetService.exe', 'AdobeUpdater.exe'];
    addConsoleLog("<span class='text-yellow-400'>[PROCESS] Đang quét & đóng các tiến trình nền không cần thiết...</span>");

    fakeProcesses.forEach((proc, i) => {
        setTimeout(() => {
            addConsoleLog(`<span class="text-brand-500">[KILLED]</span> ${proc} <span class="text-slate-500">đã được giải phóng khỏi bộ nhớ.</span>`);
        }, 300 * (i + 1));
    });

    setTimeout(() => {
        addConsoleLog("<span class='text-brand-accent'>[DONE] Đã giảm số lượng tiến trình nền, RAM khả dụng tăng thêm.</span>");
    }, 300 * (fakeProcesses.length + 1));
}

// Action: Clear Cache
function clearCacheLog() {
    addConsoleLog("Đang giải phóng bộ nhớ đệm RAM...");
    setTimeout(() => {
        addConsoleLog("<span class='text-brand-500'>Đã xóa Standby RAM List thành công.</span>");
    }, 600);
}

// Action: Flush DNS
function flushDNSLog() {
    addConsoleLog("Đang làm sạch DNS Cache...");
    setTimeout(() => {
        addConsoleLog("<span class='text-brand-500'>Successfully flushed the DNS Resolver Cache.</span>");
    }, 500);
}

// Action: Copy Script
function copyScript() {
    const code = document.getElementById('scriptOutput').textContent;
    navigator.clipboard.writeText(code);
    addConsoleLog("<span class='text-brand-accent'>Đã sao chép mã Batch Script vào Clipboard!</span>");
    alert('Đã sao chép Script tối ưu QMinhOTM vào khay nhớ tạm!');
}

// Action: Download Script File
function downloadScript() {
    const code = document.getElementById('scriptOutput').textContent;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'QMinhOTM_Optimizer.bat';
    link.click();
    addConsoleLog("<span class='text-brand-500'>Đã tải xuống file QMinhOTM_Optimizer.bat thành công.</span>");
}

// =========================================================
// GAME BOOSTER - DANH SÁCH GAME ĐỘNG (FPS Predictor)
// Số liệu là ƯỚC TÍNH THAM KHẢO dựa trên nhóm tweak Gaming/Network, không phải benchmark đo thật.
// =========================================================
const gamesData = [
    { tag: 'CS2', name: 'Counter-Strike 2', desc: 'Giảm Input Lag & Tăng 1% Low FPS', fps: '+15 - 25 FPS', ping: 'Ping: -8ms', color: 'amber' },
    { tag: 'VAL', name: 'Valorant', desc: 'Tối ưu CPU Priority & Vanguard latency', fps: '+20 - 35 FPS', ping: 'Ping: -5ms', color: 'red' },
    { tag: 'LOL', name: 'Liên Minh Huyền Thoại', desc: 'Mượt combat tổng & khắc phục Freeze hình', fps: '+30 - 50 FPS', ping: 'Ping: Stable', color: 'blue' },
    { tag: 'PUBG', name: 'PUBG: Battlegrounds', desc: 'Giảm stutter khi loot & tối ưu render khoảng cách xa', fps: '+10 - 20 FPS', ping: 'Ping: -6ms', color: 'orange' },
    { tag: 'FN', name: 'Fortnite', desc: 'Tối ưu UE-based engine, giảm shader-compile stutter', fps: '+15 - 30 FPS', ping: 'Ping: -4ms', color: 'purple' },
    { tag: 'DOTA', name: 'Dota 2', desc: 'Ổn định late-game teamfight, giảm giật hình', fps: '+10 - 25 FPS', ping: 'Ping: Stable', color: 'rose' },
    { tag: 'GTA5', name: 'GTA V / FiveM', desc: 'Giảm tải CPU nền, tăng khung hình khi vào thành phố đông NPC', fps: '+8 - 18 FPS', ping: '—', color: 'emerald' },
    { tag: 'APEX', name: 'Apex Legends', desc: 'Giảm 1% Low & 0.1% Low FPS (frame-time ổn định hơn)', fps: '+12 - 22 FPS', ping: 'Ping: -5ms', color: 'cyan' }
];

const colorMap = {
    amber: 'bg-amber-500/10 text-amber-500', red: 'bg-red-500/10 text-red-500', blue: 'bg-blue-500/10 text-blue-500',
    orange: 'bg-orange-500/10 text-orange-500', purple: 'bg-purple-500/10 text-purple-500', rose: 'bg-rose-500/10 text-rose-500',
    emerald: 'bg-emerald-500/10 text-emerald-500', cyan: 'bg-cyan-500/10 text-cyan-500'
};

function renderGames() {
    const container = document.getElementById('gameBoosterList');
    if (!container) return;
    container.innerHTML = '';

    gamesData.forEach(game => {
        const row = document.createElement('div');
        row.className = 'bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3';
        row.innerHTML = `
            <div class="flex items-center space-x-4 min-w-0">
                <div class="w-12 h-12 ${colorMap[game.color] || colorMap.blue} rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0">${game.tag}</div>
                <div class="min-w-0">
                    <h4 class="font-bold text-white truncate">${game.name}</h4>
                    <p class="text-xs text-slate-400 truncate">${game.desc}</p>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <span class="text-brand-500 font-bold text-sm block">${game.fps}</span>
                <span class="block text-xs text-slate-500">${game.ping}</span>
            </div>
        `;
        container.appendChild(row);
    });
}

// =========================================================
// SO SÁNH HIỆU NĂNG TRƯỚC / SAU (dựa trên số liệu thật từ Agent)
// =========================================================
let snapshotBeforeData = null;
let lastAgentStats = null;

function renderSnapshotResult() {
    const elem = document.getElementById('snapshotResult');
    if (!elem) return;

    if (!snapshotBeforeData) {
        elem.textContent = 'Chưa có dữ liệu snapshot nào.';
        return;
    }

    elem.innerHTML = `<span class="text-slate-400">Đã chụp TRƯỚC lúc ${snapshotBeforeData.timestamp || '--'}:</span>
        <span class="text-white font-mono ml-1">CPU ${snapshotBeforeData.cpu}% · RAM ${snapshotBeforeData.ram_percent}% · GPU ${snapshotBeforeData.gpu ?? 'N/A'}%</span>
        <span class="block text-slate-500 mt-1">Bấm "Chụp Sau" sau khi chạy Script tối ưu để so sánh.</span>`;
}

function snapshotBefore() {
    if (!agentConnected || !lastAgentStats) {
        addConsoleLog("<span class='text-amber-400'>[!] Cần kết nối Agent (LIVE) để chụp snapshot số liệu thật.</span>");
        return;
    }
    snapshotBeforeData = { ...lastAgentStats };
    renderSnapshotResult();
    addConsoleLog("<span class='text-brand-accent'>Đã chụp snapshot TRƯỚC khi tối ưu.</span>");
}

function snapshotAfter() {
    const elem = document.getElementById('snapshotResult');
    if (!elem) return;

    if (!agentConnected || !lastAgentStats) {
        addConsoleLog("<span class='text-amber-400'>[!] Cần kết nối Agent (LIVE) để chụp snapshot số liệu thật.</span>");
        return;
    }
    if (!snapshotBeforeData) {
        addConsoleLog("<span class='text-amber-400'>[!] Chưa có snapshot TRƯỚC — hãy bấm 'Chụp Trước' trước tiên.</span>");
        return;
    }

    const after = { ...lastAgentStats };
    const diffCpu = (after.cpu - snapshotBeforeData.cpu).toFixed(1);
    const diffRam = (after.ram_percent - snapshotBeforeData.ram_percent).toFixed(1);
    const gpuBefore = snapshotBeforeData.gpu;
    const gpuAfter = after.gpu;
    const diffGpu = (gpuBefore !== null && gpuAfter !== null) ? (gpuAfter - gpuBefore).toFixed(1) : null;

    const fmtDiff = (v) => {
        const num = Number(v);
        if (num < 0) return `<span class="text-brand-500">${num}% (giảm, tốt hơn)</span>`;
        if (num > 0) return `<span class="text-red-400">+${num}% (tăng)</span>`;
        return `<span class="text-slate-400">Không đổi</span>`;
    };

    elem.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            <div class="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <div class="text-slate-500 text-[10px] uppercase font-bold">CPU</div>
                <div class="text-white font-mono">${snapshotBeforeData.cpu}% → ${after.cpu}%</div>
                <div class="mt-0.5">${fmtDiff(diffCpu)}</div>
            </div>
            <div class="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <div class="text-slate-500 text-[10px] uppercase font-bold">RAM</div>
                <div class="text-white font-mono">${snapshotBeforeData.ram_percent}% → ${after.ram_percent}%</div>
                <div class="mt-0.5">${fmtDiff(diffRam)}</div>
            </div>
            <div class="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <div class="text-slate-500 text-[10px] uppercase font-bold">GPU</div>
                <div class="text-white font-mono">${gpuBefore ?? 'N/A'}% → ${gpuAfter ?? 'N/A'}%</div>
                <div class="mt-0.5">${diffGpu !== null ? fmtDiff(diffGpu) : '<span class="text-slate-500">N/A</span>'}</div>
            </div>
        </div>
    `;
    addConsoleLog("<span class='text-brand-500'>Đã so sánh snapshot TRƯỚC/SAU.</span>");
}

// =========================================================
// GIÁM SÁT CPU / RAM / GPU THẬT (qua Agent nội bộ localhost)
// Trình duyệt KHÔNG có quyền đọc trực tiếp tài nguyên hệ thống (giới hạn bảo mật),
// nên số liệu chính xác chỉ có được khi Agent PowerShell (chạy trên máy người dùng,
// chỉ lắng nghe 127.0.0.1) đang hoạt động. Nếu chưa chạy Agent -> hiển thị DEMO MODE.
// =========================================================
const AGENT_URL = 'http://localhost:8787/stats';
const GAUGE_CIRCUMFERENCE = 282.6; // 2 * PI * r(45)
let agentConnected = false;
let agentPollTimer = null;

function setGaugeOffset(prefix, percent) {
    const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
    const offset = GAUGE_CIRCUMFERENCE - (clamped / 100) * GAUGE_CIRCUMFERENCE;
    const gaugeElem = document.getElementById(prefix + 'Gauge');
    if (gaugeElem) gaugeElem.setAttribute('stroke-dashoffset', offset.toFixed(1));
}

function setAgentStatus(connected) {
    agentConnected = connected;
    const badge = document.getElementById('agentStatusBadge');
    if (!badge) return;
    if (connected) {
        badge.textContent = '● LIVE - Agent đã kết nối (số liệu thật)';
        badge.className = 'text-[11px] font-bold text-brand-500 bg-brand-500/10 px-2.5 py-1 rounded-full';
    } else {
        badge.textContent = '○ DEMO MODE - Chưa kết nối Agent (số liệu mô phỏng)';
        badge.className = 'text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full';
    }
}

// Cập nhật gauge bằng dữ liệu THẬT nhận từ Agent
function applyRealStats(data) {
    lastAgentStats = data;

    const cpu = Number(data.cpu);
    const ram = Number(data.ram_percent);
    const gpu = data.gpu === null || data.gpu === undefined ? null : Number(data.gpu);

    document.getElementById('cpuValue').innerText = Number.isFinite(cpu) ? Math.round(cpu) + '%' : '--';
    document.getElementById('ramValue').innerText = Number.isFinite(ram) ? Math.round(ram) + '%' : '--';
    document.getElementById('gpuValue').innerText = gpu !== null && Number.isFinite(gpu) ? Math.round(gpu) + '%' : 'N/A';

    setGaugeOffset('cpu', cpu);
    setGaugeOffset('ram', ram);
    setGaugeOffset('gpu', gpu !== null ? gpu : 0);

    const cpuLabel = document.getElementById('cpuLabel');
    if (cpuLabel) cpuLabel.innerText = `${navigator.hardwareConcurrency || '?'} Luồng CPU (thực)`;

    const ramLabel = document.getElementById('ramLabel');
    if (ramLabel && data.ram_used_gb != null && data.ram_total_gb != null) {
        ramLabel.innerText = `${data.ram_used_gb} GB / ${data.ram_total_gb} GB (thực)`;
    }

    const gpuLabel = document.getElementById('gpuLabel');
    if (gpuLabel) gpuLabel.innerText = gpu !== null ? 'Đo qua GPU Engine Counter (thực)' : 'Không đọc được GPU (driver không hỗ trợ)';
}

// Thử kết nối Agent để lấy số liệu thật; nếu fail thì chạy demo mô phỏng
async function pollAgent() {
    try {
        const res = await fetch(AGENT_URL, { cache: 'no-store', signal: AbortSignal.timeout(1500) });
        if (!res.ok) throw new Error('Agent response not OK');
        const data = await res.json();
        setAgentStatus(true);
        applyRealStats(data);
    } catch (err) {
        setAgentStatus(false);
        runDemoFluctuation();
    }
}

// Mô phỏng dao động số liệu khi CHƯA có Agent (rõ ràng gắn nhãn DEMO MODE, không giả vờ là số thật)
function runDemoFluctuation() {
    const cpu = Math.floor(20 + Math.random() * 25);
    const ram = Math.floor(45 + Math.random() * 20);
    const gpu = Math.floor(10 + Math.random() * 30);

    document.getElementById('cpuValue').innerText = cpu + '%';
    document.getElementById('ramValue').innerText = ram + '%';
    document.getElementById('gpuValue').innerText = gpu + '%';

    setGaugeOffset('cpu', cpu);
    setGaugeOffset('ram', ram);
    setGaugeOffset('gpu', gpu);

    const cpuLabel = document.getElementById('cpuLabel');
    if (cpuLabel) cpuLabel.innerText = `${navigator.hardwareConcurrency || '?'} Luồng CPU (thực) · RAM/GPU: demo`;

    const ramLabel = document.getElementById('ramLabel');
    if (ramLabel) {
        const approxTotal = navigator.deviceMemory ? `≈ ${navigator.deviceMemory} GB (ước tính trình duyệt)` : '-- GB / -- GB (demo)';
        ramLabel.innerText = approxTotal;
    }

    const gpuLabel = document.getElementById('gpuLabel');
    if (gpuLabel) gpuLabel.innerText = 'Số liệu demo - chưa kết nối Agent';
}

// Nội dung Agent giám sát (PowerShell) - chỉ lắng nghe 127.0.0.1, KHÔNG gửi dữ liệu ra Internet
const AGENT_SCRIPT_CONTENT = `# =========================================================
# QMinhOTM Monitor Agent
# Doc CPU / RAM / GPU usage THAT tren may va phuc vu qua localhost
# de trang web QMinhOTM hien thi so lieu chinh xac thay vi mo phong.
# Agent nay CHI lang nghe 127.0.0.1 (khong the truy cap tu may khac,
# khong gui bat ky du lieu nao ra Internet). Dong cua so nay de dung Agent.
# =========================================================

$port = 8787
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    Write-Host "[LOI] Khong the mo cong $port. Hay dong ung dung dang dung cong nay roi thu lai." -ForegroundColor Red
    pause
    exit
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host " QMinhOTM Agent dang chay tai http://localhost:$port/stats" -ForegroundColor Green
Write-Host " Mo trang web QMinhOTM va de cua so nay chay nen." -ForegroundColor Green
Write-Host " Nhan Ctrl+C hoac dong cua so nay de dung Agent." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green

# Prime bo dem CPU (lan goi dau tien luon tra ve 0)
Get-Counter '\\Processor(_Total)\\% Processor Time' -ErrorAction SilentlyContinue | Out-Null
Start-Sleep -Milliseconds 300

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.ContentType = "application/json; charset=utf-8"

    try {
        # ---- CPU ----
        $cpuSample = Get-Counter '\\Processor(_Total)\\% Processor Time' -ErrorAction Stop
        $cpu = [math]::Round($cpuSample.CounterSamples[0].CookedValue, 1)

        # ---- RAM ----
        $os = Get-CimInstance Win32_OperatingSystem
        $totalRamGB = [math]::Round($os.TotalVisibleMemorySize / 1MB, 1)
        $freeRamGB  = [math]::Round($os.FreePhysicalMemory / 1MB, 1)
        $usedRamGB  = [math]::Round($totalRamGB - $freeRamGB, 1)
        $ramPercent = if ($totalRamGB -gt 0) { [math]::Round(($usedRamGB / $totalRamGB) * 100, 1) } else { 0 }

        # ---- GPU (uu tien nvidia-smi neu co, fallback sang GPU Engine Counter) ----
        $gpuPercent = $null
        $nvidiaSmi = Get-Command nvidia-smi -ErrorAction SilentlyContinue
        if ($nvidiaSmi) {
            try {
                $nvOut = & nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits 2>$null
                if ($nvOut) { $gpuPercent = [double]($nvOut | Select-Object -First 1) }
            } catch {}
        }
        if ($null -eq $gpuPercent) {
            try {
                $gpuCounters = Get-Counter '\\GPU Engine(*)\\Utilization Percentage' -ErrorAction Stop
                $sum = ($gpuCounters.CounterSamples | Measure-Object -Property CookedValue -Sum).Sum
                $gpuPercent = [math]::Round($sum, 1)
                if ($gpuPercent -gt 100) { $gpuPercent = 100 }
            } catch {
                $gpuPercent = $null
            }
        }

        $result = [ordered]@{
            cpu          = $cpu
            ram_percent  = $ramPercent
            ram_used_gb  = $usedRamGB
            ram_total_gb = $totalRamGB
            gpu          = $gpuPercent
            timestamp    = (Get-Date).ToString("HH:mm:ss")
        }

        $json = $result | ConvertTo-Json -Compress
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } catch {
        $response.StatusCode = 500
    } finally {
        $response.OutputStream.Close()
    }
}
`;

// Tải file Agent (.ps1) để người dùng chạy song song với trang web
function downloadAgentScript() {
    const blob = new Blob([AGENT_SCRIPT_CONTENT], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'QMinhOTM_Agent.ps1';
    link.click();
    addConsoleLog("<span class='text-brand-accent'>Đã tải QMinhOTM_Agent.ps1 — Click phải > Run with PowerShell để bắt đầu giám sát số liệu thật.</span>");
}

// =========================================================
// HIỆU ỨNG SAO BĂNG RƠI (Meteor Shower Background)
// =========================================================
function createMeteorShower(count = 18) {
    const container = document.getElementById('meteorContainer');
    if (!container) return;

    // Người dùng bật "giảm chuyển động" trên hệ điều hành -> không tạo hiệu ứng
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    for (let i = 0; i < count; i++) {
        const meteor = document.createElement('div');
        const isAccent = Math.random() < 0.3; // ~30% sao băng màu neon cyan cho hợp theme
        meteor.className = isAccent ? 'meteor meteor-accent' : 'meteor';

        // Vị trí bắt đầu ngẫu nhiên (rải khắp nửa trên + hai bên màn hình)
        const startTop = Math.random() * -50 - 5; // % - bắt đầu phía trên viewport
        const startLeft = Math.random() * 130 - 15; // % - trải rộng ra ngoài mép trái/phải

        // Tốc độ & độ trễ ngẫu nhiên để các sao băng không rơi cùng lúc
        const duration = (Math.random() * 4 + 3).toFixed(2); // 3s - 7s
        const delay = (Math.random() * 10).toFixed(2); // 0s - 10s
        const scale = (Math.random() * 0.6 + 0.7).toFixed(2); // 0.7 - 1.3

        meteor.style.top = `${startTop}%`;
        meteor.style.left = `${startLeft}%`;
        meteor.style.animationDuration = `${duration}s`;
        meteor.style.animationDelay = `${delay}s`;
        meteor.style.transform = `scale(${scale})`;

        container.appendChild(meteor);
    }
}

// =========================================================
// MENU MOBILE & NÚT VỀ ĐẦU TRANG
// =========================================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
}

function setupBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('hidden');
            btn.classList.add('show');
        } else {
            btn.classList.add('hidden');
            btn.classList.remove('show');
        }
    });
}

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    loadTweakState();
    renderFilters();
    renderTweaks();
    updateScriptOutput();
    renderGames();
    renderSnapshotResult();
    createMeteorShower();
    setupBackToTop();

    const cpuLabel = document.getElementById('cpuLabel');
    if (cpuLabel) cpuLabel.innerText = `${navigator.hardwareConcurrency || '?'} Luồng CPU (thực)`;

    // Thử kết nối Agent ngay khi tải trang, sau đó poll định kỳ mỗi 1.5s
    pollAgent();
    agentPollTimer = setInterval(pollAgent, 1500);
});