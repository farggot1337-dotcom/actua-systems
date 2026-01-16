// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 120;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-item, .product-showcase, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Cockpit Builder Modal
const builderModal = document.getElementById('builder-modal');
const openBuilderBtn = document.getElementById('open-builder');
const closeBuilderBtn = document.getElementById('close-builder');
const cockpitPreview = document.getElementById('cockpit-preview');
const componentsList = document.getElementById('components-list');
const resetConfigBtn = document.getElementById('reset-config');
const saveConfigBtn = document.getElementById('save-config');

let selectedComponents = {
    actuators: null,
    belts: false,
    vibration: false,
    design: null
};

// Открытие модального окна
if (openBuilderBtn) {
    openBuilderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (builderModal) {
            builderModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
}

// Закрытие модального окна
if (closeBuilderBtn) {
    closeBuilderBtn.addEventListener('click', () => {
        if (builderModal) {
            builderModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Закрытие при клике на overlay
if (builderModal) {
    builderModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            builderModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && builderModal && builderModal.classList.contains('active')) {
        builderModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Обработка выбора опций
const optionButtons = document.querySelectorAll('.option-btn');
optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const component = btn.getAttribute('data-component');
        const image = btn.getAttribute('data-image');
        const isToggle = btn.classList.contains('toggle-option');
        
        if (isToggle) {
            // Переключаемые опции (ремни, вибрация)
            const isActive = btn.classList.contains('active');
            btn.classList.toggle('active');
            
            if (component === 'belts') {
                selectedComponents.belts = !isActive;
            } else if (component === 'vibration') {
                selectedComponents.vibration = !isActive;
            }
        } else {
            // Опции с выбором одного из вариантов
            // Убираем активный класс у других кнопок в той же группе
            const optionGroup = btn.closest('.option-group');
            const groupButtons = optionGroup.querySelectorAll('.option-btn');
            groupButtons.forEach(b => b.classList.remove('active'));
            
            // Добавляем активный класс к выбранной кнопке
            btn.classList.add('active');
            
            // Обновляем выбранный компонент
            if (component.startsWith('actuators-')) {
                selectedComponents.actuators = component;
            } else if (component.startsWith('design-')) {
                selectedComponents.design = component;
                // Обновляем изображение при выборе дизайна
                if (image && cockpitPreview) {
                    cockpitPreview.src = image;
                    cockpitPreview.onerror = function() {
                        this.src = 'images/cockpit-base.jpg';
                    };
                }
            }
            
            // Обновляем изображение если указано
            if (image && cockpitPreview) {
                cockpitPreview.src = image;
                cockpitPreview.onerror = function() {
                    // Если изображение не найдено, используем placeholder
                    this.src = 'images/cockpit-base.jpg';
                };
            }
        }
        
        updateComponentsList();
    });
});

// Обновление списка выбранных компонентов
function updateComponentsList() {
    if (!componentsList) return;
    
    componentsList.innerHTML = '';
    
    if (selectedComponents.actuators) {
        const li = document.createElement('li');
        const actuatorName = selectedComponents.actuators.replace('actuators-', '').toUpperCase();
        li.textContent = `Актуаторы: ${actuatorName}`;
        componentsList.appendChild(li);
    }
    
    if (selectedComponents.belts) {
        const li = document.createElement('li');
        li.textContent = 'Активные ремни';
        componentsList.appendChild(li);
    }
    
    if (selectedComponents.vibration) {
        const li = document.createElement('li');
        li.textContent = 'Вибро мотор';
        componentsList.appendChild(li);
    }
    
    if (selectedComponents.design) {
        const li = document.createElement('li');
        const designName = selectedComponents.design.replace('design-', '');
        li.textContent = `Дизайн кокпита: ${designName}`;
        componentsList.appendChild(li);
    }
    
    if (componentsList.children.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Компоненты не выбраны';
        li.style.opacity = '0.5';
        componentsList.appendChild(li);
    }
}

// Сброс конфигурации
if (resetConfigBtn) {
    resetConfigBtn.addEventListener('click', () => {
        selectedComponents = {
            actuators: null,
            belts: false,
            vibration: false,
            design: null
        };
        
        optionButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (cockpitPreview) {
            cockpitPreview.src = 'images/cockpit-base.jpg';
        }
        
        updateComponentsList();
    });
}

// Сохранение конфигурации
if (saveConfigBtn) {
    saveConfigBtn.addEventListener('click', () => {
        if (componentsList.children.length === 0 || 
            (componentsList.children.length === 1 && componentsList.children[0].textContent === 'Компоненты не выбраны')) {
            alert('Пожалуйста, выберите хотя бы один компонент!');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        alert('Конфигурация сохранена! Мы свяжемся с вами для уточнения деталей.');
        
        // Можно закрыть модальное окно после сохранения
        // builderModal.classList.remove('active');
        // document.body.style.overflow = '';
    });
}

// Инициализация списка компонентов
updateComponentsList();
