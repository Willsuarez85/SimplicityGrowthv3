/**
 * SimplicityAgents Visual Delivery Dashboard
 * Interactive functionality for delivery reports
 * Version: 1.0
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeCaptionTabs();
    initializeAssetGrid();
    initializeModal();
    console.log('Dashboard initialized');
});

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Smooth scroll navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update nav on scroll
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================================
// ASSET GRID
// ============================================

let isGridView = true;

function initializeAssetGrid() {
    const grid = document.getElementById('assetGrid');
    if (!grid) return;

    // Add click handlers to asset cards
    const cards = grid.querySelectorAll('.asset-card');
    cards.forEach(card => {
        card.addEventListener('click', () => openAssetModal(card.dataset));
    });
}

function toggleViewMode() {
    const grid = document.getElementById('assetGrid');
    if (!grid) return;

    isGridView = !isGridView;
    grid.classList.toggle('list-view', !isGridView);

    showToast(isGridView ? 'Grid view' : 'List view', 'info');
}

// ============================================
// MODAL SYSTEM
// ============================================

let currentAsset = null;

function initializeModal() {
    const modal = document.getElementById('assetModal');
    if (!modal) return;

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

function openAssetModal(assetData) {
    const modal = document.getElementById('assetModal');
    if (!modal) return;

    currentAsset = assetData;

    // Populate modal content
    document.getElementById('modalImage').src = assetData.src || '';
    document.getElementById('modalImage').alt = assetData.title || 'Asset';
    document.getElementById('modalTitle').textContent = assetData.title || 'Asset';
    document.getElementById('modalScene').textContent = assetData.scene || '-';
    document.getElementById('modalTimestamp').textContent = assetData.timestamp || '-';
    document.getElementById('modalSize').textContent = assetData.size || '-';
    document.getElementById('modalPrompt').textContent = assetData.prompt || 'No prompt available';
    document.getElementById('modalDownload').href = assetData.src || '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('assetModal');
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentAsset = null;
}

// ============================================
// CAPTION TABS
// ============================================

function initializeCaptionTabs() {
    const tabs = document.querySelectorAll('.caption-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const platform = tab.dataset.platform;
            switchCaptionTab(platform);
        });
    });
}

function switchCaptionTab(platform) {
    // Update tab active state
    document.querySelectorAll('.caption-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.platform === platform);
    });

    // Show/hide content
    document.querySelectorAll('.caption-content').forEach(content => {
        content.classList.toggle('hidden', content.id !== `${platform}Caption`);
    });
}

// ============================================
// COPY FUNCTIONS
// ============================================

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

async function copyScript() {
    const scriptContent = document.querySelector('.script-content');
    if (!scriptContent) return;

    const success = await copyToClipboard(scriptContent.textContent);
    showToast(success ? 'Script copied!' : 'Failed to copy', success ? 'success' : 'error');
}

async function copyCaption(platform) {
    const captionEl = document.querySelector(`#${platform}Caption pre`);
    if (!captionEl) return;

    const success = await copyToClipboard(captionEl.textContent);
    showToast(success ? 'Caption copied!' : 'Failed to copy', success ? 'success' : 'error');
}

async function copyPrompt() {
    const promptEl = document.getElementById('modalPrompt');
    if (!promptEl) return;

    const success = await copyToClipboard(promptEl.textContent);
    showToast(success ? 'Prompt copied!' : 'Failed to copy', success ? 'success' : 'error');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: '&#10003;',
        error: '&#10007;',
        warning: '&#9888;',
        info: '&#8505;'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// ACTION HANDLERS
// ============================================

async function regenerateAsset() {
    const select = document.getElementById('assetSelect');
    const modification = document.getElementById('promptModification');

    if (!select || !select.value) {
        showToast('Please select an asset to regenerate', 'warning');
        return;
    }

    const assetId = select.value;
    const modificationText = modification ? modification.value : '';

    // Get original prompt from projectData
    let originalPrompt = '';
    if (window.projectData && window.projectData.prompts && window.projectData.prompts[assetId]) {
        originalPrompt = window.projectData.prompts[assetId];
    }

    if (!originalPrompt) {
        showToast('No prompt found for this asset', 'error');
        return;
    }

    // Prepare the regeneration request
    const finalPrompt = modificationText
        ? `${originalPrompt}\n\nAdditional modifications: ${modificationText}`
        : originalPrompt;

    showToast('Preparing regeneration request...', 'info');

    // Copy prompt to clipboard for manual regeneration
    const success = await copyToClipboard(finalPrompt);

    if (success) {
        showToast('Prompt copied! Use fal.ai to regenerate.', 'success', 5000);

        // Log regeneration request for potential automation
        console.log('Regeneration request:', {
            assetId,
            originalPrompt,
            modification: modificationText,
            finalPrompt,
            timestamp: new Date().toISOString()
        });
    } else {
        showToast('Failed to copy prompt', 'error');
    }
}

function regenerateFromModal() {
    if (!currentAsset) return;

    const assetSelect = document.getElementById('assetSelect');
    if (assetSelect) {
        assetSelect.value = currentAsset.id || '';
    }

    closeModal();

    // Scroll to actions section
    const actionsSection = document.getElementById('actions');
    if (actionsSection) {
        actionsSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast('Select modifications and click Regenerate', 'info');
}

async function improveCopy() {
    const select = document.getElementById('copySelect');
    const context = document.getElementById('copyContext');

    if (!select || !select.value) {
        showToast('Please select what to improve', 'warning');
        return;
    }

    if (!context || !context.value.trim()) {
        showToast('Please paste the copy you want to improve', 'warning');
        return;
    }

    const copyType = select.value;
    const originalCopy = context.value.trim();

    // Create improvement prompt
    const improvementPrompt = generateImprovementPrompt(copyType, originalCopy);

    const success = await copyToClipboard(improvementPrompt);

    if (success) {
        showToast('Improvement prompt copied! Use Claude to get suggestions.', 'success', 5000);
        console.log('Improvement request:', { copyType, originalCopy, improvementPrompt });
    } else {
        showToast('Failed to copy prompt', 'error');
    }
}

function generateImprovementPrompt(type, content) {
    const prompts = {
        hook: `Improve this hook for social media. Make it more attention-grabbing while keeping the core message. Provide 3 alternatives.

Original hook:
"${content}"

Requirements:
- Stop the scroll immediately
- Create curiosity or tension
- Keep under 10 words if possible
- Match brand voice (warm, authoritative, bilingual-friendly)`,

        script: `Improve this script for short-form video content. Enhance the flow, pacing, and emotional impact.

Original script:
"${content}"

Requirements:
- Maintain 60-90 second length
- Strengthen the hook and CTA
- Add more conversational elements
- Include timing/delivery notes`,

        caption: `Improve this social media caption. Make it more engaging while maintaining the message.

Original caption:
"${content}"

Requirements:
- Strong opening line
- Clear value proposition
- Effective hashtag strategy
- Strong CTA
- Platform-optimized length`,

        cta: `Improve this call-to-action. Make it more compelling and action-oriented.

Original CTA:
"${content}"

Requirements:
- Create urgency without being pushy
- Clear next step
- Emotionally resonant
- Aligned with brand voice`
    };

    return prompts[type] || prompts.hook;
}

async function generateVariations() {
    const select = document.getElementById('variationType');
    const countInput = document.getElementById('variationCount');

    if (!select || !select.value) {
        showToast('Please select what to vary', 'warning');
        return;
    }

    const variationType = select.value;
    const count = countInput ? parseInt(countInput.value) || 3 : 3;

    // Get context from project data
    let context = '';
    if (window.projectData) {
        context = `Client: ${window.projectData.clientSlug || 'Unknown'}
Project: ${window.projectData.projectSlug || 'Unknown'}`;
    }

    const variationPrompt = generateVariationPrompt(variationType, count, context);

    const success = await copyToClipboard(variationPrompt);

    if (success) {
        showToast(`Variation prompt copied! Request ${count} ${variationType}.`, 'success', 5000);
        console.log('Variation request:', { variationType, count, context });
    } else {
        showToast('Failed to copy prompt', 'error');
    }
}

function generateVariationPrompt(type, count, context) {
    const prompts = {
        hooks: `Generate ${count} alternative hooks for this project.

${context}

Requirements:
- Each hook should use a different psychological trigger (curiosity, controversy, authority, relatability, etc.)
- Keep each under 10 words
- Match the brand voice
- Optimize for scroll-stopping power`,

        thumbnails: `Generate ${count} thumbnail concept descriptions for this project.

${context}

Requirements:
- Each concept should have a different visual approach
- Include text overlay suggestions
- Describe facial expressions/emotions if featuring a person
- Consider contrast and readability
- Optimize for click-through rate`,

        angles: `Generate ${count} alternative content angles for this topic.

${context}

Requirements:
- Each angle should target a different audience pain point or desire
- Include the emotional hook for each
- Suggest the best format (story, tutorial, listicle, etc.)
- Consider virality potential`
    };

    return prompts[type] || prompts.hooks;
}

function exportPackage() {
    const checkboxes = document.querySelectorAll('.export-options input[type="checkbox"]');
    const options = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            options.push(cb.parentElement.textContent.trim());
        }
    });

    if (options.length === 0) {
        showToast('Please select at least one option to export', 'warning');
        return;
    }

    showToast(`Preparing export: ${options.join(', ')}`, 'info');

    // Log export request
    console.log('Export request:', {
        options,
        projectData: window.projectData,
        timestamp: new Date().toISOString()
    });

    // For now, show instructions
    setTimeout(() => {
        showToast('Export feature coming soon. Files are in the client folder.', 'info', 5000);
    }, 1500);
}

function downloadAllAssets() {
    if (!window.projectData || !window.projectData.assets) {
        showToast('No assets found in project data', 'warning');
        return;
    }

    const assets = window.projectData.assets;
    const assetList = Object.entries(assets)
        .map(([id, data]) => `- ${id}: ${data.path}`)
        .join('\n');

    showToast('Asset list logged to console', 'info');
    console.log('Assets to download:\n' + assetList);

    // Copy asset paths to clipboard
    const paths = Object.values(assets).map(a => a.path).join('\n');
    copyToClipboard(paths).then(success => {
        if (success) {
            showToast('Asset paths copied to clipboard', 'success');
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatTimestamp(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatFileSize(bytes) {
    if (!bytes) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let size = bytes;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Only handle shortcuts when no input is focused
    if (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA') {
        return;
    }

    // G - Toggle grid/list view
    if (e.key === 'g' || e.key === 'G') {
        toggleViewMode();
    }

    // 1-5 - Navigate to sections
    const sectionKeys = ['1', '2', '3', '4', '5'];
    const sectionIds = ['overview', 'assets', 'scripts', 'brand', 'actions'];

    if (sectionKeys.includes(e.key)) {
        const index = sectionKeys.indexOf(e.key);
        const section = document.getElementById(sectionIds[index]);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// EXPOSE GLOBAL FUNCTIONS
// ============================================

window.toggleViewMode = toggleViewMode;
window.closeModal = closeModal;
window.copyScript = copyScript;
window.copyCaption = copyCaption;
window.copyPrompt = copyPrompt;
window.regenerateAsset = regenerateAsset;
window.regenerateFromModal = regenerateFromModal;
window.improveCopy = improveCopy;
window.generateVariations = generateVariations;
window.exportPackage = exportPackage;
window.downloadAllAssets = downloadAllAssets;
window.showToast = showToast;
