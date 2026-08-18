/**
 * GPSPL Enterprise AI AV Systems Architect - Super Easy & Friendly Edition
 * - Crystal clear, simple language easily understood by Students, Principals & Corporate Executives
 * - 360° AV Domain Coverage (Displays, 320" LED, PTZ, DSPs, Ceiling Mics, Line-Arrays,
 *   Dante IP, Crestron Automation, Podiums, Matrix Switchers, Projectors, KVM, UPS, AMC)
 * - Warm Team Help Note & Lighthearted AV Engineering Jokes
 * - 16+ Global OEM Partnerships & Regional Distribution
 * - Speech-to-Text Voice Input & Senior AV Consultant Hotline (+91 93100 92963)
 */

(function() {
    'use strict';

    // -----------------------------------------------------------------
    // 1. LIGHTHEARTED AV & TECH JOKES
    // -----------------------------------------------------------------
    const AV_JOKES = [
        "Why did the HDMI cable break up with the adapter? Because they had too many connection issues! 🔌😂",
        "Why do AV engineers love ceiling beamforming microphones? Because the only thing they want on the boardroom table is coffee! ☕🎤",
        "Client: 'Will this 500-nit Samsung display work in bright sunlight?'\nEngineer: 'Sir, it's so bright that even your budget ideas will look brilliant!' 💡😎",
        "Why was the microphone always calm during meetings? Because it had built-in Echo Cancellation (AEC)! 🧘‍♂️🔊",
        "How many AV technicians does it take to change a projector bulb? None — they'll upgrade you to a 320-inch Active LED Wall instead! 📺🚀"
    ];

    function getRandomAvJoke() {
        return AV_JOKES[Math.floor(Math.random() * AV_JOKES.length)];
    }

    // -----------------------------------------------------------------
    // 2. SUPER EASY & FRIENDLY KNOWLEDGE BASE (JSON DATASET)
    // -----------------------------------------------------------------
    const GRAND_AV_DATASET = [
        // ================= JOKES & ICEBREAKERS =================
        {
            id: 'av_jokes',
            category: 'HUMOR',
            patterns: ['joke', 'tell me a joke', 'av joke', 'kuch funny', 'hasi', 'light joke', 'mazak'],
            title: 'AV Engineer Humor 😄',
            reply: `Here is a fun AV joke for you! 😄

${getRandomAvJoke()}

*Aapko koi bhi room setup, pricing ya technical doubt ho, humari team bilkul asaan bhasha me help karegi!* ✨`,
            links: [
                { label: 'Explore Interactive AV BOQ Calculator', url: '/#av-boq-calculator' },
                { label: 'Talk to Senior AV Consultant', url: '/contact' }
            ]
        },

        // ================= GREETINGS & HUMAN SMALL TALK =================
        {
            id: 'greetings_hello',
            category: 'GREETING',
            patterns: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'hola', 'hie', 'hy', 'kese ho', 'kaise ho', 'how are you'],
            title: 'Welcome to GPSPL AV Solutions',
            reply: `Namaste! 🙏 Welcome to GPSPL. Main aapka **AV Systems Consultant** hoon.

Main bilkul aasan bhasha me aapko kisi bhi room ya setup ke baare me guide kar sakta hoon:
• 🎓 **Smart Classroom & Touch Boards (School/College ke liye)**
• 🏢 **Boardroom & Video Meeting Setup (Office ke liye)**
• 📺 **320-Inch Active LED Walls & Samsung/LG Displays**
• 🎥 **4K PTZ Cameras & Smart Mics**
• 🔊 **Clear Sound, Speakers & Echo Khatam Karne Ka Tarika**
• 📐 **Aapke room ke liye best setup & kharcha (BOQ)**

Aap kis cheez ke baare me jaanna chahte hain?`,
            links: [
                { label: 'Explore Smart Classrooms', url: '/smart-classroom-solutions' },
                { label: 'Explore Boardroom Video Conferencing', url: '/conference-room-solutions' },
                { label: 'Launch Interactive AV BOQ Calculator', url: '/#av-boq-calculator' }
            ]
        },
        {
            id: 'nice_to_meet_you',
            category: 'GREETING',
            patterns: ['nice to meet you', 'glad to meet you', 'pleasure to meet', 'nice talking to you', 'great to meet'],
            title: 'Pleasure to connect with you',
            reply: `Bahut khushi hui aapse baat karke! 😊 GPSPL **16+ Global Brands (Samsung, LG, Harman, Poly, Sony, Crestron)** ka direct authorized partner hai.

Aap bas mujhe apna **Room Size** ya **Kitne log baithenge** bataiye — main aapko simple bhasha me best setup aur estimate bata doonga!`,
            links: [
                { label: 'View GPSPL Delivered Case Studies', url: '/case-studies' },
                { label: 'Explore 16+ Technology Partners', url: '/technology-partners' }
            ]
        },
        {
            id: 'thanks_gratitude',
            category: 'GREETING',
            patterns: ['thank you', 'thanks', 'dhanyawad', 'shukriya', 'thx', 'great help', 'awesome'],
            title: 'Aapka swagat hai',
            reply: `Most welcome! 🙌 Agar aapko kisi bhi space ka **Free On-Site Survey** karwana ho ya official quotation chahiye ho, toh humare Senior Engineers hamesha ready hain!`,
            links: [
                { label: 'Request Official Project Quote', url: '/contact' },
                { label: 'Download Commercial Datasheets', url: '/downloads' }
            ]
        },

        // ================= EASY EXPLANATIONS OF AV GEAR =================
        {
            id: 'ptz_cameras_optics',
            category: 'HARDWARE',
            patterns: ['ptz', 'camera', 'optical zoom', 'auto tracking', 'speaker tracking', 'auto framing', 'ndi', 'sdi', 'usb camera', 'webcam vs ptz', 'kyun use kare camera'],
            title: '4K PTZ Camera Kya Hota Hai & Kyun Zaroori Hai?',
            reply: `**PTZ ka simple matlab:** **P**an (Left-Right ghoomna), **T**ilt (Upar-Neeche hona), aur **Z**oom (Door ki cheez paas laana).

💡 **Normal Webcam aur PTZ Camera me kya farq hai?**
1. **Real Glass Zoom (12x/20x):** Mobile ya normal webcam door zoom karne par photo ko blur/pixelated kar deta hai. PTZ me real motorized lens hota hai jo **60 feet door khade teacher ya speaker ka bhi crystal-clear 4K close-up** leta hai.
2. **AI Auto-Tracking:** Stage par teacher ya speaker jidhar chalega, camera **bina kisi cameraman ke usko automatically follow** karega!
3. **1-Click Remote Buttons:** Button dabate hi camera turant Whiteboard ya Podium par move ho jata hai.
4. **Best For:** Zoom/Teams video calls, YouTube Live Streaming aur Smart Classrooms.`,
            links: [
                { label: 'Explore Video Conferencing Solutions', url: '/unified-communication-collaboration' },
                { label: 'Explore Video Technologies', url: '/video-technologies' }
            ]
        },
        {
            id: 'dsp_audio_echo',
            category: 'HARDWARE',
            patterns: ['dsp', 'echo', 'echo cancellation', 'aec', 'feedback', 'noise', 'awaaz gunjti hai', 'seeti aati hai', 'audio processor', 'kyun use kare dsp'],
            title: 'DSP (Digital Signal Processor) Kya Hai & Echo Kaise Rokta Hai?',
            reply: `**DSP ek 'Smart Audio Computer' hota hai** jo room ki awaaz ko saaf aur crystal clear banata hai.

💡 **Iska main kaam kya hai? (Kyun Zaroori Hai):**
1. **Echo Khatam Karna (AEC):** Jab aap Zoom/Teams call par baat karte hain aur aapko apni hi awaaz wapas gunjti hui aati hai, **DSP us echo ko 0 second me gaayab kar deta hai**.
2. **Seeti (Feedback) Rokna:** Mic aur speaker aamne-saamne aane par jo tez kaan faadne wali seeti (howling) aati hai, DSP usko turant block kar deta hai.
3. **Awaaz Equal Karna:** Dheere bolne wale ki awaaz thodi badha deta hai aur zor se chillane wale ki normal kar deta hai taaki sabki awaaz barabar aaye.
4. **AC / Fan Noise Filter:** Room ke AC aur fan ki sarr-sarr background noise ko 100% hata deta hai.`,
            links: [
                { label: 'Explore Professional Audio Solutions', url: '/professional-audio-solutions' },
                { label: 'Explore Audio Technologies', url: '/audio-technologies' }
            ]
        },
        {
            id: 'ceiling_beamforming_mics',
            category: 'HARDWARE',
            patterns: ['ceiling mic', 'beamforming', 'microphone', 'table wires', 'shure mic', 'mxa920', 'table mic problem'],
            title: 'Ceiling Beamforming Mic vs Normal Table Mic',
            reply: `**Ceiling Mic ek chhat (ceiling) par lagne wala smart mic tile hota hai.**

💡 **Table Mic ke mukable yeh kyun behtar hai?**
1. **Table 100% Khali & Clean:** Meeting table par koi taarein, mic ke wires ya holes nahi hote — table bilkul VIP aur clean dikhti hai.
2. **Smart Voice Tracking:** Chhat par laga yeh mic room me bolne wale insaan ki awaaz ko laser beam ki tarah pakad leta hai.
3. **Faltu Noise Ignore:** Laptop par type karne ki khat-khat ya paper hilane ki awaaz ko yeh mic ignore kar deta hai aur sirf bolne wale ki awaaz capture karta hai.`,
            links: [
                { label: 'Explore Professional Audio Solutions', url: '/professional-audio-solutions' },
                { label: 'Explore Conference Room Solutions', url: '/conference-room-solutions' }
            ]
        },
        {
            id: 'line_array_speakers',
            category: 'HARDWARE',
            patterns: ['speaker', 'line array', 'column speaker', 'ceiling speaker', 'sound system', 'auditorium sound', 'pa system', 'kyun use kare speaker'],
            title: 'Line-Array Column Speakers vs Normal Box Speakers',
            reply: `**Line-Array Column Speaker ek patla, lamba vertical speaker hota hai** jo bade halls aur auditoriums me lagta hai.

💡 **Normal Box Speaker se yeh kyun behtar hai?**
1. **Sabko Ek Jaisi Awaaz:** Normal speaker se aage baithne wale ke kaan me tez awaaz chubhti hai aur peeche wale ko kam sunai deta hai. **Line-array speaker aage se lekar last bench tak bilkul ek jaisi clear volume deliver karta hai**.
2. **Sab Saaf Sunai Dena:** Room me awaaz gunjti nahi hai aur har ek word bilkul saaf samajh aata hai.
3. **Slim & Modern Look:** Wall par lagne ke baad yeh bilkul sleek aur modern dikhta hai.`,
            links: [
                { label: 'Explore Professional Audio Solutions', url: '/professional-audio-solutions' },
                { label: 'Explore Education Projects', url: '/education-projects' }
            ]
        },
        {
            id: 'active_led_320_inch',
            category: 'HARDWARE',
            patterns: ['320 inch', 'active led', 'video wall', 'led wall', 'projector vs led', 'bezel', 'microled', 'kyun use kare video wall'],
            title: '320-Inch Active LED Video Wall vs Normal Projector',
            reply: `**Active LED Wall ek massive seamless screen hoti hai** (43-inch se lekar 320-inch tak) jo auditoriums, control rooms aur badi buildings me lagti hai.

💡 **Projector ya LCD Screens se yeh kyun faadu hai?**
1. **Beech Me Koi Joint Nahi (0mm Bezel):** LCD screens me beech me kaali line aati hai jo text ko kaat deti hai. Active LED me **100% seamless single badi picture** dikhti hai.
2. **Dhoop / Daylight Me Bhi Chamakdar:** Din ke ujaale me projector feeka pad jata hai; Active LED itna bright hota hai ki full daylight me bhi crystal-clear 4K HDR picture dikhti hai.
3. **10+ Saalon Ki Lifespan:** Isme projector ki tarah bulb badalne ka jhanjhat nahi hota aur yeh saalo-saal non-stop chalti hai.`,
            links: [
                { label: 'Explore Active LED Wall Solutions', url: '/active-led-wall-solutions' },
                { label: 'Active LED Installation & Calibration', url: '/active-led-wall-installation' }
            ]
        },
        {
            id: 'commercial_tv_samsung_lg',
            category: 'HARDWARE',
            patterns: ['samsung', 'commercial tv', 'qmc', 'qbc', 'befx', 'lg tv', 'nu88c', 'ua831c', 'tv price', 'display model', 'consumer vs commercial'],
            title: 'Commercial TV vs Normal Home TV me kya farq hai?',
            reply: `Bohot log sochte hain ki office ya school me normal ghar wala TV laga lein, lekin dono me bada farq hota hai:

💡 **Commercial TV lene ke 3 Bade Fayde:**
1. **Chamak (Glare) Nahi Aati:** Normal TV me mirror ki tarah room lights aur khidki ki reflection aati hai. **Samsung QMC Commercial TV me Non-Glare Matte Screen hoti hai** — reflection zero!
2. **Non-Stop 16 se 24 Ghante Run Time:** Normal TV 6 ghante me garam hoke jaldi kharab ho jata hai; Commercial display heavy-duty parts ke sath 24/7 chalne ke liye bana hai.
3. **3 Saalo Ki On-Site Warranty:** Office/Business use me normal TV ki warranty cancel ho jaati hai; Commercial screen par company engineer aapke office aake free theek karta hai.`,
            links: [
                { label: 'View Samsung QMC (500 Nits 24/7) Specs', url: '/samsung-commercial-display-qmc' },
                { label: 'View Samsung QBC Crystal UHD Specs', url: '/samsung-commercial-display-qbc' },
                { label: 'View Samsung Business TV (BEFX) Specs', url: '/samsung-business-tv-befx-h2' },
                { label: 'View LG NU88C Commercial TV Specs', url: '/lg-commercial-tv-nu88c' }
            ]
        },
        {
            id: 'room_automation_crestron_amx',
            category: 'HARDWARE',
            patterns: ['automation', 'crestron', 'amx', 'touch panel', 'room control', 'lighting control', 'motorized screen control', 'one touch meeting'],
            title: 'Room Automation (Crestron / AMX) Kya Hai?',
            reply: `**Room Automation ka matlab ek smart touch tablet se poore room ko control karna.**

💡 **Kaise kaam karta hai?**
• 5 alag-alag remote dhoondhne ke bajaye, table par rakhe **ek single touch screen se 1 button dabate hi**:
  - Room ki Lights dim ho jaati hain
  - Khidki ke parde (shades) niche aa jaate hain
  - TV/Display on ho jata hai
  - Teams/Zoom video call start ho jaati hai!
• Room se sabke nikalne par systems automatically band ho jaate hain bijli bachane ke liye.`,
            links: [
                { label: 'Explore Control & Automation Solutions', url: '/control-automation' },
                { label: 'Explore Conference Room Solutions', url: '/conference-room-solutions' }
            ]
        },
        {
            id: 'digital_podiums_lecterns',
            category: 'HARDWARE',
            patterns: ['podium', 'lectern', 'digital podium', 'smart podium', 'smart lectern', 'visualizer'],
            title: 'Digital Podium & Smart Lectern Kya Hai?',
            reply: `**Digital Podium stage par khade hoke speech ya lecture dene ka smart electronic desk hai.**

💡 **Isme kya-kya hota hai?**
• **Motorized Height Adjustment:** Speaker ki lambai ke hisab se button daba kar podium upar ya niche ho jata hai.
• **Touch Screen & Pen:** Teacher screen par digital pen se jo bhi likhega, peeche badi screen par live dikhega.
• **Gooseneck Mic & Document Camera:** Kitab ya document niche rakhne par uska live photo badi screen par project ho jata hai.`,
            links: [
                { label: 'Explore Smart Classroom Solutions', url: '/smart-classroom-solutions' },
                { label: 'Explore Education Projects', url: '/education-projects' }
            ]
        },

        // ================= ROOM BOQ SIZING & RECOMMENDATIONS =================
        {
            id: 'boq_classroom_breakdown',
            category: 'BOQ_ENGINE',
            patterns: ['classroom boq', 'school setup kya lagta hai', 'classroom me konsa', 'smart classroom configuration', 'classroom equipment', 'school pricing', 'lecture hall setup'],
            title: 'Smart Classroom Setup (Asaan Bhasha Me Guide)',
            reply: `School ya College me students aur room size ke hisab se **3 Tarah Ke Setups** bante hain:

📐 **1. Chhota Classroom (30–45 Students | Room: 20x25 ft)**
• 65" ya 75" **LG / Samsung 4K Giant Touch Screen** (Google Play Store ke sath).
• 2 Ceiling Speakers + Teacher ke gale me lagne wala wireless collar mic.

📐 **2. Medium Smart Class (45–75 Students | Room: 25x35 ft)**
• 86" Bada 4K Interactive Touch Screen.
• **Digital Smart Podium** (Touch screen + mic ke sath).
• 4 Ceiling Speakers + Anti-Feedback (seeti rokne wala processor).
• 4K Camera (Live online class chalane ke liye).

📐 **3. Bada Lecture Hall / Auditorium (80–150+ Students)**
• 136" **Active LED Video Wall** ya Dual 86" Touch Boards.
• **Line-Array Speakers** (last bench tak ek jaisi awaaz).
• **4K PTZ Camera (20x Zoom)** jo stage par chalte hue teacher ko automatically follow karega.`,
            links: [
                { label: 'Explore Smart Classroom Solutions Page', url: '/smart-classroom-solutions' },
                { label: 'View LG CreateBoard Specs', url: '/lg-createboard-tr3er' },
                { label: 'Launch Interactive AV BOQ Calculator', url: '/#av-boq-calculator' }
            ]
        },
        {
            id: 'boq_boardroom_breakdown',
            category: 'BOQ_ENGINE',
            patterns: ['boardroom boq', 'conference room setup', 'meeting room konsa', 'boardroom equipment', 'teams rooms setup', 'zoom rooms boq', 'huddle room vs boardroom'],
            title: 'Office Conference Room Setup (Simple Guide)',
            reply: `Office meetings aur video calls ke liye **3 Simple Setups** aate hain:

🏢 **1. Chhota Meeting Room (4–7 Seats)**
• 55" Samsung 4K Commercial TV.
• All-in-One 4K Video Bar (Camera + Mic + Speaker sab ek me).
• Bina wire ke laptop se screen share (ClickShare).

🏢 **2. Medium Boardroom (8–16 Seats)**
• 75" ya 85" **Samsung QMC 500-Nit (Non-Glare Matte Screen)**.
• Chhat par laga Ceiling Beamforming Mic (Table par zero wires).
• **4K PTZ Camera (12x Optical Zoom)** jo bolne wale par zoom karega.
• DSP Echo Cancellation (Gunj khatam karne ke liye).

🏢 **3. Bada Executive Boardroom (18–30+ Seats)**
• Dual 85" Screens ya **136" Active LED Video Wall**.
• Dual Ceiling Mics + 6 Ceiling Speakers + Dual PTZ 20x Tracking Cameras.
• Table par rakha Touch Panel jisse 1 click me lights aur meeting start ho jaye.`,
            links: [
                { label: 'Explore Conference Room Solutions Page', url: '/conference-room-solutions' },
                { label: 'View Samsung QMC 500-Nit Specs', url: '/samsung-commercial-display-qmc' },
                { label: 'Explore Unified Communication (UC)', url: '/unified-communication-collaboration' }
            ]
        },
        {
            id: 'amc_services_maintenance',
            category: 'SERVICES',
            patterns: ['amc', 'service', 'maintenance', 'support', 'installation', 'repair', 'delhi ncr', 'sla', 'response time'],
            title: 'Installation & 4-Hour On-Site AMC Support',
            reply: `GPSPL sirf samaan bechta nahi hai, balki poora setup install karke maintain bhi karta hai:

🛡️ **Hamari Service Guarantee:**
• ⏱️ **4 Ghante Ke Andar Engineer On-Site:** Delhi NCR, Noida aur Gurgaon me koi dikkat aane par 4 ghante me engineer haazir.
• 🔄 **Standby Unit Replacement:** Agar koi display repair me jaye toh kaam na ruke iske liye temporary display lagana.
• 🧹 **Quarterly Maintenance:** Har 3 mahine me sound tuning, camera lens cleaning aur system checkup.`,
            links: [
                { label: 'Explore AMC & Maintenance Services', url: '/amc-maintenance-services' },
                { label: 'Audio Visual Integration Services', url: '/audio-visual-integration' }
            ]
        },
        {
            id: 'about_gpspl',
            category: 'COMPANY',
            patterns: ['gpspl kya hai', 'who is gpspl', 'about gpspl', 'kya karti hai', 'company profile', 'distributor', 'kiske partner ho', 'oem', 'partners'],
            title: 'GPSPL Kya Hai & Kya Karti Hai?',
            reply: `**Global Peripheral Solution Pvt. Ltd. (GPSPL)** India ki 28 saal purani **Enterprise AV (Audio-Visual) & Display Solutions Provider** hai (Nehru Place, New Delhi).

🏆 **GPSPL Ke Bare Me Mukhya Baatein:**
• **16+ Top Global Brands Ka Partner:** *Samsung, LG, Harman Professional, Sony, Poly, Crestron, AMX, Christie, Panasonic, Logitech*.
• **500+ Projects Deliver Kiye:** Corporate offices, Schools, Universities, Hospitals, aur Govt Bhavans me.
• **Complete A to Z Service:** Room Design Consultation → Genuine OEM Hardware Supply → On-Site Installation → AMC Support.`,
            links: [
                { label: 'Explore Technology Partners (16+ OEMs)', url: '/technology-partners' },
                { label: 'View Case Studies & Projects', url: '/case-studies' },
                { label: 'Company Profile & Vision', url: '/about-gpspl' }
            ]
        }
    ];

    // -----------------------------------------------------------------
    // 3. INTELLIGENT NLP INTENT PARSER & KEYWORD MATCHER
    // -----------------------------------------------------------------
    function generateSmartResponse(query) {
        const clean = query.toLowerCase().trim();

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

        // 3. Contextual Universal Fallback
        return {
            id: 'universal_fallback',
            category: 'FALLBACK',
            title: 'GPSPL Enterprise AV Consultation',
            reply: `GPSPL **16+ Global OEM Brands** ka authorized regional partner hai. Hum aasan bhasha me aapke space ke liye best hardware supply aur install karte hain:
• **Displays:** 43" se lekar 320"+ Active LED Video Walls & Samsung/LG Commercial Displays.
• **Video Conferencing:** 4K PTZ auto-tracking cameras, Microsoft Teams & Zoom Rooms.
• **Audio Systems:** Ceiling beamforming mics, DSP echo cancellation & clear speakers.
• **Education Tech:** Google Play Store wale 4K interactive touch panels & digital podiums.
• **Automation:** Crestron/AMX touch panels, 4K matrix switchers & clean power UPS.

Aap bas apna room size ya requirement batayein, main aasan shabdon me poora setup samjha doonga!`,
            links: [
                { label: 'Explore Smart Classrooms', url: '/smart-classroom-solutions' },
                { label: 'Explore Boardroom Video Conferencing', url: '/conference-room-solutions' },
                { label: 'Explore 320" Active LED Video Walls', url: '/active-led-wall-solutions' },
                { label: 'Launch Interactive AV BOQ Calculator', url: '/#av-boq-calculator' }
            ]
        };
    }

    // -----------------------------------------------------------------
    // 4. BUILD CHATBOT DOM & UI
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
                    <span>Ask Anything &bull; Online</span>
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

                <!-- Body -->
                <div class="gpspl-chat-body" id="gpsplChatBody">
                    <div class="gpspl-msg gpspl-msg-bot">
                        <div class="gpspl-msg-avatar"><i class="fas fa-robot"></i></div>
                        <div class="gpspl-msg-bubble">
                            Namaste! 🙏 Main aapka **GPSPL AV Systems Guide** hoon.
                            <br><br>
                            GPSPL **16+ Global Brands (Samsung, LG, Harman, Poly, Sony, Crestron)** ke sath **43" se 320"+ Active LED Walls, 4K PTZ Cameras, Audio Systems &amp; Smart Classrooms** design aur install karta hai.
                            <br><br>
                            Aapko kis room ya equipment ke baare me simple bhasha me jaanna hai?
                        </div>
                    </div>
                </div>

                <!-- Starter Chips Tray -->
                <div class="gpspl-chat-chips-tray" id="gpsplChatChips">
                    <button class="gpspl-chip" data-query="School ke liye Smart Classroom setup kaise hota hai?">🎓 Smart Classroom Guide</button>
                    <button class="gpspl-chip" data-query="Office Conference Room ke liye best setup kya hai?">🏢 Boardroom AV Guide</button>
                    <button class="gpspl-chip" data-query="320 inch Active LED Video Wall kya hoti hai?">📺 320" Active LED Walls</button>
                    <button class="gpspl-chip" data-query="PTZ Camera normal camera se kaise alag hai?">🎥 4K PTZ Cameras</button>
                    <button class="gpspl-chip" data-query="DSP audio processor echo kaise khatam karta hai?">🔊 Echo &amp; DSP Sound</button>
                    <button class="gpspl-chip" data-query="Commercial TV aur Normal TV me kya farq hai?">📺 Commercial vs Home TV</button>
                    <button class="gpspl-chip" data-query="Ceiling mic table mic se kyun accha hai?">🎙️ Ceiling Smart Mics</button>
                    <button class="gpspl-chip" data-query="GPSPL kya karti hai aur kiske partner hain?">🏆 About GPSPL &amp; 16+ Brands</button>
                    <button class="gpspl-chip" data-query="Tell me a quick AV joke">😄 Ek Tech Joke Sunao!</button>
                    <button class="gpspl-chip" data-query="Connect me with a Senior AV Consultant">📞 Consultant Se Baat Karein</button>
                </div>

                <!-- Input Area -->
                <form class="gpspl-chat-input-area" id="gpsplChatForm">
                    <input type="text" class="gpspl-chat-input" id="gpsplChatInput" placeholder="Poochiye: classroom setup, display price, camera..." autocomplete="off" required>
                    <button type="button" class="gpspl-chat-btn-voice" id="gpsplVoiceBtn" title="Speech to text" aria-label="Voice input">
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
                <i class="fas fa-circle-notch fa-spin"></i> Checking simple AV solution...
            </div>
        `;
        body.appendChild(typingMsg);
        body.scrollTop = body.scrollHeight;

        setTimeout(() => {
            typingMsg.remove();
            const responseData = generateSmartResponse(text);

            let linksHtml = '';
            if (responseData.links && responseData.links.length > 0) {
                linksHtml = '<div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">';
                responseData.links.forEach(l => {
                    linksHtml += `<a href="${l.url}" class="gpspl-chat-card-link">${l.label} <i class="fas fa-arrow-right"></i></a>`;
                });
                linksHtml += '</div>';
            }

            const teamHelpNoteHtml = `
                <div style="margin-top: 12px; padding: 10px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; font-size: 0.78rem; color: #475569; line-height: 1.45;">
                    💡 <strong>Koi aur doubt ya custom room requirement hai?</strong><br>
                    Aapka space chahe chhota ho ya bada, hamari Senior AV Engineering Team hamesha aapko best advice dene ke liye ready hai!
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
                    ${formatMarkdownText(responseData.reply)}
                    ${linksHtml}
                    ${teamHelpNoteHtml}
                    ${hotlineHtml}
                </div>
            `;
            body.appendChild(botMsg);
            body.scrollTop = body.scrollHeight;
        }, 320);
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
        recognition.lang = 'en-IN';

        let isListening = false;

        voiceBtn.addEventListener('click', () => {
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
    // 5. INJECT FLOATING SMART WHATSAPP WIDGET (BOTTOM-LEFT WITH 3 OPTIONS)
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
                                <strong>💬 Sales &amp; BOQ Quotes</strong>
                                <span>Displays, Video Walls &amp; VC</span>
                            </div>
                            <i class="fab fa-whatsapp"></i>
                        </a>

                        <a href="https://wa.me/918920830377?text=Hi%20GPSPL%2C%20I%20need%20urgent%20AMC%20%2F%20Breakdown%20Technical%20Support." target="_blank" rel="noopener noreferrer" class="gpspl-wa-option">
                            <div class="gpspl-wa-option-info">
                                <strong>🛠️ AMC &amp; Technical Service</strong>
                                <span>Support Desk &amp; Field Visit</span>
                            </div>
                            <i class="fab fa-whatsapp"></i>
                        </a>

                        <a href="https://wa.me/919310092963?text=Hi%20GPSPL%20HR%2C%20I%20am%20inquiring%20about%20Career%20Openings%20at%20GPSPL." target="_blank" rel="noopener noreferrer" class="gpspl-wa-option">
                            <div class="gpspl-wa-option-info">
                                <strong>💼 Careers &amp; Recruitment</strong>
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
