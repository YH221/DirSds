/* js/common.js */
(function() {
    // 1. 顶部导航栏 HTML（全局统一）
    const topNavHTML = `
    <header class="top-nav">
        <div class="logo">灾备管理平台</div>
        <nav class="top-menu">
            <a href="../index.html">概览</a>
            <a href="../system/config.html">系统管理</a>
            <a href="../monitor/index.html">监控中心</a>
            <a href="./client.html">非结构化备份</a>
        </nav>
        <div class="user-info">
            <span>管理员</span>
            <a href="../login.html" class="logout">退出</a>
        </div>
    </header>`;

    // 2. 各模块侧边栏配置（按需扩展，结构与你原 HTML 完全一致）
    const sidebarConfigs = {
        // 非结构化备份模块
        unstructured: `
        <aside class="sidebar">
            <nav>
                <div class="menu-group">
                    <ul class="menu-list">
                        <li><a href="./client.html">客户端管理</a></li>
                        <li class="has-submenu">
                            <a href="javascript:void(0);" class="submenu-toggle" onclick="window.toggleSubmenu(this)">
                                <span class="menu-icon">☰</span>
                                <span>存储管理</span>
                                <span class="arrow">▼</span>
                            </a>
                            <ul class="submenu">
                                <li><a href="./storage/storage-policy.html">存储策略</a></li>
                                <li><a href="./storage/storage-migrate-policy.html">复制迁移策略</a></li>
                                <li><a href="./storage/storage-migrate-task.html">复制迁移任务</a></li>
                                <li><a href="./storage/storage-offline.html">离线介质管理</a></li>
                            </ul>
                        </li>
                        <li><a href="./takeover.html">接管管理</a></li>
                        <li><a href="./export.html">数据导出</a></li>
                        <li><a href="./search.html">全文检索</a></li>
                        <li><a href="./tags.html">标签策略</a></li>
                    </ul>
                </div>
            </nav>
        </aside>`,

        // 监控中心模块
        monitor: `
        <aside class="sidebar">
            <nav>
                <div class="menu-group">
                    <ul class="menu-list">
                        <li><a href="index.html">监控概览</a></li>
                        <li><a href="log.html">运行日志</a></li>
                        <li><a href="report.html">报表中心</a></li>
                        <li><a href="task.html">任务调度</a></li>
                    </ul>
                </div>
            </nav>
        </aside>`,

        // 系统管理模块
        system: `
        <aside class="sidebar">
            <nav>
                <div class="menu-group">
                    <ul class="menu-list">
                        <li><a href="system/config.html">平台配置</a></li>
                        <li><a href="system/client.html">客户端管理</a></li>
                        <li><a href="system/users.html">用户管理</a></li>
                        <li><a href="system/roles.html">角色权限</a></li>
                        <li><a href="system/logs.html">操作日志</a></li>
                    </ul>
                </div>
            </nav>
        </aside>`,

        // 默认/概览模块
        default: `
        <aside class="sidebar">
            <nav>
                <div class="menu-group">
                    <ul class="menu-list">
                        <li><a href="../index.html">仪表盘</a></li>
                    </ul>
                </div>
            </nav>
        </aside>`
    };

    // 3. 页面加载完成后自动注入布局
    document.addEventListener('DOMContentLoaded', () => {
        // 通过 body 的 data-module 属性识别当前模块
        const module = document.body.getAttribute('data-module') || 'default';
        const sidebarHTML = sidebarConfigs[module] || sidebarConfigs['default'];

        // 注入顶部导航
        document.body.insertAdjacentHTML('afterbegin', topNavHTML);

        // 创建主布局容器
        const mainContainer = document.createElement('div');
        mainContainer.className = 'main-container';
        mainContainer.innerHTML = sidebarHTML + '<main class="content"></main>';
        document.body.appendChild(mainContainer);

        // 将页面原有业务内容移入 .content 区域
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
            document.querySelector('.content').appendChild(pageContent);
        }

        // 自动高亮当前菜单 & 自动展开对应的子菜单
        const currentFile = window.location.pathname.split('/').pop();
        
        // 顶部导航高亮
        document.querySelectorAll('.top-menu a').forEach(a => {
            if (a.getAttribute('href') === currentFile || a.getAttribute('href').endsWith(currentFile)) {
                a.classList.add('active');
            }
        });

        // 侧边栏高亮 & 子菜单自动展开
        document.querySelectorAll('.sidebar a').forEach(link => {
            if (link.getAttribute('href') === currentFile || link.getAttribute('href').endsWith(currentFile)) {
                link.classList.add('active');
                // 如果当前页面在子菜单里，自动给父级加 .open 类（严格匹配 storage.css）
                const parentLi = link.closest('.has-submenu');
                if (parentLi) parentLi.classList.add('open');
            }
        });
    });

    // 4. 暴露全局交互方法（匹配你原有的 onclick 调用）
    window.toggleSubmenu = function(el) {
        el.parentElement.classList.toggle('open'); // 严格匹配 storage.css 的 .open 状态
    };

    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active'); // 匹配 common.css 的 .modal.active
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };
})();