document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.className = 'book-container';

    // Load language preferences from localStorage
    let languageStates = JSON.parse(localStorage.getItem('languagePreferences')) || {
        english: false,
        portuguese: false
    };

    // Set initial states of toggle buttons
    const englishToggle = document.getElementById('english-toggle');
    const portugueseToggle = document.getElementById('portuguese-toggle');
    
    if (languageStates.english) {
        englishToggle.classList.add('active');
    }
    if (languageStates.portuguese) {
        portugueseToggle.classList.add('active');
    }

    let isEnglishActive = englishToggle.classList.contains('active');
    let isPortugueseActive = portugueseToggle.classList.contains('active');

    // Add event listeners for language toggles
    englishToggle.addEventListener('click', () => toggleLanguage('english'));
    portugueseToggle.addEventListener('click', () => toggleLanguage('portuguese'));

    // Function to update all button texts
    function updateButtonTexts() {
        const buttons = document.querySelectorAll('.book-button');
        buttons.forEach(button => {
            const bookName = button.dataset.bookName;
            let text = jpn_titles[bookName];
            if (isEnglishActive) {
                text += ` (${eng_titles[bookName]})`;
            } else if (isPortugueseActive) {
                text += ` (${por_titles[bookName]})`;
            }
            button.textContent = text;
        });
    }

    const books = [
        { name: 'ot', path: '../data/ot' },
        { name: 'nt', path: '../data/nt' },
        { name: 'bofm', path: '../data/bofm' },
        { name: 'dc', path: '../data/dc' },
        { name: 'pogp', path: '../data/pogp' }
    ];

    const jpn_titles = {
        'ot': '旧約聖書',
        'nt': '新約聖書',
        'bofm': 'モルモン書',
        'dc': '教義と聖約',
        'pogp': '高価な真珠'
    };

    const eng_titles = {
        'ot': 'Old Testament',
        'nt': 'New Testament',
        'bofm': 'Book of Mormon',
        'dc': 'Doctrine and Covenants',
        'pogp': 'Pearl of Great Price'
    };

    const por_titles = {
        'ot': 'Velho Testamento',
        'nt': 'Novo Testamento',
        'bofm': 'Livro de Mórmon',
        'dc': 'Doutrina e Convênios',
        'pogp': 'Pérola de Grande Valor'
    };

    books.forEach(book => {
        const button = document.createElement('button');
        button.classList.add('book-button');
        button.dataset.bookName = book.name;
        
        let text = jpn_titles[book.name];
        if (isEnglishActive) {
            text += ` (${eng_titles[book.name]})`;
        } else if (isPortugueseActive) {
            text += ` (${por_titles[book.name]})`;
        }
        button.textContent = text;

        button.addEventListener('click', () => {
            window.location.href = book.path;
        });

        container.appendChild(button);
    });

    document.body.appendChild(container);
});

function toggleLanguage(language) {
    const button = document.getElementById(`${language}-toggle`);
    button.classList.toggle('active');

    // Store the state of both languages in localStorage
    const languageStates = {
        english: document.getElementById('english-toggle').classList.contains('active'),
        portuguese: document.getElementById('portuguese-toggle').classList.contains('active')
    };
    localStorage.setItem('languagePreferences', JSON.stringify(languageStates));
    
    // Update the active states
    isEnglishActive = languageStates.english;
    isPortugueseActive = languageStates.portuguese;
    
    // Update the UI
    updateButtonTexts();
    
    console.log('Language states saved:', languageStates);
}