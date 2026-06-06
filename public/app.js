// State Directory Data
const statesData = [
  { name: "California", abbr: "CA", hours: 135, board: "Department of Real Estate (DRE)", url: "https://www.dre.ca.gov/", notes: "Requires three courses: Real Estate Principles (45h), Practices (45h), and one elective (45h).", difficulty: "home", difficultyLabel: "Home State" },
  { name: "Texas", abbr: "TX", hours: 180, board: "Texas Real Estate Commission (TREC)", url: "https://www.trec.texas.gov/", notes: "Requires six 30-hour courses. One of the most rigorous education requirements in the country.", difficulty: "easy", difficultyLabel: "Easy: National Exam Waived" },
  { name: "Florida", abbr: "FL", hours: 63, board: "Department of Business & Professional Regulation", url: "https://www.myfloridalicense.com/intentions2.asp?chrgval=re", notes: "Requires a single 63-hour sales associate pre-license course.", difficulty: "hard", difficultyLabel: "Hard: Full Education & Exam" },
  { name: "New York", abbr: "NY", hours: 77, board: "NYS Division of Licensing Services", url: "https://dos.ny.gov/real-estate-salesperson", notes: "Recently increased from 75 to 77 hours. Includes instruction on fair housing and ethical practices.", difficulty: "medium", difficultyLabel: "Medium: Education Waiver Request" },
  { name: "Georgia", abbr: "GA", hours: 75, board: "Georgia Real Estate Commission (GREC)", url: "https://grec.state.ga.us/", notes: "Requires a 75-hour salesperson pre-license course and passing the school final exam before the state exam.", difficulty: "hard", difficultyLabel: "Hard: No Reciprocity with CA" },
  { name: "Illinois", abbr: "IL", hours: 75, board: "Dept. of Financial & Professional Regulation", url: "https://idfpr.illinois.gov/profs/re.html", notes: "Requires 75 hours of broker pre-licensing education (Illinois calls entry-level agents 'brokers').", difficulty: "hard", difficultyLabel: "Hard: Full Education & Exam" },
  { name: "North Carolina", abbr: "NC", hours: 75, board: "Real Estate Commission (NCREC)", url: "https://www.ncrec.gov/", notes: "Requires a 75-hour broker pre-licensing course. Post-licensing education (90 hours) is required within 18 months.", difficulty: "medium", difficultyLabel: "Medium: Pre-License Waived" },
  { name: "Ohio", abbr: "OH", hours: 120, board: "Ohio Division of Real Estate", url: "https://com.ohio.gov/divisions-and-offices/real-estate-and-professional-licensing", notes: "Requires four college-level courses: Principles & Practices, Law, Finance, and Appraisal.", difficulty: "hard", difficultyLabel: "Hard: Full Education & Exam" },
  { name: "Washington", abbr: "WA", hours: 90, board: "Washington State Department of Licensing", url: "https://www.dol.wa.gov/business/realestate/", notes: "Requires Real Estate Fundamentals (60h) and Real Estate Practices (30h) courses.", difficulty: "medium", difficultyLabel: "Medium: Education Waived" },
  { name: "Colorado", abbr: "CO", hours: 168, board: "Colorado Division of Real Estate", url: "https://dre.colorado.gov/", notes: "Requires a comprehensive 168-hour curriculum covering law, practice, contracts, and trust accounts.", difficulty: "easy", difficultyLabel: "Easy: Full Reciprocity" },
  { name: "Arizona", abbr: "AZ", hours: 90, board: "Arizona Department of Real Estate (ADRE)", url: "https://azre.gov/", notes: "Requires a 90-hour pre-licensing course and a 6-hour contract writing class.", difficulty: "medium", difficultyLabel: "Medium: Education Waived" },
  { name: "Pennsylvania", abbr: "PA", hours: 75, board: "Pennsylvania Real Estate Commission", url: "https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/RealEstateCommission/Pages/default.aspx", notes: "Requires two courses: Real Estate Fundamentals (30h) and Real Estate Practice (45h).", difficulty: "hard", difficultyLabel: "Hard: No Reciprocity with CA" },
  { name: "Michigan", abbr: "MI", hours: 40, board: "LARA Licensing Division", url: "https://www.michigan.gov/lara/bureau-list/cscl/licensing/prof/real-estate", notes: "One of the shortest education requirements: just a single 40-hour pre-licensing course.", difficulty: "hard", difficultyLabel: "Hard: Full Education & Exam" },
  { name: "Virginia", abbr: "VA", hours: 60, board: "Dept. of Professional & Occupational Regulation", url: "https://www.dpor.virginia.gov/Boards/Real-Estate", notes: "Requires a 60-hour course in Principles and Practices of Real Estate.", difficulty: "easy", difficultyLabel: "Easy: Reciprocal Waiver" },
  { name: "Massachusetts", abbr: "MA", hours: 40, board: "Board of Registration of Real Estate", url: "https://www.mass.gov/orgs/board-of-registration-of-real-estate-brokers-and-salespersons", notes: "Requires 40 hours of pre-licensing classes. Must be completed at an approved physical or online school.", difficulty: "medium", difficultyLabel: "Medium: Education Waiver Request" }
];

