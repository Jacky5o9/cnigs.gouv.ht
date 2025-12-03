// CNIGS - Script Principal Épuré

document.addEventListener('DOMContentLoaded', function() {
    console.log('CNIGS - Site web chargé avec succès! 🌍');
    
    // Initialiser toutes les fonctionnalités
    initNavigation();
    initHeroSlider();
    initDataModals();
    initTabs();
    initContactForm();
    initAnimations();
    initNotifications();
});

// ===== NAVIGATION =====
function initNavigation() {
    // Navigation mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-active');
            this.classList.toggle('nav-toggle-active');
        });

        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-menu-active');
                navToggle.classList.remove('nav-toggle-active');
            });
        });
    }

    // Scroll fluide pour tous les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mise à jour de la navigation active lors du scroll
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== HERO SLIDER =====
function initHeroSlider() {
    const sliderTrack = document.getElementById('heroSliderTrack');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const indicators = document.querySelectorAll('.hero-indicator');
    const sliderContainer = document.querySelector('.hero-slider-container');
    
    if (!sliderTrack) {
        console.log('Hero slider non trouvé dans le DOM');
        return;
    }

    console.log('Hero slider trouvé, initialisation en cours...');

    let currentSlide = 0;
    const totalSlides = 6;
    let sliderInterval;
    let isSliderPaused = false;

    function moveToSlide(index) {
        currentSlide = index;
        const translateX = -(index * 16.666667); // 100% / 6 slides
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les indicateurs
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
        
        // Mettre à jour la classe active du slide
        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        moveToSlide(currentSlide);
    }

    function startAutoPlay() {
        if (!isSliderPaused) {
            sliderInterval = setInterval(() => {
                nextSlide();
            }, 6000);
        }
    }

    function stopAutoPlay() {
        clearInterval(sliderInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        setTimeout(startAutoPlay, 1500);
    }

    // Event listeners pour les boutons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Event listeners pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoPlay();
        });
    });

    // Pause au survol du Hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            isSliderPaused = true;
            stopAutoPlay();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            isSliderPaused = false;
            startAutoPlay();
        });
    }

    // Support tactile pour mobile
    let startX = 0;
    let endX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });

        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const threshold = 50;
            
            if (startX - endX > threshold) {
                // Swipe vers la gauche - slide suivant
                nextSlide();
            } else if (endX - startX > threshold) {
                // Swipe vers la droite - slide précédent
                prevSlide();
            }
            
            resetAutoPlay();
        });
    }

    // Initialisation
    moveToSlide(0);
    startAutoPlay();
    
    console.log('Hero slider initialisé avec succès');
}

// Navigation au clavier pour le Hero slider
document.addEventListener('keydown', (e) => {
    const heroSection = document.querySelector('.hero');
    if (heroSection && isElementInViewport(heroSection)) {
        if (e.key === 'ArrowLeft') {
            document.getElementById('heroPrevBtn')?.click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('heroNextBtn')?.click();
        }
    }
});

// Utilitaire pour vérifier si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== GESTION DES DÉTAILS DES DONNÉES =====
document.addEventListener('DOMContentLoaded', function() {
    // Autres initialisations...
    initDataModals();
});

function initDataModals() {
    const datasetItems = document.querySelectorAll('.dataset-item');
    const modal = document.getElementById('dataModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Ajouter les event listeners pour chaque dataset
    datasetItems.forEach(item => {
        item.addEventListener('click', function() {
            showDataDetails(this);
        });
    });
    
    // Fermer la modale
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDataModal);
    }
    
    // Fermer en cliquant sur l'overlay
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDataModal();
            }
        });
    }
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDataModal();
        }
    });
}

