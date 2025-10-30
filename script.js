


    const menu = document.getElementById("mobileMenu");
    const hamburger = document.getElementById("hamburgerIcon");
    const closeBtn = document.getElementById("closeMenu");

    function toggleMenu() {
      menu.classList.toggle("active");
    }

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const clickedInsideMenu = menu.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);

      if (!clickedInsideMenu && !clickedHamburger) {
        menu.classList.remove("active");
      }
    });

    // Close when clicking on the X button
    closeBtn.addEventListener("click", () => {
      menu.classList.remove("active");
    });

    // Close when clicking on any link
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("active"));
    });

        

        /* === Cursor Glow Sync === */
    const syncPointer = ({ x: pointerX, y: pointerY }) => {
      const x = pointerX.toFixed(2);
      const y = pointerY.toFixed(2);
      const xp = (pointerX / window.innerWidth).toFixed(2);
      const yp = (pointerY / window.innerHeight).toFixed(2);
      document.documentElement.style.setProperty('--x', x);
      document.documentElement.style.setProperty('--y', y);
      document.documentElement.style.setProperty('--xp', xp);
      document.documentElement.style.setProperty('--yp', yp);
    };
    document.body.addEventListener('pointermove', syncPointer);


   
  const fadeElements = document.querySelectorAll('.scroll-fade');

  const observerOptions = {
  root: null, // observe relative to the viewport
  rootMargin: '0px',
  threshold: 0.1 // Trigger when 10% of the element is visible
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // Optional: stop observing once it has animated
      observer.unobserve(entry.target);
    }
    // The video also shows an else block to remove the class when it leaves
    // If you want the animation to reset when scrolling out:
    // else {
    //   entry.target.classList.remove('show');
    // }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Select the elements you want to observe
const elementsToAnimate = document.querySelectorAll('.scroll-animate, .review-card');

// Start observing each element
elementsToAnimate.forEach(element => {
  observer.observe(element);
});



document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('Story-Button');
    const hiddenText = document.querySelector('.hidden-text');

    button.addEventListener('click', () => {
      hiddenText.classList.toggle('visible');
      button.textContent = hiddenText.classList.contains('visible') ? 'Read Less' : 'Read More';
    });
  });



   function showMore() {
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        if (card.classList.contains('hidden')) {
          card.classList.remove('hidden');
        }
      });
      document.querySelector('.see-more-btn').style.display = 'none';
      document.querySelector('.see-less-btn').style.display = 'block';
    }

   function showLess() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    if (parseInt(card.getAttribute('data-index')) > 4) {
      card.classList.add('hidden');
    }
  });
  document.querySelector('.see-more-btn').style.display = 'block';
  document.querySelector('.see-less-btn').style.display = 'none';

  // Scroll to the true top of the section with optional offset
  const section = document.getElementById('Menu-Section');
  const offset = -20; // adjust this if you have a sticky header
  const top = section.getBoundingClientRect().top + window.pageYOffset + offset;

  window.scrollTo({
    top: top,
    behavior: 'smooth'
  });


