document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Leaflet Map Initialization ---
    // Using placeholder coordinates for Amman, Jordan
    var map = L.map('map').setView([31.9539, 35.9106], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // --- Placeholder Branches ---
    const branches = [
        { name: 'مكتبة الجاحظ - الفرع الرئيسي', lat: 31.9632, lon: 35.9306, popup: 'الفرع الرئيسي في وسط البلد.' },
        { name: 'فرع الجاردنز', lat: 31.9812, lon: 35.8951, popup: 'يقع في شارع الجاردنز الحيوي.' },
        { name: 'فرع الصويفية', lat: 31.9510, lon: 35.8670, popup: 'متخصص في كتب الأطفال والناشئة.' }
    ];

    branches.forEach(branch => {
        L.marker([branch.lat, branch.lon]).addTo(map)
            .bindPopup(`<b>${branch.name}</b><br>${branch.popup}`)
    });
    
    // --- Form Submission Handling ---
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('شكراً لتواصلك معنا! سنقوم بالرد في أقرب وقت.');
        contactForm.reset();
    });

    const orderForm = document.querySelector('#order form');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('تم استلام طلبك. سنتواصل معك قريباً لتأكيد توفر الكتاب.');
        orderForm.reset();
    });

    // --- Scroll-based Animations, Active Nav Link, and Header Hide/Show ---
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const sections = document.querySelectorAll("main section, #hero");
    const navLinks = document.querySelectorAll("nav a");
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('main section').forEach(section => {
        observer.observe(section);
    });

    window.onscroll = function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop) {
            header.style.top = "-150px"; // Adjust if header height changes
        } else {
            header.style.top = "0";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        // Scroll to top button visibility
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }

        // Active nav link highlighting
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // --- Book Modal Logic ---
    const modal = document.getElementById("bookModal");
    const modalTitle = document.getElementById("modalBookTitle");
    const modalImage = document.getElementById("modalBookImage");
    const modalDescription = document.getElementById("modalBookDescription");
    const closeButton = document.querySelector(".close-button");

    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').innerText;
            const imageSrc = this.querySelector('img').src;
            const description = this.dataset.description;

            modalTitle.innerText = title;
            modalImage.src = imageSrc;
            modalDescription.innerText = description;

            modal.style.display = "block";
        });
    });

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});