function showDataDetails(datasetElement) {
    const modal = document.getElementById('dataModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLayers = document.getElementById('modalLayers');
    
    if (!modal) return;
    
    // Récupérer les données de l'élément
    const title = datasetElement.dataset.title;
    const description = datasetElement.dataset.description;
    const layersData = JSON.parse(datasetElement.dataset.layers || '[]');
    
    // Remplir le contenu de la modale
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Créer la liste des couches
    modalLayers.innerHTML = '';
    layersData.forEach(layer => {
        const layerElement = createLayerElement(layer);
        modalLayers.appendChild(layerElement);
    });
    
    // Afficher la modale
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animation d'apparition
    setTimeout(() => {
        modal.querySelector('.modal-container').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

function createLayerElement(layer) {
    const layerDiv = document.createElement('div');
    layerDiv.className = 'layer-item';
    
    layerDiv.innerHTML = `
        <div class="layer-header">
            <span class="layer-id">${layer.id}</span>
            <span class="layer-type">${layer.type}</span>
        </div>
        <div class="layer-name">${layer.name}</div>
        <div class="layer-description">${layer.description}</div>
    `;
    
    return layerDiv;
}

function closeDataModal() {
    const modal = document.getElementById('dataModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Animation de fermeture
    const container = modal.querySelector('.modal-container');
    container.style.transform = 'translateY(50px) scale(0.9)';
}

function requestData() {
    const modalTitle = document.getElementById('modalTitle');
    const dataTitle = modalTitle.textContent;
    
    // Rediriger vers le formulaire de contact avec le sujet pré-rempli
    const contactSection = document.getElementById('contact');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    
    if (contactSection && sujetSelect && messageTextarea) {
        // Fermer la modale
        closeDataModal();
        
        // Faire défiler vers le formulaire de contact
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pré-remplir le formulaire
        setTimeout(() => {
            sujetSelect.value = 'donnees-geospatiales';
            messageTextarea.value = `Bonjour,\n\nJe souhaite obtenir plus d'informations sur les données "${dataTitle}".\n\nMerci.`;
            messageTextarea.focus();
        }, 1000);
    }
}

// Fonction utilitaire pour créer les datasets avec leurs données complètes
function createDatasetWithDetails(id, title, description, layers, icon, summary, dataType) {
    return `
        <div class="dataset-item" 
             data-id="${id}" 
             data-title="${title}"
             data-description="${description}"
             data-layers='${JSON.stringify(layers)}'>
            <h4><i class="${icon}"></i> ${title}</h4>
            <p>${summary}</p>
            <span class="data-type">${dataType}</span>
            <div class="dataset-action">
                <i class="fas fa-info-circle"></i>
                <span>Cliquez pour voir les détails</span>
            </div>
        </div>
    `;
}

// ===== TABS =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer les classes actives
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Ajouter la classe active
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
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
}

// ===== ANIMATIONS =====
function initAnimations() {
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
}

// ===== NOTIFICATIONS =====
function initNotifications() {
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
}

// CNIGS - Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('CNIGS - Site web chargé avec succès! 🌍');
    
    // Initialiser le slider du Hero
    initHeroSlider();
    
    // Vos autres initialisations...
});

// ===== HERO SLIDER MANAGEMENT =====
function initHeroSlider() {
    const sliderTrack = document.getElementById('heroSliderTrack');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const indicators = document.querySelectorAll('.hero-indicator');
    const sliderContainer = document.querySelector('.hero-slider-container');
    
    if (!sliderTrack) {
        console.log('Hero slider non trouvé dans le DOM');
        return;
    }

    console.log('Hero slider trouvé, initialisation en cours...');

    let currentSlide = 0;
    const totalSlides = 6;
    let sliderInterval;
    let isSliderPaused = false;

    function moveToSlide(index) {
        currentSlide = index;
        const translateX = -(index * 16.666667); // 100% / 6 slides
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les indicateurs
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
        
        // Mettre à jour la classe active du slide
        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        moveToSlide(currentSlide);
    }

    // Event listeners pour les boutons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Event listeners pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-play
    function startAutoPlay() {
        if (!isSliderPaused) {
            sliderInterval = setInterval(() => {
                nextSlide();
            }, 6000); // Change toutes les 6 secondes
        }
    }

    function stopAutoPlay() {
        clearInterval(sliderInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        setTimeout(startAutoPlay, 1500); // Redémarre après 1.5 seconde
    }

    // Pause au survol du Hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            isSliderPaused = true;
            stopAutoPlay();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            isSliderPaused = false;
            startAutoPlay();
        });
    }

    // Support tactile pour mobile
    let startX = 0;
    let endX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });

        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const threshold = 50;
            
            if (startX - endX > threshold) {
                // Swipe vers la gauche - slide suivant
                nextSlide();
            } else if (endX - startX > threshold) {
                // Swipe vers la droite - slide précédent
                prevSlide();
            }
            
            resetAutoPlay();
        });
    }

    // Initialisation
    moveToSlide(0);
    startAutoPlay();
    
    console.log('Hero slider initialisé avec succès');
}

// Navigation au clavier pour le Hero slider
document.addEventListener('keydown', (e) => {
    const heroSection = document.querySelector('.hero');
    if (heroSection && isElementInViewport(heroSection)) {
        if (e.key === 'ArrowLeft') {
            document.getElementById('heroPrevBtn')?.click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('heroNextBtn')?.click();
        }
    }
});

// Utilitaire pour vérifier si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== GESTION DES DÉTAILS DES DONNÉES =====
document.addEventListener('DOMContentLoaded', function() {
    // Autres initialisations...
    initDataModals();
});

