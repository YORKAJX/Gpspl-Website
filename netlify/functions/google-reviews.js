const DEFAULT_REVIEW_URL = 'https://www.google.com/search?q=Global+Peripheral+Solution+Pvt.+Ltd.+reviews';

const json = (statusCode, body, extraHeaders = {}) => ({
    statusCode,
    headers: {
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

const normalizeReview = (review) => ({
    author: authorName(review),
    photo: authorPhoto(review),
    rating: Number(review.rating || 0),
    text: plainText(review.text || review.originalText),
    date: reviewDate(review)
});

exports.handler = async () => {
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
        });
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
            const message = await response.text();
            return json(response.status, {
                configured: true,
                error: 'Google Places request failed',
                details: message.slice(0, 300),
                reviews: []
            }, {
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
        });
    } catch (error) {
        return json(200, {
            configured: true,
            error: 'Google reviews temporarily unavailable',
            details: error.message,
            googleMapsUrl,
            reviews: []
        }, {
            'Cache-Control': 'no-store'
        });
    }
};
