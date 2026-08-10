/**
 * GPSPL Careers Portal — Structured Job Data & Application Flow
 * Future-Ready Architecture: Add or edit jobs in GPSPL_JOBS array.
 */

const GPSPL_JOBS = [
  {
    id: "av-technician",
    slug: "av-technician",
    title: "AV Technician",
    department: "Technical / Engineering",
    experience: "1+ Year",
    experienceRequirement: "Minimum 1 year of relevant professional AV experience (Mandatory)",
    employmentType: "Full Time",
    location: "Delhi NCR / On-site",
    shortDescription: "Join our technical team to install, configure, commission and support professional Audio-Visual systems across client sites.",
    aboutRole: "As an AV Technician at GPSPL, you will be on the front lines of enterprise technology deployment. You will be responsible for installing, configuring, testing, and commissioning high-end Audio-Visual, active LED, video conferencing, control, and acoustic setups for corporate boardrooms, auditoriums, and smart learning spaces across Delhi NCR and India.",
    responsibilities: [
      "Install and commission professional AV systems across client sites",
      "Configure and troubleshoot AV equipment including DSPs, switchers, amplifiers, and displays",
      "Work with integrated audio, video, control, and automation systems",
      "Perform basic networking, IP configuration, and LAN connectivity for AV endpoints",
      "Conduct end-to-end system testing and commissioning before client handover",
      "Provide responsive on-site technical support and warranty assistance",
      "Diagnose, troubleshoot, and resolve hardware and signal-flow issues",
      "Coordinate closely with project managers and solution engineering teams",
      "Travel to client sites as required for project delivery and service SLAs"
    ],
    requirements: [
      "Minimum 1 year of relevant professional AV installation/support experience (Mandatory — not a fresher role)",
      "Diploma / ITI / B.Tech in Electronics, Electrical, IT, Computer Science or related field",
      "Hands-on experience in AV installation, commissioning, troubleshooting or technical field support",
      "Basic knowledge of networking, IP addressing, switch configurations, and cable termination",
      "Strong analytical troubleshooting and problem-solving skills",
      "Ability and physical agility to work effectively on client project sites",
      "Willingness to travel for regional project requirements"
    ],
    preferredSkills: [
      "AMX", "Crestron", "Extron", "DSP", "BSS", "Biamp", "Dante",
      "Networking", "IP Addressing", "Video Conferencing", "Display Installation",
      "Projector Installation", "AV Integration"
    ],
    roleType: "av-tech",
    status: "open"
  },
  {
    id: "business-growth-associate",
    slug: "business-growth-associate",
    title: "Business Growth Associate",
    department: "Business Development / Growth",
    experience: "1+ Year / Recent Graduate",
    experienceRequirement: "1+ year experience OR recently graduated candidates are welcome to apply",
    employmentType: "Full Time",
    location: "Delhi NCR",
    shortDescription: "Join our growth team to identify new opportunities, develop client relationships and support business development initiatives.",
    aboutRole: "As a Business Growth Associate at GPSPL, you will drive enterprise relationship development and business expansion. Working alongside experienced sales and technical leaders, you will engage prospective corporate, education, and government clients, identify technology integration needs, and support end-to-end proposal and deal closure cycles.",
    responsibilities: [
      "Identify and develop new business opportunities across enterprise sectors",
      "Support active lead generation and business development campaigns",
      "Conduct basic market, industry, and competitor landscape research",
      "Communicate professionally with prospective corporate clients and partners",
      "Understand client AV/IT requirements and align them with GPSPL solutions",
      "Assist in preparing commercial presentations, client pitches, and BOQ proposals",
      "Support digital sales and marketing engagement initiatives",
      "Maintain structured CRM records and follow up on business opportunities",
      "Coordinate with sales, marketing, and engineering teams for timely project estimations",
      "Contribute actively to company growth milestones and client retention"
    ],
    requirements: [
      "B.Tech / BBA / MBA / B.Com or equivalent university degree",
      "1+ year of relevant experience OR recently graduated candidates are welcome to apply (Freshers eligible)",
      "Good command of spoken and written English (Mandatory)",
      "Professional, confident, and persuasive communication style",
      "Basic working knowledge of MS Excel and spreadsheet reporting",
      "Good presentation, pitch, and interpersonal relationship skills",
      "Basic understanding of B2B business development and enterprise sales cycles",
      "Strong learning attitude, proactive initiative, and willingness to grow in the AV/IT industry",
      "Ability to interact professionally with corporate and institutional decision-makers"
    ],
    preferredSkills: [
      "Business Development", "Lead Generation", "Market Research", "Sales & Marketing",
      "Client Relationship Management", "MS Excel", "PowerPoint", "Presentation Skills", "CRM"
    ],
    roleType: "business-growth",
    status: "open"
  }
];

