document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const generateBtn = document.getElementById('generate-btn');
    const resultsContainer = document.getElementById('results-container');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const body = document.body;
    const hopefulQuotes = [
        { text: '행운은 준비된 마음이 기회를 만났을 때 찾아옵니다.', author: '세네카' },
        { text: '오늘의 작은 용기가 내일의 큰 변화를 만듭니다.', author: '메리 앤 라드마커' },
        { text: '성공의 비밀은 시작하는 데 있습니다.', author: '마크 트웨인' },
        { text: '가장 어두운 밤도 끝나고 해는 떠오른다.', author: '빅토르 위고' },
        { text: '할 수 있다고 믿으면 이미 절반은 이룬 것이다.', author: '시어도어 루스벨트' },
        { text: '포기하지 않는 한, 실패는 끝이 아니다.', author: '알버트 허버드' },
        { text: '기회는 스스로 만드는 사람에게 먼저 찾아온다.', author: '크리스 그로서' },
        { text: '희망은 깨어 있는 사람의 꿈이다.', author: '아리스토텔레스' }
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
