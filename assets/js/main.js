<<<<<<< HEAD
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      all ? selectEl.forEach(e => e.addEventListener(type, listener)) : selectEl.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => el.addEventListener("scroll", listener);

  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({ top: elementPos, behavior: "smooth" });
  };

  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      window.scrollY > 100 ? backtotop.classList.add("active") : backtotop.classList.remove("active");
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on("click", ".mobile-nav-toggle", function () {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      let body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        let navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }
      scrollto(this.hash);
    }
  }, true);

  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      cursorChar: "/>",
    });
  }

  let skillsContent = select(".skills-content");
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: "80%",
      handler: () => {
        let progress = select(".progress .progress-bar", true);
        progress.forEach(el => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);
      on("click", "#portfolio-flters li", function (e) {
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove("filter-active"));
        this.classList.add("filter-active");
        portfolioIsotope.arrange({ filter: this.getAttribute("data-filter") });
        portfolioIsotope.on("arrangeComplete", function () {
          AOS.refresh();
        });
      }, true);
    }
  });

  const portfolioLightbox = GLightbox({ selector: ".portfolio-lightbox" });

  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
 * Certificates Swiper Slider
 */
new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 10000, // 1 minute
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

  document.addEventListener("DOMContentLoaded", () => {
    const skillElements = document.querySelectorAll(".circular-progress");

    const startProgress = (skill) => {
      if (skill.dataset.animated === "true") return;
      skill.dataset.animated = "true";

      const percent = parseInt(skill.getAttribute("data-percent"));
      const percentageElement = skill.querySelector(".percentage");
      let currentPercent = 0;

      const updateProgress = () => {
        if (currentPercent < percent) {
          currentPercent++;
          percentageElement.textContent = `${currentPercent}%`;

          const circle = skill.querySelector(".circle");
          circle.style.background = `conic-gradient(
            #00bcd4 ${currentPercent * 3.6}deg,
            #ddd ${currentPercent * 3.6}deg
          )`;

          requestAnimationFrame(updateProgress);
        }
      };

      updateProgress();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startProgress(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillElements.forEach((skill) => observer.observe(skill));
  });

  new PureCounter();
})();
=======

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
 * Hero type effect
 */
const typed = select('.typed')
if (typed) {
  let typed_strings = typed.getAttribute('data-typed-items')
  typed_strings = typed_strings.split(',')
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    cursorChar: '/>' 
  });
}


  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

/**
   * Skill slider 
*/

document.addEventListener("DOMContentLoaded", () => {
  const skillElements = document.querySelectorAll(".circular-progress");

  const startProgress = (skill) => {
    const percent = parseInt(skill.getAttribute("data-percent"));
    const percentageElement = skill.querySelector(".percentage");
    let currentPercent = 0;

    const updateProgress = () => {
      currentPercent++;
      percentageElement.textContent = `${currentPercent}%`;

      if (currentPercent <= percent) {
        const circle = skill.querySelector(".circle");
        circle.style.background = `conic-gradient(
          #00bcd4 ${currentPercent * 3.6}deg,
          #ddd ${currentPercent * 3.6}deg
        )`;
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startProgress(entry.target);
        }
      });
    },
    { threshold: 0.5 } // Adjust the threshold as needed
  );

  skillElements.forEach((skill) => {
    observer.observe(skill);
  });
});
  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
>>>>>>> d3c761d89491c8017d185d6a3114e6ccbe378a1b