// Initialize Careers Page
document.addEventListener('DOMContentLoaded', () => {
  renderJobCards();
  initCareersModal();
  checkUrlForJobParam();
});

function renderJobCards() {
  const container = document.getElementById('openingsGrid');
  if (!container) return;

  const activeJobs = GPSPL_JOBS.filter(job => job.status === 'open');
  if (activeJobs.length === 0) {
    container.innerHTML = `<p class="no-jobs-msg">There are no current open positions at this moment. You can submit your general profile below.</p>`;
    return;
  }

  container.innerHTML = activeJobs.map(job => `
    <article class="career-job-card" data-job-id="${job.id}">
      <div class="career-job-card-top">
        <span class="career-job-dept">${job.department}</span>
        <span class="career-job-type">${job.employmentType}</span>
      </div>
      <h3 class="career-job-title">${job.title}</h3>
      <p class="career-job-desc">${job.shortDescription}</p>
      
      <div class="career-job-meta-pills">
        <span><i class="fas fa-briefcase"></i> ${job.experience}</span>
        <span><i class="fas fa-location-dot"></i> ${job.location}</span>
      </div>

      <div class="career-job-skills">
        ${job.preferredSkills.slice(0, 5).map(skill => `<span class="career-skill-tag">${skill}</span>`).join('')}
        ${job.preferredSkills.length > 5 ? `<span class="career-skill-tag career-skill-tag-more">+${job.preferredSkills.length - 5} more</span>` : ''}
      </div>

      <div class="career-job-card-action">
        <button type="button" class="btn-primary job-view-btn" data-job-id="${job.id}">
          <span>View Job &amp; Apply</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </article>
  `).join('');

  // Bind click handlers
  container.querySelectorAll('.job-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const jobId = e.currentTarget.getAttribute('data-job-id');
      openJobDetailsModal(jobId);
    });
  });
}

function checkUrlForJobParam() {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get('job');
  if (jobId) {
    openJobDetailsModal(jobId);
  }
}

let currentSelectedJob = null;

function initCareersModal() {
  const modalOverlay = document.getElementById('careerModal');
  if (!modalOverlay) return;

  const closeBtns = modalOverlay.querySelectorAll('.modal-close-btn, .modal-backdrop-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeCareerModal);
  });

  // General profile submission trigger
  document.querySelectorAll('.general-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openGeneralApplicationModal();
    });
  });

  // Modal tab / transition to apply form
  const applyBtn = document.getElementById('jobModalApplyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      showApplicationFormView();
    });
  }

  // Back button in form
  const backToDetailsBtn = document.getElementById('backToDetailsBtn');
  if (backToDetailsBtn) {
    backToDetailsBtn.addEventListener('click', () => {
      showJobDetailsView();
    });
  }

  // Form submission handler
  const appForm = document.getElementById('careerApplicationForm');
  if (appForm) {
    appForm.addEventListener('submit', handleApplicationSubmit);
  }
}

