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
  setupReciprocityCalculator();
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
  if (typeof window.onProgressChanged === "function") {
    window.onProgressChanged(progressData);
  }
}

window.applyExternalProgress = (data) => {
  progressData = data || {};
  document.querySelectorAll("input[data-task-id]").forEach(cb => {
    const id = cb.getAttribute("data-task-id");
    cb.checked = !!progressData[id];
  });
  updateProgressUI();
};

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
        <div class="state-card-header">
          <div class="state-name-row">
            <span class="state-name">${s.name}</span>
            <span class="state-abbr">${s.abbr}</span>
          </div>
          <div class="state-badges-row">
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

// 6. Reciprocity Calculator
function setupReciprocityCalculator() {
  const homeSelect = document.getElementById("reciprocity-home-state");
  const targetSelect = document.getElementById("reciprocity-target-state");
  
  if (!homeSelect || !targetSelect) return;
  
  // Sort states alphabetically for presentation
  const sortedStates = [...statesData].sort((a, b) => a.name.localeCompare(b.name));
  
  // Populate dropdowns
  const optionsHTML = sortedStates.map(s => `<option value="${s.abbr}">${s.name} (${s.abbr})</option>`).join('');
  homeSelect.innerHTML = optionsHTML;
  targetSelect.innerHTML = optionsHTML;
  
  // Set defaults: Home = CA, Target = TX
  homeSelect.value = "CA";
  targetSelect.value = "TX";
  
  // Handle change events
  const handleChange = () => {
    updateReciprocityResult(homeSelect.value, targetSelect.value);
  };
  
  homeSelect.addEventListener("change", handleChange);
  targetSelect.addEventListener("change", handleChange);
  
  // Initial run
  handleChange();
}

function updateReciprocityResult(homeAbbr, targetAbbr) {
  const resultContainer = document.getElementById("reciprocity-result");
  if (!resultContainer) return;
  
  const homeStateObj = statesData.find(s => s.abbr === homeAbbr);
  const targetStateObj = statesData.find(s => s.abbr === targetAbbr);
  
  if (!homeStateObj || !targetStateObj) return;
  
  const advice = getReciprocityAdvice(homeAbbr, targetAbbr);
  
  // Determine color class and badges
  let statusClass = "status-none";
  let badgeClass = "badge-none";
  let iconName = "alert-circle";
  
  if (advice.type === "full") {
    statusClass = "status-full";
    badgeClass = "badge-full";
    iconName = "check-circle";
  } else if (advice.type === "partial") {
    statusClass = "status-partial";
    badgeClass = "badge-partial";
    iconName = "help-circle";
  }
  
  // Render html
  resultContainer.className = `reciprocity-result-card mt-6 ${statusClass}`;
  resultContainer.innerHTML = `
    <div class="result-status-header">
      <span class="status-badge ${badgeClass}">${advice.status}</span>
      <h4 style="font-weight: 700; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
        <i data-lucide="${iconName}"></i>
        ${homeStateObj.name} to ${targetStateObj.name}
      </h4>
    </div>
    <div class="result-summary-text">${advice.summary}</div>
    
    <div class="compliance-steps-title">Compliance Instructions</div>
    <ol class="compliance-steps">
      ${advice.steps.map((step, idx) => `
        <li class="compliance-step-item">
          <span class="compliance-step-number">${idx + 1}</span>
          ${step}
        </li>
      `).join('')}
    </ol>
  `;
  
  // Reinitialize lucide icons inside results
  lucide.createIcons();
}

