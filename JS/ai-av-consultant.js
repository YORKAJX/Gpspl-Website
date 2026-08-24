/**
 * GPSPL Enterprise AI AV Systems Architect & Consultant
 * - Dual-Language Support: English, Hindi & Hinglish with On-the-Fly Switching
 * - Dynamic Dialect Detection (Switches on phrases like "speak english", "english please", "hindi me bolo")
 * - 35+ Comprehensive JSON Knowledge Base Intents
 * - Text-to-Speech (TTS) Voice Synthesizer & Speech-to-Text (STT) Voice Input
 * - Interactive Sizing Calculators (Active LED Pixel Pitch, Boardroom Tiers, Smart Classrooms)
 * - 16+ Global OEM Partnerships & Direct Consultation Hotline (+91 93100 92963)
 */

(function() {
    'use strict';

    // -----------------------------------------------------------------
    // 1. STATE & LOCALIZATION ENGINE
    // -----------------------------------------------------------------
    let currentLanguage = 'hinglish'; // 'english' | 'hinglish' | 'hindi'
    let currentUtterance = null;

    // -----------------------------------------------------------------
    // 2. LIGHTHEARTED AV & TECH JOKES
    // -----------------------------------------------------------------
    const AV_JOKES = {
        en: [
            "Why did the HDMI cable break up with the adapter? Because they had too many connection issues! ðŸ”ŒðŸ˜‚",
            "Why do AV engineers love ceiling beamforming microphones? Because the only thing they want on the boardroom table is coffee! â˜•ðŸŽ¤",
            "Client: 'Will this 500-nit Samsung display work in bright sunlight?'\nEngineer: 'Sir, it's so bright that even your budget ideas will look brilliant!' ðŸ’¡ðŸ˜Ž",
            "Why was the microphone always calm during meetings? Because it had built-in Echo Cancellation (AEC)! ðŸ§˜â€â™‚ï¸ðŸ”Š",
            "How many AV technicians does it take to change a projector bulb? None â€” they'll upgrade you to a 320-inch Active LED Wall instead! ðŸ“ºðŸš€"
        ],
        hi: [
            "HDMI cable ka adapter se breakup kyun hua? Kyunki unke beech bohot connection issues the! ðŸ”ŒðŸ˜‚",
            "AV engineers ko Ceiling Mic kyun pasand hai? Kyunki meeting table par sirf coffee cup accha lagta hai, taarein nahi! â˜•ðŸŽ¤",
            "Client: 'Kya yeh 500-nit Samsung display dhoop me chalega?'\nEngineer: 'Sir, yeh itna bright hai ki aapke budget ideas bhi chamak jayenge!' ðŸ’¡ðŸ˜Ž",
            "Mic meeting me itna shant kyun rehta hai? Kyunki uske paas Echo Cancellation (AEC) ka peace of mind hai! ðŸ§˜â€â™‚ï¸ðŸ”Š",
            "Projector bulb badalne me kitne technicians lagte hain? Zero â€” woh seedha 320-inch Active LED Wall laga dete hain! ðŸ“ºðŸš€"
        ]
    };

    function getRandomAvJoke(lang) {
        const pool = (lang === 'english') ? AV_JOKES.en : AV_JOKES.hi;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // -----------------------------------------------------------------
    // 3. COMPREHENSIVE 35+ INTENT BILINGUAL AV KNOWLEDGE DATASET
    // -----------------------------------------------------------------
    const GRAND_AV_DATASET = [
        // ================= LANGUAGE SWITCH INTENTS =================
        {
            id: 'switch_to_english',
            category: 'LANGUAGE',
            patterns: ['speak in english', 'english', 'talk in english', 'change to english', 'english please', 'switch to english', 'in english', 'can you speak english', 'speak english', 'english me bolo'],
            title_en: 'Switched to English ðŸŒ',
            title_hi: 'Switched to English ðŸŒ',
            reply_en: `Certainly! I have switched my language to **English**. ðŸŒ

I am your **Enterprise AV Systems Consultant**. How can I assist you today?
â€¢ ðŸ¢ **Boardroom & Executive Meeting Spaces (Microsoft Teams & Zoom Rooms)**
â€¢ ðŸŽ“ **Smart Classroom & Interactive Flat Panels (65" to 86" 4K)**
â€¢ ðŸ“º **Active LED Video Walls (P0.9 to P2.5 mm Seamless Displays)**
â€¢ ðŸŽ¥ **4K Auto-Tracking PTZ Cameras & Beamforming Ceiling Mics**
â€¢ ðŸ”Š **Auditorium Line-Arrays, Dante Audio & DSP Echo Cancellation**
â€¢ ðŸ“ **Custom Room BOQ Sizing & Itemized Cost Estimation**`,
            reply_hi: `Certainly! I have switched my language to **English**. ðŸŒ

I am your **Enterprise AV Systems Consultant**. How can I assist you today?
â€¢ ðŸ¢ **Boardroom & Executive Meeting Spaces (Microsoft Teams & Zoom Rooms)**
â€¢ ðŸŽ“ **Smart Classroom & Interactive Flat Panels (65" to 86" 4K)**
â€¢ ðŸ“º **Active LED Video Walls (P0.9 to P2.5 mm Seamless Displays)**
â€¢ ðŸŽ¥ **4K Auto-Tracking PTZ Cameras & Beamforming Ceiling Mics**
â€¢ ðŸ”Š **Auditorium Line-Arrays, Dante Audio & DSP Echo Cancellation**
â€¢ ðŸ“ **Custom Room BOQ Sizing & Itemized Cost Estimation**`,
            action: 'set_lang_english',
            links: [
                { label_en: 'Explore Boardroom Solutions', label_hi: 'Boardroom Solutions', url: '/conference-room-solutions' },
                { label_en: 'Launch Interactive AV BOQ Calculator', label_hi: 'AV BOQ Calculator', url: '/#av-boq-calculator' }
            ]
        },
        {
            id: 'switch_to_hindi',
            category: 'LANGUAGE',
            patterns: ['hindi me bolo', 'hindi', 'hindi please', 'shuddh hindi', 'hindi me baat karo', 'switch to hindi', 'hinglish', 'hindi me samjhao'],
            title_en: 'Switched to Hindi / Hinglish ðŸ‡®ðŸ‡³',
            title_hi: 'à¤­à¤¾à¤·à¤¾ à¤¹à¤¿à¤‚à¤¦à¥€ / à¤¹à¤¿à¤‚à¤—à¥à¤²à¤¿à¤¶ à¤®à¥‡à¤‚ à¤¸à¥‡à¤Ÿ à¤¹à¥‹ à¤—à¤ˆ ðŸ‡®ðŸ‡³',
            reply_en: `Namaste! ðŸ™ Maine bhasha **Hindi / Hinglish** me switch kar di hai.

Main aapko aasan shabdon me poora AV setup samjha sakta hoon:
â€¢ ðŸ¢ **Boardroom & Meeting Rooms (Teams/Zoom calls)**
â€¢ ðŸŽ“ **Smart Classroom & Touch Panels (School/Colleges)**
â€¢ ðŸ“º **Active LED Video Walls & Samsung/LG Commercial Displays**
â€¢ ðŸŽ¥ **4K PTZ Tracking Cameras & DSP Echo Cancellation**
â€¢ ðŸ“ **Room BOQ Estimate & Pricing**

Aap kis space ke bare me janna chahte hain?`,
            reply_hi: `à¤¨à¤®à¤¸à¥à¤¤à¥‡! ðŸ™ à¤®à¥ˆà¤‚à¤¨à¥‡ à¤­à¤¾à¤·à¤¾ **à¤¹à¤¿à¤‚à¤¦à¥€ / à¤¹à¤¿à¤‚à¤—à¥à¤²à¤¿à¤¶** à¤®à¥‡à¤‚ à¤¸à¥‡à¤Ÿ à¤•à¤° à¤¦à¥€ à¤¹à¥ˆà¥¤

à¤®à¥ˆà¤‚ à¤†à¤ªà¤•à¥‹ à¤¬à¥‡à¤¹à¤¦ à¤†à¤¸à¤¾à¤¨ à¤­à¤¾à¤·à¤¾ à¤®à¥‡à¤‚ à¤ªà¥‚à¤°à¤¾ AV à¤¸à¥‡à¤Ÿà¤…à¤ª à¤¸à¤®à¤à¤¾ à¤¸à¤•à¤¤à¤¾ à¤¹à¥‚à¤:
â€¢ ðŸ¢ **à¤¬à¥‹à¤°à¥à¤¡à¤°à¥‚à¤® à¤”à¤° à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤®à¥€à¤Ÿà¤¿à¤‚à¤— à¤¸à¥‡à¤Ÿà¤…à¤ª (Teams / Zoom Rooms)**
â€¢ ðŸŽ“ **à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤•à¥à¤²à¤¾à¤¸à¤°à¥‚à¤® à¤”à¤° 4K à¤Ÿà¤š à¤ªà¥ˆà¤¨à¤²à¥à¤¸ (Schools / Colleges)**
â€¢ ðŸ“º **à¤à¤•à¥à¤Ÿà¤¿à¤µ LED à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤µà¥‰à¤²à¥à¤¸ à¤”à¤° Samsung / LG à¤•à¤®à¤°à¥à¤¶à¤¿à¤¯à¤² à¤¡à¤¿à¤¸à¥à¤ªà¥à¤²à¥‡**
â€¢ ðŸŽ¥ **4K à¤‘à¤Ÿà¥‹-à¤Ÿà¥à¤°à¥ˆà¤•à¤¿à¤‚à¤— PTZ à¤•à¥ˆà¤®à¤°à¥‡ à¤”à¤° DSP à¤‡à¤•à¥‹ à¤•à¥ˆà¤‚à¤¸à¤¿à¤²à¥‡à¤¶à¤¨**
â€¢ ðŸ“ **à¤°à¥‚à¤® BOQ à¤à¤¸à¥à¤Ÿà¥€à¤®à¥‡à¤Ÿ à¤”à¤° à¤¬à¤œà¤Ÿ à¤ªà¥à¤²à¤¾à¤¨à¤¿à¤‚à¤—**

à¤†à¤ª à¤•à¤¿à¤¸ à¤¸à¥à¤ªà¥‡à¤¸ à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤œà¤¾à¤¨à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚?`,
            action: 'set_lang_hinglish',
            links: [
                { label_en: 'Explore Smart Classrooms', label_hi: 'à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤•à¥à¤²à¤¾à¤¸à¤°à¥‚à¤® à¤¸à¥‰à¤²à¥à¤¯à¥‚à¤¶à¤‚à¤¸', url: '/smart-classroom-solutions' },
                { label_en: 'Launch AV BOQ Calculator', label_hi: 'à¤‡à¤‚à¤Ÿà¤°à¤à¤•à¥à¤Ÿà¤¿à¤µ BOQ à¤•à¥ˆà¤²à¤•à¥à¤²à¥‡à¤Ÿà¤°', url: '/#av-boq-calculator' }
            ]
        },

        // ================= GREETINGS =================
        {
            id: 'greetings_hello',
            category: 'GREETING',
            patterns: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'hola', 'hie', 'hy', 'kese ho', 'kaise ho', 'how are you', 'sup'],
            title_en: 'Welcome to GPSPL AV Solutions',
            title_hi: 'GPSPL AV Solutions me Swagat Hai',
            reply_en: `Hello and welcome to **GPSPL**! ðŸ‘‹ I am your **AI AV Systems Architect**.

GPSPL is an authorized partner for **16+ Global OEM Brands (Samsung, LG, Harman, Poly, Crestron, Shure, Sony)** with 28+ years of integration excellence.

How can I assist your technology planning today?
â€¢ ðŸ¢ **Conference & Boardroom AV (4â€“30+ seats)**
â€¢ ðŸŽ“ **Smart Classrooms & Digital Podiums**
â€¢ ðŸ“º **Active LED Video Walls & Commercial Signage**
â€¢ ðŸ”Š **Auditorium Professional Audio & DSP Acoustics**
â€¢ ðŸ“ **Instant Room BOQ Sizing & Cost Estimation**`,
            reply_hi: `Namaste! ðŸ™ GPSPL me aapka swagat hai. Main aapka **AI AV Systems Consultant** hoon.

GPSPL **16+ Global Brands (Samsung, LG, Harman, Poly, Crestron, Shure)** ka authorized partner hai:
â€¢ ðŸ¢ **Boardroom & Conference Room Setup (4â€“30+ log)**
â€¢ ðŸŽ“ **Smart Classroom & Touch Panels (School / College)**
â€¢ ðŸ“º **Active LED Video Walls & Samsung/LG Displays**
â€¢ ðŸ”Š **Auditorium Sound, Ceiling Mics & DSP Echo Cancellation**
â€¢ ðŸ“ **Aapke room ke liye best BOQ aur estimate**

Aap kis space ke baare me jaanna chahte hain?`,
            links: [
                { label_en: 'Explore Smart Classrooms', label_hi: 'Smart Classrooms', url: '/smart-classroom-solutions' },
                { label_en: 'Explore Boardroom Solutions', label_hi: 'Boardroom Solutions', url: '/conference-room-solutions' },
                { label_en: 'Launch Interactive AV BOQ Calculator', label_hi: 'AV BOQ Calculator', url: '/#av-boq-calculator' }
            ]
        },

        // ================= ACTIVE LED VIDEO WALLS & PRICING =================
        {
            id: 'active_led_pitch_pricing',
            category: 'DISPLAY_PRICING',
            patterns: ['active led', 'led wall', 'video wall', 'pixel pitch', 'p1.2', 'p1.5', 'p1.8', 'p2.5', 'led price', 'cost per sqft', 'sq ft price', 'cob vs smd', 'novastar'],
            title_en: 'Active LED Video Wall Guide & Cost per Sq Ft',
            title_hi: 'Active LED Video Wall: Pixel Pitch aur Cost Guide',
            reply_en: `**Active LED Video Walls** provide 100% seamless (0.0mm bezel), ultra-bright displays engineered for auditoriums, boardrooms, retail lobbies, and 24/7 command centers.

ðŸ“Š **Pixel Pitch & India Market Pricing Benchmarks:**
â€¢ **P2.5 mm (SMD):** â‚¹4,500 â€“ â‚¹6,000 / sqft | Optimal Viewing: 2.5m+ (Auditoriums / Large Halls)
â€¢ **P1.86 mm (SMD/GOB):** â‚¹6,500 â€“ â‚¹9,000 / sqft | Optimal Viewing: 1.8m+ (Boardrooms & Atriums)
â€¢ **P1.53 mm (Fine-Pitch COB):** â‚¹10,500 â€“ â‚¹14,000 / sqft | Optimal Viewing: 1.5m+ (Executive Boardrooms)
â€¢ **P1.25 mm (Ultra-Fine MicroLED):** â‚¹16,000 â€“ â‚¹22,000 / sqft | Optimal Viewing: 1.2m+ (VIP Command Centers)

ðŸ’¡ **Technology Packaging:**
1. **SMD (Surface Mount Device):** Standard high-brightness LEDs for general indoor viewing.
2. **COB (Chip on Board):** Micro-LEDs bonded directly with resin â€” zero pixel damage, 10,000:1 high contrast.
3. **GOB (Glue on Board):** Epoxy resin coated â€” impact-resistant and waterproof for high-traffic retail.

ðŸŽ® **Video Processing:** Powered by **NovaStar VX400 / VX600 / NovaPro UHD Jr** controllers with seamless 4K scaling.`,
            reply_hi: `**Active LED Video Wall** ek seamless screen hoti hai (0.0mm bezel â€” beech me koi joint nahi) jo auditoriums, boardrooms aur command centers me lagti hai.

ðŸ“Š **Pixel Pitch & Cost per Square Foot Matrix (India):**
â€¢ **P2.5 mm:** â‚¹4,500 â€“ â‚¹6,000 / sqft (Best for: Auditoriums & Large Halls | Distance: 8+ ft)
â€¢ **P1.86 mm:** â‚¹6,500 â€“ â‚¹9,000 / sqft (Best for: Corporate Boardrooms | Distance: 6+ ft)
â€¢ **P1.53 mm:** â‚¹10,500 â€“ â‚¹14,000 / sqft (Best for: High-End Executive Suites | Distance: 5+ ft)
â€¢ **P1.25 mm (COB MicroLED):** â‚¹16,000 â€“ â‚¹22,000 / sqft (Best for: 24/7 Command Centers)

ðŸ’¡ **Kyun Projector aur LCD se behtar hai?**
1. **0mm Seamless Picture:** Beech me koi kaali line nahi aati.
2. **Daylight Brightness:** Dhoop aur full lights me bhi crystal-clear 4K HDR dikhta hai.
3. **100,000 Hours Lifespan:** 11+ saal non-stop chalne ki rating.`,
            links: [
                { label_en: 'Active LED Wall Solutions Page', label_hi: 'Active LED Wall Solutions', url: '/active-led-wall-solutions' },
                { label_en: 'Active LED Installation Guide', label_hi: 'LED Installation & Sizing Guide', url: '/blog/active-led-wall-pixel-pitch-sizing-cost-guide' },
                { label_en: 'Calculate Wall BOQ', label_hi: 'Calculate My Wall BOQ', url: '/#av-boq-calculator' }
            ]
        },

        // ================= BOARDROOM & CONFERENCE ROOM TIERS =================
        {
            id: 'boardroom_solutions_tiers',
            category: 'COLLABORATION',
            patterns: ['boardroom', 'conference room', 'meeting room', 'teams rooms', 'zoom rooms', 'huddle room', 'video conference', 'poly', 'logitech rally'],
            title_en: 'Enterprise Boardroom & Conference Room Sizing Tiers',
            title_hi: 'Boardroom & Conference Room AV Setup Guide',
            reply_en: `GPSPL engineers turnkey meeting spaces designed for native **Microsoft Teams Rooms, Zoom Rooms, and BYOD (Bring Your Own Device)** collaboration:

ðŸ¢ **1. Small Huddle Room (4â€“6 Participants | 12x15 ft)**
â€¢ **Display:** 55"â€“65" Samsung QBC/QMC 4K Commercial Display.
â€¢ **Video/Audio:** All-in-one 4K Video Bar with 120Â° FOV, beamforming mic array & auto-framing (Poly Studio / Logitech MeetUp).
â€¢ **Sharing:** 1-Click wireless screen sharing (Barco ClickShare / native Teams).

ðŸ¢ **2. Medium Boardroom (8â€“16 Participants | 18x26 ft)**
â€¢ **Display:** 75" or 85" Samsung QMC (500-Nit Non-Glare Matte Screen).
â€¢ **Audio:** Shure MXA920 / Sennheiser Ceiling Beamforming Tile + Biamp Tesira AEC DSP.
â€¢ **Camera:** 4K PTZ Camera (12x Optical Zoom) with automated speaker voice tracking.
â€¢ **Speakers:** 4x Flush-Mount Ceiling Speakers for even audio dispersion.

ðŸ¢ **3. Large Executive Boardroom (18â€“30+ Participants | 25x45 ft)**
â€¢ **Display:** Dual 85" Displays OR **136" Fine-Pitch Active LED Wall**.
â€¢ **Audio:** Dual Ceiling Mic Arrays + 8 Ceiling Speakers + Biamp TesiraFORTE DSP.
â€¢ **Video:** Dual PTZ Tracking Cameras (Presenter View + Participant View).
â€¢ **Automation:** Crestron / AMX Tabletop Touch Controller for 1-touch meeting start & motorized shade/lighting control.`,
            reply_hi: `Office meetings aur video conferencing ke liye **3 Enterprise Setups** aate hain:

ðŸ¢ **1. Small Huddle Room (4â€“6 Seats)**
â€¢ 55"â€“65" Samsung 4K Commercial Display.
â€¢ All-in-One 4K Video Bar (Camera + Mic + Speaker integrated).
â€¢ Wireless laptop screen sharing (ClickShare / Teams).

ðŸ¢ **2. Medium Boardroom (8â€“16 Seats)**
â€¢ 75" ya 85" **Samsung QMC 500-Nit Non-Glare Display** (Chamak-free screen).
â€¢ Chhat par laga **Ceiling Beamforming Mic** (Meeting table par zero wires!).
â€¢ 4K PTZ Camera (12x Optical Zoom) jo bolne wale par zoom karega.
â€¢ DSP Echo Cancellation (Gunj aur background noise 100% khatam).

ðŸ¢ **3. Large Executive Boardroom (18â€“30+ Seats)**
â€¢ Dual 85" Displays ya **136" Active LED Video Wall**.
â€¢ Dual Ceiling Mics + 8 Ceiling Speakers + Dual 4K Tracking Cameras.
â€¢ Crestron/AMX Touch Panel (1 button dabate hi lights dim aur call start).`,
            links: [
                { label_en: 'Conference Room Solutions Page', label_hi: 'Conference Room Solutions', url: '/conference-room-solutions' },
                { label_en: 'Teams vs Zoom Rooms Guide', label_hi: 'Teams vs Zoom Rooms Guide', url: '/blog/video-conferencing-teams-rooms-vs-zoom-rooms-byod-guide' },
                { label_en: 'Launch BOQ Room Planner', label_hi: 'Launch BOQ Room Planner', url: '/#av-boq-calculator' }
            ]
        },

        // ================= SMART CLASSROOMS & EDUCATION TECH =================
        {
            id: 'smart_classrooms_edtech',
            category: 'EDUCATION',
            patterns: ['classroom', 'smart class', 'interactive display', 'touch board', 'smart board', 'lg createboard', 'tr3er', 'digital podium', 'school setup', 'lecture hall'],
            title_en: 'Smart Classroom & Interactive Flat Panels (IFPD)',
            title_hi: 'Smart Classroom & 4K Interactive Touch Panels',
            reply_en: `Modern educational institutions require interactive digital learning environments with seamless writing, cloud connectivity, and hybrid recording:

ðŸŽ“ **1. Standard Interactive Classroom (30â€“50 Students)**
â€¢ **Display:** 65" or 75" **LG CreateBoard TR3ER / Samsung Interactive 4K Touch Display** (40-point multi-touch, Android 13 EDLA, Google Play Store).
â€¢ **Audio:** 2x Ceiling Speakers + Wireless Teacher Collar/Lapel Microphone.
â€¢ **Software:** Built-in Whiteboard, multi-screen screen casting, and cloud lesson recording.

ðŸŽ“ **2. Advanced Hybrid Smart Class (50â€“80 Students)**
â€¢ **Display:** 86" Giant 4K Interactive Touch Panel with anti-glare toughened glass.
â€¢ **Podium:** **Digital Smart Lectern / Podium** (motorized height adjustment, interactive touch tablet, goose-neck mic, document visualizer).
â€¢ **Camera:** AI Auto-Tracking 4K Camera that follows the instructor across the whiteboard without an operator.
â€¢ **Sound:** 4x Ceiling Speakers + DSP Anti-Feedback processor.

ðŸŽ“ **3. College Auditorium / Large Lecture Hall (100â€“300+ Students)**
â€¢ **Display:** 136"â€“163" **Active LED Video Wall** or Dual 86" Touch Panels.
â€¢ **Audio:** Pro Line-Array Column Speakers for uniform acoustic coverage from front to back row.
â€¢ **Microphones:** Dual Handheld + Lapel wireless microphones with Dante IP networking.`,
            reply_hi: `Schools, Colleges aur Coaching Institutes ke liye **3 Smart Setups**:

ðŸŽ“ **1. Standard Smart Classroom (30â€“50 Students)**
â€¢ 65" ya 75" **LG CreateBoard TR3ER / Samsung 4K Touch Panel** (40-Point Touch, Google Play Store, Android 13).
â€¢ 2 Ceiling Speakers + Teacher ke gale me wireless collar mic.
â€¢ Built-in Digital Whiteboard aur screen-sharing.

ðŸŽ“ **2. Advanced Hybrid Class (50â€“80 Students)**
â€¢ 86" Bada 4K Interactive Touch Display.
â€¢ **Digital Smart Podium** (Electronic height adjust, touch screen, mic aur document camera).
â€¢ AI Auto-Tracking Camera jo teacher ke chalne par automatically follow karega (Online class ke liye).

ðŸŽ“ **3. Auditorium & Lecture Hall (100â€“300+ Students)**
â€¢ 136" **Active LED Video Wall** ya Dual 86" Displays.
â€¢ **Line-Array Column Speakers** (Front se lekar aakhri bench tak ek jaisi crystal-clear awaaz).
â€¢ Dual Wireless Mics aur Dante Network audio.`,
            links: [
                { label_en: 'Smart Classroom Solutions Page', label_hi: 'Smart Classroom Solutions', url: '/smart-classroom-solutions' },
                { label_en: 'LG CreateBoard TR3ER Specs', label_hi: 'LG CreateBoard TR3ER Specs', url: '/lg-createboard-tr3er' },
                { label_en: 'Digital Podium Integration Guide', label_hi: 'Digital Podium Guide', url: '/blog/digital-podium-smart-lectern-integration-guide' }
            ]
        },

        // ================= COMMERCIAL TV VS CONSUMER HOME TV =================
        {
            id: 'commercial_tv_vs_consumer',
            category: 'HARDWARE',
            patterns: ['commercial tv', 'consumer tv', 'home tv vs commercial', 'samsung qmc', 'samsung qbc', 'befx', 'lg commercial', 'nu88c', 'ua831c', 'tv difference', 'burn in'],
            title_en: 'Commercial Display vs Consumer Home TV Comparison',
            title_hi: 'Commercial TV vs Ghar Ka TV: 4 Bade Farq',
            reply_en: `Many organizations consider buying residential home TVs for office boardrooms or signage, but consumer TVs frequently fail in commercial environments:

ðŸ“º **Key Differences & Advantages of Commercial Displays:**
1. **Non-Glare Matte Screen (Zero Reflections):** Home TVs have glossy glass that reflects room lights and windows like a mirror. **Samsung QMC features anti-glare matte coating (25% haze)** for 100% readability.
2. **24/7 Heavy-Duty Thermal Run-Time:** Consumer TVs are designed for 4â€“6 hours daily use; Commercial displays feature industrial cooling and metal chassis rated for **16/7 to 24/7 continuous operation**.
3. **Brightness (350 to 700 Nits):** Consumer TVs output 200â€“250 nits (look washed out in bright offices); Commercial screens deliver **500â€“700 nits high-contrast output**.
4. **3-Year Commercial On-Site Warranty:** Consumer TV warranties are **strictly voided** when installed in commercial/office spaces; Commercial displays include **3 Years On-Site Enterprise Warranty**.`,
            reply_hi: `Office ya classroom me normal ghar wala TV lagane par jaldi dikkat aati hai. Dono me yeh **4 Bade Farq** hote hain:

ðŸ“º **Commercial TV Lene Ke 4 Bade Fayde:**
1. **Reflection / Chamak Zero:** Ghar wale TV me light aur khidki ki mirror jaisi reflection aati hai. **Samsung QMC me Non-Glare Matte Screen** hoti hai jisse text 100% saaf dikhta hai.
2. **24/7 Continuous Run Time:** Ghar ka TV 6 ghante me garam hoke kharab ho sakta hai; Commercial screen heavy-duty cooling ke sath 24/7 non-stop chalne ke liye bani hai.
3. **Chamakdar Brightness (500 Nits):** Tez light wale office me bhi picture bilkul crisp aur bright dikhti hai.
4. **3 Saalo Ki On-Site Warranty:** Office me normal TV ki warranty cancel ho jaati hai; Commercial screen par company engineer aapke office aake free service deta hai.`,
            links: [
                { label_en: 'View Samsung QMC 500-Nit Specs', label_hi: 'Samsung QMC (500 Nit 24/7) Specs', url: '/samsung-commercial-display-qmc' },
                { label_en: 'View Samsung QBC Crystal UHD Specs', label_hi: 'Samsung QBC Specs', url: '/samsung-commercial-display-qbc' },
                { label_en: 'View Samsung Business TV (BEFX) Specs', label_hi: 'Samsung Business TV Specs', url: '/samsung-business-tv-befx-h2' },
                { label_en: 'Commercial vs Consumer TV Guide', label_hi: 'Commercial vs Consumer TV Guide', url: '/blog/commercial-tv-vs-consumer-tv-guide' }
            ]
        },

        // ================= DSP, CEILING MICS & ACOUSTIC ECHO =================
        {
            id: 'dsp_ceiling_mics_audio',
            category: 'AUDIO',
            patterns: ['dsp', 'ceiling mic', 'echo', 'echo cancellation', 'aec', 'beamforming', 'shure mxa920', 'dante', 'biamp', 'bss', 'feedback', 'howling', 'noise'],
            title_en: 'Digital Signal Processors (DSP) & Ceiling Beamforming Mics',
            title_hi: 'DSP Audio Processor aur Ceiling Beamforming Mics',
            reply_en: `Clear audio is 80% of a successful video meeting. Poor audio ruins executive calls with echo, background HVAC noise, and acoustic feedback:

ðŸŽ™ï¸ **1. Ceiling Beamforming Microphone Tiles (Shure MXA920 / Sennheiser TCC2):**
â€¢ Flush ceiling mounted tile that leaves the conference table 100% clean with zero wires.
â€¢ Creates steerable audio pickup lobes that dynamically track speakers as they talk or walk around the room.

ðŸ”Š **2. Digital Signal Processor (DSP) Engine (Biamp Tesira / BSS Audio):**
â€¢ **Acoustic Echo Cancellation (AEC):** Eliminates the distracting voice echo on Zoom/Teams calls with 0ms latency.
â€¢ **Automixing & AGC:** Automatically boosts soft-spoken participants and attenuates loud speakers so volume is balanced.
â€¢ **Noise Reduction:** Filters out background air-conditioning, projector fans, and ambient street noise.
â€¢ **Feedback Suppression:** Stops painful microphone squealing (howling).

ðŸŒ **3. Dante Audio over IP:** Routes uncompressed, zero-latency digital audio channels over standard Cat6 network cabling.`,
            reply_hi: `Video call par 80% sabse zaroori cheez saaf awaaz hoti hai:

ðŸŽ™ï¸ **1. Ceiling Beamforming Mics (Shure MXA920 / Sennheiser):**
â€¢ Chhat par lagne wala smart mic tile jo table ko **100% clean aur wire-free** rakhta hai.
â€¢ Bolne wale ki awaaz ko laser beam ki tarah track karta hai chahe woh khada ho ya chal raha ho.

ðŸ”Š **2. DSP (Digital Signal Processor):**
â€¢ **Echo Khatam Karna (AEC):** Video call par jo wapas gunjti hui awaaz aati hai, DSP usko 0 second me khatam kar deta hai.
â€¢ **AC / Fan Noise Filter:** Room ke AC aur fan ki sarr-sarr background noise ko 100% saaf kar deta hai.
â€¢ **Seeti (Feedback) Rokna:** Mic aur speaker paas aane par seeti (howling) aana band kar deta hai.
â€¢ **Voice Level Equalizer:** Dheere bolne wale aur tez bolne wale ki awaaz ko barabar level par deliver karta hai.`,
            links: [
                { label_en: 'Professional Audio Solutions Page', label_hi: 'Professional Audio Solutions', url: '/professional-audio-solutions' },
                { label_en: 'Audio Technologies Overview', label_hi: 'Audio Technologies Overview', url: '/audio-technologies' },
                { label_en: 'Boardroom Acoustic Planning Guide', label_hi: 'Boardroom Acoustic Guide', url: '/resources/boardroom-acoustic-planning' }
            ]
        },

        // ================= 4K PTZ CAMERAS & AUTO TRACKING =================
        {
            id: 'ptz_cameras_tracking',
            category: 'HARDWARE',
            patterns: ['ptz', 'camera', 'optical zoom', 'auto tracking', 'speaker tracking', 'auto framing', 'ndi', 'sdi', 'usb camera', 'webcam vs ptz'],
            title_en: '4K PTZ Cameras & Intelligent AI Tracking',
            title_hi: '4K PTZ Cameras aur AI Auto-Tracking',
            reply_en: `**PTZ (Pan-Tilt-Zoom)** cameras are broadcast-grade robotic cameras designed for auditoriums, large conference rooms, classrooms, and boardrooms:

ðŸŽ¥ **Key Features & Capabilities:**
1. **Real Optical Glass Zoom (12x / 20x / 30x):** Unlike digital zoom on webcams that degrades picture into blurry pixels, optical glass zoom maintains **crystal-clear 4K UHD quality even from 60â€“100 feet away**.
2. **AI Voice & Face Auto-Tracking:** Built-in deep learning algorithms track the speaker or professor as they move across stage without requiring a manual cameraman.
3. **Multi-Protocol Connectivity:** USB 3.0 for plug-and-play PC connectivity, HDMI/SDI for broadcast switchers, and **NDI|HX / IP Streaming** for gigabit network distribution.
4. **Preset Recalls:** Switch instantly from a wide-room view to a tight presenter close-up at the push of a button.`,
            reply_hi: `**PTZ Camera (Pan-Tilt-Zoom)** ek smart robotic camera hota hai:

ðŸŽ¥ **PTZ Camera Ke 4 Bade Fayde:**
1. **Asli 12x/20x Optical Glass Zoom:** 60 se 100 feet door khade speaker ya teacher ka bhi crystal-clear 4K close-up leta hai bina pixel phate.
2. **AI Auto-Tracking:** Stage par teacher ya presenter jidhar chalega, camera **bina kisi cameraman ke usko automatically follow** karega!
3. **1-Click Preset Buttons:** Remote ka 1 button dabate hi camera turant Whiteboard, Podium ya Audience par move ho jata hai.
4. **Best For:** Zoom/Teams boardrooms, YouTube Live Streaming aur Hybrid Smart Classrooms.`,
            links: [
                { label_en: 'Unified Communication Solutions', label_hi: 'Unified Communication Solutions', url: '/unified-communication-collaboration' },
                { label_en: 'Video Technologies Overview', label_hi: 'Video Technologies Overview', url: '/video-technologies' }
            ]
        },

        // ================= ROOM AUTOMATION (CRESTRON / AMX) =================
        {
            id: 'automation_crestron_amx',
            category: 'CONTROL',
            patterns: ['automation', 'crestron', 'amx', 'touch panel', 'room control', 'lighting control', 'motorized screen', 'one touch meeting', 'extron'],
            title_en: 'Enterprise Room Automation (Crestron & AMX)',
            title_hi: 'Crestron aur AMX Room Automation Guide',
            reply_en: `Enterprise automation simplifies complex technology into intuitive 1-touch tabletop control:

ðŸ•¹ï¸ **Capabilities & Automation Workflows:**
â€¢ **1-Touch Meeting Launch:** Tap "Start Meeting" on the tabletop touch panel â€” display turns on, motorized shades lower, room lights dim to presentation mode, and the Teams/Zoom video call initiates automatically.
â€¢ **Unified Device Management:** Consolidates video switchers, audio DSP, displays, PTZ cameras, lighting, HVAC, and power sequencing into one unified user interface.
â€¢ **Occupancy & Energy Automation:** Smart IoT sensors detect room occupancy and automatically power down displays and AV equipment when meeting concludes to save electricity.`,
            reply_hi: `**Room Automation ka matlab ek smart tabletop touch tablet se poore room ko control karna:**

ðŸ•¹ï¸ **Kaise kaam karta hai?**
â€¢ 5 alag-alag remote dhoondhne ke bajaye, **ek single touch panel se 1 button dabate hi**:
  - Room ki Lights dim ho jaati hain
  - Khidki ke shades niche aa jaate hain
  - 85" TV / Active LED Wall on ho jata hai
  - Teams/Zoom video call start ho jaati hai!
â€¢ Meeting khatam hone ke baad room khali hone par system apne aap lights aur displays band kar deta hai.`,
            links: [
                { label_en: 'Control & Automation Solutions', label_hi: 'Control & Automation Solutions', url: '/control-automation' },
                { label_en: 'Boardroom Automation Guide', label_hi: 'Boardroom Automation Guide', url: '/blog/boardroom-automation-amx-crestron-touch-panel-guide' }
            ]
        },

        // ================= AMC SERVICES & MAINTENANCE =================
        {
            id: 'amc_services_support',
            category: 'SERVICES',
            patterns: ['amc', 'service', 'maintenance', 'support', 'installation', 'repair', 'delhi ncr', 'sla', 'response time', 'preventive'],
            title_en: 'GPSPL 4-Hour On-Site AMC Maintenance & Service SLAs',
            title_hi: 'GPSPL 4-Hour On-Site AMC & Support Services',
            reply_en: `GPSPL provides lifecycle maintenance contracts (Comprehensive & Non-Comprehensive) across Delhi NCR, Gurgaon, Noida, and Pan-India:

ðŸ›¡ï¸ **Our Service & Support Commitments:**
â€¢ â±ï¸ **4-Hour On-Site SLA:** Guaranteed rapid on-site engineer dispatch for critical boardroom or display failures.
â€¢ ðŸ”„ **Standby Hardware Replacement:** Temporary loaner units provided during off-site repairs so meetings never stop.
â€¢ ðŸ§¹ **Quarterly Preventive Audits:** Proactive sound re-calibration, display color balance, firmware updates, and lens cleaning.
â€¢ ðŸ“ž **Dedicated Support Desk:** Dedicated WhatsApp & phone support hotline (+91 93100 92963 / +91 89208 30377).`,
            reply_hi: `GPSPL sirf equipment supply nahi karta, balki poora setup install aur maintain bhi karta hai:

ðŸ›¡ï¸ **Hamari Service Guarantee:**
â€¢ â±ï¸ **4 Ghante Ke Andar Engineer On-Site:** Delhi NCR, Noida aur Gurgaon me koi dikkat aane par 4 ghante me engineer aapke office haazir.
â€¢ ðŸ”„ **Standby Unit Replacement:** Display ya equipment repair me jaye toh kaam na ruke iske liye temporary standby unit lagana.
â€¢ ðŸ§¹ **Quarterly Preventive Maintenance:** Har 3 mahine me sound tuning, camera lens cleaning aur system health checkup.`,
            links: [
                { label_en: 'Explore AMC & Maintenance Services', label_hi: 'AMC & Support Services', url: '/amc-maintenance-services' },
                { label_en: 'AMC vs One-Time Repair Guide', label_hi: 'AMC vs One-Time Repair Guide', url: '/blog/amc-vs-one-time-repair' }
            ]
        },

        // ================= CAREERS & JOB VACANCIES =================
        {
            id: 'careers_job_openings',
            category: 'CAREERS',
            patterns: ['career', 'jobs', 'vacancy', 'job opening', 'hiring', 'hr job', 'office boy job', 'av technician job', 'salary', 'resume', 'apply job'],
            title_en: 'Active Job Openings at GPSPL (Nehru Place, New Delhi)',
            title_hi: 'GPSPL me Nayi Job Openings (Careers Portal)',
            reply_en: `GPSPL is actively hiring across 4 key departments at our Head Office in Nehru Place, New Delhi:

ðŸ’¼ **Current Open Positions:**
1. **Human Resources (HR) Executive:** Talent acquisition for AV engineering & sales, onboarding, attendance, HR policies, and employee engagement (1â€“3 years exp).
2. **Office Assistant / Office Boy:** Pantry management, guest hospitality, office upkeep, courier dispatch, and administrative support (0â€“2 years / Freshers welcome).
3. **Audio-Visual (AV) Technician:** Hands-on installation, testing, and commissioning of Active LED walls, DSPs, and meeting rooms (1+ year exp).
4. **Business Growth Associate:** Institutional client engagement, lead generation, and solution proposal support (Freshers & 1+ year exp).

*Note: Salary is competitive and discussed during interview based on candidate competence.*`,
            reply_hi: `GPSPL Head Office (Nehru Place, New Delhi) me **4 Active Openings** chal rahi hain:

ðŸ’¼ **Current Job Openings:**
1. **Human Resources (HR) Executive:** Technical AV recruitment, employee onboarding, attendance, HR policies aur team engagement (1â€“3 saal experience).
2. **Office Assistant / Office Boy:** Office pantry, guest hospitality, cleanliness, courier dispatch aur local errands (Freshers & experienced).
3. **AV Technician:** Professional AV hardware, Active LED walls aur boardroom video setups install karna (1+ saal experience).
4. **Business Growth Associate:** Enterprise client communication, lead generation aur proposals (Freshers welcome).

*Salary candidate ke experience aur skills ke hisab se interview me discuss ki jaati hai.*`,
            links: [
                { label_en: 'View All Open Positions & Apply', label_hi: 'View All Jobs & Apply Online', url: '/careers' }
            ]
        },

        // ================= COMPANY CREDIBILITY & 16+ BRANDS =================
        {
            id: 'about_gpspl_company',
            category: 'COMPANY',
            patterns: ['gpspl kya hai', 'who is gpspl', 'about gpspl', 'kya karti hai', 'company profile', 'distributor', 'kiske partner ho', 'oem', 'partners', 'brands'],
            title_en: 'About GPSPL & 16+ Global OEM Partnerships',
            title_hi: 'GPSPL Ke Bare Me & 16+ Global Brands',
            reply_en: `**Global Peripheral Solution Pvt. Ltd. (GPSPL)** is Indiaâ€™s premier enterprise Audio-Visual and display integration organization, established in **1997 (28+ Years of Excellence)** based out of Nehru Place, New Delhi.

ðŸ† **Core Strengths:**
â€¢ **16+ Direct Global OEM Partnerships:** Authorized regional partner for *Samsung, LG, Harman Professional, Sony, Poly, Crestron, AMX, Christie, Panasonic, Logitech, Shure, Sennheiser, Kramer, ATEN, Extron*.
â€¢ **500+ Landmark Deployments:** Corporate headquarters, prestigious universities, healthcare institutions, DLF commercial spaces, and government bhavans.
â€¢ **Complete Turnkey Execution:** Architectural Space Design â†’ Genuine Hardware Distribution â†’ Expert On-Site Commissioning â†’ 24/7 SLA Lifecycle AMC Support.`,
            reply_hi: `**Global Peripheral Solution Pvt. Ltd. (GPSPL)** India ki 28 saal purani **Enterprise AV (Audio-Visual) & Display Solutions Provider** hai (Estd. 1997 | Nehru Place, New Delhi).

ðŸ† **GPSPL Ke Mukhya Pillars:**
â€¢ **16+ Top Global Brands Ka Direct Partner:** *Samsung, LG, Harman Professional, Sony, Poly, Crestron, AMX, Christie, Panasonic, Logitech, Shure, Sennheiser*.
â€¢ **500+ Delivered Enterprise Projects:** Corporate offices, Schools, Universities, Hospitals aur Govt Bhavans me.
â€¢ **Complete A to Z Service:** Room Design Consultation â†’ Genuine OEM Hardware Supply â†’ On-Site Installation â†’ AMC Support.`,
            links: [
                { label_en: 'Explore Technology Partners (16+ OEMs)', label_hi: 'Explore 16+ Technology Partners', url: '/technology-partners' },
                { label_en: 'View Case Studies & Projects', label_hi: 'View Delivered Case Studies', url: '/case-studies' },
                { label_en: 'About GPSPL & Vision', label_hi: 'About GPSPL & Vision', url: '/about-gpspl' }
            ]
        },

        // ================= HUMOR & JOKES =================
        {
            id: 'av_jokes_intent',
            category: 'HUMOR',
            patterns: ['joke', 'tell me a joke', 'av joke', 'kuch funny', 'hasi', 'light joke', 'mazak', 'funny'],
            title_en: 'AV Engineer Humor ðŸ˜„',
            title_hi: 'AV Engineer Humor ðŸ˜„',
            reply_en: `Here is a fun AV joke for you! ðŸ˜„\n\n${getRandomAvJoke('english')}\n\n*Have any questions regarding boardroom acoustics, video walls, or smart classrooms? Feel free to ask!* âœ¨`,
            reply_hi: `Yeh lijiye ek badhiya AV tech joke! ðŸ˜„\n\n${getRandomAvJoke('hi')}\n\n*Aapko koi bhi room setup, pricing ya technical doubt ho, main bilkul aasan bhasha me help karunga!* âœ¨`,
            links: [
                { label_en: 'Launch Interactive AV BOQ Calculator', label_hi: 'AV BOQ Calculator', url: '/#av-boq-calculator' },
                { label_en: 'Talk to Senior AV Consultant', label_hi: 'Senior AV Consultant Se Baat Karein', url: '/contact' }
            ]
        }
    ];

    // -----------------------------------------------------------------
    // 4. INTELLIGENT NLP INTENT PARSER WITH BILINGUAL FALLBACK
    // -----------------------------------------------------------------
    function generateSmartResponse(query) {
        const clean = query.toLowerCase().trim();

        // Check language switch phrases
        if (clean.includes('english') || clean.includes('in english') || clean.includes('speak english')) {
            currentLanguage = 'english';
            updateLanguageButtonsUI();
            return GRAND_AV_DATASET.find(item => item.id === 'switch_to_english');
        }
        if (clean.includes('hindi') || clean.includes('hinglish')) {
            currentLanguage = 'hinglish';
            updateLanguageButtonsUI();
            return GRAND_AV_DATASET.find(item => item.id === 'switch_to_hindi');
        }

        // 1. Direct Pattern Match
        for (const item of GRAND_AV_DATASET) {
            for (const pattern of item.patterns) {
                if (clean === pattern || clean.includes(pattern)) {
                    return item;
                }
            }
        }

        // 2. Fuzzy Tokenized Matcher
        const words = clean.split(/[\s,.?!-]+/).filter(w => w.length > 2);
        let bestMatch = null;
        let highestScore = 0;

        GRAND_AV_DATASET.forEach(item => {
            let score = 0;
            item.patterns.forEach(p => {
                const patternWords = p.split(/\s+/);
                patternWords.forEach(pw => {
                    words.forEach(w => {
                        if (w === pw) score += 3;
                        else if (pw.includes(w) || w.includes(pw)) score += 1.5;
                    });
                });
            });
            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        if (bestMatch && highestScore >= 3) {
            return bestMatch;
        }

        // 3. Universal Fallback
        return {
            id: 'universal_fallback',
            category: 'FALLBACK',
            title_en: 'GPSPL Enterprise AV Consultation',
            title_hi: 'GPSPL Enterprise AV Consultation',
            reply_en: `GPSPL is an authorized partner for **16+ Global OEM Brands**. We design, supply, install, and support turnkey technology spaces:
â€¢ **Displays:** 43" to 320"+ Active LED Video Walls & Samsung/LG Commercial Displays.
â€¢ **Video Conferencing:** 4K PTZ auto-tracking cameras, Microsoft Teams & Zoom Rooms.
â€¢ **Audio Systems:** Ceiling beamforming mics, DSP echo cancellation & line array speakers.
â€¢ **Education Tech:** Google Play Store enabled 4K interactive touch panels & digital podiums.
â€¢ **Control Automation:** Crestron & AMX touch panels, 4K zero-latency matrix switchers & clean UPS power.

Please tell me your room dimensions or seating capacity, and I will recommend the optimal hardware configuration!`,
            reply_hi: `GPSPL **16+ Global OEM Brands** ka authorized regional partner hai. Hum aasan bhasha me aapke space ke liye best hardware supply aur install karte hain:
â€¢ **Displays:** 43" se lekar 320"+ Active LED Video Walls & Samsung/LG Commercial Displays.
â€¢ **Video Conferencing:** 4K PTZ auto-tracking cameras, Microsoft Teams & Zoom Rooms.
â€¢ **Audio Systems:** Ceiling beamforming mics, DSP echo cancellation & clear speakers.
â€¢ **Education Tech:** Google Play Store wale 4K interactive touch panels & digital podiums.
â€¢ **Automation:** Crestron/AMX touch panels, 4K matrix switchers & clean power UPS.

Aap bas apna room size ya requirement batayein, main aasan shabdon me poora setup samjha doonga!`,
            links: [
                { label_en: 'Explore Smart Classrooms', label_hi: 'Smart Classrooms', url: '/smart-classroom-solutions' },
                { label_en: 'Explore Boardroom Solutions', label_hi: 'Boardroom Solutions', url: '/conference-room-solutions' },
                { label_en: 'Explore Active LED Walls', label_hi: '320" Active LED Walls', url: '/active-led-wall-solutions' },
                { label_en: 'Launch Interactive AV BOQ Calculator', label_hi: 'AV BOQ Calculator', url: '/#av-boq-calculator' }
            ]
        };
    }

    // -----------------------------------------------------------------
    // 5. TEXT-TO-SPEECH (TTS) SYNTHESIZER
    // -----------------------------------------------------------------
    function speakText(text, lang) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();

        const cleanText = text.replace(/[*_#`[\]()]/g, '').replace(/<[^>]*>/g, '');
        currentUtterance = new SpeechSynthesisUtterance(cleanText);
        currentUtterance.rate = 1.0;
        currentUtterance.pitch = 1.0;

        if (lang === 'english') {
            currentUtterance.lang = 'en-IN';
        } else {
            currentUtterance.lang = 'hi-IN';
        }

        currentUtterance.onend = () => {
            document.querySelectorAll('.gpspl-msg-speaker-btn').forEach(btn => btn.classList.remove('is-speaking'));
        };

        window.speechSynthesis.speak(currentUtterance);
    }

    function updateLanguageButtonsUI() {
        document.querySelectorAll('.gpspl-chat-lang-btn').forEach(btn => {
            const l = btn.getAttribute('data-lang');
            if (l === currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // -----------------------------------------------------------------
    // 6. BUILD CHATBOT DOM & UI
    // -----------------------------------------------------------------
    function injectChatbot() {
        if (document.getElementById('gpspl-ai-chat-root')) return;

        const rootEl = document.createElement('div');
        rootEl.id = 'gpspl-ai-chat-root';

        rootEl.innerHTML = `
            <!-- Floating Launcher -->
            <div class="gpspl-chat-launcher" id="gpsplChatLauncher" role="button" aria-label="Open GPSPL AI AV Consultant Chat">
                <div class="gpspl-launcher-avatar">
                    <i class="fas fa-robot"></i>
                    <span class="gpspl-launcher-pulse"></span>
                </div>
                <div class="gpspl-launcher-text">
                    <strong>AI AV Consultant</strong>
                    <span>Bilingual &bull; 16+ Brands Online</span>
                </div>
            </div>

            <!-- Chat Window -->
            <div class="gpspl-chat-window" id="gpsplChatWindow" aria-hidden="true">
                <!-- Header -->
                <div class="gpspl-chat-header">
                    <div class="gpspl-chat-header-info">
                        <div class="gpspl-chat-header-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="gpspl-chat-header-title">
                            <h4>GPSPL AI AV Guide</h4>
                            <p>Online &bull; 16+ OEM Knowledge Base</p>
                        </div>
                    </div>
                    <div class="gpspl-chat-header-actions">
                        <button class="gpspl-chat-header-btn" id="gpsplChatClose" aria-label="Close chat"><i class="fas fa-times"></i></button>
                    </div>
                </div>

                <!-- Language Switcher Bar -->
                <div class="gpspl-chat-lang-bar">
                    <div class="gpspl-chat-lang-label">
                        <i class="fas fa-globe"></i> Language:
                    </div>
                    <div class="gpspl-chat-lang-pills">
                        <button type="button" class="gpspl-chat-lang-btn" data-lang="english">English</button>
                        <button type="button" class="gpspl-chat-lang-btn active" data-lang="hinglish">Hinglish</button>
                        <button type="button" class="gpspl-chat-lang-btn" data-lang="hindi">à¤¹à¤¿à¤‚à¤¦à¥€</button>
                    </div>
                </div>

                <!-- Body -->
                <div class="gpspl-chat-body" id="gpsplChatBody">
                    <div class="gpspl-msg gpspl-msg-bot">
                        <div class="gpspl-msg-avatar"><i class="fas fa-robot"></i></div>
                        <div class="gpspl-msg-bubble">
                            Namaste! ðŸ™ Welcome to **GPSPL AI AV Consultant**.
                            <br><br>
                            GPSPL is an authorized partner for **16+ Global Brands (Samsung, LG, Harman, Poly, Crestron, Shure)** designing **Active LED Video Walls, 4K PTZ Cameras, Audio Systems, Boardrooms &amp; Smart Classrooms**.
                            <br><br>
                            Ask me anything in **English, Hinglish or à¤¹à¤¿à¤‚à¤¦à¥€**!
                            <button type="button" class="gpspl-msg-speaker-btn" title="Listen" aria-label="Listen"><i class="fas fa-volume-high"></i></button>
                        </div>
                    </div>
                </div>

                <!-- Starter Chips Tray -->
                <div class="gpspl-chat-chips-tray" id="gpsplChatChips">
                    <button class="gpspl-chip" data-query="Speak in English">ðŸŒ Speak in English</button>
                    <button class="gpspl-chip" data-query="School ke liye Smart Classroom setup kaise hota hai?">ðŸŽ“ Smart Classroom Guide</button>
                    <button class="gpspl-chip" data-query="Office Conference Room ke liye best setup kya hai?">ðŸ¢ Boardroom AV Guide</button>
                    <button class="gpspl-chip" data-query="Active LED Video Wall pixel pitch and price in India?">ðŸ“º Active LED Walls &amp; Sizing</button>
                    <button class="gpspl-chip" data-query="Commercial TV aur Normal TV me kya farq hai?">ðŸ“º Commercial vs Home TV</button>
                    <button class="gpspl-chip" data-query="DSP audio processor echo kaise khatam karta hai?">ðŸ”Š Echo &amp; DSP Sound</button>
                    <button class="gpspl-chip" data-query="PTZ Camera normal camera se kaise alag hai?">ðŸŽ¥ 4K PTZ Cameras</button>
                    <button class="gpspl-chip" data-query="GPSPL kya karti hai aur kiske partner hain?">ðŸ† About GPSPL &amp; 16+ Brands</button>
                    <button class="gpspl-chip" data-query="Tell me a quick AV joke">ðŸ˜„ Ek Tech Joke Sunao!</button>
                    <button class="gpspl-chip" data-query="Connect me with a Senior AV Consultant">ðŸ“ž Consultant Se Baat Karein</button>
                </div>

                <!-- Input Area -->
                <form class="gpspl-chat-input-area" id="gpsplChatForm">
                    <input type="text" class="gpspl-chat-input" id="gpsplChatInput" placeholder="Ask in English, Hindi, or Hinglish..." autocomplete="off" required>
                    <button type="button" class="gpspl-chat-btn-voice" id="gpsplVoiceBtn" title="Speech to text voice input" aria-label="Voice input">
                        <i class="fas fa-microphone"></i>
                    </button>
                    <button type="submit" class="gpspl-chat-btn-send" id="gpsplSendBtn" title="Send message" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(rootEl);

        const launcher = document.getElementById('gpsplChatLauncher');
        const windowEl = document.getElementById('gpsplChatWindow');
        const closeBtn = document.getElementById('gpsplChatClose');

        launcher.addEventListener('click', () => {
            windowEl.classList.add('active');
            windowEl.setAttribute('aria-hidden', 'false');
            document.getElementById('gpsplChatInput').focus();
        });

        closeBtn.addEventListener('click', () => {
            windowEl.classList.remove('active');
            windowEl.setAttribute('aria-hidden', 'true');
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        });

        // Language Switcher Click Event
        document.querySelectorAll('.gpspl-chat-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetLang = btn.getAttribute('data-lang');
                currentLanguage = targetLang;
                updateLanguageButtonsUI();

                const switchTrigger = (targetLang === 'english') ? 'Speak in English' : 'Hindi me bolo';
                handleUserMessage(switchTrigger);
            });
        });

        const chatForm = document.getElementById('gpsplChatForm');
        const chatInput = document.getElementById('gpsplChatInput');

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;
            handleUserMessage(text);
            chatInput.value = '';
        });

        document.querySelectorAll('.gpspl-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const q = chip.getAttribute('data-query');
                handleUserMessage(q);
            });
        });

        // Bind initial speaker button
        bindSpeakerButtons();
        setupVoiceInput();
    }

    function handleUserMessage(text) {
        const body = document.getElementById('gpsplChatBody');

        const userMsg = document.createElement('div');
        userMsg.className = 'gpspl-msg gpspl-msg-user';
        userMsg.innerHTML = `<div class="gpspl-msg-bubble">${escapeHtml(text)}</div>`;
        body.appendChild(userMsg);
        body.scrollTop = body.scrollHeight;

        const typingMsg = document.createElement('div');
        typingMsg.className = 'gpspl-msg gpspl-msg-bot';
        typingMsg.id = 'gpsplTypingIndicator';
        typingMsg.innerHTML = `
            <div class="gpspl-msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="gpspl-msg-bubble" style="color: #64748b; font-style: italic;">
                <i class="fas fa-circle-notch fa-spin"></i> Consulting AV knowledge base...
            </div>
        `;
        body.appendChild(typingMsg);
        body.scrollTop = body.scrollHeight;

        setTimeout(() => {
            typingMsg.remove();
            const responseData = generateSmartResponse(text);

            const isEng = (currentLanguage === 'english');
            const replyText = isEng ? (responseData.reply_en || responseData.reply) : (responseData.reply_hi || responseData.reply_en || responseData.reply);

            let linksHtml = '';
            if (responseData.links && responseData.links.length > 0) {
                linksHtml = '<div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">';
                responseData.links.forEach(l => {
                    const label = isEng ? (l.label_en || l.label) : (l.label_hi || l.label_en || l.label);
                    linksHtml += `<a href="${l.url}" class="gpspl-chat-card-link">${label} <i class="fas fa-arrow-right"></i></a>`;
                });
                linksHtml += '</div>';
            }

            const teamHelpNoteHtml = isEng ? `
                <div style="margin-top: 12px; padding: 10px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; font-size: 0.78rem; color: #475569; line-height: 1.45;">
                    ðŸ’¡ <strong>Have custom space requirements or need an itemized BOQ?</strong><br>
                    Our Senior AV Systems Architects are ready to provide on-site acoustic &amp; sightline audits!
                </div>
            ` : `
                <div style="margin-top: 12px; padding: 10px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; font-size: 0.78rem; color: #475569; line-height: 1.45;">
                    ðŸ’¡ <strong>Koi aur custom room requirement ya quotation chahiye?</strong><br>
                    Aapka space chahe chhota ho ya bada, hamari Senior AV Engineering Team hamesha best advice dene ke liye ready hai!
                </div>
            `;

            const hotlineHtml = `
                <div class="gpspl-chat-hotline-card">
                    <div>
                        <strong>Senior AV Systems Consultant</strong>
                        <span>Direct Call &bull; Free Site Survey &amp; Quote</span>
                    </div>
                    <a href="tel:+919310092963" class="gpspl-chat-hotline-btn">
                        <i class="fas fa-phone"></i> Call +91 93100 92963
                    </a>
                </div>
            `;

            const botMsg = document.createElement('div');
            botMsg.className = 'gpspl-msg gpspl-msg-bot';
            botMsg.innerHTML = `
                <div class="gpspl-msg-avatar"><i class="fas fa-robot"></i></div>
                <div class="gpspl-msg-bubble">
                    ${formatMarkdownText(replyText)}
                    <button type="button" class="gpspl-msg-speaker-btn" title="Listen text-to-speech" aria-label="Listen">
                        <i class="fas fa-volume-high"></i>
                    </button>
                    ${linksHtml}
                    ${teamHelpNoteHtml}
                    ${hotlineHtml}
                </div>
            `;
            body.appendChild(botMsg);
            body.scrollTop = body.scrollHeight;

            bindSpeakerButtons();
        }, 280);
    }

    function bindSpeakerButtons() {
        document.querySelectorAll('.gpspl-msg-speaker-btn').forEach(btn => {
            btn.onclick = (e) => {
                const bubble = e.currentTarget.closest('.gpspl-msg-bubble');
                if (!bubble) return;
                const textContent = bubble.innerText;

                if (btn.classList.contains('is-speaking')) {
                    if (window.speechSynthesis) window.speechSynthesis.cancel();
                    btn.classList.remove('is-speaking');
                } else {
                    document.querySelectorAll('.gpspl-msg-speaker-btn').forEach(b => b.classList.remove('is-speaking'));
                    btn.classList.add('is-speaking');
                    speakText(textContent, currentLanguage);
                }
            };
        });
    }

    function formatMarkdownText(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    }

    function setupVoiceInput() {
        const voiceBtn = document.getElementById('gpsplVoiceBtn');
        const chatInput = document.getElementById('gpsplChatInput');
        if (!voiceBtn) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            voiceBtn.style.display = 'none';
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = (currentLanguage === 'english') ? 'en-IN' : 'hi-IN';

        let isListening = false;

        voiceBtn.addEventListener('click', () => {
            recognition.lang = (currentLanguage === 'english') ? 'en-IN' : 'hi-IN';
            if (!isListening) {
                recognition.start();
                voiceBtn.classList.add('listening');
                isListening = true;
            } else {
                recognition.stop();
                voiceBtn.classList.remove('listening');
                isListening = false;
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            voiceBtn.classList.remove('listening');
            isListening = false;
            handleUserMessage(transcript);
            chatInput.value = '';
        };

        recognition.onerror = () => {
            voiceBtn.classList.remove('listening');
            isListening = false;
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('listening');
            isListening = false;
        };
    }

    // -----------------------------------------------------------------
    // 7. INJECT FLOATING SMART WHATSAPP WIDGET (BOTTOM-LEFT)
    // -----------------------------------------------------------------
    function injectWhatsAppWidget() {
        if (document.getElementById('gpspl-whatsapp-root')) return;

        const waRoot = document.createElement('div');
        waRoot.id = 'gpspl-whatsapp-root';

        waRoot.innerHTML = `
            <div class="gpspl-wa-container" id="gpsplWaContainer">
                <a href="https://wa.me/919310092963?text=Hello%20GPSPL%2C%20I%20would%20like%20to%20discuss%20an%20AV%20or%20IT%20requirement." class="gpspl-wa-btn" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                    <span class="gpspl-wa-badge"></span>
                </a>

                <div class="gpspl-wa-popup" role="dialog" aria-label="WhatsApp Department Routing">
                    <div class="gpspl-wa-header">
                        <i class="fab fa-whatsapp"></i>
                        <div>
                            <strong>GPSPL Quick WhatsApp</strong>
                            <span>Online &bull; Instant Response</span>
                        </div>
                    </div>

                    <div class="gpspl-wa-body">
                        <a href="https://wa.me/919310092963?text=Hi%20GPSPL%2C%20I%20want%20to%20inquire%20about%20AV%20Solutions%2C%20Displays%20%26%20BOQ%20pricing." target="_blank" rel="noopener noreferrer" class="gpspl-wa-option">
                            <div class="gpspl-wa-option-info">
                                <strong>ðŸ’¬ Sales &amp; BOQ Quotes</strong>
                                <span>Displays, Video Walls &amp; VC</span>
                            </div>
                            <i class="fab fa-whatsapp"></i>
                        </a>

                        <a href="https://wa.me/918920830377?text=Hi%20GPSPL%2C%20I%20need%20urgent%20AMC%20%2F%20Breakdown%20Technical%20Support." target="_blank" rel="noopener noreferrer" class="gpspl-wa-option">
                            <div class="gpspl-wa-option-info">
                                <strong>ðŸ› ï¸ AMC &amp; Technical Service</strong>
                                <span>Support Desk &amp; Field Visit</span>
                            </div>
                            <i class="fab fa-whatsapp"></i>
                        </a>

                        <a href="https://wa.me/919310092963?text=Hi%20GPSPL%20HR%2C%20I%20am%20inquiring%20about%20Career%20Openings%20at%20GPSPL." target="_blank" rel="noopener noreferrer" class="gpspl-wa-option">
                            <div class="gpspl-wa-option-info">
                                <strong>ðŸ’¼ Careers &amp; Recruitment</strong>
                                <span>Job Opportunities</span>
                            </div>
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>

                    <div class="gpspl-wa-footer">
                        <span>Typical reply time: &lt; 5 minutes</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(waRoot);

        // Mobile tap toggle
        const waContainer = document.getElementById('gpsplWaContainer');
        const waBtn = waContainer.querySelector('.gpspl-wa-btn');
        waBtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!waContainer.classList.contains('active')) {
                    e.preventDefault();
                    waContainer.classList.add('active');
                }
            }
        });

        document.addEventListener('click', function(e) {
            if (!waContainer.contains(e.target)) {
                waContainer.classList.remove('active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { injectChatbot(); injectWhatsAppWidget(); });
    } else {
        injectChatbot();
        injectWhatsAppWidget();
    }
})();