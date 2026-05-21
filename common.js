document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    document.querySelectorAll('.check-all').forEach(box => {
        box.addEventListener('change', (e) => {
            const table = e.target.closest('table');
            if (!table) return;
            table.querySelectorAll('.check-item').forEach(item => {
                item.checked = e.target.checked;
            });
        });
    });
});

// common.js 或页面底部添加
function toggleSubmenu(element) {
    const li = element.parentElement;
    li.classList.toggle('open');
    const arrow = element.querySelector('.arrow');
    if (arrow) {
        arrow.textContent = li.classList.contains('open') ? '▲' : '▼';
    }
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// 点击遮罩关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}
function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
}

function filterTable(inputId, tableId) {
    const keyword = document.getElementById(inputId).value.toLowerCase();
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(keyword) ? '' : 'none';
    });
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}