// Phase Titles map for Milestones
const phaseMap = {
  1: { title: "Phase 1: Pre-Licensing Education", tab: "curriculum" },
  2: { title: "Phase 2: Exam Prep & Passing the Licensing Exam", tab: "curriculum" },
  3: { title: "Phase 3: Background Check & License Application", tab: "curriculum" },
  4: { title: "Phase 4: Sponsoring Brokerage Selection", tab: "curriculum" },
  5: { title: "Phase 5: Join Realtor Board & Get MLS Access", tab: "curriculum" },
  6: { title: "Phase 6: Executing Personal / Investment Deals", tab: "curriculum" },
  7: { title: "Phase 7: Scale Investment Portfolio & Maintenance", tab: "curriculum" }
};

// Global App State
let progressData = {};
let brokerCompareData = {};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Load Saved Progress and Broker Notes
  loadProgress();
  loadBrokerNotes();

  // Setup Event Listeners
  setupNavigation();
  setupCheckboxes();
  setupCalculator();
  setupBrokerComparison();
  setupStateSearch();
  setupResetButton();
  
  // Initial Rendering
  renderStates(statesData);
  updateProgressUI();
  calculateSavings();
});

// 1. Navigation / Tab Switching
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle-btn");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("mobile-drawer-overlay");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab");
      switchTab(tabId);

      // Close mobile drawer on selection
      sidebar.classList.remove("mobile-open");
      overlay.style.display = "none";
    });
  });

  // Mobile menu trigger
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open");
    if (sidebar.classList.contains("mobile-open")) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  });

  // Close when clicking overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open");
    overlay.style.display = "none";
  });

}

function goToHome() {
  switchTab("dashboard");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("mobile-drawer-overlay");
  if (sidebar) sidebar.classList.remove("mobile-open");
  if (overlay) overlay.style.display = "none";
}

function switchTab(tabId) {
  try {
    // Hide all panels
    document.querySelectorAll(".tab-panel").forEach(panel => {
      panel.classList.remove("active");
    });
    
    // Show target panel
    const targetPanel = document.getElementById(`tab-${tabId}`);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    // Deactivate all nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    // Activate target nav link
    const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (targetLink) {
      targetLink.classList.add("active");
      targetLink.setAttribute("aria-current", "page");
    }

    // Scroll to top of content
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  } catch (err) {
    console.error("Error in switchTab:", err);
  }
}

// 2. Progress Tracker & Checkboxes
function loadProgress() {
  const saved = localStorage.getItem("investor_agent_progress");
  if (saved) {
    try {
      progressData = JSON.parse(saved);
    } catch (e) {
      progressData = {};
    }
  }

  // Apply state to checkboxes
  document.querySelectorAll("input[data-task-id]").forEach(cb => {
    const id = cb.getAttribute("data-task-id");
    cb.checked = !!progressData[id];
  });
}

function saveProgress() {
  localStorage.setItem("investor_agent_progress", JSON.stringify(progressData));
}

function setupCheckboxes() {
  document.querySelectorAll("input[data-task-id]").forEach(cb => {
    cb.addEventListener("change", () => {
      const id = cb.getAttribute("data-task-id");
      progressData[id] = cb.checked;
      saveProgress();
      updateProgressUI();
    });
  });
}

