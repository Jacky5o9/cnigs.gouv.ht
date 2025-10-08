// CNIGS - Script Principal Épuré

document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de présentation
    document.querySelectorAll('.presentation-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Notification de téléchargement
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Créer une notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Téléchargement démarré...
            `;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--cnigs-green);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;

            document.body.appendChild(notification);

            // Afficher la notification
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Masquer après 3 secondes
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        });
    });

    // Effet de typing sur le titre hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Démarrer l'effet après un court délai
        setTimeout(typeWriter, 500);
    }

    // Désinscription du service worker (nettoyage cache)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister();
            }
        });
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = {
                nom: formData.get('nom'),
                email: formData.get('email'),
                telephone: formData.get('telephone'),
                sujet: formData.get('sujet'),
                message: formData.get('message')
            };

            // Validation simple
            if (!data.nom || !data.email || !data.sujet || !data.message) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Simulation d'envoi (remplacer par vraie intégration)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Afficher le loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;

            // Simuler l'envoi
            setTimeout(() => {
                showNotification('Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.', 'success');
                contactForm.reset();
                
                // Restaurer le bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Fonction pour afficher les notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
        const bgColor = type === 'success' ? 'var(--cnigs-green)' : '#ef4444';
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            ${message}
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            line-height: 1.4;
        `;

        document.body.appendChild(notification);

        // Afficher la notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Masquer après 5 secondes
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Observer les cartes de contact pour l'animation
    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observer les nouvelles sections pour l'animation
    document.querySelectorAll('.donnees-card, .intro-card, .theme-card, .projets-tabs, .visual-card, .acces-card, .actualite-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Animation des compteurs
    const numberItems = document.querySelectorAll('.number-item .number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                let currentNumber = 0;
                const increment = finalNumber.includes('+') ? 
                    parseInt(finalNumber.replace('+', '')) / 50 : 
                    parseInt(finalNumber) / 50;
                
                target.textContent = '0';
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= parseInt(finalNumber.replace('+', ''))) {
                        target.textContent = finalNumber;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentNumber) + (finalNumber.includes('+') ? '+' : '');
                    }
                }, 30);
                
                numberObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    numberItems.forEach(item => {
        numberObserver.observe(item);
    });

    // Gestion des onglets de la section Projets
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les boutons et panneaux
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué et au panneau correspondant
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Animation des format-items au hover
    document.querySelectorAll('.format-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('CNIGS - Site web chargé avec succès! 🌍');
});