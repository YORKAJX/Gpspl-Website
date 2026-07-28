const DEFAULT_REVIEW_URL = 'https://www.google.com/search?q=Global+Peripheral+Solution+Pvt.+Ltd.+reviews';
const ALLOWED_ORIGINS = new Set([
    'https://gpspl.co.in',
    'https://www.gpspl.co.in'
]);

const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
};

const corsHeaders = (event) => {
    const origin = event.headers.origin || event.headers.Origin || '';
    if (ALLOWED_ORIGINS.has(origin)) {
        return {
            'Access-Control-Allow-Origin': origin,
            'Vary': 'Origin'
        };
    }
    return {};
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

const authorName = (review) => {
    const author = review.authorAttribution || review.author_name || {};
    return author.displayName || author.name || review.author_name || 'Google Reviewer';
};

const authorPhoto = (review) => {
    const author = review.authorAttribution || {};
    return author.photoUri || author.photoUrl || '';
};

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
    return 'Google review';
};

const safeText = (value, max = 900) => plainText(value).replace(/[<>]/g, '').slice(0, max);

const normalizeReview = (review) => ({
    author: safeText(authorName(review), 120) || 'Google Reviewer',
    photo: authorPhoto(review),
    rating: Number(review.rating || 0),
    text: safeText(review.text || review.originalText, 900),
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
            rating: null,
            totalReviews: null,
            googleMapsUrl,
            reviews: []
        }, baseHeaders);
    }

    try {
        const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
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

        if (!response.ok) {
            return json(response.status, {
                configured: true,
                error: 'Google Places request failed',
                reviews: []
            }, {
                ...baseHeaders,
                'Cache-Control': 'no-store'
            });
        }

        const place = await response.json();
        const reviews = Array.isArray(place.reviews) ? place.reviews.map(normalizeReview).filter((review) => review.text) : [];

        return json(200, {
            configured: true,
            name: place.displayName && place.displayName.text ? place.displayName.text : 'GPSPL',
            rating: place.rating || null,
            totalReviews: place.userRatingCount || null,
            googleMapsUrl: place.googleMapsUri || googleMapsUrl,
            reviews
        }, baseHeaders);
    } catch (error) {
        return json(200, {
            configured: true,
            error: 'Google reviews temporarily unavailable',
            googleMapsUrl,
            reviews: []
        }, {
            ...baseHeaders,
            'Cache-Control': 'no-store'
        });
    }
};
