/**
 * FastBill - Modal Component
 */
const Modal = {
    container: null,

    init() {
        this.container = document.getElementById('modal-container');
    },

    open(title, content, footer = '') {
        if (!this.container) this.init();
        
        this.container.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="Modal.close()">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;
        
        this.container.classList.add('active');
        
        // Close on backdrop click
        this.container.onclick = (e) => {
            if (e.target === this.container) {
                this.close();
            }
        };
    },

    close() {
        if (!this.container) return;
        this.container.classList.remove('active');
        setTimeout(() => {
            this.container.innerHTML = '';
        }, 300);
    },

    confirm(title, message, onConfirm) {
        const content = `<p>${message}</p>`;
        const footer = `
            <button class="btn" onclick="Modal.close()">Cancel</button>
            <button class="btn btn-primary" onclick="Modal.handleConfirm()">Confirm</button>
        `;
        
        this.onConfirmCallback = onConfirm;
        this.open(title, content, footer);
    },

    handleConfirm() {
        if (this.onConfirmCallback) {
            this.onConfirmCallback();
        }
        this.close();
    }
};

/**
 * FastBill - Toast Component
 */
const Toast = {
    container: null,
    toasts: [],

    init() {
        this.container = document.getElementById('toast-container');
    },

    show(message, type = 'info', duration = 3000) {
        if (!this.container) this.init();
        
        const id = Utils.generateId();
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.id = id;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${Utils.escapeHtml(message)}</span>
            <button class="toast-close" onclick="Toast.remove('${id}')">×</button>
        `;
        
        this.container.appendChild(toast);
        this.toasts.push(id);
        
        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }
    },

    remove(id) {
        const toast = document.getElementById(id);
        if (!toast) return;
        
        toast.classList.add('removing');
        setTimeout(() => {
            toast.remove();
            this.toasts = this.toasts.filter(t => t !== id);
        }, 300);
    },

    success(message, duration) {
        this.show(message, 'success', duration);
    },

    error(message, duration) {
        this.show(message, 'error', duration);
    },

    warning(message, duration) {
        this.show(message, 'warning', duration);
    },

    info(message, duration) {
        this.show(message, 'info', duration);
    }
};

window.Modal = Modal;
window.Toast = Toast;