function initIndustries() {
  const tabs = document.querySelectorAll('.pill-tab');
  const highlight = document.getElementById('industryHighlight');
  const list = document.getElementById('industryList');

  if (!tabs.length || !highlight || !list) return;

  const content = {
    education: {
      title: 'Smart campuses & digital classrooms',
      desc: 'Universities modernise learning spaces with GPSPL.',
      items: [
        'Interactive boards & capture',
        'Hybrid classrooms',
        'Campus signage',
        'Centralised AV control'
      ]
    },
    corporate: {
      title: 'Enterprise collaboration & boardrooms',
      desc: 'Reliable AV for meetings and command centres.',
      items: [
        'Boardroom AV systems',
        'Video conferencing',
        'Control rooms',
        'Digital signage'
      ]
    },
    public: {
      title: 'Public sector & government solutions',
      desc: 'Mission-critical AV deployments.',
      items: [
        'Command centres',
        'Video walls',
        'Monitoring systems',
        '24×7 support'
      ]
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const data = content[tab.dataset.target];
      if (!data) return;

      highlight.innerHTML = `<h3>${data.title}</h3><p>${data.desc}</p>`;
      list.innerHTML = data.items.map(i => `<li>${i}</li>`).join('');
    }, { passive: true });
  });
}
