document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const reviewForm = document.getElementById('reviewForm');
    const reviewContainer = document.querySelector('.review-container');
    const satisfactionElement = document.getElementById('satisfaction');
    const satisfactionProgress = document.getElementById('satisfactionProgress');
    const contactForm1 = document.getElementById('contactForm1');
    const webhookUrl1 = 'https://ptb.discord.com/api/webhooks/1246690474748543007/vMb7ZMWrsb4s7jy4Fl6v0udJZkBZgZWpt4lQwkdJZC2RlH8iXOe4X8vMO5NNwt8llFnO'; 
    const contactForm2 = document.getElementById('contactForm2');
    const webhookUrl2 = 'https://ptb.discord.com/api/webhooks/1247283474424004651/ngdTPlCp0ODY0fjaidYA9wFXqfrvEOFdzejZ-GVrngmtxe_gIxgr-sfNMf3tUkID1U5e';

 

    // Function to update satisfaction score
    function updateSatisfaction() {
        if (numberOfRatings === 0) {
            satisfactionElement.textContent = 'Keine Angabe';
            satisfactionProgress.style.width = '0%';
        } else {
            const averageRating = (totalRatings / numberOfRatings).toFixed(1);
            const satisfactionPercentage = averageRating * 10;
            satisfactionElement.textContent = `${satisfactionPercentage}%`;
            satisfactionProgress.style.width = `${satisfactionPercentage}%`;
        }
    }

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        openMenu.classList.toggle('hide');
        closeMenu.classList.toggle('hide');
    });

    contactForm1.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name1').value;
        const email = document.getElementById('email1').value;
        const message = document.getElementById('message1').value;

        const payload = {
            content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        fetch(webhookUrl1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert('Your message has been sent successfully!');
                contactForm1.reset();
            } else {
                alert('Error sending your message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending your message.');
        });
    });

    contactForm2.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name2').value;
        const email = document.getElementById('email2').value;
        const message = document.getElementById('message2').value;

        const payload = {
            content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        fetch(webhookUrl2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert('Your message has been sent successfully!');
                contactForm2.reset();
            } else {
                alert('Error sending your message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending your message.');
        });
    });
});
