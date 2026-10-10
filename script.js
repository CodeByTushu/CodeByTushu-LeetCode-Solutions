/**
 * CodeByTushu — Daily LeetCode Solutions Publishing Platform
 * Interactive Client Controller (Vanilla JS)
 */

(function () {
    'use strict';

    // Application State
    const state = {
        solutions: [],
        currentFilterDifficulty: 'all',
        currentFilterLanguage: 'all',
        currentFilterYear: 'all',
        currentFilterMonth: 'all',
        currentFilterTag: 'all',
        sortOrder: 'newest',
        searchQuery: '',
        activeModalProblem: null,
        activeModalLanguage: 'java'
    };

    // DOM Elements Cache
    const DOM = {
        // Navigation
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        navMenu: document.getElementById('navMenu'),

        // Statistics
        statTotalProblems: document.getElementById('statTotalProblems'),
        statTotalLanguages: document.getElementById('statTotalLanguages'),
        statEasyCount: document.getElementById('statEasyCount'),
        statMediumCount: document.getElementById('statMediumCount'),
        statHardCount: document.getElementById('statHardCount'),
        countAll: document.getElementById('countAll'),
        countEasy: document.getElementById('countEasy'),
        countMedium: document.getElementById('countMedium'),
        countHard: document.getElementById('countHard'),

        // Filters & Search
        searchInput: document.getElementById('searchInput'),
        clearSearchBtn: document.getElementById('clearSearchBtn'),
        sortSelect: document.getElementById('sortSelect'),
        filterPills: document.querySelectorAll('.difficulty-filters .filter-pill'),
        yearFilterSelect: document.getElementById('yearFilterSelect'),
        monthFilterSelect: document.getElementById('monthFilterSelect'),
        langTabs: document.querySelectorAll('.language-tabs .lang-tab-btn'),
        tagsCloud: document.getElementById('tagsCloud'),
        resultsCount: document.getElementById('resultsCount'),
        activeFilterBar: document.getElementById('activeFilterBar'),
        activeFilterText: document.getElementById('activeFilterText'),
        resetFiltersBtn: document.getElementById('resetFiltersBtn'),

        // Grid & Empty State
        solutionsGrid: document.getElementById('solutionsGrid'),
        emptyState: document.getElementById('emptyState'),
        emptyStateDesc: document.getElementById('emptyStateDesc'),
        emptyResetBtn: document.getElementById('emptyResetBtn'),

        // Modal
        codeModal: document.getElementById('codeModal'),
        modalCloseBtn: document.getElementById('modalCloseBtn'),
        modalProbId: document.getElementById('modalProbId'),
        modalDifficultyBadge: document.getElementById('modalDifficultyBadge'),
        modalDateTag: document.getElementById('modalDateTag'),
        modalProblemTitle: document.getElementById('modalProblemTitle'),
        modalTimeComplexity: document.getElementById('modalTimeComplexity'),
        modalAuxSpaceComplexity: document.getElementById('modalAuxSpaceComplexity'),
        modalLeetcodeLink: document.getElementById('modalLeetcodeLink'),
        modalFolderLink: document.getElementById('modalFolderLink'),
        modalSummaryText: document.getElementById('modalSummaryText'),
        modalApproachText: document.getElementById('modalApproachText'),
        modalTagsBox: document.getElementById('modalTagsBox'),
        modalVideoContainer: document.getElementById('modalVideoContainer'),
        modalLangTabs: document.querySelectorAll('#modalLangTabs .modal-tab-btn'),
        modalFileNameIndicator: document.getElementById('modalCurrentFileName'),
        modalRawFileLink: document.getElementById('modalRawFileLink'),
        modalCopyBtn: document.getElementById('modalCopyBtn'),
        modalCodeDisplay: document.getElementById('modalCodeDisplay'),

        // Toast Container
        toastContainer: document.getElementById('toastContainer')
    };

    /**
     * Initialize Application
     */
    function init() {
        loadData();
        setupEventListeners();
        setupKeyboardShortcuts();
        populateFilterDropdownsAndTags();
        updateStatistics();
        applyFiltersAndRender();
    }

    /**
     * Load Data from solutions-data.js or solutions.json
     */
    function loadData() {
        if (window.SOLUTIONS_DATA && Array.isArray(window.SOLUTIONS_DATA)) {
            state.solutions = window.SOLUTIONS_DATA;
        } else {
            fetch('solutions.json')
                .then(res => res.json())
                .then(data => {
                    state.solutions = data;
                    populateFilterDropdownsAndTags();
                    updateStatistics();
                    applyFiltersAndRender();
                })
                .catch(err => {
                    console.warn('Could not fetch solutions.json:', err);
                    state.solutions = [];
                });
        }
    }

    /**
     * Calculate and Render Real Statistics (Never Invented)
     */
    function updateStatistics() {
        const total = state.solutions.length;
        let easy = 0;
        let medium = 0;
        let hard = 0;

        state.solutions.forEach(item => {
            const diff = (item.difficulty || '').toLowerCase();
            if (diff === 'easy') easy++;
            else if (diff === 'medium') medium++;
            else if (diff === 'hard') hard++;
        });

        if (DOM.statTotalProblems) DOM.statTotalProblems.textContent = total;
        if (DOM.statEasyCount) DOM.statEasyCount.textContent = easy;
        if (DOM.statMediumCount) DOM.statMediumCount.textContent = medium;
        if (DOM.statHardCount) DOM.statHardCount.textContent = hard;

        if (DOM.countAll) DOM.countAll.textContent = total;
        if (DOM.countEasy) DOM.countEasy.textContent = easy;
        if (DOM.countMedium) DOM.countMedium.textContent = medium;
        if (DOM.countHard) DOM.countHard.textContent = hard;
    }

    /**
     * Populate Dynamic Year/Month Selectors and Tag Cloud
     */
    function populateFilterDropdownsAndTags() {
        const yearsSet = new Set();
        const monthsSet = new Set();
        const tagsSet = new Set();

        state.solutions.forEach(item => {
            if (item.year) yearsSet.add(item.year);
            if (item.month) monthsSet.add(item.month);
            if (Array.isArray(item.tags)) {
                item.tags.forEach(t => tagsSet.add(t));
            }
        });

        // Populate Years
        if (DOM.yearFilterSelect) {
            DOM.yearFilterSelect.innerHTML = '<option value="all">All Years</option>';
            Array.from(yearsSet).sort().reverse().forEach(year => {
                const opt = document.createElement('option');
                opt.value = year;
                opt.textContent = year;
                DOM.yearFilterSelect.appendChild(opt);
            });
        }

        // Populate Months
        if (DOM.monthFilterSelect) {
            DOM.monthFilterSelect.innerHTML = '<option value="all">All Months</option>';
            Array.from(monthsSet).sort().forEach(month => {
                const opt = document.createElement('option');
                opt.value = month;
                // Format clean month label e.g. "10-October" -> "October"
                const cleanName = month.includes('-') ? month.split('-')[1] : month;
                opt.textContent = cleanName;
                DOM.monthFilterSelect.appendChild(opt);
            });
        }

        // Populate Tag Cloud
        if (DOM.tagsCloud) {
            DOM.tagsCloud.innerHTML = '';
            const allBtn = document.createElement('button');
            allBtn.className = 'tag-filter-pill active';
            allBtn.textContent = 'All Topics';
            allBtn.setAttribute('data-tag', 'all');
            allBtn.addEventListener('click', () => {
                DOM.tagsCloud.querySelectorAll('.tag-filter-pill').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
                state.currentFilterTag = 'all';
                applyFiltersAndRender();
            });
            DOM.tagsCloud.appendChild(allBtn);

            Array.from(tagsSet).sort().forEach(tag => {
                const tagBtn = document.createElement('button');
                tagBtn.className = 'tag-filter-pill';
                tagBtn.textContent = tag;
                tagBtn.setAttribute('data-tag', tag);
                tagBtn.addEventListener('click', () => {
                    DOM.tagsCloud.querySelectorAll('.tag-filter-pill').forEach(b => b.classList.remove('active'));
                    tagBtn.classList.add('active');
                    state.currentFilterTag = tag;
                    applyFiltersAndRender();
                });
                DOM.tagsCloud.appendChild(tagBtn);
            });
        }
    }

    /**
     * Setup Event Listeners
     */
    function setupEventListeners() {
        // Mobile Navigation Toggle
        if (DOM.mobileMenuBtn && DOM.navMenu) {
            DOM.mobileMenuBtn.addEventListener('click', () => {
                const isOpen = DOM.navMenu.classList.toggle('open');
                DOM.mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            });
        }

        // Search Input
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value.trim().toLowerCase();
                if (DOM.clearSearchBtn) {
                    DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
                }
                applyFiltersAndRender();
            });
        }

        // Clear Search Button
        if (DOM.clearSearchBtn) {
            DOM.clearSearchBtn.addEventListener('click', () => {
                if (DOM.searchInput) {
                    DOM.searchInput.value = '';
                    state.searchQuery = '';
                    DOM.clearSearchBtn.style.display = 'none';
                    DOM.searchInput.focus();
                    applyFiltersAndRender();
                }
            });
        }

        // Sort Select
        if (DOM.sortSelect) {
            DOM.sortSelect.addEventListener('change', (e) => {
                state.sortOrder = e.target.value;
                applyFiltersAndRender();
            });
        }

        // Difficulty Filters
        DOM.filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                DOM.filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                state.currentFilterDifficulty = pill.getAttribute('data-difficulty');
                applyFiltersAndRender();
            });
        });

        // Year & Month Selectors
        if (DOM.yearFilterSelect) {
            DOM.yearFilterSelect.addEventListener('change', (e) => {
                state.currentFilterYear = e.target.value;
                applyFiltersAndRender();
            });
        }
        if (DOM.monthFilterSelect) {
            DOM.monthFilterSelect.addEventListener('change', (e) => {
                state.currentFilterMonth = e.target.value;
                applyFiltersAndRender();
            });
        }

        // Language Filter Tabs
        DOM.langTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                DOM.langTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.currentFilterLanguage = tab.getAttribute('data-lang');
                applyFiltersAndRender();
            });
        });

        // Reset Filter Buttons
        if (DOM.resetFiltersBtn) DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
        if (DOM.emptyResetBtn) DOM.emptyResetBtn.addEventListener('click', resetAllFilters);

        // Modal Controls
        if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeModal);
        if (DOM.codeModal) {
            DOM.codeModal.addEventListener('click', (e) => {
                if (e.target === DOM.codeModal) closeModal();
            });
        }

        // Modal Language Switcher Tabs
        DOM.modalLangTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const lang = tab.getAttribute('data-lang');
                switchModalLanguage(lang);
            });
        });

        // Modal Copy Code Action
        if (DOM.modalCopyBtn) {
            DOM.modalCopyBtn.addEventListener('click', handleModalCopy);
        }
    }

    /**
     * Keyboard Shortcuts (ESC to close modal, / to focus search)
     */
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.codeModal && DOM.codeModal.classList.contains('open')) {
                closeModal();
            } else if (e.key === '/' && document.activeElement !== DOM.searchInput) {
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
                e.preventDefault();
                if (DOM.searchInput) {
                    DOM.searchInput.focus();
                    DOM.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    /**
     * Reset All Filters to Default
     */
    function resetAllFilters() {
        state.searchQuery = '';
        state.currentFilterDifficulty = 'all';
        state.currentFilterLanguage = 'all';
        state.currentFilterYear = 'all';
        state.currentFilterMonth = 'all';
        state.currentFilterTag = 'all';
        state.sortOrder = 'newest';

        if (DOM.searchInput) DOM.searchInput.value = '';
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';
        if (DOM.sortSelect) DOM.sortSelect.value = 'newest';
        if (DOM.yearFilterSelect) DOM.yearFilterSelect.value = 'all';
        if (DOM.monthFilterSelect) DOM.monthFilterSelect.value = 'all';

        DOM.filterPills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-difficulty') === 'all');
        });

        DOM.langTabs.forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-lang') === 'all');
        });

        if (DOM.tagsCloud) {
            DOM.tagsCloud.querySelectorAll('.tag-filter-pill').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-tag') === 'all');
            });
        }

        applyFiltersAndRender();
        showToast('All filters have been reset');
    }

    /**
     * Filter and Sort Solutions
     */
    function applyFiltersAndRender() {
        const query = state.searchQuery;
        const diffFilter = state.currentFilterDifficulty.toLowerCase();
        const langFilter = state.currentFilterLanguage.toLowerCase();
        const yearFilter = state.currentFilterYear;
        const monthFilter = state.currentFilterMonth;
        const tagFilter = state.currentFilterTag;

        let filtered = state.solutions.filter(prob => {
            // Difficulty match
            if (diffFilter !== 'all' && (prob.difficulty || '').toLowerCase() !== diffFilter) {
                return false;
            }

            // Language match
            if (langFilter !== 'all') {
                if (!prob.languages || !prob.languages[langFilter]) return false;
            }

            // Year match
            if (yearFilter !== 'all' && String(prob.year) !== String(yearFilter)) {
                return false;
            }

            // Month match
            if (monthFilter !== 'all' && String(prob.month) !== String(monthFilter)) {
                return false;
            }

            // Tag match
            if (tagFilter !== 'all') {
                if (!Array.isArray(prob.tags) || !prob.tags.includes(tagFilter)) return false;
            }

            // Search query match
            if (query) {
                const idMatch = String(prob.id).toLowerCase().includes(query);
                const titleMatch = (prob.title || '').toLowerCase().includes(query);
                const slugMatch = (prob.slug || '').toLowerCase().includes(query);
                const summaryMatch = (prob.summary || '').toLowerCase().includes(query);
                const dateMatch = (prob.date || '').toLowerCase().includes(query);
                const tagsMatch = Array.isArray(prob.tags) && prob.tags.some(t => t.toLowerCase().includes(query));

                if (!idMatch && !titleMatch && !slugMatch && !summaryMatch && !tagsMatch && !dateMatch) {
                    return false;
                }
            }

            return true;
        });

        // Sort Solutions
        filtered.sort((a, b) => {
            if (state.sortOrder === 'newest') {
                return new Date(b.dateIso || b.date) - new Date(a.dateIso || a.date);
            } else if (state.sortOrder === 'oldest') {
                return new Date(a.dateIso || a.date) - new Date(b.dateIso || b.date);
            } else if (state.sortOrder === 'num-asc') {
                return parseInt(a.id, 10) - parseInt(b.id, 10);
            } else if (state.sortOrder === 'num-desc') {
                return parseInt(b.id, 10) - parseInt(a.id, 10);
            }
            return 0;
        });

        // Update Results Count Pill
        if (DOM.resultsCount) {
            const total = state.solutions.length;
            DOM.resultsCount.textContent = `Showing ${filtered.length} of ${total} solution${total === 1 ? '' : 's'}`;
        }

        // Active Filter Banner Status
        const isFiltered = diffFilter !== 'all' || langFilter !== 'all' || yearFilter !== 'all' || monthFilter !== 'all' || tagFilter !== 'all' || query !== '';
        if (DOM.activeFilterBar) {
            DOM.activeFilterBar.style.display = isFiltered ? 'flex' : 'none';
            if (isFiltered && DOM.activeFilterText) {
                const parts = [];
                if (diffFilter !== 'all') parts.push(`Difficulty: ${state.currentFilterDifficulty}`);
                if (langFilter !== 'all') parts.push(`Language: ${state.currentFilterLanguage.toUpperCase()}`);
                if (yearFilter !== 'all') parts.push(`Year: ${yearFilter}`);
                if (monthFilter !== 'all') parts.push(`Month: ${monthFilter}`);
                if (tagFilter !== 'all') parts.push(`Topic: ${tagFilter}`);
                if (query) parts.push(`Search: "${query}"`);
                DOM.activeFilterText.textContent = `Filtered by: ${parts.join(' • ')}`;
            }
        }

        // Render Cards or Empty State
        if (filtered.length === 0) {
            if (DOM.solutionsGrid) DOM.solutionsGrid.style.display = 'none';
            if (DOM.emptyState) {
                DOM.emptyState.style.display = 'block';
                if (DOM.emptyStateDesc) {
                    DOM.emptyStateDesc.textContent = query
                        ? `No solutions found matching "${query}". Try adjusting keywords or clearing filters.`
                        : `No solutions found for the selected filter combination.`;
                }
            }
        } else {
            if (DOM.emptyState) DOM.emptyState.style.display = 'none';
            if (DOM.solutionsGrid) {
                DOM.solutionsGrid.style.display = 'grid';
                renderSolutionsGrid(filtered);
            }
        }
    }

    /**
     * Render Solution Cards to DOM
     */
    function renderSolutionsGrid(solutions) {
        DOM.solutionsGrid.innerHTML = '';

        solutions.forEach(prob => {
            const card = document.createElement('div');
            card.className = 'solution-card';
            card.setAttribute('data-id', prob.id);

            const tagsHtml = (prob.tags || [])
                .map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`)
                .join('');

            const diffClass = prob.difficulty || 'Medium';
            const displayDate = prob.formattedDate || prob.date;

            // Watch Video button HTML if youtubeUrl is present
            let videoBtnHtml = '';
            if (prob.youtubeUrl) {
                videoBtnHtml = `
                    <a href="${escapeHtml(prob.youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-video" title="Watch video explanation on YouTube">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        <span>Watch Video</span>
                    </a>
                `;
            }

            card.innerHTML = `
                <div class="card-content-top">
                    <div class="card-top-row">
                        <span class="card-prob-number">#${escapeHtml(prob.id)}</span>
                        <span class="card-date-indicator">${escapeHtml(displayDate)}</span>
                        <span class="difficulty-badge ${diffClass}">${escapeHtml(prob.difficulty)}</span>
                    </div>

                    <h3 class="card-title">${escapeHtml(prob.title)}</h3>
                    <p class="card-summary">${escapeHtml(prob.summary || '')}</p>

                    ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}

                    <div class="card-complexity-row">
                        <div class="complexity-item">
                            <span>Time: </span><strong>${escapeHtml(prob.timeComplexity || 'O(N)')}</strong>
                        </div>
                        <div class="complexity-item">
                            <span>Aux Space: </span><strong>${escapeHtml(prob.auxiliarySpaceComplexity || prob.spaceComplexity || 'O(1)')}</strong>
                        </div>
                    </div>

                    <div class="card-languages-strip">
                        <span class="lang-mini-badge java-badge" data-prob-id="${prob.id}" data-lang="java" title="View Java Code">Java</span>
                        <span class="lang-mini-badge python-badge" data-prob-id="${prob.id}" data-lang="python" title="View Python Code">Python</span>
                        <span class="lang-mini-badge cpp-badge" data-prob-id="${prob.id}" data-lang="cpp" title="View C++ Code">C++</span>
                        <span class="lang-mini-badge js-badge" data-prob-id="${prob.id}" data-lang="javascript" title="View JavaScript Code">JS</span>
                    </div>
                </div>

                <div class="card-actions-row">
                    <button class="card-btn card-btn-primary view-code-action" data-prob-id="${prob.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        <span>View Code</span>
                    </button>
                    ${videoBtnHtml}
                    <button class="card-btn card-btn-secondary copy-quick-action" data-prob-id="${prob.id}" title="Copy code to clipboard">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
                    </button>
                    <a href="${escapeHtml(prob.problemUrl || prob.leetcodeUrl)}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-secondary card-btn-icon" title="View official LeetCode problem">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            `;

            // View Code Button
            const viewCodeBtn = card.querySelector('.view-code-action');
            viewCodeBtn.addEventListener('click', () => {
                const defaultLang = state.currentFilterLanguage !== 'all' ? state.currentFilterLanguage : 'java';
                openModal(prob, defaultLang);
            });

            // Quick Copy Action Button
            const copyBtn = card.querySelector('.copy-quick-action');
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const preferredLang = state.currentFilterLanguage !== 'all' ? state.currentFilterLanguage : 'java';
                quickCopySolution(prob, preferredLang, copyBtn);
            });

            // Language Pill Direct Clicks
            const langBadges = card.querySelectorAll('.lang-mini-badge');
            langBadges.forEach(badge => {
                badge.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const lang = badge.getAttribute('data-lang');
                    openModal(prob, lang);
                });
            });

            DOM.solutionsGrid.appendChild(card);
        });
    }

    /**
     * Open Code Viewer & Problem Details Modal
     */
    function openModal(prob, language = 'java') {
        state.activeModalProblem = prob;
        state.activeModalLanguage = language;

        // Populate Modal Meta
        DOM.modalProbId.textContent = `#${prob.id}`;
        DOM.modalProblemTitle.textContent = prob.title;
        DOM.modalDifficultyBadge.textContent = prob.difficulty;
        DOM.modalDifficultyBadge.className = `difficulty-badge ${prob.difficulty}`;
        DOM.modalDateTag.textContent = prob.date || prob.formattedDate;

        DOM.modalTimeComplexity.textContent = prob.timeComplexity || 'O(N)';
        DOM.modalAuxSpaceComplexity.textContent = prob.auxiliarySpaceComplexity || prob.spaceComplexity || 'O(1)';

        DOM.modalLeetcodeLink.href = prob.problemUrl || prob.leetcodeUrl;
        DOM.modalFolderLink.href = prob.folderPath;

        // Populate Summary & Approach
        DOM.modalSummaryText.textContent = prob.summary || 'Concise problem description.';
        DOM.modalApproachText.textContent = prob.approach || 'Optimal algorithmic explanation.';

        // Populate Tags in Modal
        if (DOM.modalTagsBox) {
            DOM.modalTagsBox.innerHTML = '';
            (prob.tags || []).forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag-pill';
                tagSpan.textContent = tag;
                DOM.modalTagsBox.appendChild(tagSpan);
            });
        }

        // Render YouTube Video Section (Embed or Pending Card)
        renderModalVideo(prob);

        // Switch to the target language
        switchModalLanguage(language);

        // Show Modal
        DOM.codeModal.style.display = 'flex';
        DOM.codeModal.offsetHeight; // trigger reflow
        DOM.codeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Render YouTube Video Embed or Pending Banner in Modal
     */
    function renderModalVideo(prob) {
        if (!DOM.modalVideoContainer) return;
        DOM.modalVideoContainer.innerHTML = '';

        if (prob.youtubeUrl) {
            const videoId = extractYouTubeId(prob.youtubeUrl);
            if (videoId) {
                DOM.modalVideoContainer.innerHTML = `
                    <div class="video-responsive-wrapper">
                        <iframe 
                            src="https://www.youtube-nocookie.com/embed/${videoId}" 
                            title="CodeByTushu LeetCode #${prob.id} Video Solution" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
            } else {
                DOM.modalVideoContainer.innerHTML = `
                    <div class="video-pending-card">
                        <div class="video-pending-left">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            <span>Watch full step-by-step video solution on YouTube</span>
                        </div>
                        <a href="${escapeHtml(prob.youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.8rem;">
                            Watch Video ↗
                        </a>
                    </div>
                `;
            }
        } else {
            DOM.modalVideoContainer.innerHTML = `
                <div class="video-pending-card">
                    <div class="video-pending-left">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        <span>Video Explanation: <em>Coming soon on YouTube</em></span>
                    </div>
                    <a href="https://www.youtube.com/@codebytushu" target="_blank" rel="noopener noreferrer" class="yt-channel-link">
                        Subscribe @CodeByTushu ↗
                    </a>
                </div>
            `;
        }
    }

    /**
     * Extract Video ID from YouTube URLs
     */
    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    /**
     * Close Code Viewer Modal
     */
    function closeModal() {
        DOM.codeModal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            DOM.codeModal.style.display = 'none';
            state.activeModalProblem = null;
            if (DOM.modalVideoContainer) DOM.modalVideoContainer.innerHTML = '';
        }, 200);
    }

    /**
     * Switch Language in Modal
     */
    function switchModalLanguage(lang) {
        state.activeModalLanguage = lang;
        const prob = state.activeModalProblem;
        if (!prob || !prob.languages) return;

        // Update Tab Active States
        DOM.modalLangTabs.forEach(tab => {
            const tabLang = tab.getAttribute('data-lang');
            const isActive = tabLang === lang;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });

        const langData = prob.languages[lang];
        if (langData) {
            DOM.modalFileNameIndicator.textContent = langData.file;
            DOM.modalRawFileLink.href = langData.relativePath;
            DOM.modalRawFileLink.target = '_blank';

            // Render highlighted code
            DOM.modalCodeDisplay.innerHTML = highlightSyntax(langData.code || '// Solution coming soon', lang);
        } else {
            DOM.modalFileNameIndicator.textContent = 'solution';
            DOM.modalRawFileLink.href = '#';
            DOM.modalCodeDisplay.textContent = '// Code not available for this language.';
        }

        // Reset copy button state
        resetCopyButton(DOM.modalCopyBtn);
    }

    /**
     * Handle Modal Copy Code
     */
    function handleModalCopy() {
        const prob = state.activeModalProblem;
        if (!prob) return;
        const langData = prob.languages && prob.languages[state.activeModalLanguage];
        if (!langData || !langData.code) {
            showToast('No code available to copy', true);
            return;
        }

        copyToClipboard(langData.code)
            .then(() => {
                const btn = DOM.modalCopyBtn;
                btn.classList.add('copied');
                btn.querySelector('.copy-text').textContent = 'Copied!';
                showToast(`Copied ${langData.name} solution to clipboard!`);
                setTimeout(() => resetCopyButton(btn), 2500);
            })
            .catch(() => {
                showToast('Failed to copy to clipboard', true);
            });
    }

    /**
     * Quick Copy from Solution Card
     */
    function quickCopySolution(prob, lang, btnElement) {
        const langData = prob.languages && (prob.languages[lang] || prob.languages.java || Object.values(prob.languages)[0]);
        if (!langData || !langData.code) {
            showToast('No code available for this solution', true);
            return;
        }

        copyToClipboard(langData.code)
            .then(() => {
                const originalText = btnElement.innerHTML;
                btnElement.innerHTML = `<span>Copied!</span>`;
                btnElement.style.color = 'var(--color-easy)';
                showToast(`Copied #${prob.id} (${langData.name}) code to clipboard!`);
                setTimeout(() => {
                    btnElement.innerHTML = originalText;
                    btnElement.style.color = '';
                }, 2000);
            })
            .catch(() => {
                showToast('Clipboard permission denied', true);
            });
    }

    /**
     * Reset Copy Button to Initial State
     */
    function resetCopyButton(btn) {
        if (!btn) return;
        btn.classList.remove('copied');
        const textSpan = btn.querySelector('.copy-text');
        if (textSpan) textSpan.textContent = 'Copy Code';
    }

    /**
     * Native & Fallback Clipboard Helper
     */
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise((resolve, reject) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.top = '-9999px';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                if (successful) resolve();
                else reject(new Error('execCommand failed'));
            } catch (err) {
                document.body.removeChild(textarea);
                reject(err);
            }
        });
    }

    /**
     * Floating Toast Notification
     */
    function showToast(message, isError = false) {
        if (!DOM.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : ''}`;
        toast.innerHTML = `
            <span>${isError ? '⚠️' : '✓'}</span>
            <span>${escapeHtml(message)}</span>
        `;

        DOM.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3000);
    }

    /**
     * Lightweight Syntax Highlighting
     */
    function highlightSyntax(code, lang) {
        let escaped = escapeHtml(code);

        const keywords = [
            'class', 'public', 'private', 'protected', 'static', 'void', 'return', 'if', 'else',
            'for', 'while', 'import', 'from', 'def', 'const', 'let', 'var', 'new', 'function',
            'int', 'long', 'double', 'float', 'boolean', 'bool', 'true', 'false', 'null', 'None',
            'std', 'vector', 'include', 'auto', 'break', 'continue', 'in', 'range', 'len'
        ];

        // Comments
        escaped = escaped.replace(/(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');

        // Strings
        escaped = escaped.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`)/g, '<span class="syntax-string">$1</span>');

        // Keywords
        const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        escaped = escaped.replace(keywordRegex, '<span class="syntax-keyword">$1</span>');

        // Numbers
        escaped = escaped.replace(/\b(\d+n?)\b/g, '<span class="syntax-number">$1</span>');

        return escaped;
    }

    /**
     * Escape HTML Characters
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Start on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