function initDataModals() {
    const datasetItems = document.querySelectorAll('.dataset-item');
    const modal = document.getElementById('dataModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Ajouter les event listeners pour chaque dataset
    datasetItems.forEach(item => {
        item.addEventListener('click', function() {
            showDataDetails(this);
        });
    });
    
    // Fermer la modale
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDataModal);
    }
    
    // Fermer en cliquant sur l'overlay
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDataModal();
            }
        });
    }
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDataModal();
        }
    });
}

function showDataDetails(datasetElement) {
    const modal = document.getElementById('dataModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLayers = document.getElementById('modalLayers');
    
    if (!modal) return;
    
    // Récupérer les données de l'élément
    const title = datasetElement.dataset.title;
    const description = datasetElement.dataset.description;
    const layersData = JSON.parse(datasetElement.dataset.layers || '[]');
    
    // Remplir le contenu de la modale
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Créer la liste des couches
    modalLayers.innerHTML = '';
    layersData.forEach(layer => {
        const layerElement = createLayerElement(layer);
        modalLayers.appendChild(layerElement);
    });
    
    // Afficher la modale
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animation d'apparition
    setTimeout(() => {
        modal.querySelector('.modal-container').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

function createLayerElement(layer) {
    const layerDiv = document.createElement('div');
    layerDiv.className = 'layer-item';
    
    layerDiv.innerHTML = `
        <div class="layer-header">
            <span class="layer-id">${layer.id}</span>
            <span class="layer-type">${layer.type}</span>
        </div>
        <div class="layer-name">${layer.name}</div>
        <div class="layer-description">${layer.description}</div>
    `;
    
    return layerDiv;
}

function closeDataModal() {
    const modal = document.getElementById('dataModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Animation de fermeture
    const container = modal.querySelector('.modal-container');
    container.style.transform = 'translateY(50px) scale(0.9)';
}

function requestData() {
    const modalTitle = document.getElementById('modalTitle');
    const dataTitle = modalTitle.textContent;
    
    // Rediriger vers le formulaire de contact avec le sujet pré-rempli
    const contactSection = document.getElementById('contact');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    
    if (contactSection && sujetSelect && messageTextarea) {
        // Fermer la modale
        closeDataModal();
        
        // Faire défiler vers le formulaire de contact
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pré-remplir le formulaire
        setTimeout(() => {
            sujetSelect.value = 'donnees-geospatiales';
            messageTextarea.value = `Bonjour,\n\nJe souhaite obtenir plus d'informations sur les données "${dataTitle}".\n\nMerci.`;
            messageTextarea.focus();
        }, 1000);
    }
}

// Fonction utilitaire pour créer les datasets avec leurs données complètes
function createDatasetWithDetails(id, title, description, layers, icon, summary, dataType) {
    return `
        <div class="dataset-item" 
             data-id="${id}" 
             data-title="${title}"
             data-description="${description}"
             data-layers='${JSON.stringify(layers)}'>
            <h4><i class="${icon}"></i> ${title}</h4>
            <p>${summary}</p>
            <span class="data-type">${dataType}</span>
            <div class="dataset-action">
                <i class="fas fa-info-circle"></i>
                <span>Cliquez pour voir les détails</span>
            </div>
        </div>
    `;
}

// ===== TABS =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer les classes actives
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Ajouter la classe active
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
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
}

// ===== ANIMATIONS =====
function initAnimations() {
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
}

// ===== NOTIFICATIONS =====
function initNotifications() {
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
}

// CNIGS - Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('CNIGS - Site web chargé avec succès! 🌍');
    
    // Initialiser le slider du Hero
    initHeroSlider();
    
    // Vos autres initialisations...
});

// ===== HERO SLIDER MANAGEMENT =====
function initHeroSlider() {
    const sliderTrack = document.getElementById('heroSliderTrack');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const indicators = document.querySelectorAll('.hero-indicator');
    const sliderContainer = document.querySelector('.hero-slider-container');
    
    if (!sliderTrack) {
        console.log('Hero slider non trouvé dans le DOM');
        return;
    }

    console.log('Hero slider trouvé, initialisation en cours...');

    let currentSlide = 0;
    const totalSlides = 6;
    let sliderInterval;
    let isSliderPaused = false;

    function moveToSlide(index) {
        currentSlide = index;
        const translateX = -(index * 16.666667); // 100% / 6 slides
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les indicateurs
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
        
        // Mettre à jour la classe active du slide
        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        moveToSlide(currentSlide);
    }

    // Event listeners pour les boutons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Event listeners pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-play
    function startAutoPlay() {
        if (!isSliderPaused) {
            sliderInterval = setInterval(() => {
                nextSlide();
            }, 6000); // Change toutes les 6 secondes
        }
    }

    function stopAutoPlay() {
        clearInterval(sliderInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        setTimeout(startAutoPlay, 1500); // Redémarre après 1.5 seconde
    }

    // Pause au survol du Hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            isSliderPaused = true;
            stopAutoPlay();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            isSliderPaused = false;
            startAutoPlay();
        });
    }

    // Support tactile pour mobile
    let startX = 0;
    let endX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });

        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const threshold = 50;
            
            if (startX - endX > threshold) {
                // Swipe vers la gauche - slide suivant
                nextSlide();
            } else if (endX - startX > threshold) {
                // Swipe vers la droite - slide précédent
                prevSlide();
            }
            
            resetAutoPlay();
        });
    }

    // Initialisation
    moveToSlide(0);
    startAutoPlay();
    
    console.log('Hero slider initialisé avec succès');
}