function updateProgressUI() {
  try {
    const checkboxes = document.querySelectorAll("input[data-task-id]");
    const total = checkboxes.length;
    let completed = 0;
    let totalDuration = 0;
    let completedDuration = 0;

    // Phase counters with duration
    const phaseCounts = {
      1: { c: 0, t: 0, totalDur: 0, completedDur: 0 },
      2: { c: 0, t: 0, totalDur: 0, completedDur: 0 },
      3: { c: 0, t: 0, totalDur: 0, completedDur: 0 },
      4: { c: 0, t: 0, totalDur: 0, completedDur: 0 },
      5: { c: 0, t: 0, totalDur: 0, completedDur: 0 },
      6: { c: 0, t: 0, totalDur: 0, completedDur: 0 },
      7: { c: 0, t: 0, totalDur: 0, completedDur: 0 }
    };

    checkboxes.forEach(cb => {
      const id = cb.getAttribute("data-task-id");
      const list = cb.closest(".task-list");
      const phaseId = list ? list.getAttribute("data-phase") : null;
      const duration = parseInt(cb.getAttribute("data-duration") || "0", 10);
      
      if (phaseId && phaseCounts[phaseId]) {
        phaseCounts[phaseId].t++;
        phaseCounts[phaseId].totalDur += duration;
        totalDuration += duration;
        
        if (cb.checked) {
          completed++;
          phaseCounts[phaseId].c++;
          phaseCounts[phaseId].completedDur += duration;
          completedDuration += duration;
        }
      }
    });

    // Calculate percentages
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const remainingDuration = totalDuration - completedDuration;

    // Update UI Elements
    const percentEl = document.getElementById("global-progress-percent");
    if (percentEl) percentEl.textContent = `${percent}%`;
    
    const barEl = document.getElementById("global-progress-bar");
    if (barEl) barEl.style.width = `${percent}%`;
    
    const countEl = document.getElementById("global-progress-count");
    if (countEl) countEl.textContent = `${completed} of ${total} tasks completed`;
    
    // Update global time labels
    const spentEl = document.getElementById("global-time-spent");
    if (spentEl) spentEl.textContent = completedDuration === 1 ? "1 hr" : `${completedDuration} hrs`;
    
    const remainingEl = document.getElementById("global-time-remaining");
    if (remainingEl) remainingEl.textContent = remainingDuration === 1 ? "1 hr" : `${remainingDuration} hrs`;

    const curriculumCounter = document.getElementById("roadmap-counter");
    if (curriculumCounter) {
      curriculumCounter.textContent = `${completed} of ${total} Completed`;
    }

    const curriculumTimeCounter = document.getElementById("roadmap-time-counter");
    if (curriculumTimeCounter) {
      curriculumTimeCounter.textContent = remainingDuration === 1 ? "1 hr left" : `${remainingDuration} hrs left`;
    }

    // Update phase-specific labels
    for (let phase in phaseCounts) {
      const el = document.getElementById(`p${phase}-progress`);
      if (el) {
        el.textContent = `${phaseCounts[phase].c}/${phaseCounts[phase].t}`;
        
        // Visual feedback: color phase summary if completed
        const header = el.closest(".phase-disclosure");
        if (header) {
          if (phaseCounts[phase].c === phaseCounts[phase].t) {
            header.classList.add("phase-completed");
          } else {
            header.classList.remove("phase-completed");
          }
        }
      }

      // Update phase duration badges
      const phaseTimeEl = document.getElementById(`p${phase}-time-left`);
      if (phaseTimeEl) {
        const left = phaseCounts[phase].totalDur - phaseCounts[phase].completedDur;
        phaseTimeEl.textContent = left === 1 ? "1 hr left" : `${left} hrs left`;
      }
    }

    // Update Current Milestone
    updateMilestone(checkboxes);
  } catch (err) {
    console.error("Error in updateProgressUI:", err);
  }
}

function updateMilestone(checkboxes) {
  try {
    const container = document.getElementById("current-milestone-content");
    if (!container) return;

    // Find first unchecked checkbox
    let nextTask = null;
    for (let i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        nextTask = checkboxes[i];
        break;
      }
    }

    if (!nextTask) {
      // All tasks completed!
      container.innerHTML = `
        <div class="milestone-progress-info" style="border-color: var(--success); background-color: rgba(16, 185, 129, 0.05);">
          <div class="milestone-phase text-success">CONGRATULATIONS!</div>
          <div class="milestone-title">You've completed the curriculum!</div>
          <p class="milestone-desc">You are officially ready to operate as a SquirrelAgent. Go find those commission-free deals!</p>
        </div>
      `;
      return;
    }

    const label = nextTask.closest("label");
    const taskTextEl = label ? label.querySelector(".task-text") : null;
    if (!taskTextEl) {
      container.innerHTML = `<p>Error loading current milestone.</p>`;
      return;
    }

    // Clean description text
    let desc = taskTextEl.innerHTML;
    // Strip sub-links or extra elements for brief description
    const temp = document.createElement("div");
    temp.innerHTML = desc;

    // Clean task-duration-label
    const durationLabel = temp.querySelector(".task-duration-label");
    if (durationLabel) {
      durationLabel.remove();
    }

    const boldText = temp.querySelector("strong");
    const boldPrefix = boldText ? boldText.innerText : "";
    
    // Remove strong element to extract secondary description
    if (boldText) boldText.remove();
    let secondaryDesc = temp.innerText.trim();
    // Truncate secondaryDesc if too long
    if (secondaryDesc.length > 150) {
      secondaryDesc = secondaryDesc.slice(0, 150) + "...";
    }

    const list = nextTask.closest(".task-list");
    const phaseId = list ? list.getAttribute("data-phase") : "1";
    const phaseInfo = phaseMap[phaseId] || { title: "Next Milestone" };

    container.innerHTML = `
      <div class="milestone-progress-info">
        <div class="milestone-phase">Phase ${phaseId}</div>
        <div class="milestone-title">${boldPrefix || phaseInfo.title}</div>
        <p class="milestone-desc">${secondaryDesc || 'Work on completing the current step in the roadmap.'}</p>
      </div>
    `;
  } catch (err) {
    console.error("Error in updateMilestone:", err);
  }
}

