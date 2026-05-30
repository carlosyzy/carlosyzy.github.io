class HistoryPage {
  constructor() {
    this.versions = [];
    this.init();
  }

  init() {
    if (typeof VERSIONS !== 'undefined') {
      this.versions = VERSIONS;
      this.renderVersions();
    }
  }

  renderVersions() {
    const container = document.getElementById('versionsContainer');
    if (!container) return;

    container.innerHTML = '';

    this.versions.forEach((version, index) => {
      const card = this.createVersionCard(version, index);
      container.appendChild(card);
    });
  }

  createVersionCard(version, index) {
    const card = document.createElement('div');
    card.className = `version-card${version.isLatest ? ' latest' : ''}`;
    card.style.animationDelay = `${index * 0.1}s`;

    const typeLabels = {
      major: '重大更新',
      minor: '功能更新',
      patch: '问题修复'
    };

    const formattedDate = this.formatDate(version.date);

    card.innerHTML = `
      <div class="version-header">
        <div class="version-info">
          <h3 class="version-number">v${version.version}</h3>
          <span class="version-badge ${version.type}">${typeLabels[version.type]}</span>
        </div>
        <div class="version-date">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          ${formattedDate}
        </div>
      </div>
      <div class="version-body">
        <div class="version-features">
          <h4 class="features-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            更新内容
          </h4>
          <ul class="features-list">
            ${version.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="version-footer">
        <div class="version-download">
          <a href="${version.download}" class="version-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            下载
          </a>
          <a href="${version.github}" class="version-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </a>
        </div>
        <div class="version-stats">
          <span class="stat-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            ${version.features.length} 项更新
          </span>
        </div>
      </div>
    `;

    return card;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.history-section')) {
    new HistoryPage();
  }
});
