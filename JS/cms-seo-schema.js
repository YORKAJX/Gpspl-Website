(function () {
    const insertSchema = () => {
        if (document.querySelector('script[data-cms-schema="webpage"]')) return;

    const main = document.querySelector('main[data-cms-page]');
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.content || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
    const pageSlug = main?.dataset.cmsPage || document.body.dataset.cmsPage || '';
    const collection = main?.dataset.cmsCollection || '';

    const graph = [
        {
            '@type': 'Organization',
            '@id': 'https://gpspl.co.in/#organization',
            name: 'Global Peripheral Solution Pvt. Ltd.',
            alternateName: 'GPSPL',
            url: 'https://gpspl.co.in/',
            email: 'global@gpspl.co.in',
            telephone: '+91 89208 30377',
            foundingDate: '1997',
            description: "India's Technology Distribution & Enterprise Integration Partner"
        },
        {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            isPartOf: { '@id': 'https://gpspl.co.in/#website' },
            about: { '@id': 'https://gpspl.co.in/#organization' },
            additionalProperty: [
                { '@type': 'PropertyValue', name: 'CMS Page Slug', value: pageSlug },
                { '@type': 'PropertyValue', name: 'CMS Collection', value: collection }
            ].filter((item) => item.value)
        }
    ];

    const breadcrumbNodes = Array.from(document.querySelectorAll('.breadcrumbs a, .breadcrumbs span'))
        .filter((node) => node.textContent.trim() && node.textContent.trim() !== '/');
    const breadcrumbItems = breadcrumbNodes.map((node, index) => {
        const href = node.getAttribute('href');
        // Intermediate crumbs must identify a linked page. The final label is this page.
        if (!href && index !== breadcrumbNodes.length - 1) return null;
        return {
            '@type': 'ListItem',
            name: node.textContent.trim(),
            item: href ? new URL(href, canonical).href : canonical
        };
    }).filter(Boolean).map((item, index) => ({ ...item, position: index + 1 }));

    if (breadcrumbItems.length > 1) {
        graph.push({
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems
        });
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.cmsSchema = 'webpage';
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
    };

    const pageSlug = document.querySelector('main[data-cms-page]')?.dataset.cmsPage || '';
    if (pageSlug === 'brand-detail') {
        window.addEventListener('gpspl:brand-ready', insertSchema, { once: true });
        window.setTimeout(insertSchema, 1200);
    } else {
        insertSchema();
    }
}());

