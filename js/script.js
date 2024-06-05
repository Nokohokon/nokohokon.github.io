document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const reviewForm = document.getElementById('reviewForm');
    const reviewContainer = document.querySelector('.review-container');
    const satisfactionElement = document.getElementById('satisfaction');
    const satisfactionProgress = document.getElementById('satisfactionProgress');
    const ratingSlider = document.getElementById('rating');
    const ratingValue = document.getElementById('ratingValue');

    let reviews = [];
    let totalRatings = 0;
    let numberOfRatings = 0;

    // Funktion zum Laden der Bewertungen aus der JSON-Datei
    function loadReviews() {
        fetch('reviews.json')
            .then(response => response.json())
            .then(data => {
                reviews = data;
                displayReviews();
                updateSatisfaction();
            })
            .catch(error => console.error('Error loading reviews:', error));
    }

    // Funktion zum Anzeigen der Bewertungen
    function displayReviews() {
        reviewContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <p class="rating">${review.rating}/10</p>
                <p>${review.feedback}</p>
            `;
            reviewContainer.appendChild(reviewElement);
        });
    }

    // Funktion zum Speichern der Bewertungen in der JSON-Datei
    function saveReviews() {
        fetch('reviews.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
        .then(response => {
            if (response.ok) {
                console.log('Reviews saved successfully');
            } else {
                console.error('Error saving reviews');
            }
        })
        .catch(error => console.error('Error saving reviews:', error));
    }

    function saveReview(name, rating, feedback) {
        const review = { name, rating, feedback };
        reviews.push(review);
        saveReviews();
        loadReviews(); // Laden der Bewertungen nach dem Speichern
        displayReviews();
        updateSatisfaction();
    }

    function updateSatisfaction() {
        let totalRatings = 0;
        let numberOfRatings = 0;
        reviews.forEach(review => {
            totalRatings += review.rating;
            numberOfRatings++;
        });

        const averageRating = numberOfRatings > 0 ? (totalRatings / numberOfRatings).toFixed(1) : 0;
        const satisfactionPercentage = (averageRating / 10) * 100;
        satisfactionElement.textContent = `${satisfactionPercentage}%`;
        satisfactionProgress.style.width = `${satisfactionPercentage}%`;
    }

    // Eventlistener für das Bewertungsformular
    reviewForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const feedback = document.getElementById('feedback').value;
        saveReview(name, rating, feedback);
        reviewForm.reset();
    });

    // Eventlistener für das Hamburger-Menü
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        openMenu.classList.toggle('hide');
        closeMenu.classList.toggle('hide');
    });

    // Eventlistener für die Skala
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
    });

    // Initialisierung der Skala
    ratingSlider.min = 0;
    ratingSlider.max = 10;
    ratingSlider.value = 5;
    ratingValue.textContent = ratingSlider.value;

    // Laden der Bewertungen beim Seitenaufruf
    loadReviews();
});
