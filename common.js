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