function setupResetButton() {
  const btn = document.getElementById("reset-progress-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all curriculum checklist progress? This cannot be undone.")) {
        progressData = {};
        saveProgress();
        loadProgress();
        updateProgressUI();
      }
    });
  }
}

// 3. Savings & ROI Calculator
function setupCalculator() {
  const inputs = [
    "purchase-price", "commission-rate", "broker-split", "broker-flat-fee",
    "education-cost", "exam-fees", "annual-dues", "mls-fees", "eo-insurance", "tech-fees"
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    
    const eventType = el.type === "range" ? "input" : "change";
    el.addEventListener(eventType, () => {
      updateSliderLabels();
      calculateSavings();
    });
  });

  updateSliderLabels();
}

function updateSliderLabels() {
  // Price
  const price = parseInt(document.getElementById("purchase-price").value);
  document.getElementById("purchase-price-val").textContent = formatCurrency(price);
  
  // Rate
  const rate = parseFloat(document.getElementById("commission-rate").value);
  document.getElementById("commission-rate-val").textContent = `${rate.toFixed(1)}%`;
  
  // Split
  const split = parseInt(document.getElementById("broker-split").value);
  document.getElementById("broker-split-val").textContent = `${split}%`;
  
  // Flat fee
  const flat = parseInt(document.getElementById("broker-flat-fee").value);
  document.getElementById("broker-flat-fee-val").textContent = formatCurrency(flat);
}

function calculateSavings() {
  const purchasePrice = parseInt(document.getElementById("purchase-price").value);
  const commRate = parseFloat(document.getElementById("commission-rate").value) / 100;
  const brokerSplit = parseInt(document.getElementById("broker-split").value) / 100;
  const brokerFlatFee = parseInt(document.getElementById("broker-flat-fee").value);
  
  // Upfront & Maintenance Cost inputs
  const education = parseInt(document.getElementById("education-cost").value) || 0;
  const exam = parseInt(document.getElementById("exam-fees").value) || 0;
  const dues = parseInt(document.getElementById("annual-dues").value) || 0;
  const mls = parseInt(document.getElementById("mls-fees").value) || 0;
  const eo = parseInt(document.getElementById("eo-insurance").value) || 0;
  const tech = parseInt(document.getElementById("tech-fees").value) || 0;

  // 1. Commission Math
  const grossCommission = purchasePrice * commRate;
  const brokerCut = (grossCommission * brokerSplit) + brokerFlatFee;
  const netCommissionToAgent = grossCommission - brokerCut;
  
  // 2. Cost Math
  const year1Overhead = education + exam + dues + mls + eo + tech;
  
  // 3. Final Savings & Performance metrics
  const netSavings = netCommissionToAgent - year1Overhead;
  const roi = year1Overhead > 0 ? (netCommissionToAgent / year1Overhead) * 100 : 0;
  const breakEven = netCommissionToAgent > 0 ? (year1Overhead / netCommissionToAgent) : 0;

  // Update Output Elements
  document.getElementById("calc-gross-comm").textContent = formatCurrency(grossCommission);
  document.getElementById("calc-broker-cut").textContent = formatCurrency(brokerCut);
  document.getElementById("calc-startup-costs").textContent = formatCurrency(year1Overhead);
  document.getElementById("calc-roi").textContent = `${Math.round(roi)}%`;
  document.getElementById("calc-break-even").textContent = breakEven.toFixed(2);
  
  // Net Savings display with plus/minus
  const netSavingsEl = document.getElementById("calc-net-savings");
  if (netSavings >= 0) {
    netSavingsEl.textContent = formatNumber(netSavings);
    netSavingsEl.parentElement.querySelector(".currency-symbol").textContent = "$";
    netSavingsEl.parentElement.style.color = "var(--success)";
  } else {
    netSavingsEl.textContent = formatNumber(Math.abs(netSavings));
    netSavingsEl.parentElement.querySelector(".currency-symbol").textContent = "-$";
    netSavingsEl.parentElement.style.color = "var(--error)";
  }

  // Update ROI progress bar
  const roiBar = document.getElementById("calc-roi-bar");
  const cappedRoiWidth = Math.min(Math.max(roi / 5, 0), 100); // Scale 500% ROI to 100% width
  roiBar.style.width = `${cappedRoiWidth}%`;
  
  // Sync to Dashboard
  const dashSavingsEl = document.getElementById("dashboard-est-savings");
  const dashNetSavingsEl = document.getElementById("dashboard-net-savings");
  if (dashSavingsEl && dashNetSavingsEl) {
    dashSavingsEl.textContent = formatCurrency(netSavings);
    dashNetSavingsEl.textContent = (netSavings >= 0 ? "+" : "") + formatCurrency(netSavings);
    
    // Update dashboard helper texts based on price/rate
    const helperEl = dashSavingsEl.nextElementSibling.nextElementSibling;
    if (helperEl) {
      helperEl.textContent = `Based on a ${formatCurrency(purchasePrice)} purchase at ${(commRate*100).toFixed(1)}% commission`;
    }
  }
}

