document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Experience
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });

    // 2. Scroll Animations (Reveal)
    const revealElements = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2, .reveal-delay-3');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Navbar background change on scroll (Optimized)
    const navbar = document.querySelector('.navbar');
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // 4. WhatsApp Integration / Form Submission
    const form = document.getElementById('protocol-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Structure pre-filled message
            const message = `Olá, me chamo ${data.nome}.
Tenho ${data.idade} anos.
Meu objetivo é ${data.objetivo}.
Meu nível atual é ${data.nivel}.
Posso treinar ${data.disponibilidade} vezes por semana.
Minha maior dificuldade é ${data.dificuldade}.
Gostaria de iniciar um acompanhamento.`;

            // WhatsApp link construction
            const phoneNumber = '5535999072623';
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Reveal button "loading" state
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.textContent = 'Trabalhando nos dados...';
            submitBtn.disabled = true;

            // Redirect after a small delay for "premium" feel
            setTimeout(() => {
                window.location.href = whatsappUrl;
            }, 800);
        });
    }

    // 5. Smooth Anchor Scroll (Universal support)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
