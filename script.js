'''document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const menuContainer = document.getElementById('menu-container');
    const bottomNav = document.getElementById('bottom-nav');
    const modal = document.getElementById('plate-modal');
    const closeModalButton = document.getElementById('close-modal');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const featuredPlatesWrapper = document.getElementById('featured-plates-wrapper');

    // Elementos del Carrito de Compras
    const orderModal = document.getElementById('order-modal');
    const closeOrderModalButton = document.getElementById('close-order-modal');
    const orderItemsContainer = document.getElementById('order-items-container');
    const orderTotalPriceSpan = document.getElementById('order-total-price');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const addToOrderButton = document.getElementById('add-to-order');
    const customizationNotes = document.getElementById('customization-notes');

    // --- VARIABLES GLOBALES ---
    let currentOrder = [];

    // --- FUNCIONES DE PERSISTENCIA DE ORDEN ---
    const saveOrderToLocalStorage = () => {
        localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    };

    const loadOrderFromLocalStorage = () => {
        const storedOrder = localStorage.getItem('currentOrder');
        if (storedOrder) {
            currentOrder = JSON.parse(storedOrder);
            updateOrderCartUI(); // Actualizar la UI del carrito al cargar
        }
    };

    // Cargar la orden al iniciar la aplicación
    loadOrderFromLocalStorage();

    // --- LÓGICA DEL CARRUSEL ---
    const featuredPlates = menuData.filter(plate => plate.rentabilidad === 'estrella');

    featuredPlates.forEach(plate => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <img src="${plate.imagen}" alt="${plate.nombre}">
            <div class="caption">${plate.nombre}</div>
        `;
        featuredPlatesWrapper.appendChild(slide);
    });

    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- RENDERIZADO DEL MENÚ Y NAVEGACIÓN ---
    const menuByCategoria = menuData.reduce((acc, plate) => {
        const category = plate.categoria;
        if (!acc[category]) { acc[category] = []; }
        acc[category].push(plate);
        return acc;
    }, {});

    for (const categoria in menuByCategoria) {
        const categorySection = document.createElement('section');
        categorySection.className = 'menu-category';
        categorySection.id = `categoria-${categoria.replace(/\s+/g, '-')}`;

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = categoria;
        categorySection.appendChild(categoryTitle);

        const grid = document.createElement('div');
        grid.className = 'menu-grid';

        menuByCategoria[categoria].forEach(plate => {
            const plateCard = document.createElement('div');
            plateCard.className = 'plate-card';
            plateCard.dataset.plateName = plate.nombre;
            plateCard.innerHTML = `
                <img src="${plate.imagen}" alt="${plate.nombre}" class="plate-img">
                <div class="plate-info">
                    <h3 class="plate-name">${plate.nombre}</h3>
                    <p class="plate-description">${plate.descripcion.substring(0, 80)}...</p>
                    <div class="plate-price">${plate.precio.toFixed(2)}</div>
                </div>
            `;
            grid.appendChild(plateCard);
        });

        categorySection.appendChild(grid);
        menuContainer.appendChild(categorySection);

        const navLink = document.createElement('a');
        navLink.className = 'nav-link';
        navLink.href = `#${categorySection.id}`;
        
        const iconName = categoria.toUpperCase();
        const iconFile = iconName === 'POSTRES' ? 'POSTRE' : iconName;
        navLink.innerHTML = `
            <img src="IMAGE/ICONS/${iconFile}.png" alt="${categoria}" class="nav-icon">
            <span>${categoria}</span>
        `;
        bottomNav.appendChild(navLink);
    }

    // --- LÓGICA DEL CARRITO DE COMPRAS ---

    // Crear el botón flotante de "Mi Orden"
    const floatingCartButton = document.createElement('div');
    floatingCartButton.className = 'floating-cart-button';
    floatingCartButton.id = 'floating-cart-btn';
    floatingCartButton.innerHTML = `
        <span class="cart-icon">🛍️</span>
        <span id="floating-order-count-badge" class="order-count-badge">0</span>
    `;
    document.body.appendChild(floatingCartButton);

    // Función para actualizar la UI del carrito (contador y visibilidad)
    const updateOrderCartUI = () => {
        const badge = document.getElementById('floating-order-count-badge');
        if (currentOrder.length > 0) {
            badge.textContent = currentOrder.length;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    };

    // Función para renderizar el modal de la orden
    const renderOrderModal = () => {
        orderItemsContainer.innerHTML = ''; // Limpiar items anteriores
        let total = 0;
        const clearOrderBtn = document.getElementById('clear-order-btn');

        if (currentOrder.length === 0) {
            orderItemsContainer.innerHTML = '<p style="text-align: center; color: var(--color-texto-secundario);">Tu orden está vacía.</p>';
            if(clearOrderBtn) clearOrderBtn.style.display = 'none';
        } else {
            if(clearOrderBtn) clearOrderBtn.style.display = 'block';
            currentOrder.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'order-item';
                itemDiv.dataset.orderItemId = item.id; // Para identificar al eliminar
                itemDiv.innerHTML = `
                    <div class="order-item-details">
                        <div class="order-item-name">${item.plate.nombre}</div>
                        ${item.notes ? `<div class="order-item-notes">Notas: ${item.notes}</div>` : ''}
                    </div>
                    <div class="order-item-price">${item.plate.precio.toFixed(2)}</div>
                    <button class="remove-item-btn">Eliminar</button>
                `;
                orderItemsContainer.appendChild(itemDiv);
                total += item.plate.precio;
            });
        }
        orderTotalPriceSpan.textContent = total.toFixed(2);
        orderModal.style.display = 'flex';
    };

    // Event Listener para limpiar el carrito
    const clearOrderBtn = document.getElementById('clear-order-btn');
    if(clearOrderBtn) {
        clearOrderBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar tu orden?')) {
                currentOrder = [];
                updateOrderCartUI();
                renderOrderModal();
                saveOrderToLocalStorage();
            }
        });
    }

    // Event Listener para el botón "Añadir a la Orden" en el modal de plato
    addToOrderButton.addEventListener('click', () => {
        const plateName = document.getElementById('modal-title').textContent;
        const plateData = menuData.find(p => p.nombre === plateName);
        const notes = customizationNotes.value.trim();
        const modalImg = document.getElementById('modal-img');

        if (plateData) {
            currentOrder.push({
                id: Date.now(), // ID único para cada item en la orden
                plate: plateData,
                notes: notes
            });
            updateOrderCartUI();
            
            // Animación de "añadir al carrito"
            const imgClone = modalImg.cloneNode();
            imgClone.style.position = 'fixed';
            imgClone.style.left = modalImg.getBoundingClientRect().left + 'px';
            imgClone.style.top = modalImg.getBoundingClientRect().top + 'px';
            imgClone.style.width = modalImg.offsetWidth + 'px';
            imgClone.style.height = modalImg.offsetHeight + 'px';
            imgClone.style.transition = 'all 0.8s ease-in-out';
            imgClone.style.zIndex = '9999';
            document.body.appendChild(imgClone);

            const cartButtonRect = floatingCartButton.getBoundingClientRect();
            imgClone.style.left = cartButtonRect.left + (cartButtonRect.width / 2) - (imgClone.offsetWidth / 2) + 'px';
            imgClone.style.top = cartButtonRect.top + (cartButtonRect.height / 2) - (imgClone.offsetHeight / 2) + 'px';
            imgClone.style.width = '0px';
            imgClone.style.height = '0px';
            imgClone.style.opacity = '0';

            imgClone.addEventListener('transitionend', () => {
                imgClone.remove();
            });

            closeModal(); // Cierra el modal de plato
            alert('¡Plato añadido a tu orden!'); // Confirmación simple
            saveOrderToLocalStorage(); // Guardar la orden después de añadir
        }
    });

    // Event Listener para abrir el modal de la orden (ahora desde el botón flotante)
    floatingCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        renderOrderModal();
    });

    // Event Listener para cerrar el modal de la orden
    closeOrderModalButton.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) { // Cierra si se hace clic en el overlay
            orderModal.style.display = 'none';
        }
    });

    // Event Listener para eliminar items del modal de la orden (delegación)
    orderItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const itemIdToRemove = parseInt(e.target.closest('.order-item').dataset.orderItemId);
            currentOrder = currentOrder.filter(item => item.id !== itemIdToRemove);
            updateOrderCartUI();
            renderOrderModal(); // Volver a renderizar el modal para reflejar el cambio
            saveOrderToLocalStorage();
        }
    });

    // Event Listener para confirmar la orden
    confirmOrderBtn.addEventListener('click', () => {
        if (currentOrder.length > 0) {
            alert('¡Orden enviada a la cocina! Un mozo se acercará en breve para confirmar.');
            currentOrder = []; // Vaciar la orden
            updateOrderCartUI();
            orderModal.style.display = 'none';
            saveOrderToLocalStorage(); // Guardar la orden después de confirmar (vacía)
        } else {
            alert('Tu orden está vacía. Por favor, añade algunos platos.');
        }
    });

    // --- LÓGICA DE BÚSQUEDA ---
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterMenu(searchTerm);
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value === '') { filterMenu(''); }
    });

    const filterMenu = (term) => {
        document.querySelectorAll('.plate-card').forEach(card => {
            const plateName = card.querySelector('.plate-name').textContent.toLowerCase();
            const plateDescription = card.querySelector('.plate-description').textContent.toLowerCase();
            card.style.display = (plateName.includes(term) || plateDescription.includes(term)) ? 'flex' : 'none';
        });

        document.querySelectorAll('.menu-category').forEach(category => {
            const visiblePlates = category.querySelectorAll('.plate-card[style*="display: flex"]');
            category.style.display = visiblePlates.length > 0 ? 'block' : 'none';
        });
    };

    // --- LÓGICA DEL MODAL DE PLATO ---
    const openModal = (plate) => {
        document.getElementById('modal-img').src = plate.imagen;
        document.getElementById('modal-title').textContent = plate.nombre;
        document.getElementById('modal-description').textContent = plate.descripcion;
        document.getElementById('modal-price').textContent = plate.precio.toFixed(2);
        
        const suggestionsContainer = document.getElementById('modal-suggestions-container');
        const suggestionsList = document.getElementById('modal-suggestions-list');
        suggestionsList.innerHTML = '';

        // Lógica de Sugerencias Inteligentes
        const orderCategories = new Set(currentOrder.map(item => item.plate.categoria));
        const allCategories = new Set(menuData.map(item => item.categoria));
        const missingCategories = [...allCategories].filter(category => !orderCategories.has(category) && category !== plate.categoria);

        let suggestions = [];
        if (missingCategories.length > 0) {
            // Sugerir un item de cada categoría faltante, priorizando los 'estrella'
            missingCategories.forEach(category => {
                const potentialSuggestions = menuData.filter(item => item.categoria === category);
                const starSuggestion = potentialSuggestions.find(item => item.rentabilidad === 'estrella');
                if (starSuggestion) {
                    suggestions.push(starSuggestion);
                } else if (potentialSuggestions.length > 0) {
                    suggestions.push(potentialSuggestions[0]); // O uno al azar
                }
            });
        } else {
            // Si no faltan categorías, usar las sugerencias predefinidas del plato
            suggestions = menuData.filter(item => plate.sugerencias.includes(item.nombre));
        }

        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = `${suggestion.nombre} (+${suggestion.precio.toFixed(2)})`;
                li.onclick = () => {
                    currentOrder.push({ id: Date.now(), plate: suggestion, notes: '' });
                    updateOrderCartUI();
                    renderOrderModal();
                    closeModal();
                    saveOrderToLocalStorage();
                };
                suggestionsList.appendChild(li);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }

        customizationNotes.value = ''; // Limpiar notas al abrir
        modal.style.display = 'flex';
    };

    menuContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.plate-card');
        if (card) {
            const plateName = card.dataset.plateName;
            const plateData = menuData.find(p => p.nombre === plateName);
            if (plateData) { openModal(plateData); }
        }
    });

    const closeModal = () => { modal.style.display = 'none'; };

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) { closeModal(); } });

    // --- LÓGICA DE SCROLLSPY ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.menu-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => { observer.observe(section); });

    // --- LÓGICA DE ANIMACIÓN AL SCROLL ---
    const cards = document.querySelectorAll('.plate-card');
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Activar el primer link por defecto
    if (navLinks.length > 0) {
        setTimeout(() => {
            const allNavLinks = document.querySelectorAll('.nav-link');
            if (allNavLinks.length > 0) {
                allNavLinks[0].classList.add('active');
            }
        }, 0);
    }

    // --- REGISTRO DEL SERVICE WORKER PARA PWA ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => console.log('Service Worker registrado con éxito:', registration))
                .catch(error => console.log('Error al registrar el Service Worker:', error));
        });
    }
});
''