// 4. Broker Notes Comparison
function loadBrokerNotes() {
  const saved = localStorage.getItem("investor_agent_broker_compare");
  if (saved) {
    try {
      brokerCompareData = JSON.parse(saved);
      
      // Populate fields
      const fields = [
        "broker-a-name", "broker-b-name", 
        "broker-a-split", "broker-b-split",
        "broker-a-flat", "broker-b-flat",
        "broker-a-monthly", "broker-b-monthly",
        "broker-a-personal", "broker-b-personal",
        "broker-a-parttime", "broker-b-parttime",
        "broker-notes"
      ];
      
      fields.forEach(id => {
        const el = document.getElementById(id);
        if (el && brokerCompareData[id] !== undefined) {
          el.value = brokerCompareData[id];
        }
      });
    } catch (e) {
      brokerCompareData = {};
    }
  }
}

function setupBrokerComparison() {
  const fields = [
    "broker-a-name", "broker-b-name", 
    "broker-a-split", "broker-b-split",
    "broker-a-flat", "broker-b-flat",
    "broker-a-monthly", "broker-b-monthly",
    "broker-a-personal", "broker-b-personal",
    "broker-a-parttime", "broker-b-parttime",
    "broker-notes"
  ];
  
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    
    el.addEventListener("input", () => {
      brokerCompareData[id] = el.value;
      localStorage.setItem("investor_agent_broker_compare", JSON.stringify(brokerCompareData));
    });
  });
}

// 5. State Requirements Lookup
function setupStateSearch() {
  const searchInput = document.getElementById("state-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = statesData.filter(s => {
        return s.name.toLowerCase().includes(q) || s.abbr.toLowerCase().includes(q);
      });
      renderStates(filtered);
    });
  }
}

function renderStates(list) {
  const grid = document.getElementById("state-cards-grid");
  if (!grid) return;
  
  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No matching states found.</div>`;
    return;
  }

  grid.innerHTML = list.map(s => `
    <div class="card glass-card state-card">
      <div>
        <div class="state-card-top">
          <div class="state-name-wrapper">
            <span class="state-name">${s.name}</span>
            <span class="state-abbr">${s.abbr}</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
            <span class="state-hours-badge">${s.hours} Hrs</span>
            <span class="transfer-badge ${s.difficulty}">${s.difficultyLabel}</span>
          </div>
        </div>
        <p class="state-details">${s.notes}</p>
      </div>
      <a href="${s.url}" target="_blank" rel="noopener" class="state-link">
        <span>${s.board}</span>
        <i data-lucide="external-link"></i>
      </a>
    </div>
  `).join('');
  
  // Re-create icons inside dynamically generated cards
  lucide.createIcons();
}

// Formatting Utilities
function formatCurrency(num) {
  return '$' + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumber(num) {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
