document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const themeToggle = document.getElementById('theme-toggle');
    const warningContainer = document.createElement('div');
    warningContainer.id = 'warning-message';
    warningContainer.style.color = '#f43f5e';
    warningContainer.style.marginTop = '8px';
    warningContainer.style.fontSize = '0.95rem';
    warningContainer.style.display = 'none';

    if (form) {
        form.appendChild(warningContainer);
        form.addEventListener('submit', function (event) {
            const requiredFields = Array.from(form.querySelectorAll('[data-required]'));
            let valid = true;
            const warnings = [];

            requiredFields.forEach(function (field) {
                const value = field.value.trim();
                if (!value) {
                    valid = false;
                    const label = field.getAttribute('data-label') || field.name || 'Field';
                    warnings.push(`Please fill the ${label} field.`);
                    field.classList.add('input-warning');
                } else {
                    field.classList.remove('input-warning');
                }
            });

            if (!valid) {
                event.preventDefault();
                warningContainer.textContent = warnings.join(' ');
                warningContainer.style.display = 'block';
            } else {
                warningContainer.style.display = 'none';
            }
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem('preferred-theme', theme);

        if (themeToggle) {
            const isDark = theme === 'dark';
            themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
            themeToggle.setAttribute('aria-pressed', String(isDark));
        }
    }

    const savedTheme = localStorage.getItem('preferred-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
});
