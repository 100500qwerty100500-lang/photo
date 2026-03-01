document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        if (burger) {
            burger.classList.toggle('burger--active');
            burger.setAttribute('aria-expanded', isMenuOpen.toString());
        }
        
        if (nav) {
            nav.classList.toggle('nav--active');
        }
        
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        
        if (burger) {
            burger.classList.remove('burger--active');
            burger.setAttribute('aria-expanded', 'false');
        }
        
        if (nav) {
            nav.classList.remove('nav--active');
        }
        
        document.body.style.overflow = '';
    };

    const smoothScrollTo = (targetId) => {
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;
        
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    const handleActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                closeMenu();
                smoothScrollTo(targetId);
            }
            else {
                closeMenu();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', handleActiveNavLink);

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            closeMenu();
        }
    });

    handleActiveNavLink();
});