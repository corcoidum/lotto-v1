document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const body = document.body;
    const hopefulQuotes = [
        { text: 'Luck is what happens when preparation meets opportunity.', author: 'Seneca' },
        { text: "Today's small courage builds tomorrow's big change.", author: 'Mary Anne Radmacher' },
        { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
        { text: 'Even the darkest night will end and the sun will rise.', author: 'Victor Hugo' },
        { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
        { text: 'Failure is not the end unless you give up.', author: 'Albert Hubbard' },
        { text: 'Opportunities don\'t happen, you create them.', author: 'Chris Grosser' },
        { text: 'Hope is a waking dream.', author: 'Aristotle' }
    ];

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    });

    generateBtn.addEventListener('click', () => {
        const allSets = generateAllLottoSets();
        displayLottoSets(allSets);
        updateHopefulQuote();
    });

    function generateSingleSet() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function generateAllLottoSets() {
        const sets = [];
        for (let i = 0; i < 5; i++) {
            sets.push(generateSingleSet());
        }
        return sets;
    }

    /**
     * Returns a CSS class name based on the number's value.
     * @param {number} num - The lottery number.
     * @returns {string} - The corresponding CSS class for color-coding.
     */
    function getColorClassForNumber(num) {
        if (num <= 10) return 'color-yellow';
        if (num <= 20) return 'color-blue';
        if (num <= 30) return 'color-red';
        if (num <= 40) return 'color-gray';
        return 'color-green'; // 41-45
    }

    function displayLottoSets(sets) {
        resultsContainer.innerHTML = ''; // Clear previous results

        sets.forEach((set, index) => {
            const setElement = document.createElement('div');
            setElement.className = 'lotto-set';
            setElement.style.animationDelay = `${index * 100}ms`;

            const label = document.createElement('span');
            label.className = 'set-label';
            label.textContent = `Set ${index + 1}`;

            const numberBallsContainer = document.createElement('div');
            numberBallsContainer.className = 'number-balls';

            set.forEach(num => {
                const ball = document.createElement('div');
                ball.className = 'number-ball';
                ball.textContent = num;
                
                // Add the color class
                ball.classList.add(getColorClassForNumber(num));

                numberBallsContainer.appendChild(ball);
            });

            setElement.appendChild(label);
            setElement.appendChild(numberBallsContainer);
            resultsContainer.appendChild(setElement);
        });
    }

    function updateHopefulQuote() {
        const randomQuote = hopefulQuotes[Math.floor(Math.random() * hopefulQuotes.length)];
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteAuthor.textContent = `- ${randomQuote.author}`;
    }

    // Initial generation on page load
    generateBtn.click();
});
