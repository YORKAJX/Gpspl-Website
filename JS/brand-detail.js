(function () {
    const params = new URLSearchParams(window.location.search);
    const requestedSlug = params.get('brand') || 'harman-professional';

    const slugify = (value) => value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    const setBrand = (brand) => {
        const name = brand.name || 'GPSPL Technology Partner';
        document.title = brand.seo?.title || `${name} Products, Integration & Support | GPSPL`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && brand.seo?.description) metaDescription.setAttribute('content', brand.seo.description);

        setText('brandBreadcrumb', name);
        setText('brandTitle', `${name} Products, Integration & Support`);
        setText('brandSummary', brand.summary || 'Enterprise technology products supplied, integrated and supported by GPSPL.');
        setText('brandStatus', brand.authorizedStatus || 'Technology portfolio');
        setText('brandTrustNote', trustNote(brand));
        setText('brandCategoryCopy', categoryCopy(brand));
        setText('brandRfqTitle', `Request ${name} product guidance and pricing`);
        setText('brandRfqCopy', `Share your ${name} requirement, site location, quantity and deployment scope. GPSPL can help with product selection, supply, installation, commissioning and after-sales support.`);

        const logo = document.getElementById('brandLogo');
        if (logo) {
            logo.src = brand.logo || '/assests/images/gpspl.png';
            logo.alt = `${name} logo`;
        }

        const categories = document.getElementById('brandCategories');
        if (categories) {
            categories.innerHTML = '';
            (brand.categories || []).forEach((category) => {
                const chip = document.createElement('span');
                chip.textContent = category;
                categories.appendChild(chip);
            });
        }

        window.dispatchEvent(new CustomEvent('gpspl:brand-ready', { detail: { brand } }));
    };

    const trustNote = (brand) => {
        const status = brand.authorizedStatus || 'Technology portfolio';
        const categories = (brand.categories || []).slice(0, 4).join(', ');
        return `${status} for ${categories || 'enterprise AV and IT products'} with GPSPL supply, integration and support.`;
    };

    const categoryCopy = (brand) => {
        const name = brand.name || 'this brand';
        const categories = (brand.categories || []).join(', ');
        if (brand.slug === 'lg-business-solutions') {
            return 'GPSPL supports LG screen displays, commercial displays, digital signage, video wall and active LED requirements with product selection, regional authorized distribution support, installation planning, warranty coordination and AMC support.';
        }
        if ((brand.authorizedStatus || '').toLowerCase().includes('authorized')) {
            return `GPSPL provides regional authorized distributor support for ${name}, covering ${categories || 'product supply'}, project-fit selection, procurement, installation coordination, warranty guidance and long-term support.`;
        }
        return `GPSPL helps enterprise buyers, consultants, dealers and IT/AV teams evaluate ${name} products across ${categories || 'relevant product categories'}, shortlist compatible options, coordinate procurement, and connect the product requirement with installation, commissioning, training, warranty extension and AMC support.`;
    };

    fetch('/data/cms/brands.json', { cache: 'no-store' })
        .then((response) => response.json())
        .then((data) => {
            const brands = data.items || [];
            const brand = brands.find((item) => item.slug === requestedSlug || slugify(item.name) === requestedSlug) || brands[0];
            if (brand) setBrand(brand);
        })
        .catch(() => {
            setText('brandSummary', 'Brand information could not be loaded. Please contact GPSPL for product guidance and pricing.');
        });
}());
