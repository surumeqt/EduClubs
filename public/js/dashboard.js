document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const dashboardNavLinks = document.querySelectorAll('.dashboard-nav-link');

    const mainContentArea = document.getElementById('main-content-area');
    const currentSectionTitle = document.getElementById('current-section-title');

    const sectionConfig = {
        'dashboard': {
            contentUrl: '/content/dashboard',
            title: 'Dashboard'
        },
        'projects': {
            contentUrl: '/content/projects',
            title: 'My Projects'
        },
        'commissions': {
            contentUrl: '/content/commissions',
            title: 'Browse Commissions'
        },
        'messages': {
            contentUrl: '/content/messages',
            title: 'Messages'
        },
        'profile': {
            contentUrl: '/content/profile',
            title: 'Profile & Settings'
        }
    };

    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    openSidebarBtn?.addEventListener('click', openSidebar);
    closeSidebarBtn?.addEventListener('click', closeSidebar);
    sidebarOverlay?.addEventListener('click', closeSidebar);

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeSidebar();
        }
    });

    async function fetchAndExtractContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const htmlText = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');

            const extractedContent = doc.querySelector('main') || doc.body;

            return extractedContent ? extractedContent.innerHTML : '<div>Error: Content not found in fetched HTML.</div>';

        } catch (error) {
            console.error(`Could not fetch content from ${url}:`, error);
            return `<div class="p-6 text-red-700">Failed to load content. Error: ${error.message}</div>`;
        }
    }

    async function loadContent(section, updateHistory = true) {
        const config = sectionConfig[section];

        if (!config) {
            console.warn('Unknown section requested:', section);
            mainContentArea.innerHTML = `<div class="p-6 text-red-700">Section not found.</div>`;
            currentSectionTitle.textContent = 'Error';
            if (updateHistory) {
                history.pushState({ section: 'dashboard', title: 'Dashboard' }, 'Dashboard', '/dashboard');
            }
            return;
        }

        mainContentArea.innerHTML = '<div class="text-center p-8 text-[#4A5568]">Loading...</div>';

        const content = await fetchAndExtractContent(config.contentUrl);
        mainContentArea.innerHTML = content;

        currentSectionTitle.textContent = config.title;

        dashboardNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });

        if (updateHistory) {
            history.pushState({ section: section, title: config.title }, config.title, `/${section}`);
        } else {
            history.replaceState({ section: section, title: config.title }, config.title, `/${section}`);
        }
    }

    dashboardNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeSidebar();
            const section = e.currentTarget.dataset.section;
            loadContent(section);
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            loadContent(event.state.section, false);
        } else {
            loadContent('dashboard', false);
        }
    });


    const currentPathSegment = window.location.pathname.substring(1);

    let initialSectionToLoad = 'dashboard';

    if (sectionConfig.hasOwnProperty(currentPathSegment)) {
        initialSectionToLoad = currentPathSegment;
    } else if (currentPathSegment === '') {
        initialSectionToLoad = 'dashboard';
        if (window.location.pathname === '/') {
            history.replaceState({ section: 'dashboard', title: 'Dashboard' }, 'Dashboard', '/dashboard');
        }
    }

    loadContent(initialSectionToLoad, false);
});
