/**
 * FastBill - Navbar Component
 * Navigation sidebar
 */

const Navbar = {
    container: null,

    navItems: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'billing', label: 'Billing', icon: '🧾' },
        { id: 'inventory', label: 'Inventory', icon: '📦' },
        { id: 'refill', label: 'Refill Alerts', icon: '⚠️' }
    ],

    /**
     * Initialize navbar
     */
    init() {
        this.container = document.getElementById('navbar');
        if (this.container) {
            this.render();
        }
    },

    /**
     * Render navbar
     */
    render() {
        const navHTML = `
            <div class="nav-header">
                <h1 class="nav-logo">FastBill</h1>
                <p class="nav-tagline">Quick & Simple</p>
            </div>
            <ul class="nav-menu">
                ${this.navItems.map(item => `
                    <li class="nav-item" data-page="${item.id}">
                        <a href="#${item.id}" class="nav-link">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </a>
                    </li>
                `).join('')}
            </ul>
            <div class="nav-footer">
                <p class="nav-version">v1.0.0</p>
            </div>
        `;
        
        this.container.innerHTML = navHTML;
        this.attachEventListeners();
    },

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        const navLinks = this.container.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const page = e.currentTarget.closest('.nav-item').dataset.page;
                this.setActive(page);
            });
        });
    },

    /**
     * Set active navigation item
     */
    setActive(pageId) {
        const navItems = this.container.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};

window.Navbar = Navbar;