function toggleSubmenu(toggleBtn) {
    const parentLi = toggleBtn.parentElement;
    parentLi.classList.toggle('open');
}

// 页面加载时：自动展开当前选中的子菜单
document.addEventListener('DOMContentLoaded', function() {
    const activeSubmenu = document.querySelector('.submenu a.active');
    if (activeSubmenu) {
        const parentLi = activeSubmenu.closest('.has-submenu');
        if (parentLi) {
            parentLi.classList.add('open');
        }
    }
});
