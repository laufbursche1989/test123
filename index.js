/**
 * Responsive navigation
 */

const burgerBtn = document.querySelector('.burger');
const closeBtn = document.querySelector('.close-btn');
burgerBtn.addEventListener('click', () => {
  document.querySelector(".menu").classList.add("open");
  burgerBtn.style.display = 'none';
});
closeBtn.addEventListener('click', () => {
  document.querySelector(".menu").classList.remove("open");
  burgerBtn.style.display = 'block';
});


/**
 * Language toggle
 */

// Load language
async function loadTranslations(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Error fetching translations for ${lang}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Translation loading failed:', error);
    return {};
  }
}

// Change language
async function changeLanguage(lang) {
  const translations = await loadTranslations(lang);
  const elements = document.querySelectorAll('[data-translate]');
  const inputFields = document.querySelectorAll('input, textarea');

  elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      element.textContent = translations[key];
  });

  if(lang === 'de') {
    inputFields.forEach(field => {
      field.setAttribute('placeholder', field.getAttribute('data-placeholder-de'));
    });
  }
  else {
    inputFields.forEach(field => {
      field.setAttribute('placeholder', field.getAttribute('data-placeholder-tur'));
    });
  }

  // Synchronize toggle buttons
  const langButtons = document.querySelectorAll('.lang');
  langButtons.forEach(button => {
    button.classList.toggle('active', button.getAttribute('data-lang') === lang);
  });
}

// Listen for language change click
const langButtons = document.querySelectorAll('.lang');
langButtons.forEach(button => {
  button.addEventListener('click', () => {
      const selectedLang = button.getAttribute('data-lang');
      localStorage.setItem('language', selectedLang);
      changeLanguage(selectedLang);
  });
});

// Initial run
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('language') || 'de';
  changeLanguage(savedLanguage);
})