// Clean unified navigation system - built from scratch
document.addEventListener('DOMContentLoaded', function() {
    
    // State management for sidebar
    const STORAGE_KEY = 'sidebar-state';
    
    const saveState = (isCollapsed) => {
        localStorage.setItem(STORAGE_KEY, isCollapsed ? 'collapsed' : 'expanded');
    };
    
    const getSavedState = () => {
        return localStorage.getItem(STORAGE_KEY) || 'expanded';
    };

    // Determine current page and set up paths
    const currentPath = window.location.pathname;
    const isRootLevel = currentPath.includes('charts.html') || 
                       currentPath.endsWith('/index.html') || 
                       currentPath === '/' || 
                       (!currentPath.includes('/papers/') && 
                        !currentPath.includes('/domains/') && 
                        !currentPath.includes('/pipeline/') && 
                        !currentPath.includes('/evaluation/'));
    
    const basePath = isRootLevel ? '' : '../';
    const homeLink = isRootLevel ? '.' : '..';

    // Clean navigation HTML
    const navigationHTML = `
        <nav class="unified-nav">
            <div class="nav-header">
                <a href="${homeLink}" class="nav-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 8a3 3 0 0 0 3-3 3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3m0 3.54C9.64 9.35 6.5 8 3 8v11c3.5 0 6.64 1.35 9 3.54 2.36-2.19 5.5-3.54 9-3.54V8c-3.5 0-6.64 1.35-9 3.54"/>
                    </svg>
                </a>
                <span class="nav-title">Survey XAI ML Pipeline</span>
            </div>
            <ul class="nav-list">
                <li><a href="${homeLink}" class="nav-item" data-page="home">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                    </svg>
                    <span class="nav-text">Home</span>
                </a></li>
                
                <li><a href="${basePath}papers/" class="nav-item" data-page="papers">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <span class="nav-text">Papers</span>
                </a></li>
                
                <li><a href="${basePath}domains/" class="nav-item" data-page="domains">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                    </svg>
                    <span class="nav-text">Domains</span>
                </a></li>
                
                <li><a href="${basePath}charts.html" class="nav-item" data-page="charts">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z"/>
                    </svg>
                    <span class="nav-text">Charts</span>
                </a></li>
                
                <li><a href="${basePath}pipeline/" class="nav-item" data-page="pipeline">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M7,10L12,15L17,10H7Z"/>
                    </svg>
                    <span class="nav-text">Pipeline</span>
                </a></li>
                
                <li><a href="${basePath}evaluation/" class="nav-item" data-page="evaluation">
                    <svg class="nav-icon" viewBox="0 0 24 24">
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H19V9Z"/>
                    </svg>
                    <span class="nav-text">Evaluation</span>
                </a></li>
            </ul>
        </nav>
    `;

    // Clean CSS styles
    const styles = `
        /* Reset and hide all existing navigation */
        .md-sidebar--primary,
        .md-sidebar--primary *,
        .md-header__button[for="__drawer"],
        .md-nav__toggle,
        label[for="__drawer"]:not(.clean-toggle) {
            display: none !important;
        }
        
        /* Clean sidebar structure - positioned below header */
        .clean-sidebar {
            position: fixed;
            top: 64px;
            left: 0;
            width: 280px;
            height: calc(100vh - 64px);
            background: var(--md-default-bg-color, #fff);
            border-right: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
            z-index: 10;
            transition: transform 0.3s ease, width 0.3s ease;
            overflow: hidden;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        }
        
        .clean-sidebar.collapsed {
            width: 60px;
        }
        
        /* Toggle button */
        .clean-toggle {
            position: fixed;
            top: 12px;
            left: 12px;
            width: 40px;
            height: 40px;
            background: var(--md-primary-fg-color, #526cfe);
            border: none;
            border-radius: 6px;
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        .clean-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .clean-toggle svg {
            width: 20px;
            height: 20px;
            fill: white;
        }
        
        /* Navigation styles */
        .unified-nav {
            padding: 20px 0;
            height: 100%;
            overflow-y: auto;
        }
        
        .nav-header {
            display: flex;
            align-items: center;
            padding: 0 20px 20px;
            border-bottom: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
            margin-bottom: 20px;
        }
        
        .nav-logo svg {
            width: 32px;
            height: 32px;
            fill: var(--md-primary-fg-color, #526cfe);
            margin-right: 12px;
        }
        
        .nav-title {
            font-weight: 600;
            color: var(--md-default-fg-color, #000);
            font-size: 14px;
        }
        
        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            text-decoration: none;
            color: var(--md-default-fg-color, #000);
            transition: background-color 0.2s ease;
            border-left: 3px solid transparent;
        }
        
        .nav-item:hover {
            background: var(--md-default-fg-color--lightest, #f5f5f5);
        }
        
        .nav-item.active {
            background: var(--md-primary-fg-color--light, rgba(82, 108, 254, 0.1));
            border-left-color: var(--md-primary-fg-color, #526cfe);
            color: var(--md-primary-fg-color, #526cfe);
        }
        
        .nav-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            fill: currentColor;
            flex-shrink: 0;
        }
        
        .nav-text {
            font-size: 14px;
            font-weight: 500;
        }
        
        /* Collapsed state */
        .clean-sidebar.collapsed .nav-title,
        .clean-sidebar.collapsed .nav-text {
            display: none;
        }
        
        .clean-sidebar.collapsed .nav-header {
            justify-content: center;
            padding: 0 15px 20px;
        }
        
        .clean-sidebar.collapsed .nav-logo svg {
            margin-right: 0;
        }
        
        .clean-sidebar.collapsed .nav-item {
            justify-content: center;
            padding: 12px 15px;
        }
        
        .clean-sidebar.collapsed .nav-icon {
            margin-right: 0;
        }
        
        /* Content adjustment - use higher specificity to override existing styles */
        body .md-content,
        .md-container .md-content,
        .md-main .md-content {
            margin-left: 280px !important;
            margin-top: 0 !important;
            transition: margin-left 0.3s ease !important;
            max-width: none !important;
            width: calc(100vw - 280px) !important;
            min-height: calc(100vh - 64px) !important;
            padding: 20px !important;
        }
        
        body .content-collapsed,
        .md-container .content-collapsed,
        .md-main .content-collapsed {
            margin-left: 60px !important;
            width: calc(100vw - 60px) !important;
        }
        
        /* Ensure header stays above sidebar */
        .md-header {
            z-index: 100 !important;
            position: relative !important;
        }
        
        /* Hide original header toggle */
        .md-header__button.md-icon {
            display: none !important;
        }
        
        /* Override any existing sidebar and content rules from individual pages */
        body .md-sidebar--primary,
        .md-container .md-sidebar--primary,
        .md-toggle[data-md-toggle="drawer"]:checked ~ .md-container .md-sidebar--primary {
            display: none !important;
            transform: none !important;
        }
        
        /* Force our content styles over any existing page styles */
        body.content-collapsed .md-content,
        .md-container .content-collapsed,
        .md-toggle[data-md-toggle="drawer"]:checked ~ .md-container .md-content {
            margin-left: 60px !important;
            width: calc(100vw - 60px) !important;
        }
        
        /* When not collapsed */
        body:not(.content-collapsed) .md-content,
        .md-container .md-content:not(.content-collapsed) {
            margin-left: 280px !important;
            width: calc(100vw - 280px) !important;
        }
    `;

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create clean sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'clean-sidebar';
    sidebar.innerHTML = navigationHTML;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'clean-toggle';
    toggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
        </svg>
    `;

    // Add to DOM
    document.body.appendChild(sidebar);
    document.body.appendChild(toggleBtn);

    // Apply saved state
    const savedState = getSavedState();
    const isCollapsed = savedState === 'collapsed';
    
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        const content = document.querySelector('.md-content');
        if (content) content.classList.add('content-collapsed');
        document.body.classList.add('content-collapsed');
    }

    // Toggle functionality with robust content selection
    toggleBtn.addEventListener('click', function() {
        const isCurrentlyCollapsed = sidebar.classList.contains('collapsed');
        const content = document.querySelector('.md-content');
        const body = document.body;
        
        if (isCurrentlyCollapsed) {
            // Expand
            sidebar.classList.remove('collapsed');
            if (content) content.classList.remove('content-collapsed');
            body.classList.remove('content-collapsed');
            saveState(false);
        } else {
            // Collapse
            sidebar.classList.add('collapsed');
            if (content) content.classList.add('content-collapsed');
            body.classList.add('content-collapsed');
            saveState(true);
        }
    });

    // Set active page with better logic
    setTimeout(() => {
        const navItems = document.querySelectorAll('.nav-item');
        
        // Debug: log current path
        console.log('Current path:', currentPath);
        
        navItems.forEach(item => {
            const page = item.dataset.page;
            let isActive = false;
            
            // More specific path matching
            if (page === 'papers' && currentPath.includes('/papers/')) {
                isActive = true;
            } else if (page === 'domains' && currentPath.includes('/domains/')) {
                isActive = true;
            } else if (page === 'pipeline' && currentPath.includes('/pipeline/')) {
                isActive = true;
            } else if (page === 'evaluation' && currentPath.includes('/evaluation/')) {
                isActive = true;
            } else if (page === 'charts' && currentPath.includes('charts.html')) {
                isActive = true;
            } else if (page === 'home' && !currentPath.includes('/papers/') && 
                      !currentPath.includes('/domains/') && 
                      !currentPath.includes('/pipeline/') && 
                      !currentPath.includes('/evaluation/') && 
                      !currentPath.includes('charts.html')) {
                isActive = true;
            }
            
            if (isActive) {
                item.classList.add('active');
                console.log('Setting active:', page);
            }
        });
    }, 100);
});