document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const itemsPerPage = 6;
    let currentPage = 0;

    // All portfolio images
    const portfolioImages = [
        {
            src: "img_portofolio/brosure sterling-01.webp",
            alt: "Sterling Logo"
        },
        {
            src: "img_portofolio/happiza logo no-04.webp",
            alt: "Happiza Logo"
        },
        {
            src: "img_portofolio/puffybear logo_cathrine tugas-01.webp",
            alt: "Puffybear Logo"
        },
        {
            src: "img_portofolio/cathrine_wangkawa pacaging-03.webp",
            alt: "Wangkawa Packaging"
        },
        {
            src: "img_portofolio/mock up seatlas.webp",
            alt: "Seatlas Mockup"
        },
        {
            src: "img_portofolio/kartu nama mock up.webp",
            alt: "Business Card Mockup"
        },
        {
            src: "img_portofolio/gegares loggo-02-02-02.webp",
            alt: "Gegares Logo"
        },
        {
            src: "img_portofolio/SUMOLL LOGO-01-01.webp",
            alt: "Sumoll Logo"
        },
        {
            src: "img_portofolio/wangkawa kopi-02.webp",
            alt: "Wangkawa Logo"
        },
        {
            src: "img_portofolio/pacaging naffle_Cathrine-01-01.webp",
            alt: "Naffle Packaging"
        },
        {
            src: "img_portofolio/Sterling Mini Banner texture.webp",
            alt: "Sterling Banner"
        },
        {
            src: "img_portofolio/happiza flayer_Flayer.webp",
            alt: "Happiza Flyer"
        }
    ];

    const totalImages = portfolioImages.length;
    const totalPages = Math.ceil(totalImages / itemsPerPage);

    function updatePortfolio() {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentImages = portfolioImages.slice(startIndex, endIndex);

        portfolioItems.forEach((item, index) => {
            if (currentImages[index]) {
                item.innerHTML = `<img src="${currentImages[index].src}" alt="${currentImages[index].alt}">`;
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Update button states
        prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePortfolio();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePortfolio();
        }
    });

    // Initialize the portfolio
    updatePortfolio();
});