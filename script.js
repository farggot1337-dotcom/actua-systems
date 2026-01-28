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

// Product Details Modal (10 фото + 3 видео)
const productModal = document.getElementById('product-modal');
const closeProductBtn = document.getElementById('close-product');
const productModalTitle = document.getElementById('product-modal-title');
const productModalDesc = document.getElementById('product-modal-desc');
const productPhotos = document.getElementById('product-photos');
const productVideos = document.getElementById('product-videos');

const PRODUCT_MEDIA = {
    actuators: {
        title: 'ПРОМЫШЛЕННЫЕ АКТУАТОРЫ',
        desc: 'Промышленные актуаторы Actua Systems на сервоприводах 750 Вт созданы специально для гоночных симуляторов. Они обеспечивают высокую тягу и точную отработку телеметрии: кочки, поребрики, перенос веса, торможение и ускорение. Мы делаем акцент на стабильной работе под нагрузкой, аккуратной механике и повторяемости ощущений — чтобы движение платформы было предсказуемым, плавным и быстрым. Подходят для разных сценариев: от мягкой “дороги” до агрессивных настроек под трек и ралли.',
        photos: Array.from({ length: 5 }, (_, i) => `images/actuators-${i + 1}.jpg`),
        videos: [
            { title: 'Формула 1', youtubeId: 'YOUR_F1_VIDEO_ID' },
            { title: 'GT3', youtubeId: 'YOUR_GT3_VIDEO_ID' },
            { title: 'Ралли', youtubeId: 'YOUR_RALLY_VIDEO_ID' }
        ]
    },
    belts: {
        title: 'АКТИВНЫЕ РЕМНИ',
        desc: 'Активные ремни добавляют физическое ощущение ускорения и торможения через управляемое натяжение ремня безопасности. Это усиливает “связь” с машиной: вы чувствуете перегрузки телом, лучше контролируете замедление, позднее начинаете тормозить и точнее работаете педалями. Система легко настраивается под разные дисциплины — можно сделать мягкий и комфортный профиль или, наоборот, жёсткий “боевой” отклик под трек. Отлично работает вместе с актуаторами и виброэффектами.',
        photos: Array.from({ length: 5 }, (_, i) => `images/belts-${i + 1}.jpg`),
        videos: [
            { title: 'Формула 1', youtubeId: 'YOUR_F1_BELTS_VIDEO_ID' },
            { title: 'GT3', youtubeId: 'YOUR_GT3_BELTS_VIDEO_ID' },
            { title: 'Ралли', youtubeId: 'YOUR_RALLY_BELTS_VIDEO_ID' }
        ]
    },
    cockpits: {
        title: 'КОКПИТЫ',
        desc: 'Кокпиты Actua Systems — это жёсткая и продуманная основа под симрейсинг. Мы фокусируемся на правильной геометрии посадки, стабильности конструкции и удобстве установки оборудования: кресло, педали, база руля, дополнительные панели и аксессуары. Конструкция рассчитана на интеграцию с motion‑системой (4DOF), активными ремнями и другими модулями — чтобы весь комплект работал как единая система. Кокпит должен быть не просто “красивым”, а максимально стабильным: без лишних люфтов, вибраций и паразитных прогибов.',
        photos: Array.from({ length: 5 }, (_, i) => `images/cockpits-${i + 1}.jpg`),
        videos: [
            { title: 'Формула 1', youtubeId: 'YOUR_F1_COCKPIT_VIDEO_ID' },
            { title: 'GT3', youtubeId: 'YOUR_GT3_COCKPIT_VIDEO_ID' },
            { title: 'Ралли', youtubeId: 'YOUR_RALLY_COCKPIT_VIDEO_ID' }
        ]
    }
};

function openProductModal(productKey) {
    const cfg = PRODUCT_MEDIA[productKey];
    if (!cfg || !productModal) return;

    if (productModalTitle) productModalTitle.textContent = cfg.title;
    if (productModalDesc) productModalDesc.textContent = cfg.desc || '';

    // Photos
    if (productPhotos) {
        productPhotos.innerHTML = '';
        cfg.photos.forEach((src, idx) => {
            const wrap = document.createElement('div');
            wrap.className = 'product-photo';

            const img = document.createElement('img');
            img.alt = `${cfg.title} фото ${idx + 1}`;
            img.src = src;
            img.onerror = function () {
                this.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect fill='%23151515' width='600' height='600'/%3E%3Ctext fill='%23666' font-family='Arial' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E%D0%A4%D0%9E%D0%A2%D0%9E%3C/text%3E%3C/svg%3E";
            };

            wrap.appendChild(img);
            productPhotos.appendChild(wrap);
        });
    }

    // Videos
    if (productVideos) {
        productVideos.innerHTML = '';
        cfg.videos.forEach(v => {
            const card = document.createElement('div');
            card.className = 'product-video';

            const wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper';

            const iframe = document.createElement('iframe');
            iframe.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';

            // Если ID не задан — показываем пустую заглушку, чтобы верстка не ломалась
            if (v.youtubeId && !v.youtubeId.startsWith('YOUR_')) {
                iframe.src = `https://www.youtube.com/embed/${v.youtubeId}`;
            } else {
                iframe.src = '';
            }

            wrapper.appendChild(iframe);

            const title = document.createElement('div');
            title.className = 'product-video-title';
            title.textContent = v.title;

            card.appendChild(wrapper);
            card.appendChild(title);
            productVideos.appendChild(card);
        });
    }

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.open-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productKey = btn.getAttribute('data-product');
        openProductModal(productKey);
    });
});

if (closeProductBtn) {
    closeProductBtn.addEventListener('click', closeProductModal);
}

if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeProductModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
        closeProductModal();
    }
});
