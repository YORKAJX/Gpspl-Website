with open('auditorium-av-solutions.html', 'r', encoding='utf-8') as f:
    text = f.read().replace('\r\n', '\n')

target = 'btn-matrix-wa"><i class="fab fa-whatsapp"></i></a>\n                    </div>'
disclaimer = '''btn-matrix-wa"><i class="fab fa-whatsapp"></i></a>
                    </div>
                    <p class="engineering-indicative-disclaimer" style="font-size:0.75rem; color:#94a3b8; line-height:1.55; margin:14px 0 0 0; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
                        <i class="fas fa-info-circle" style="color:#ef3438; margin-right:4px;"></i>
                        <strong>Engineering Disclaimer:</strong> Equipment recommendations, acoustic targets (RT60: 0.8s–1.2s, STI &gt; 0.65), and budget bands shown are indicative design baselines based on standard room geometries. Final engineered BOQs, rigging structural ratings, and DSP channel allocations require physical onsite inspection and computerized 3D acoustic simulation (EASE modeling).
                    </p>'''

assert target in text, "target not found"
text = text.replace(target, disclaimer, 1)

with open('auditorium-av-solutions.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Added indicative engineering disclaimer to auditorium-av-solutions.html!")

# Update room configurator
with open('JS/room-configurator.js', 'r', encoding='utf-8') as f:
    rc_text = f.read()

rc_text = rc_text.replace(
    '🔒 ESTIMATE LOCKED',
    '🔒 INDICATIVE ESTIMATE BAND'
)
rc_text = rc_text.replace(
    'TURNKEY AV PROJECT ESTIMATE</span>',
    'INDICATIVE AV PROJECT ESTIMATE</span>'
)

with open('JS/room-configurator.js', 'w', encoding='utf-8') as f:
    f.write(rc_text)

print("Updated JS/room-configurator.js with indicative estimate band label!")