function getReciprocityAdvice(home, target) {
  if (home === target) {
    return {
      status: "Same State",
      type: "full",
      summary: "You are looking up reciprocity requirements within your home state.",
      steps: [
        `You already hold an active license in ${home}.`,
        "Refer to the state directory search below for direct board links and standard maintenance guidelines."
      ]
    };
  }
  
  // 1. Target is California (No reciprocity at all)
  if (target === "CA") {
    return {
      status: "No Reciprocity",
      type: "none",
      summary: "California does not offer reciprocity or waivers of any kind to out-of-state licensees.",
      steps: [
        "Complete the 135 hours of approved pre-licensing courses (Real Estate Principles, Practice, and one elective).",
        "Pass the full 150-question California Salesperson Exam (70% passing score).",
        "Complete the fingerprint background check via Live Scan in California.",
        "Submit the Combined Salesperson Exam and License Application with required fees ($305).",
        "Submit an Out-of-State Consent to Service of Process form (since your residency is outside California)."
      ]
    };
  }
  
  // 2. Target is Texas (No reciprocity, but waives national exam)
  if (target === "TX") {
    return {
      status: "Education Waiver / State-Only Exam",
      type: "partial",
      summary: "Texas does not offer direct reciprocity, but active licensees of any state can waive the National portion of the Texas licensing exam.",
      steps: [
        "Complete the 180 hours of TREC-approved pre-licensing education (6 specific 30-hour courses).",
        "Submit the Out-of-State License Application to TREC ($150) and complete fingerprinting ($38.25).",
        "TREC will review your out-of-state license history and issue a waiver for the National exam portion.",
        "Schedule and pass the Texas State-specific licensing exam (30 questions) with Pearson VUE.",
        "Submit an active sponsoring broker agreement to TREC to activate your Texas license."
      ]
    };
  }
  
  // 3. Target is Colorado (Direct exam-only reciprocity for any state)
  if (target === "CO") {
    return {
      status: "Full Reciprocity",
      type: "full",
      summary: "Colorado allows active real estate licensees from any state to get licensed by taking only the state-specific exam.",
      steps: [
        "Obtain a certified License History from your home state board showing an active, clean license.",
        "Waive all pre-licensing education (exempt from Colorado's 168-hour course).",
        "Schedule and pass the Colorado State-specific Broker Exam (40 questions, administered by Pearson VUE).",
        "Submit your fingerprints to the Colorado Bureau of Investigation for a background check.",
        "Secure Error & Omissions (E&O) insurance.",
        "Submit your license application online ($200) with your license history and E&O proof."
      ]
    };
  }
  
  // 4. Target is Virginia (Direct exam-only reciprocity for any state)
  if (target === "VA") {
    return {
      status: "Full Reciprocity",
      type: "full",
      summary: "Virginia allows active real estate licensees from any state to get licensed by taking only the state-specific exam.",
      steps: [
        "Obtain a certified Certification of Licensure from your home state (issued within the last 60 days).",
        "Waive all pre-licensing education (exempt from Virginia's 60-hour course).",
        "Schedule and pass the Virginia State-specific Salesperson Exam (40 questions, administered by PSI).",
        "Get fingerprinted at a PSI testing center for the background check.",
        "Submit the Reciprocal Salesperson License Application with the application fee ($170)."
      ]
    };
  }
  
  // 5. Target is Florida (Mutual recognition with CO, GA, IL in our list)
  if (target === "FL") {
    const mutualStates = ["CO", "GA", "IL"];
    if (mutualStates.includes(home)) {
      return {
        status: "Mutual Recognition",
        type: "full",
        summary: "Florida has a Mutual Recognition agreement with your home state, granting a full education waiver and state-only exam path.",
        steps: [
          "Obtain a certified License History from your home state board.",
          "Waive all Florida pre-licensing courses (exempt from the 63-hour course).",
          "Submit a Salesperson application to the Florida DBPR ($83.75) and complete electronic fingerprinting ($50-$60).",
          "Register for and pass the Florida-specific Law Exam (40 questions, score 30/40 or higher).",
          "Your license will be issued on active status if sponsored by an active Florida broker."
        ]
      };
    } else {
      return {
        status: "No Reciprocity",
        type: "none",
        summary: "Florida does not recognize your home state license. You must complete the standard process.",
        steps: [
          "Complete the Florida 63-hour Sales Associate Pre-licensing Course.",
          "Submit the application to DBPR ($83.75) and complete electronic fingerprinting.",
          "Pass both portions (National and Florida State-specific) of the Florida Real Estate Sales Associate Exam."
        ]
      };
    }
  }
  
  // 6. Target is Georgia (Direct reciprocity for any state)
  if (target === "GA") {
    return {
      status: "Full Reciprocity",
      type: "full",
      summary: "Georgia offers direct reciprocity to all states. No courses or exams are required if you hold an active license in good standing.",
      steps: [
        "Obtain a certified Certification of License History from your home state board.",
        "Complete the Georgia Crime Information Center (GCIC) background check report.",
        "Submit the Out-of-State License Reciprocity Application to the Georgia Real Estate Commission (GREC) with the fee ($170).",
        "Provide a consent to service of process form (non-resident agreement).",
        "A reciprocal Georgia license will be issued directly without any exams or education."
      ]
    };
  }
  
  // 7. Target is Illinois (Mutual recognition with CO, FL, GA in our list)
  if (target === "IL") {
    const mutualStates = ["CO", "FL", "GA"];
    if (mutualStates.includes(home)) {
      return {
        status: "Mutual Recognition",
        type: "full",
        summary: "Illinois has a reciprocity agreement with your home state, enabling a state-only exam path.",
        steps: [
          "Request a Certificate of Active Licensure in Good Standing from your home state board.",
          "Submit the Broker License by Reciprocity Application to the IDFPR.",
          "Schedule and pass the Illinois state-specific portion of the Broker Exam.",
          "Submit a fingerprint background check and pay the license fee."
        ]
      };
    } else {
      return {
        status: "No Reciprocity",
        type: "none",
        summary: "Illinois does not recognize your home state license. You must follow the standard broker path.",
        steps: [
          "Complete the 75-hour Illinois Broker Pre-licensing Education.",
          "Schedule and pass both portions (National and State) of the Illinois Broker licensing exam.",
          "Submit a fingerprint background check and apply for the license online."
        ]
      };
    }
  }
  
  // 8. Target is New York (Reciprocity with CO, GA, MA, PA in our list)
  if (target === "NY") {
    const reciprocalStates = ["CO", "GA", "MA", "PA"];
    if (reciprocalStates.includes(home)) {
      return {
        status: "Mutual Reciprocity",
        type: "full",
        summary: "New York offers direct reciprocity with your home state. No exam or course is required.",
        steps: [
          "Obtain a certified License History from your home state board.",
          "Submit an irrevocable Out-of-State Consent to Service of Process form (DOS-1579).",
          "Submit the New York Salesperson application online via the eAccessNY portal with the fee ($65).",
          "Your New York license will be issued directly; no courses or exams are required."
        ]
      };
    } else {
      return {
        status: "Education Waiver / Full Exam",
        type: "partial",
        summary: "New York does not have standard reciprocity with your state, but allows you to apply for an education waiver.",
        steps: [
          "Obtain a certified License History from your home state.",
          "Submit the Out-of-State Education Waiver Request form to the NYS Division of Licensing Services.",
          "Once approved (waiving the 77-hour course), schedule and pass the New York Salesperson Exam (75 questions).",
          "Submit the salesperson application online via eAccessNY ($65)."
        ]
      };
    }
  }
  
  // 9. Target is North Carolina (Education & National Exam waiver for any state)
  if (target === "NC") {
    return {
      status: "Education Waiver / State-Only Exam",
      type: "partial",
      summary: "North Carolina offers an exam-only path for active licensees of any state, waiving the pre-licensing education.",
      steps: [
        "Submit an application to the NCREC demonstrating an active license in good standing in your home state.",
        "NCREC will approve a waiver of the 75-hour pre-licensing course and the National exam portion.",
        "Schedule and pass the North Carolina State-specific portion of the Broker Exam.",
        "Receive a NC Provisional Broker license. To remove provisional status, complete the 90 hours of post-licensing education within 18 months."
      ]
    };
  }
  
  // 10. Target is Ohio (Reciprocity with CO in our list)
  if (target === "OH") {
    if (home === "CO") {
      return {
        status: "Reciprocity",
        type: "full",
        summary: "Ohio has a reciprocity agreement with Colorado, waiving education requirements.",
        steps: [
          "Obtain a Letter of Good Standing from the Colorado Division of Real Estate.",
          "Submit the Ohio Reciprocal Salesperson Application and a Consent to Service of Process form.",
          "Schedule and pass the Ohio state-specific licensing exam.",
          "Pay the license fee to issue your Ohio license."
        ]
      };
    } else {
      return {
        status: "No Reciprocity",
        type: "none",
        summary: "Ohio does not recognize your home state license. Full education and exams are required.",
        steps: [
          "Complete the 120-hour Ohio pre-licensing education (4 courses: Principles, Law, Finance, Appraisal).",
          "Submit the Salesperson Exam Application with the Ohio Division of Real Estate ($81).",
          "Pass both portions (National and State) of the Ohio Real Estate Exam."
        ]
      };
    }
  }
  
  // 11. Target is Washington (Education waiver for active out-of-state license)
  if (target === "WA") {
    return {
      status: "Education Waiver / State-Only Exam",
      type: "partial",
      summary: "Washington waives pre-licensing education if you have an active license in another state.",
      steps: [
        "Obtain a certified License History from your home state board.",
        "Submit the history and a request for exam waiver to the Washington Department of Licensing.",
        "Upon approval, register for and pass the Washington State-specific exam (40 questions).",
        "Complete a fingerprint background check and submit your WA license application ($223)."
      ]
    };
  }
  
  // 12. Target is Arizona (Out-of-state recognition for 1+ year active license)
  if (target === "AZ") {
    return {
      status: "Out-of-State Recognition",
      type: "partial",
      summary: "Arizona offers out-of-state license recognition if you have been licensed in your home state for at least 1 year.",
      steps: [
        "Verify your home state license has been active for at least 12 out of the last 24 months.",
        "Obtain a certified License History from your home state board.",
        "Apply for and obtain an Arizona Fingerprint Clearance Card (background check).",
        "Complete a 6-hour Arizona Contract Writing Course.",
        "Schedule and pass the Arizona State-specific licensing exam (National portion is waived).",
        "Submit the Out-of-State License Recognition Application to ADRE."
      ]
    };
  }
  
  // 13. Target is Pennsylvania (Reciprocity with GA, MA, NY in our list)
  if (target === "PA") {
    const reciprocalStates = ["GA", "MA", "NY"];
    if (reciprocalStates.includes(home)) {
      return {
        status: "Mutual Reciprocity",
        type: "full",
        summary: "Pennsylvania has a direct reciprocal agreement with your home state, issuing a license directly.",
        steps: [
          "Obtain a certified License History from your home state board.",
          "Submit the PA Reciprocal Salesperson Application online via the PALS system ($117).",
          "Submit a recent criminal background check from your home state.",
          "A reciprocal Pennsylvania license will be issued directly with no courses or exams required."
        ]
      };
    } else {
      return {
        status: "No Reciprocity",
        type: "none",
        summary: "Pennsylvania does not recognize your home state license. Full process required.",
        steps: [
          "Complete the 75 hours of Pennsylvania pre-licensing education.",
          "Schedule and pass both portions (National & Pennsylvania State) of the licensing exam.",
          "Submit a background check and apply for your license online."
        ]
      };
    }
  }
  
  // 14. Target is Michigan (Education waiver, must pass exam)
  if (target === "MI") {
    return {
      status: "Education Waiver / Full Exam",
      type: "partial",
      summary: "Michigan does not offer direct reciprocity, but waives the 40-hour pre-licensing course for active licensees.",
      steps: [
        "Obtain a certified License History from your home state board.",
        "Submit the license application online via LARA ($88) to receive your course waiver approval.",
        "Schedule and pass the full Michigan Real Estate Salesperson Exam (115 questions).",
        "Once passed, LARA will automatically issue your salesperson license."
      ]
    };
  }
  
  // 15. Target is Massachusetts (Reciprocity with CO, GA, NY, PA in our list)
  if (target === "MA") {
    const reciprocalStates = ["CO", "GA", "NY", "PA"];
    if (reciprocalStates.includes(home)) {
      return {
        status: "Mutual Reciprocity",
        type: "full",
        summary: "Massachusetts offers direct reciprocity with your home state. No exam or course is required.",
        steps: [
          "Obtain a certified License History from your home state board.",
          "Complete the MA Education Waiver/Reciprocity Application.",
          "Submit three character references (letters of recommendation) and a CORI authorization form.",
          "Pay the reciprocal fee and receive your Massachusetts license without taking any courses or exams."
        ]
      };
    } else {
      return {
        status: "Education Waiver / Full Exam",
        type: "partial",
        summary: "Massachusetts does not have reciprocity with your state, but waives the 40-hour course.",
        steps: [
          "Obtain a certified License History from your home state.",
          "Submit the Education Waiver Application to the MA Board of Registration.",
          "Upon approval, schedule and pass the full Massachusetts Real Estate Exam.",
          "Pay the licensing fee to receive your active license."
        ]
      };
    }
  }
  
  // Default fallback
  return {
    status: "No Reciprocity",
    type: "none",
    summary: `No formal reciprocal agreement exists between ${home} and ${target}.`,
    steps: [
      `Contact the ${target} Real Estate Board/Commission for potential course waiver approvals.`,
      `Complete the pre-licensing courses required by ${target}.`,
      `Pass the licensing exam in ${target}.`
    ]
  };
}
