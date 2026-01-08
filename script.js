document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, input, textarea');

    // Move cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Hover interactions
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'transparent';
            cursor.style.border = '1px solid #1a1a1a';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = '#000000';
            cursor.style.border = 'none';
        });
    });

    // Scroll Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
                
                if (entry.target.id === 'skills') {
                    const bars = entry.target.querySelectorAll('.skill-bar-fill');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Text Scramble Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const heroName = document.querySelector('h1[data-id="name"]');
    
    if(heroName) {
        heroName.dataset.text = heroName.innerText;

        heroName.onmouseover = event => {
            let iteration = 0;
            const originalText = event.target.dataset.text;
            
            clearInterval(event.target.interval);
            
            event.target.interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iteration >= originalText.length){ 
                    clearInterval(event.target.interval);
                    event.target.innerText = originalText;
                }
                
                iteration += 1/2;
            }, 30);
        }
    }

    // Nav Link Active State
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
