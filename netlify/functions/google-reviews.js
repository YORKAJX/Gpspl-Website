const DEFAULT_REVIEW_URL = 'https://www.google.com/search?q=Global+Peripheral+Solution+Pvt.+Ltd.+reviews';

const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
};

const corsHeaders = (event) => {
    const origin = event.headers.origin || event.headers.Origin || '';
    if (origin.includes('gpspl.co.in') || origin.includes('netlify.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return {
            'Access-Control-Allow-Origin': origin,
            'Vary': 'Origin'
        };
    }
    return {
        'Access-Control-Allow-Origin': '*'
    };
};

const json = (statusCode, body, extraHeaders = {}) => ({
    statusCode,
    headers: {
        ...securityHeaders,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=43200, stale-while-revalidate=86400',
        ...extraHeaders
    },
    body: JSON.stringify(body)
});

const plainText = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value.text === 'string') return value.text;
    return '';
};

const safeText = (value, max = 900) => plainText(value).replace(/[<>]/g, '').slice(0, max);

const reviewDate = (review) => {
    if (review.relativePublishTimeDescription) return review.relativePublishTimeDescription;
    if (review.relative_time_description) return review.relative_time_description;
    if (review.publishTime) {
        return new Intl.DateTimeFormat('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(review.publishTime));
    }
    if (review.time) {
        return new Intl.DateTimeFormat('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(review.time * 1000));
    }
    return 'Verified Google review';
};

const normalizeNewReview = (review) => {
    const author = review.authorAttribution || {};
    return {
        author: safeText(author.displayName || 'Google Reviewer', 120),
        photo: author.photoUri || '',
        rating: Number(review.rating || 5),
        text: safeText(review.text || review.originalText, 900),
        date: reviewDate(review)
    };
};

const normalizeLegacyReview = (review) => ({
    author: safeText(review.author_name || 'Google Reviewer', 120),
    photo: review.profile_photo_url || '',
    rating: Number(review.rating || 5),
    text: safeText(review.text, 900),
    date: reviewDate(review)
});

exports.handler = async (event) => {
    const baseHeaders = corsHeaders(event);

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                ...securityHeaders,
                ...baseHeaders,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-store'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'GET') {
        return json(405, { error: 'Method not allowed' }, {
            ...baseHeaders,
            'Allow': 'GET, OPTIONS',
            'Cache-Control': 'no-store'
        });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    const googleMapsUrl = process.env.GOOGLE_REVIEWS_URL || DEFAULT_REVIEW_URL;

    if (!apiKey || !placeId) {
        return json(200, {
            configured: false,
            rating: 4.9,
            totalReviews: 68,
            googleMapsUrl,
            reviews: []
        }, baseHeaders);
    }

    // 1. Try Google Places API (New v1)
    try {
        const v1Url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
        const v1Response = await fetch(v1Url, {
            headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': [
                    'displayName',
                    'rating',
                    'userRatingCount',
                    'googleMapsUri',
                    'reviews.rating',
                    'reviews.text',
                    'reviews.originalText',
                    'reviews.publishTime',
                    'reviews.relativePublishTimeDescription',
                    'reviews.authorAttribution.displayName',
                    'reviews.authorAttribution.photoUri'
                ].join(',')
            }
        });

        if (v1Response.ok) {
            const place = await v1Response.json();
            let reviews = Array.isArray(place.reviews) ? place.reviews.map(normalizeNewReview) : [];

            reviews = reviews
                .filter(r => r.text && r.text.length > 10)
                .sort((a, b) => (b.rating - a.rating) || (b.text.length - a.text.length));

            return json(200, {
                configured: true,
                name: place.displayName && place.displayName.text ? place.displayName.text : 'Global Peripheral Solution Pvt. Ltd.',
                rating: place.rating || 4.9,
                totalReviews: place.userRatingCount || 68,
                googleMapsUrl: place.googleMapsUri || googleMapsUrl,
                reviews: reviews.slice(0, 6)
            }, baseHeaders);
        }
    } catch (err) {
        console.warn('Google Places v1 fetch error, trying legacy endpoint:', err.message);
    }

    // 2. Fallback to Google Places API (Legacy details endpoint)
    try {
        const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,user_ratings_total,reviews,url&key=${encodeURIComponent(apiKey)}`;
        const legacyRes = await fetch(legacyUrl);

        if (legacyRes.ok) {
            const data = await legacyRes.json();
            if (data.status === 'OK' && data.result) {
                const res = data.result;
                let reviews = Array.isArray(res.reviews) ? res.reviews.map(normalizeLegacyReview) : [];

                reviews = reviews
                    .filter(r => r.text && r.text.length > 10)
                    .sort((a, b) => (b.rating - a.rating) || (b.text.length - a.text.length));

                return json(200, {
                    configured: true,
                    name: res.name || 'Global Peripheral Solution Pvt. Ltd.',
                    rating: res.rating || 4.9,
                    totalReviews: res.user_ratings_total || 68,
                    googleMapsUrl: res.url || googleMapsUrl,
                    reviews: reviews.slice(0, 6)
                }, baseHeaders);
            }
        }
    } catch (err) {
        console.error('Google Places legacy fetch error:', err.message);
    }

    return json(200, {
        configured: true,
        rating: 4.9,
        totalReviews: 68,
        googleMapsUrl,
        reviews: []
    }, baseHeaders);
};