document.addEventListener('DOMContentLoaded', () => {
  // Prevent placeholder anchors from jumping
  document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', ev => ev.preventDefault()));

  // Delegation root (use product-grid if present, otherwise document)
  const root = document.getElementById('product-grid') || document;

  // Create sheet/backdrop if not present (idempotent)
  function ensureDrawer() {
    let backdrop = document.getElementById('drawerBackdrop') || document.getElementById('sheetBackdrop') || null;
    let drawer = document.getElementById('bottomDrawer') || document.getElementById('bottomSheet') || null;

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'drawerBackdrop';
      backdrop.className = 'drawer-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'bottomDrawer';
      drawer.className = 'bottom-drawer';
      drawer.setAttribute('role','dialog');
      drawer.setAttribute('aria-modal','true');
      drawer.setAttribute('aria-hidden','true');
      drawer.tabIndex = -1;
      drawer.innerHTML = `
        <div class="drawer-header" aria-hidden="false" style="flex-direction:column;align-items:stretch;">
          <div class="drawer-handle" aria-hidden="true"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;">
            <h2 class="drawer-title" id="drawerTitle">Customize</h2>
            <div>
              <button id="drawerCancel" class="btn" aria-label="Cancel">Cancel</button>
              <button id="drawerClose" class="drawer-close" aria-label="Close">&times;</button>
            </div>
          </div>
        </div>
        <div class="drawer-body" id="drawerBody">
          <img id="drawerImage" src="" alt="" style="max-width:120px;display:none;border-radius:8px;margin-bottom:10px;object-fit:cover;">
          <p id="drawerProductName" style="font-weight:600;margin:0 0 6px 0">Product</p>
          <p id="drawerProductDesc" style="margin:0 0 12px 0;color:#444"></p>
          <!-- Customize controls go here -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button id="drawerAdd" class="btn primary">Add to cart</button>
            <button id="drawerMore" class="btn">More options</button>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    return {
      backdrop,
      drawer,
      drawerTitle: drawer.querySelector('#drawerTitle'),
      drawerProductName: drawer.querySelector('#drawerProductName'),
      drawerProductDesc: drawer.querySelector('#drawerProductDesc'),
      drawerImage: drawer.querySelector('#drawerImage'),
      drawerClose: drawer.querySelector('#drawerClose'),
      drawerCancel: drawer.querySelector('#drawerCancel'),
      drawerAdd: drawer.querySelector('#drawerAdd'),
      drawerBody: drawer.querySelector('#drawerBody'),
    };
  }

  const els = ensureDrawer();
  const { backdrop, drawer, drawerProductName, drawerProductDesc, drawerImage, drawerClose, drawerCancel, drawerAdd } = els;

  let lastFocused = null;

  // Helpers
  function getFocusable(container) {
    if (!container) return [];
    return Array.from(container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function openDrawer({ name = '', desc = '', imgSrc = '', imgAlt = '' } = {}) {
    lastFocused = document.activeElement;

    if (drawerProductName) drawerProductName.textContent = name || 'Product';
    if (drawerProductDesc) drawerProductDesc.textContent = desc || '';
    if (drawerImage) {
      if (imgSrc) { drawerImage.src = imgSrc; drawerImage.alt = imgAlt || name || ''; drawerImage.style.display = 'block'; }
      else { drawerImage.style.display = 'none'; drawerImage.src = ''; drawerImage.alt = ''; }
    }

    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('drawer-open'); // optional hook
    document.documentElement.style.overflow = 'hidden';

    // focus first focusable inside
    const focusables = getFocusable(drawer);
    (focusables[0] || drawer).focus();

    // small delay to ensure animations set before adding focus trap listeners if needed
    setTimeout(() => { document.addEventListener('focus', focusGuard, true); }, 20);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('drawer-open');
    document.documentElement.style.overflow = '';

    // restore focus
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;

    // remove focus guard
    document.removeEventListener('focus', focusGuard, true);
  }

  // Focus trap: keep focus inside when open
  function focusGuard(e) {
    if (!drawer.classList.contains('open')) return;
    if (drawer.contains(e.target)) return;
    // If focus moves outside, send it back to first focusable
    const focusables = getFocusable(drawer);
    (focusables[0] || drawer).focus();
    e.stopPropagation();
    e.preventDefault && e.preventDefault();
  }

  // Keyboard handling for Tab cycling and ESC
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }
    if (e.key === 'Tab') {
      // manual cycle inside drawer
      const focusables = getFocusable(drawer);
      if (focusables.length === 0) { e.preventDefault(); return; }
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus(); return;
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus(); return;
      }
      // otherwise let default tab behavior
    }
  });

  // Close interactions
  backdrop.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); });
  drawerClose && drawerClose.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); });
  drawerCancel && drawerCancel.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); });
  drawerAdd && drawerAdd.addEventListener('click', (e) => { e.preventDefault(); 
    // Demo action: replace with cart logic
    console.log('Add clicked for', drawerProductName?.textContent);
    closeDrawer();
  });

  // Delegated listener for all .customize-btn clicks
  root.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.customize-btn');
    if (!btn) return;

    // Prevent anchor / form default behavior and hijackers higher up
    e.preventDefault();
    e.stopPropagation();

    // Get product card data
    const card = btn.closest && btn.closest('.product-card');
    const titleEl = card && (card.querySelector('.title span') || card.querySelector('.title'));
    const descEl = card && card.querySelector('.description');
    const imgEl = card && card.querySelector('.product-img img');

    const name = titleEl ? titleEl.textContent.trim() : 'Product';
    const desc = descEl ? descEl.textContent.trim() : '';
    const imgSrc = imgEl ? (imgEl.getAttribute('src') || imgEl.src) : '';
    const imgAlt = imgEl ? (imgEl.getAttribute('alt') || imgEl.alt || '') : '';

    openDrawer({ name, desc, imgSrc, imgAlt });
  });

  // Quick debug message if no customize buttons detected
  if (document.querySelectorAll('.customize-btn').length === 0) {
    console.warn('No .customize-btn elements found. Confirm your Customize buttons have class="customize-btn" (recommended type="button").');
  }
});


    }