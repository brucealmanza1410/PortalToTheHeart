// Archivo: script.js

// Obtenemos el contenedor del nav
const navContainer = document.getElementById('nav-container');
const footerContainer = document.getElementById('footer_container');

// Cargamos las traducciones
let translations = {};

// Función para cargar el nav dinámicamente
function loadNav() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            navContainer.innerHTML = data; // Inserta el nav en el contenedor
            initializeNavFunctions(); // Inicializa las funciones del nav
            initializeLanguageButtons(); // Inicializa los botones de idioma
        })
        .catch(error => console.error('Error loading nav:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

// Función para inicializar las funciones del nav
function initializeNavFunctions() {
    const hamburger = document.querySelector('.hamburger_icon');
    const navLinks = document.querySelector('.nav_links');
    const body = document.body;

    // Evento para el menú hamburguesa
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Bloquea o permite el scroll del body
        body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
    });
}

// Función para inicializar los botones de idioma
function initializeLanguageButtons() {
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');

    btnEs.addEventListener('click', () => changeLanguage('es'));
    btnEn.addEventListener('click', () => changeLanguage('en'));
}

// Función para cambiar el idioma
function changeLanguage(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    document.documentElement.lang = language; // Cambia el atributo lang

    // Traduce cada elemento según el idioma seleccionado
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });

    // Actualiza el estado de los botones
    updateActiveLanguageButton(language);
    
    // Guardar idioma en localStorage
    localStorage.setItem('language', language);
}

// Función para actualizar el estado de los botones de idioma
function updateActiveLanguageButton(language) {
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');

    // Verificamos qué idioma se seleccionó y ajustamos las clases de active
    if (language === 'es') {
        btnEs.classList.add('active');
        btnEn.classList.remove('active');
    } else if (language === 'en') {
        btnEn.classList.add('active');
        btnEs.classList.remove('active');
    }
}

// Por defecto, cargamos el idioma guardado o español
document.addEventListener('DOMContentLoaded', () => {
    loadNav(); // Cargar el nav dinámicamente
    loadFooter();

    // Cargamos las traducciones
    fetch('lang.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            const savedLanguage = localStorage.getItem('language') || 'es';
            changeLanguage(savedLanguage); // Cargar idioma guardado o por defecto
        })
        .catch(error => console.error('Error loading translations:', error));
});
