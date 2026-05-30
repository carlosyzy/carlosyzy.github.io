class ExamplesPage {
  constructor() {
    this.examples = [];
    this.modal = null;
    this.modalVideo = null;
    this.init();
  }

  init() {
    this.examples = EXAMPLES || [];
    this.modal = document.getElementById('exampleModal');
    this.modalVideo = document.getElementById('modalVideo');
    this.bindEvents();
    this.renderExamples();
  }

  bindEvents() {
    const closeBtn = document.getElementById('modalClose');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  renderExamples() {
    const grid = document.getElementById('examplesGrid');
    if (!grid) return;

    grid.innerHTML = '';

    this.examples.forEach((example, index) => {
      const card = this.createExampleCard(example, index);
      grid.appendChild(card);
    });
  }

  createExampleCard(example, index) {
    const card = document.createElement('div');
    card.className = 'example-card';
    card.style.animationDelay = `${index * 0.1}s`;

    let thumbnailContent;
    if (example.thumbnail) {
      thumbnailContent = `<img src="${example.thumbnail}" alt="${example.name}" class="thumbnail-image">`;
    } else {
      thumbnailContent = `
        <div class="video-placeholder">
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="40" rx="4" stroke="#00d4ff" stroke-width="2"/>
            <polygon points="26,24 26,40 40,32" fill="#00d4ff"/>
          </svg>
        </div>
      `;
    }

    const downloadBtn = example.download 
      ? `<a href="${example.download}" class="card-download-btn" target="_blank">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
           </svg>
           源码下载
         </a>`
      : '';

    card.innerHTML = `
      <div class="example-thumbnail">
        ${thumbnailContent}
        <div class="example-overlay">
          <div class="play-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div class="example-info">
        <h3 class="example-name">${example.name}</h3>
        <p class="example-description">${example.description}</p>
        <div class="example-tags">
          ${example.tags.map(tag => `<span class="example-tag">${tag}</span>`).join('')}
        </div>
        ${downloadBtn}
      </div>
    `;

    // 下载按钮点击事件，阻止冒泡
    const downloadLink = card.querySelector('.card-download-btn');
    if (downloadLink) {
      downloadLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    card.addEventListener('click', () => {
      if (example.video) {
        this.openModal(example.video);
      }
    });

    return card;
  }

  openModal(videoSrc) {
    if (!this.modal || !this.modalVideo) return;

    this.modalVideo.src = videoSrc;
    this.modalVideo.play().catch(() => {});
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal || !this.modalVideo) return;

    this.modalVideo.pause();
    this.modalVideo.src = '';
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.examples-section')) {
    new ExamplesPage();
  }
});
