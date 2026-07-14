(function () {
    const track = document.querySelector('[data-google-reviews-track]');
    const ratingEl = document.getElementById('googleReviewRating');
    const countEl = document.getElementById('googleReviewCount');
    const starsEl = document.getElementById('googleReviewStars');
    const statusEl = document.getElementById('googleReviewStatus');
    const linkEl = document.getElementById('googleReviewLink');

    if (!track || !ratingEl || !starsEl || !statusEl) return;

    const fallbackHtml = track.innerHTML;

    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));

    const initials = (name) => {
        const clean = String(name || 'Google Reviewer').trim();
        return clean.split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('') || 'G';
    };

    const starText = (rating) => {
        const rounded = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
        return '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded);
    };

    const renderReviews = (payload) => {
        const reviews = Array.isArray(payload.reviews) ? payload.reviews.slice(0, 5) : [];
        if (!reviews.length) return false;

        const rating = Number(payload.rating || 0);
        const total = Number(payload.totalReviews || 0);

        ratingEl.innerHTML = `${rating ? rating.toFixed(1) : 'Google'} <span>/ 5</span>`;
        if (countEl) countEl.textContent = total ? `${total}+ reviews` : 'Google reviews';
        starsEl.textContent = rating ? starText(rating) : '★★★★★';
        starsEl.setAttribute('aria-label', rating ? `${rating.toFixed(1)} out of 5 Google rating` : 'Google rating');
        statusEl.textContent = 'Verified customer feedback from Google';
        if (payload.googleMapsUrl && linkEl) linkEl.href = payload.googleMapsUrl;

        track.innerHTML = reviews.map((review, index) => `
            <article class="testimonial-card google-live-review">
                <div class="testimonial-card-top">
                    <span class="testimonial-avatar">${escapeHtml(initials(review.author))}</span>
                    <div>
                        <h3>${escapeHtml(review.author || 'Google Reviewer')}</h3>
                        <p>${escapeHtml(review.date || 'Recent review')}</p>
                    </div>
                    <i class="fab fa-google testimonial-quote" aria-hidden="true"></i>
                </div>
                <div class="testimonial-stars" aria-label="${escapeHtml(review.rating)} star Google review">${escapeHtml(starText(review.rating))}</div>
                <p class="testimonial-text">${escapeHtml(review.text || 'Reviewed GPSPL on Google.')}</p>
                <footer><span>Google review</span><span class="google-review-badge"><b>${index + 1}</b> Live</span></footer>
            </article>
        `).join('');

        document.dispatchEvent(new CustomEvent('gpspl:reviews-loaded'));
        return true;
    };

    fetch('/.netlify/functions/google-reviews', { headers: { Accept: 'application/json' } })
        .then((response) => {
            if (!response.ok) throw new Error(`Google reviews unavailable: ${response.status}`);
            return response.json();
        })
        .then((payload) => {
            if (!renderReviews(payload)) throw new Error('No Google reviews returned');
        })
        .catch(() => {
            track.innerHTML = fallbackHtml;
            ratingEl.innerHTML = '28+ <span>Years of Excellence</span>';
            if (countEl) countEl.textContent = '';
            starsEl.textContent = 'Supply | Deploy | Support';
            starsEl.setAttribute('aria-label', 'GPSPL support focus');
            statusEl.textContent = 'Built for long-term enterprise relationships';
            document.dispatchEvent(new CustomEvent('gpspl:reviews-loaded'));
        });
}());
