document.addEventListener('DOMContentLoaded', function() {
    function updateLanguages() {
        // Load language preferences from localStorage
        let languageStates = JSON.parse(localStorage.getItem('languagePreferences')) || {
            english: false,
            portuguese: false
        };

        // Update toggle buttons
        if (languageStates.english) {
            englishToggle.classList.add('active');
            document.querySelectorAll('.eng-text').forEach(span => {
                span.style.display = 'inline';
            });
        } else {
            englishToggle.classList.remove('active');
            document.querySelectorAll('.eng-text').forEach(span => {
                span.style.display = 'none';
            });
        }

        if (languageStates.portuguese) {
            portugueseToggle.classList.add('active');
            document.querySelectorAll('.por-text').forEach(span => {
                span.style.display = 'inline';
            });
        } else {
            portugueseToggle.classList.remove('active');
            document.querySelectorAll('.por-text').forEach(span => {
                span.style.display = 'none';
            });
        }

        // Save the updated states
        localStorage.setItem('languagePreferences', JSON.stringify(languageStates));
    }
    
    // Set initial states of toggle buttons
    const englishToggle = document.getElementById('english-toggle');
    const portugueseToggle = document.getElementById('portuguese-toggle');
    
    // Add event listeners for language toggles
    englishToggle.addEventListener('click', () => updateLanguages());
    portugueseToggle.addEventListener('click', () => updateLanguages());
    
    // Container for book buttons
    const container = document.createElement('div');
    container.className = 'book-container';

    let isEnglishActive = document.getElementById('english-toggle').classList.contains('active');
    let isPortugueseActive = document.getElementById('portuguese-toggle').classList.contains('active');

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
        
        const jpnSpan = document.createElement('span');
        jpnSpan.classList.add('jpn-text');
        jpnSpan.textContent = jpn_titles[book.name];

        const engSpan = document.createElement('span');
        engSpan.classList.add('eng-text');
        engSpan.textContent = eng_titles[book.name];

        button.addEventListener('click', () => {
            window.location.href = book.path;
        });

        container.appendChild(button);
        button.appendChild(jpnSpan);
        button.appendChild(engSpan);
    });

    document.body.appendChild(container);
});