function openJobDetailsModal(jobId) {
  const job = GPSPL_JOBS.find(j => j.id === jobId);
  if (!job) return;

  currentSelectedJob = job;
  const modal = document.getElementById('careerModal');
  if (!modal) return;

  // Populate Job Details
  document.getElementById('modalJobTitle').textContent = job.title;
  document.getElementById('modalJobDept').textContent = job.department;
  document.getElementById('modalJobLocation').innerHTML = `<i class="fas fa-location-dot"></i> ${job.location}`;
  document.getElementById('modalJobExp').innerHTML = `<i class="fas fa-briefcase"></i> ${job.experience}`;
  document.getElementById('modalJobType').innerHTML = `<i class="fas fa-clock"></i> ${job.employmentType}`;
  document.getElementById('modalJobAbout').textContent = job.aboutRole;

  // Responsibilities
  const respList = document.getElementById('modalJobRespList');
  respList.innerHTML = job.responsibilities.map(r => `<li><i class="fas fa-check-circle"></i> <span>${r}</span></li>`).join('');

  // Requirements
  const reqList = document.getElementById('modalJobReqList');
  reqList.innerHTML = job.requirements.map(r => `<li><i class="fas fa-check-circle"></i> <span>${r}</span></li>`).join('');

  // Skills
  const skillsContainer = document.getElementById('modalJobSkillsList');
  skillsContainer.innerHTML = job.preferredSkills.map(s => `<span class="career-modal-skill-chip">${s}</span>`).join('');

  // Setup Dynamic Questions in Form
  setupRoleSpecificQuestions(job);

  // Hidden Job Fields
  document.getElementById('formJobId').value = job.id;
  document.getElementById('formJobTitle').value = job.title;

  // Reset modal to Details View
  showJobDetailsView();
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function openGeneralApplicationModal() {
  currentSelectedJob = null;
  const modal = document.getElementById('careerModal');
  if (!modal) return;

  document.getElementById('modalJobTitle').textContent = "General Application";
  document.getElementById('modalJobDept').textContent = "Talent Pool";
  document.getElementById('formJobId').value = "general-application";
  document.getElementById('formJobTitle').value = "General Application / Future Vacancies";

  setupGeneralRoleQuestions();
  showApplicationFormView();
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeCareerModal() {
  const modal = document.getElementById('careerModal');
  if (!modal) return;
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}

function showJobDetailsView() {
  document.getElementById('modalDetailsView').style.display = 'block';
  document.getElementById('modalFormView').style.display = 'none';
  document.getElementById('modalSuccessView').style.display = 'none';
  document.getElementById('careerModalContent').scrollTop = 0;
}

function showApplicationFormView() {
  document.getElementById('modalDetailsView').style.display = 'none';
  document.getElementById('modalFormView').style.display = 'block';
  document.getElementById('modalSuccessView').style.display = 'none';
  document.getElementById('careerModalContent').scrollTop = 0;
}

function showSuccessConfirmationView() {
  document.getElementById('modalDetailsView').style.display = 'none';
  document.getElementById('modalFormView').style.display = 'none';
  document.getElementById('modalSuccessView').style.display = 'block';
  document.getElementById('careerModalContent').scrollTop = 0;
}

function setupRoleSpecificQuestions(job) {
  const container = document.getElementById('roleSpecificQuestionsContainer');
  if (!container) return;

  if (job.roleType === 'av-tech') {
    container.innerHTML = `
      <div class="career-form-section-title">
        <h4>Role-Specific Technical Information</h4>
        <p>Help us understand your hands-on technical background</p>
      </div>

      <div class="form-group">
        <label class="form-label">Years of Relevant AV Installation &amp; Support Experience *</label>
        <select name="av_experience_years" class="form-control" required>
          <option value="">Select your relevant AV experience</option>
          <option value="1-2 Years">1–2 Years</option>
          <option value="2-3 Years">2–3 Years</option>
          <option value="3-5 Years">3–5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
        <small class="form-hint">Note: Minimum 1 year professional AV experience is required for this role.</small>
      </div>

      <div class="form-group">
        <label class="form-label">Which Technical Skills &amp; Equipment do you have experience with? *</label>
        <div class="career-checkbox-grid">
          ${[
            "AV Installation", "AV Troubleshooting", "AV Integration", "Audio Systems",
            "Video Systems", "DSP (Biamp/BSS)", "AMX Control", "Crestron Control",
            "Extron", "Dante Audio", "Networking & IP Addressing", "LAN / Structured Cabling",
            "Video Conferencing", "Display Installation", "Projector Installation", "Other"
          ].map(skill => `
            <label class="career-checkbox-label">
              <input type="checkbox" name="technical_skills" value="${skill}">
              <span>${skill}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  } else if (job.roleType === 'business-growth') {
    container.innerHTML = `
      <div class="career-form-section-title">
        <h4>Role-Specific Information</h4>
        <p>Help us evaluate your communication and growth skills</p>
      </div>

      <div class="form-group">
        <label class="form-label">How would you rate your professional English communication? *</label>
        <select name="english_communication_level" class="form-control" required>
          <option value="">Select communication proficiency</option>
          <option value="Fluent">Fluent (Comfortable with corporate executive meetings &amp; pitches)</option>
          <option value="Advanced">Advanced (Strong written and spoken corporate English)</option>
          <option value="Intermediate">Intermediate (Good working command)</option>
          <option value="Basic">Basic</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Are you comfortable communicating professionally with corporate clients in English? *</label>
        <div class="career-radio-row">
          <label class="career-radio-label">
            <input type="radio" name="corporate_client_english" value="Yes" required checked>
            <span>Yes, completely comfortable</span>
          </label>
          <label class="career-radio-label">
            <input type="radio" name="corporate_client_english" value="No" required>
            <span>No</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Which Business &amp; Growth Skills do you possess? *</label>
        <div class="career-checkbox-grid">
          ${[
            "Business Development", "Lead Generation", "Market Research", "Sales & Marketing",
            "Client Communication", "Business Analysis", "MS Excel", "PowerPoint / Presentations",
            "CRM Tools", "Presentation Skills", "Customer Relationship Management", "Other"
          ].map(skill => `
            <label class="career-checkbox-label">
              <input type="checkbox" name="growth_skills" value="${skill}">
              <span>${skill}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function setupGeneralRoleQuestions() {
  const container = document.getElementById('roleSpecificQuestionsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="career-form-section-title">
      <h4>Preferred Department &amp; Skills</h4>
      <p>Tell us which domain you are applying for</p>
    </div>
    <div class="form-group">
      <label class="form-label">Preferred Department / Function *</label>
      <select name="preferred_department" class="form-control" required>
        <option value="">Select preferred department</option>
        <option value="AV Engineering / Technical">AV Engineering / Technical Installation</option>
        <option value="Business Development / Sales">Business Development / Technology Sales</option>
        <option value="Project Coordination / Operations">Project Coordination &amp; Operations</option>
        <option value="AMC & Service Support">AMC &amp; Service Support</option>
        <option value="Other">Other</option>
      </select>
    </div>
  `;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove data URL prefix (e.g. "data:application/pdf;base64,")
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
}

async function handleApplicationSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  const fileInput = form.querySelector('input[type="file"][name="resume_file"]');
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidExt) {
      alert('Please upload your resume in PDF (.pdf) or Word (.doc, .docx) format.');
      return;
    }

    if (file.size > maxSizeBytes) {
      alert('The uploaded file size exceeds 5MB. Please upload a smaller file or compressed PDF.');
      return;
    }
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting Application...`;

  // Collect checked skills
  const checkedSkills = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  const formData = new FormData(form);
  if (checkedSkills.length > 0) {
    formData.append('selected_skills_list', checkedSkills.join(', '));
  }

  // Prepare payload for career email serverless function
  let resumeBase64 = null;
  let resumeFileName = null;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    try {
      resumeFileName = fileInput.files[0].name;
      resumeBase64 = await fileToBase64(fileInput.files[0]);
    } catch (err) {
      console.warn('Could not encode resume to base64:', err);
    }
  }

  const emailPayload = {
    fullName: form.querySelector('input[name="full_name"]')?.value || '',
    email: form.querySelector('input[name="email"]')?.value || '',
    phone: form.querySelector('input[name="phone"]')?.value || '',
    city: form.querySelector('input[name="current_city"]')?.value || '',
    jobId: form.querySelector('input[name="job_id"]')?.value || '',
    jobTitle: form.querySelector('input[name="job_title"]')?.value || '',
    highestQualification: form.querySelector('select[name="highest_qualification"]')?.value || '',
    courseSpecialization: form.querySelector('input[name="course_specialization"]')?.value || '',
    candidateStatus: form.querySelector('input[name="candidate_status"]:checked')?.value || '',
    totalExperience: form.querySelector('input[name="total_experience"]')?.value || '',
    currentCompany: form.querySelector('input[name="current_company"]')?.value || '',
    noticePeriod: form.querySelector('select[name="notice_period"]')?.value || '',
    expectedSalary: form.querySelector('input[name="expected_salary"]')?.value || '',
    linkedinProfile: form.querySelector('input[name="linkedin_profile"]')?.value || '',
    selectedSkills: checkedSkills.join(', '),
    resumeFileName: resumeFileName,
    resumeFileBase64: resumeBase64,
    botField: form.querySelector('input[name="bot-field"]')?.value || ''
  };

  // 1. Asynchronously send email with attachment via Netlify Function
  fetch('/.netlify/functions/career-lead-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailPayload)
  }).catch(() => {});

  // 2. Submit form to Netlify Forms (native multipart submission)
  try {
    await fetch('/', {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.log('Form submission completed.');
  }

  form.reset();
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalText;
  showSuccessConfirmationView();
}

