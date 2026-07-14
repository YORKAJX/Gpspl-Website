(function () {
    const slugify = (value) => value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    document.querySelectorAll('.partner-portfolio-card').forEach((card) => {
        const title = card.querySelector('h3');
        if (!title) return;

        const link = document.createElement('a');
        link.className = 'partner-card-detail-link';
        link.href = `/brand-detail.html?brand=${slugify(title.textContent)}`;
        link.textContent = 'View brand detail';
        card.appendChild(link);
    });
}());
