


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
      const sheet = document.getElementById('bottomSheet');
      const backdrop = document.getElementById('sheetBackdrop');
      const closeBtn = document.getElementById('closeSheet');
      const addToCart = document.getElementById('addToCart');
      const customizeButtons = document.querySelectorAll('.customize-btn');

      function openSheet() {
        sheet.classList.add('open');
        backdrop.classList.add('open');
        sheet.setAttribute('aria-hidden', 'false');
      }

      function closeSheet() {
        sheet.classList.remove('open');
        backdrop.classList.remove('open');
        sheet.setAttribute('aria-hidden', 'true');
      }

      customizeButtons.forEach(btn => {
        btn.addEventListener('click', openSheet);
      });

      closeBtn.addEventListener('click', closeSheet);
      backdrop.addEventListener('click', closeSheet);
      addToCart.addEventListener('click', () => {
        closeSheet();
        alert('Added to cart!');
      });
    });


    }