class DocsPage {
  constructor() {
    this.currentDoc = null;
    this.expandedItems = new Set();
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadHomeDoc();
  }

  bindEvents() {
    const navMenu = document.getElementById('docsNav');
    const searchInput = document.getElementById('searchInput');

    if (navMenu) {
      navMenu.addEventListener('click', (e) => {
        const expandable = e.target.closest('.nav-expandable');
        if (expandable) {
          this.toggleExpandable(expandable);
          return;
        }

        const navItem = e.target.closest('.nav-content');
        if (navItem && navItem.dataset.id) {
          this.loadDoc(navItem.dataset.id);
          this.setActiveNavItem(navItem);
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
  }

  toggleExpandable(element) {
    const expandKey = element.dataset.expand;
    const content = document.querySelector(`.expandable-content[data-expand="${expandKey}"]`);

    if (content) {
      if (this.expandedItems.has(expandKey)) {
        this.expandedItems.delete(expandKey);
        element.classList.remove('expanded');
        content.classList.remove('show');
      } else {
        this.expandedItems.add(expandKey);
        element.classList.add('expanded');
        content.classList.add('show');
      }
    }
  }

  setActiveNavItem(item) {
    document.querySelectorAll('.nav-content').forEach(el => {
      el.classList.remove('active');
    });
    item.classList.add('active');
  }

  loadDoc(id) {
    const contentArea = document.getElementById('docsContent');
    if (!contentArea) return;

    if (this.currentDoc === id) {
      return;
    }

    const contentPath = `../docs/${id}.html`;
    
    const iframe = document.createElement('iframe');
    iframe.src = contentPath;
    iframe.frameBorder = '0';
    iframe.style.cssText = 'width: 100%; min-height: calc(100vh - 160px); display: block;';

    contentArea.innerHTML = '';
    contentArea.appendChild(iframe);
    this.currentDoc = id;
  }

  loadHomeDoc() {
    const firstItem = document.querySelector('.nav-content[data-id="home"]');
    if (firstItem) {
      this.loadDoc('home');
      this.setActiveNavItem(firstItem);
    }
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.resetNav();
      return;
    }

    query = query.toLowerCase();
    const allItems = document.querySelectorAll('.nav-content');

    allItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      const matches = text.includes(query);

      let parent = item.closest('.nav-group');
      if (parent) {
        parent.style.display = matches ? 'block' : 'none';
      }
    });
  }

  resetNav() {
    const groups = document.querySelectorAll('.nav-group');
    groups.forEach(group => {
      group.style.display = 'block';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.docs-layout')) {
    window.docsPage = new DocsPage();
  }
});
