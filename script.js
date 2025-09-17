document.querySelectorAll('a.nav-link, a.btn').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // impede o #id na URL

        const targetId = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
            const yOffset = -100; // parar 200px antes
            const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});