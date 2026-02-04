// Modal Sobre
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const aboutClose = document.getElementById('about-modal-close');
if (aboutBtn && aboutModal && aboutClose) {
    aboutBtn.addEventListener('click', () => {
        aboutModal.classList.add('active');
        aboutModal.focus();
    });
    aboutClose.addEventListener('click', () => {
        aboutModal.classList.remove('active');
    });
    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.remove('active');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
            aboutModal.classList.remove('active');
        }
    });
}
// Botão de voltar ao topo
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// Gerenciamento de Tema
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('.icon');

// Carregar tema salvo ou usar preferência do sistema
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
}

// Alternar tema
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Gerenciamento de Tabs
window.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            localStorage.setItem('activeTab', targetTab);
        });
    });

    // Restaurar tab ativa ao carregar a página
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const savedButton = document.querySelector(`[data-tab="${savedTab}"]`);
        const savedContent = document.getElementById(savedTab);
        if (savedButton && savedContent) {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            savedButton.classList.add('active');
            savedContent.classList.add('active');
        }
    }

    // Suporte para navegação por teclado nas tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextButton = tabButtons[index + 1] || tabButtons[0];
                nextButton.focus();
                nextButton.click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
                prevButton.focus();
                prevButton.click();
            }
        });
    });
});
