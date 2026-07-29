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
        return '\u2605'.repeat(rounded) + '\u2606'.repeat(5 - rounded);
    };

    const reviewerAvatar = (review) => {
        const author = escapeHtml(review.author || 'Google Reviewer');
        if (review.photo) {
            return `<span class="testimonial-avatar testimonial-avatar-photo"><img src="${escapeHtml(review.photo)}" alt="${author} Google review profile photo" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('.testimonial-avatar').textContent='${escapeHtml(initials(review.author))}'"></span>`;
        }

        return `<span class="testimonial-avatar">${escapeHtml(initials(review.author))}</span>`;
    };

    const showFallback = (message) => {
        track.innerHTML = fallbackHtml;
        ratingEl.innerHTML = 'Google <span>Reviews</span>';
        if (countEl) countEl.textContent = '';
        starsEl.textContent = '\u2605\u2605\u2605\u2605\u2605';
        starsEl.setAttribute('aria-label', 'Google reviews link');
        statusEl.textContent = message || 'Open Google to view customer feedback';
        document.dispatchEvent(new CustomEvent('gpspl:reviews-loaded'));
    };

    const renderReviews = (payload) => {
        const reviews = Array.isArray(payload.reviews) ? payload.reviews.slice(0, 6) : [];
        if (!reviews.length) return false;

        const rating = Number(payload.rating || 0);
        const total = Number(payload.totalReviews || 0);

        ratingEl.innerHTML = `${rating ? rating.toFixed(1) : 'Google'} <span>/ 5</span>`;
        if (countEl) countEl.textContent = total ? `${total}+ reviews` : 'Google reviews';
        starsEl.textContent = rating ? starText(rating) : '\u2605\u2605\u2605\u2605\u2605';
        starsEl.setAttribute('aria-label', rating ? `${rating.toFixed(1)} out of 5 Google rating` : 'Google rating');
        statusEl.textContent = 'Verified customer feedback from Google';
        if (payload.googleMapsUrl && linkEl) linkEl.href = payload.googleMapsUrl;

        const liveReviewCards = reviews.map((review, index) => `
            <article class="testimonial-card google-live-review">
                <div class="testimonial-card-top">
                    ${reviewerAvatar(review)}
                    <div>
                        <h3>${escapeHtml(review.author || 'Google Reviewer')}</h3>
                        <p>${escapeHtml(review.date || 'Recent review')}</p>
                    </div>
                    <span class="google-live-mark" aria-label="Google review">G</span>
                </div>
                <div class="testimonial-stars" aria-label="${escapeHtml(review.rating)} star Google review">${escapeHtml(starText(review.rating))}</div>
                <p class="testimonial-text">${escapeHtml(review.text || 'Reviewed GPSPL on Google.')}</p>
                <footer><span>Verified Google feedback</span><span class="google-review-badge"><b>${index + 1}</b> Review</span></footer>
            </article>
        `);

        if (reviews.length < 6 && payload.googleMapsUrl) {
            liveReviewCards.push(`
                <article class="testimonial-card google-live-review google-review-cta-card">
                    <div class="testimonial-card-top">
                        <span class="testimonial-avatar">G</span>
                        <div>
                            <h3>More Google Reviews</h3>
                            <p>Verified customer feedback</p>
                        </div>
                        <span class="google-live-mark" aria-label="Google reviews">G</span>
                    </div>
                    <div class="testimonial-stars" aria-label="Google reviews">${escapeHtml(starText(rating || 5))}</div>
                    <p class="testimonial-text">See the complete review profile, latest customer feedback and business listing details directly on Google.</p>
                    <footer><span>Open Google listing</span><a class="google-review-badge" href="${escapeHtml(payload.googleMapsUrl)}" target="_blank" rel="noopener"><b>View</b> Reviews</a></footer>
                </article>
            `);
        }

        track.innerHTML = liveReviewCards.join('');

        document.dispatchEvent(new CustomEvent('gpspl:reviews-loaded'));
        return true;
    };

    const reviewsEndpoint = window.GPSPL_CONFIG?.googleReviewsEndpoint || '';

    if (!reviewsEndpoint) {
        showFallback('Open Google to view customer feedback');
        return;
    }

    fetch(reviewsEndpoint, { headers: { Accept: 'application/json' } })
        .then((response) => {
            if (!response.ok) throw new Error(`Google reviews unavailable: ${response.status}`);
            return response.json();
        })
        .then((payload) => {
            if (payload.googleMapsUrl && linkEl) linkEl.href = payload.googleMapsUrl;
            if (payload.configured === false) {
                showFallback('Add Google Places API key and Place ID to show live reviews');
                return;
            }
            if (!renderReviews(payload)) showFallback('Open Google to view customer feedback');
        })
        .catch(() => {
            showFallback('Google reviews are temporarily unavailable');
        });
}());