// Navigation au clavier pour le Hero slider
document.addEventListener('keydown', (e) => {
    const heroSection = document.querySelector('.hero');
    if (heroSection && isElementInViewport(heroSection)) {
        if (e.key === 'ArrowLeft') {
            document.getElementById('heroPrevBtn')?.click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('heroNextBtn')?.click();
        }
    }
});

// Utilitaire pour vérifier si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== GESTION DES DÉTAILS DES DONNÉES =====
document.addEventListener('DOMContentLoaded', function() {
    // Autres initialisations...
    initDataModals();
});

function initDataModals() {
    const datasetItems = document.querySelectorAll('.dataset-item');
    const modal = document.getElementById('dataModal');
    const closeBtn = document.getElementById('closeModal');
    
    // Ajouter les event listeners pour chaque dataset
    datasetItems.forEach(item => {
        item.addEventListener('click', function() {
            showDataDetails(this);
        });
    });
    
    // Fermer la modale
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDataModal);
    }
    
    // Fermer en cliquant sur l'overlay
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDataModal();
            }
        });
    }
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDataModal();
        }
    });
}

function showDataDetails(datasetElement) {
    const modal = document.getElementById('dataModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLayers = document.getElementById('modalLayers');
    
    if (!modal) return;
    
    // Récupérer les données de l'élément
    const title = datasetElement.dataset.title;
    const description = datasetElement.dataset.description;
    const layersData = JSON.parse(datasetElement.dataset.layers || '[]');
    
    // Remplir le contenu de la modale
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Créer la liste des couches
    modalLayers.innerHTML = '';
    layersData.forEach(layer => {
        const layerElement = createLayerElement(layer);
        modalLayers.appendChild(layerElement);
    });
    
    // Afficher la modale
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animation d'apparition
    setTimeout(() => {
        modal.querySelector('.modal-container').style.transform = 'translateY(0) scale(1)';
    }, 10);
}

function createLayerElement(layer) {
    const layerDiv = document.createElement('div');
    layerDiv.className = 'layer-item';
    
    layerDiv.innerHTML = `
        <div class="layer-header">
            <span class="layer-id">${layer.id}</span>
            <span class="layer-type">${layer.type}</span>
        </div>
        <div class="layer-name">${layer.name}</div>
        <div class="layer-description">${layer.description}</div>
    `;
    
    return layerDiv;
}

function closeDataModal() {
    const modal = document.getElementById('dataModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Animation de fermeture
    const container = modal.querySelector('.modal-container');
    container.style.transform = 'translateY(50px) scale(0.9)';
}

function requestData() {
    const modalTitle = document.getElementById('modalTitle');
    const dataTitle = modalTitle.textContent;
    
    // Rediriger vers le formulaire de contact avec le sujet pré-rempli
    const contactSection = document.getElementById('contact');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    
    if (contactSection && sujetSelect && messageTextarea) {
        // Fermer la modale
        closeDataModal();
        
        // Faire défiler vers le formulaire de contact
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pré-remplir le formulaire
        setTimeout(() => {
            sujetSelect.value = 'donnees-geospatiales';
            messageTextarea.value = `Bonjour,\n\nJe souhaite obtenir plus d'informations sur les données "${dataTitle}".\n\nMerci.`;
            messageTextarea.focus();
        }, 1000);
    }
}

// Fonction utilitaire pour créer les datasets avec leurs données complètes
function createDatasetWithDetails(id, title, description, layers, icon, summary, dataType) {
    return `
        <div class="dataset-item" 
             data-id="${id}" 
             data-title="${title}"
             data-description="${description}"
             data-layers='${JSON.stringify(layers)}'>
            <h4><i class="${icon}"></i> ${title}</h4>
            <p>${summary}</p>
            <span class="data-type">${dataType}</span>
            <div class="dataset-action">
                <i class="fas fa-info-circle"></i>
                <span>Cliquez pour voir les détails</span>
            </div>
        </div>
    `;
}

// ===== TABS =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer les classes actives
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Ajouter la classe active
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
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
}

// ===== ANIMATIONS =====
function initAnimations() {
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
}

// ===== NOTIFICATIONS =====
function initNotifications() {
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
}