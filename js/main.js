/**
 * ============================================================================
 * LIZHET CAKES - REPOSTERÍA ARTESANAL
 * Archivo Principal de JavaScript (main.js)
 * Desarrollado para: Proyecto Universitario (TecNM / ITCM) & Negocio Familiar
 * Elaborado por: Jonathan Missael Ortiz Rodríguez
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. CONFIGURACIÓN Y ESTADO INICIAL
     -------------------------------------------------------------------------- */
  
  /**
   * CONFIGURACIÓN PARA WHATSAPP:
   * Para conectar el sitio con el WhatsApp real del negocio en el futuro,
   * simplemente escribe el número telefónico con lada de país en esta variable:
   * Ejemplo para México (Tamaulipas / Cd. Madero): "528331234567"
   * Si se deja vacía (""), el formulario funciona en modo demostrativo universitario.
   */
  const CONFIG_WHATSAPP_NUMBER = ""; 

  // Fecha mínima para el selector de fecha (a partir del día de hoy)
  const fechaInput = document.getElementById('fechaEvento');
  if (fechaInput) {
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.min = hoy;
  }

  /* --------------------------------------------------------------------------
     2. MENÚ DE NAVEGACIÓN MÓVIL Y SCROLL
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Alternar menú hamburguesa en móviles
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Sombra en la barra de navegación al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
    handleBackToTopVisibility();
  });

  // Resaltado de enlace activo según la sección visible
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. DATOS Y MODAL DE "VER MÁS" (CATÁLOGO DE PASTELES)
     -------------------------------------------------------------------------- */
  const cakesData = {
    "aleman": {
      title: "Pastel Alemán",
      tag: "Especialidad de la Casa",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      description: "El pastel emblemático de Lizhet Cakes. Horneado con una receta casera de bizcocho suave de cacao y el auténtico relleno tradicional preparado a fuego lento con coco rallado tostado, nueces pecanas en trocitos y caramelo cremoso.",
      portions: "Desde 10 hasta 40+ porciones (1 o 2 pisos)",
      flavorBase: "Cacao y caramelo artesanal",
      filling: "Relleno tradicional alemán de coco tostado y nuez pecana",
      decoration: "Cobertura rústica de coco-nuez y goteo de chocolate suave",
      notice: "El costo se calcula de forma personalizada de acuerdo con el tamaño, porciones y detalles que solicites.",
      formSelectValue: "Pastel Alemán"
    },
    "red-velvet": {
      title: "Pastel Red Velvet",
      tag: "Elegante y Delicado",
      image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&q=80",
      description: "Una experiencia aterciopelada y refinada. Su distintivo color carmesí y suave miga combinan delicadas notas de cocoa y vainilla, complementado con una suave y fresca cobertura diplomática que equilibra cada bocado.",
      portions: "Desde 12 hasta 35 porciones",
      flavorBase: "Red Velvet tradicional con toque de cocoa",
      filling: "Frosting suave diplomático o crema especial",
      decoration: "Acabado liso o semi-naked con migas aterciopeladas y frutos rojos decorativos",
      notice: "El costo se calcula de forma personalizada de acuerdo con el tamaño, porciones y detalles que solicites.",
      formSelectValue: "Red Velvet"
    },
    "chocolate": {
      title: "Pastel de Chocolate",
      tag: "Favorito de la Familia",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80",
      description: "Para los verdaderos amantes del chocolate. Elaborado con cocoa de alta calidad para lograr una consistencia esponjosa y húmeda, relleno con ganache cremoso y una cobertura brillante irresistible.",
      portions: "Desde 10 hasta 40+ porciones",
      flavorBase: "Chocolate oscuro húmedo y esponjoso",
      filling: "Ganache de chocolate o crema de avellana",
      decoration: "Efecto goteo (drip cake), virutas de chocolate y decoración temática",
      notice: "El costo se calcula de forma personalizada de acuerdo con el tamaño, porciones y detalles que solicites.",
      formSelectValue: "Pastel de Chocolate"
    },
    "vainilla": {
      title: "Pastel de Vainilla",
      tag: "Clásico y Versátil",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
      description: "El consentido de todas las celebraciones. Bizcocho sumamente esponjoso infusionado con esencia pura de vainilla, perfecto para maridar con tus rellenos favoritos de frutas, dulce de leche o crema pastelera.",
      portions: "Desde 10 hasta 50 porciones",
      flavorBase: "Vainilla aromática tradicional",
      filling: "Dulce de leche, fresas naturales o mermelada casera",
      decoration: "Chantilly suave, flores naturales o detalles festivos",
      notice: "El costo se calcula de forma personalizada de acuerdo con el tamaño, porciones y detalles que solicites.",
      formSelectValue: "Pastel de Vainilla"
    },
    "cumpleanos": {
      title: "Pastel para Cumpleaños",
      tag: "¡Momento de Festejar!",
      image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=80",
      description: "Diseñado especialmente para llenar de alegría el momento de las mañanitas. Puedes elegir cualquiera de nuestros 4 sabores base, con decoraciones alegres, chispas, colores temáticos o dedicatoria especial.",
      portions: "Para reuniones íntimas (10-15 p.) o fiestas grandes (30-50 p.)",
      flavorBase: "A elegir (Vainilla, Chocolate, Alemán o Red Velvet)",
      filling: "Personalizable según tu preferencia",
      decoration: "Paleta de colores a juego con la fiesta, confeti dulce o topper festivo",
      notice: "El costo se calcula de forma personalizada de acuerdo con el tamaño, porciones y detalles que solicites.",
      formSelectValue: "Pastel de Cumpleaños / Festejo"
    },
    "personalizado": {
      title: "Pasteles para Eventos y Especiales",
      tag: "A tu Gusto y Medida",
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
      description: "Creaciones de 1, 2 o más pisos para bodas, bautizos, baby showers, graduaciones o aniversarios. Trabajamos contigo para crear el diseño que soñaste, manteniendo el sabor casero característico de Lizhet Cakes.",
      portions: "20, 40, 60 o más porciones en pisos escalonados",
      flavorBase: "Combinación de sabores por piso si lo deseas",
      filling: "Rellenos gourmet seleccionados",
      decoration: "Diseño elegante, texturas en crema, flores o detalles únicos",
      notice: "El costo se calcula de forma personalizada de acuerdo con el tamaño, porciones y detalles que solicites.",
      formSelectValue: "Pastel para Evento Especial / Personalizado"
    }
  };

  const cakeModal = document.getElementById('cakeModal');
  const cakeModalClose = document.getElementById('cakeModalClose');
  const btnVerMasList = document.querySelectorAll('.btn-ver-mas');

  // Elementos dentro del modal de pastel
  const modalImg = document.getElementById('modalCakeImg');
  const modalTag = document.getElementById('modalCakeTag');
  const modalTitle = document.getElementById('modalCakeTitle');
  const modalDesc = document.getElementById('modalCakeDesc');
  const modalPortions = document.getElementById('modalCakePortions');
  const modalBase = document.getElementById('modalCakeBase');
  const modalFilling = document.getElementById('modalCakeFilling');
  const modalDeco = document.getElementById('modalCakeDeco');
  const modalQuoteBtn = document.getElementById('modalCakeQuoteBtn');

  let currentCakeSelected = "";

  // Abrir modal con datos dinámicos
  btnVerMasList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cakeKey = e.currentTarget.getAttribute('data-cake-id');
      const data = cakesData[cakeKey];

      if (data) {
        currentCakeSelected = data.formSelectValue;
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;
        modalPortions.textContent = data.portions;
        modalBase.textContent = data.flavorBase;
        modalFilling.textContent = data.filling;
        modalDeco.textContent = data.decoration;

        openModal(cakeModal);
      }
    });
  });

  // Cerrar modal de pastel
  if (cakeModalClose) {
    cakeModalClose.addEventListener('click', () => closeModal(cakeModal));
  }

  // Botón "Solicitar cotización de este pastel" dentro del modal
  if (modalQuoteBtn) {
    modalQuoteBtn.addEventListener('click', () => {
      closeModal(cakeModal);
      const tipoPastelSelect = document.getElementById('tipoPastel');
      if (tipoPastelSelect && currentCakeSelected) {
        tipoPastelSelect.value = currentCakeSelected;
      }
      // Desplazamiento suave a la sección de pedidos
      const pedidosSection = document.getElementById('pedidos');
      if (pedidosSection) {
        pedidosSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. MODAL DE GALERÍA (LIGHTBOX)
     -------------------------------------------------------------------------- */
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalClose = document.getElementById('galleryModalClose');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryLightboxImg = document.getElementById('galleryLightboxImg');
  const galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
  const galleryLightboxDesc = document.getElementById('galleryLightboxDesc');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      const desc = item.querySelector('p');

      if (img && galleryLightboxImg) {
        galleryLightboxImg.src = img.src;
        galleryLightboxImg.alt = img.alt;
        galleryLightboxTitle.textContent = title ? title.textContent : "Creación Lizhet Cakes";
        galleryLightboxDesc.textContent = desc ? desc.textContent : "Repostería artesanal para momentos especiales";
        openModal(galleryModal);
      }
    });
  });

  if (galleryModalClose) {
    galleryModalClose.addEventListener('click', () => closeModal(galleryModal));
  }

  /* --------------------------------------------------------------------------
     5. GESTIÓN DEL FORMULARIO DE PEDIDOS Y COTIZACIONES
     -------------------------------------------------------------------------- */
  const orderForm = document.getElementById('orderForm');
  const successModal = document.getElementById('successModal');
  const successModalClose = document.getElementById('successModalClose');
  const btnSuccessOk = document.getElementById('btnSuccessOk');

  // Elementos del resumen en el modal de éxito
  const summaryNombre = document.getElementById('summaryNombre');
  const summaryWhatsApp = document.getElementById('summaryWhatsApp');
  const summaryTipo = document.getElementById('summaryTipo');
  const summarySabor = document.getElementById('summarySabor');
  const summaryPorciones = document.getElementById('summaryPorciones');
  const summaryTamano = document.getElementById('summaryTamano');
  const summaryFecha = document.getElementById('summaryFecha');
  const summaryDiseno = document.getElementById('summaryDiseno');
  const btnOpenWhatsAppOrder = document.getElementById('btnOpenWhatsAppOrder');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener campos
      const nombre = document.getElementById('nombreCliente').value.trim();
      const whatsapp = document.getElementById('whatsappCliente').value.trim();
      const tipoPastel = document.getElementById('tipoPastel').value;
      const sabor = document.getElementById('saborPastel').value;
      const porciones = document.getElementById('porcionesPastel').value;
      const tamano = document.getElementById('tamanoPastel').value;
      const fecha = document.getElementById('fechaEvento').value;
      const diseno = document.getElementById('disenoPastel').value.trim();

      // Validación simple de campos obligatorios
      let hasError = false;
      const requiredInputs = [
        document.getElementById('nombreCliente'),
        document.getElementById('whatsappCliente'),
        document.getElementById('tipoPastel'),
        document.getElementById('saborPastel'),
        document.getElementById('porcionesPastel'),
        document.getElementById('tamanoPastel'),
        document.getElementById('fechaEvento')
      ];

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#C86D51';
          input.style.backgroundColor = '#FFF6F4';
          hasError = true;
        } else {
          input.style.borderColor = '';
          input.style.backgroundColor = '';
        }
      });

      if (hasError) {
        alert('Por favor, completa los campos requeridos marcados con (*) para elaborar tu cotización.');
        return;
      }

      // Estructurar datos del pedido
      const orderData = {
        nombre,
        whatsapp,
        tipoPastel,
        sabor,
        porciones,
        tamano,
        fecha,
        diseno: diseno || "Sin detalles específicos (a convenir)"
      };

      // Formatear la fecha para visualización en español (DD/MM/AAAA)
      let fechaFormateada = fecha;
      if (fecha) {
        const partes = fecha.split('-');
        if (partes.length === 3) {
          fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
      }

      // Rellenar resumen en el modal de confirmación
      if (summaryNombre) summaryNombre.textContent = nombre;
      if (summaryWhatsApp) summaryWhatsApp.textContent = whatsapp;
      if (summaryTipo) summaryTipo.textContent = tipoPastel;
      if (summarySabor) summarySabor.textContent = sabor;
      if (summaryPorciones) summaryPorciones.textContent = porciones;
      if (summaryTamano) summaryTamano.textContent = tamano;
      if (summaryFecha) summaryFecha.textContent = fechaFormateada;
      if (summaryDiseno) summaryDiseno.textContent = orderData.diseno;

      // Configurar enlace directo de WhatsApp si existe número configurado
      if (btnOpenWhatsAppOrder) {
        if (CONFIG_WHATSAPP_NUMBER && CONFIG_WHATSAPP_NUMBER.trim() !== "") {
          const mensajeWa = generarTextoWhatsApp(orderData);
          btnOpenWhatsAppOrder.href = `https://wa.me/${CONFIG_WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWa)}`;
          btnOpenWhatsAppOrder.style.display = "inline-flex";
        } else {
          btnOpenWhatsAppOrder.style.display = "none";
        }
      }

      // Mostrar modal de éxito
      openModal(successModal);

      // Reiniciar formulario
      orderForm.reset();
    });

    // Limpiar estilos de error al escribir/cambiar valor
    orderForm.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.style.borderColor = '';
        el.style.backgroundColor = '';
      });
    });
  }

  // Cerrar modal de éxito
  if (successModalClose) {
    successModalClose.addEventListener('click', () => closeModal(successModal));
  }
  if (btnSuccessOk) {
    btnSuccessOk.addEventListener('click', () => closeModal(successModal));
  }

  /**
   * Genera el texto estructurado para WhatsApp cuando se configure el número real
   */
  function generarTextoWhatsApp(data) {
    return `¡Hola Bianca Lizhet! 🎂 Me gustaría cotizar un pastel en *Lizhet Cakes*:\n\n` +
           `👤 *Nombre:* ${data.nombre}\n` +
           `📱 *WhatsApp:* ${data.whatsapp}\n` +
           `🍰 *Pastel:* ${data.tipoPastel}\n` +
           `🍓 *Sabor:* ${data.sabor}\n` +
           `👥 *Porciones aprox:* ${data.porciones}\n` +
           `📏 *Tamaño:* ${data.tamano}\n` +
           `📅 *Fecha del evento:* ${data.fecha}\n` +
           `✨ *Idea o diseño:* ${data.diseno}\n\n` +
           `¡Quedo a la espera de tu respuesta y cotización! Muchas gracias.`;
  }

  /* --------------------------------------------------------------------------
     6. BOTONES DE CONTACTO SOCIAL (WHATSAPP & FACEBOOK)
     -------------------------------------------------------------------------- */
  const btnWhatsappList = document.querySelectorAll('.btn-whatsapp');
  const btnFacebookList = document.querySelectorAll('.btn-facebook');

  btnWhatsappList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!CONFIG_WHATSAPP_NUMBER || CONFIG_WHATSAPP_NUMBER.trim() === "") {
        e.preventDefault();
        alert('ℹ️ Espacio preparado para WhatsApp:\n\nEste botón está listo para enlazarse con el número de WhatsApp oficial de Bianca Lizhet (Lizhet Cakes) en la configuración de JavaScript.');
      }
    });
  });

  btnFacebookList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || href === '#' || href === '') {
        e.preventDefault();
        alert('ℹ️ Espacio preparado para Facebook:\n\nEste botón está listo para enlazarse con la página oficial de Facebook de Lizhet Cakes.');
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. CONTROL GENÉRICO DE MODALES Y ACCESIBILIDAD
     -------------------------------------------------------------------------- */
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Cerrar modales con clic en el fondo translúcido
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Cerrar modales con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  /* --------------------------------------------------------------------------
     8. BOTÓN PARA VOLVER ARRIBA (BACK TO TOP)
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
