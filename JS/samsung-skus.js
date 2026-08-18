document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject modern modal CSS
    const style = document.createElement("style");
    style.innerHTML = `
        .sku-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sku-popup-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .sku-popup-card {
            background: #ffffff;
            border-radius: 24px;
            width: 90%;
            max-width: 580px;
            padding: 36px;
            box-shadow: 0 30px 60px rgba(15, 23, 42, 0.3);
            border: 1px solid rgba(226, 232, 240, 0.8);
            transform: scale(0.9) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
        }
        .sku-popup-overlay.active .sku-popup-card {
            transform: scale(1) translateY(0);
        }
        .sku-popup-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #f1f5f9;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #475569;
            transition: all 0.2s ease;
        }
        .sku-popup-close:hover {
            background: #e2e8f0;
            color: #0f172a;
            transform: rotate(90deg);
        }
        .sku-popup-badge {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 4px 12px;
            border-radius: 9999px;
            margin-bottom: 16px;
        }
        .sku-popup-title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            line-height: 1.25;
        }
        .sku-popup-sku {
            font-family: monospace;
            font-size: 14px;
            color: #0284c7;
            font-weight: 700;
            background: #f0f9ff;
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 20px;
        }
        .sku-popup-features {
            list-style: none;
            padding: 0;
            margin: 0 0 28px 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .sku-popup-features li {
            font-size: 13px;
            color: #475569;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .sku-popup-features li i {
            color: #10b981;
        }
        .sku-popup-actions {
            display: flex;
            gap: 14px;
        }
        .sku-popup-btn-primary {
            flex: 1.3;
            background: #034ea2;
            color: #ffffff !important;
            font-weight: 700;
            padding: 14px 20px;
            border-radius: 12px;
            font-size: 14px;
            text-decoration: none;
            text-align: center;
            box-shadow: 0 4px 14px rgba(3, 78, 162, 0.3);
            transition: all 0.25s ease;
        }
        .sku-popup-btn-primary:hover {
            background: #023c7d;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(3, 78, 162, 0.4);
        }
        .sku-popup-btn-secondary {
            flex: 1;
            background: #ffffff;
            color: #0f172a !important;
            font-weight: 700;
            padding: 14px 20px;
            border-radius: 12px;
            font-size: 14px;
            text-decoration: none;
            text-align: center;
            border: 1.5px solid #cbd5e1;
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .sku-popup-btn-secondary:hover {
            background: #f8fafc;
            border-color: #94a3b8;
            transform: translateY(-2px);
        }
        .sku-highlight-row {
            animation: sku-pulse 1.5s infinite alternate;
        }
        @keyframes sku-pulse {
            0% { background-color: transparent; outline: 2px solid transparent; }
            100% { background-color: rgba(224, 242, 254, 0.8); outline: 2px solid #0284c7; }
        }
        
        /* Modern SKU Search Panel */
        .sku-search-wrapper {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            margin: 30px 0 20px 0;
            box-shadow: 0 10px 25px rgba(15,23,42,0.03);
            display: flex;
            gap: 16px;
            align-items: center;
            flex-wrap: wrap;
        }
        .sku-search-title {
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin: 0;
            min-width: 180px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .sku-search-input-group {
            flex: 1;
            position: relative;
            min-width: 260px;
        }
        .sku-search-input {
            width: 100%;
            padding: 12px 16px 12px 42px;
            border: 1.5px solid #cbd5e1;
            border-radius: 10px;
            font-size: 14px;
            font-family: inherit;
            color: #0f172a;
            transition: all 0.2s ease;
        }
        .sku-search-input:focus {
            outline: none;
            border-color: #034ea2;
            box-shadow: 0 0 0 3px rgba(3, 78, 162, 0.15);
        }
        .sku-search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);

    // 2. Setup lookup database mapping based on page URL
    const pageId = window.location.pathname.split("/").pop().replace(".html", "").replace("blog/", "");
    
    let db = {};
    let pdfUrl = "";
    let categoryName = "";
    
    if (pageId === "samsung-business-tv-befx-h2") {
        categoryName = "Samsung BEFX-H2 Business TV";
        pdfUrl = "/samsung-business-tv-befx-h2-datasheet.pdf";
        db = {
            "LH43BEFH8GULXL": { size: "43 Inch", code: "BE43FH" },
            "LH50BEFH8GULXL": { size: "50 Inch", code: "BE50FH" },
            "LH55BEFH8GULXL": { size: "55 Inch", code: "BE55FH" },
            "LH65BEFH8GULXL": { size: "65 Inch", code: "BE65FH" },
            "LH75BEFH8GULXL": { size: "75 Inch", code: "BE75FH" },
            "LH85BEFH8GULXL": { size: "85 Inch", code: "BE85FH" },
            "BE43FH": { size: "43 Inch", code: "LH43BEFH8GULXL" },
            "BE50FH": { size: "50 Inch", code: "LH50BEFH8GULXL" },
            "BE55FH": { size: "55 Inch", code: "LH55BEFH8GULXL" },
            "BE65FH": { size: "65 Inch", code: "LH65BEFH8GULXL" },
            "BE75FH": { size: "75 Inch", code: "LH75BEFH8GULXL" },
            "BE85FH": { size: "85 Inch", code: "LH85BEFH8GULXL" }
        };
    } else if (pageId === "samsung-commercial-display-qbc") {
        categoryName = "Samsung QBC Crystal Signage";
        pdfUrl = "/samsung-commercial-display-qbc-datasheet.pdf";
        db = {
            "LH43QBCEBGCLXL": { size: "43 Inch", code: "QB43C" },
            "LH50QBCEBGCLXL": { size: "50 Inch", code: "QB50C" },
            "LH55QBCEBGCLXL": { size: "55 Inch", code: "QB55C" },
            "LH65QBCEBGCLXL": { size: "65 Inch", code: "QB65C" },
            "LH75QBCEBGCLXL": { size: "75 Inch", code: "QB75C" },
            "LH85QBCEBGCLXL": { size: "85 Inch", code: "QB85C" },
            "QB43C": { size: "43 Inch", code: "LH43QBCEBGCLXL" },
            "QB50C": { size: "50 Inch", code: "LH50QBCEBGCLXL" },
            "QB55C": { size: "55 Inch", code: "LH55QBCEBGCLXL" },
            "QB65C": { size: "65 Inch", code: "LH65QBCEBGCLXL" },
            "QB75C": { size: "75 Inch", code: "LH75QBCEBGCLXL" },
            "QB85C": { size: "85 Inch", code: "LH85QBCEBGCLXL" }
        };
    } else if (pageId === "samsung-commercial-display-qmc") {
        categoryName = "Samsung QMC Heavy-Duty Signage";
        pdfUrl = "/samsung-commercial-display-qmc-datasheet.pdf";
        db = {
            "LH43QMCEBGCLXL": { size: "43 Inch", code: "QM43C" },
            "LH50QMCEBGCLXL": { size: "50 Inch", code: "QM50C" },
            "LH55QMCEBGCLXL": { size: "55 Inch", code: "QM55C" },
            "LH65QMCEBGCLXL": { size: "65 Inch", code: "QM65C" },
            "LH75QMCEBGCLXL": { size: "75 Inch", code: "QM75C" },
            "LH85QMCEBGCLXL": { size: "85 Inch", code: "QM85C" },
            "LH98QMCEBGCXXL": { size: "98 Inch", code: "QM98C" },
            "QM43C": { size: "43 Inch", code: "LH43QMCEBGCLXL" },
            "QM50C": { size: "50 Inch", code: "LH50QMCEBGCLXL" },
            "QM55C": { size: "55 Inch", code: "LH55QMCEBGCLXL" },
            "QM65C": { size: "65 Inch", code: "LH65QMCEBGCLXL" },
            "QM75C": { size: "75 Inch", code: "LH75QMCEBGCLXL" },
            "QM85C": { size: "85 Inch", code: "LH85QMCEBGCLXL" },
            "QM98C": { size: "98 Inch", code: "LH98QMCEBGCXXL" }
        };
    }

    if (!categoryName) return; // Not on a Samsung product page

    // 3. Create popup modal element
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "sku-popup-overlay";
    popupOverlay.innerHTML = `
        <div class="sku-popup-card">
            <button class="sku-popup-close" aria-label="Close popup"><i class="fas fa-times"></i></button>
            <span class="sku-popup-badge">${categoryName}</span>
            <h4 class="sku-popup-title">Samsung Signage</h4>
            <span class="sku-popup-sku">LH55QBCEBGCLXL</span>
            <ul class="sku-popup-features">
                <li><i class="fas fa-circle-check"></i> <span>Authorized Supply</span></li>
                <li><i class="fas fa-circle-check"></i> <span>Bulk Quote Eligible</span></li>
                <li><i class="fas fa-circle-check"></i> <span>Official OEM Warranty</span></li>
                <li><i class="fas fa-circle-check"></i> <span>Pan-India Deployment</span></li>
            </ul>
            <div class="sku-popup-actions">
                <a href="/contact?ref=sku" class="sku-popup-btn-primary">Request Bulk Quote</a>
                <a href="${pdfUrl}" download class="sku-popup-btn-secondary"><i class="fas fa-file-pdf"></i> Datasheet</a>
            </div>
        </div>
    `;
    document.body.appendChild(popupOverlay);

    const closeBtn = popupOverlay.querySelector(".sku-popup-close");
    closeBtn.addEventListener("click", () => popupOverlay.classList.remove("active"));
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) popupOverlay.classList.remove("active");
    });

    // 4. Function to trigger the popup and highlight
    function triggerSkuDetails(rawKey) {
        const key = rawKey.toUpperCase().trim();
        if (db[key]) {
            const data = db[key];
            const primarySku = key.startsWith("LH") ? key : data.code;
            const alternateCode = key.startsWith("LH") ? data.code : key;
            const size = data.size;

            // Update popup content
            popupOverlay.querySelector(".sku-popup-title").innerText = `${categoryName} (${size})`;
            popupOverlay.querySelector(".sku-popup-sku").innerText = `${primarySku} / ${alternateCode}`;
            popupOverlay.querySelector(".sku-popup-btn-primary").href = `/contact?model=${primarySku}&category=${encodeURIComponent(categoryName)}#inquiry`;
            
            // Show popup
            popupOverlay.classList.add("active");

            // Locate and highlight table row
            const rows = document.querySelectorAll("tbody tr");
            let found = false;
            rows.forEach(row => {
                const text = row.innerText.toUpperCase();
                if (text.includes(primarySku) || text.includes(alternateCode)) {
                    row.classList.add("sku-highlight-row");
                    row.scrollIntoView({ behavior: "smooth", block: "center" });
                    found = true;
                    setTimeout(() => {
                        row.classList.remove("sku-highlight-row");
                    }, 6000);
                }
            });
        }
    }

    // 5. Inject SKU Search Interface above the main screen sizes table
    const skusSection = document.getElementById("skus");
    if (skusSection) {
        const table = skusSection.querySelector("table");
        if (table) {
            const searchWrapper = document.createElement("div");
            searchWrapper.className = "sku-search-wrapper";
            searchWrapper.innerHTML = `
                <h4 class="sku-search-title"><i class="fas fa-barcode" style="color: #034ea2;"></i> SKU Quick Lookup</h4>
                <div class="sku-search-input-group">
                    <i class="fas fa-search sku-search-icon"></i>
                    <input type="text" class="sku-search-input" placeholder="Type Samsung model number or SKU code (e.g. ${Object.keys(db)[0]})...">
                </div>
            `;
            table.parentNode.insertBefore(searchWrapper, table);

            const input = searchWrapper.querySelector(".sku-search-input");
            input.addEventListener("input", (e) => {
                const val = e.target.value.toUpperCase().trim();
                if (db[val]) {
                    triggerSkuDetails(val);
                    e.target.value = ""; // clear after triggering popup
                }
            });
        }
    }

    // 6. Auto-detect Hash or Query Parameter on load (e.g. #LH55QBCEBGCLXL or ?sku=LH55QBCEBGCLXL)
    const handleHashAndParams = () => {
        if (window.location.hash) {
            const hash = window.location.hash.replace("#", "").toUpperCase().trim();
            if (db[hash]) {
                setTimeout(() => {
                    triggerSkuDetails(hash);
                }, 800);
                return;
            }
        }
        
        const params = new URLSearchParams(window.location.search);
        const skuParam = (params.get("sku") || params.get("model") || "").toUpperCase().trim();
        if (skuParam && db[skuParam]) {
            setTimeout(() => {
                triggerSkuDetails(skuParam);
            }, 800);
        }
    };

    window.addEventListener("hashchange", handleHashAndParams);
    handleHashAndParams();
});
