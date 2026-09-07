
const BUSINESS = {
  name: "Elveelia Medspa",
  phoneDisplay: "0548179233",
  phoneDial: "0548179233", 
  whatsappNumberIntl: "233548179233", 
  whatsappMessage: "Hello Elveelia Medspa, I would like to book an appointment.",
  email: "Elveeliabeauty@gmail.com",
  instagramHandle: "elveelia_medspa", // 
  tiktokHandle: "elveelia_medspa",
  address: "Aviation Road, Accra, Ghana",
  hours: "8:30 AM – 8:00 PM",
};

function buildWhatsAppLink() {
  const text = encodeURIComponent(BUSINESS.whatsappMessage);
  return `https://wa.me/${BUSINESS.whatsappNumberIntl}?text=${text}`;
}

function buildTelLink() {
  return `tel:${BUSINESS.phoneDial}`;
}

function buildMailLink() {
  return `mailto:${BUSINESS.email}`;
}

function buildInstagramLink() {
  return `https://instagram.com/${BUSINESS.instagramHandle}`;
}

function buildTiktokLink() {
  return `https://www.tiktok.com/@${BUSINESS.tiktokHandle}`;
}

function populateBusinessInfo() {
  // Floating WhatsApp button + all WhatsApp CTAs
  document.querySelectorAll("#whatsappFloat, #whatsappUsBtn, #whatsappInlineLink").forEach((el) => {
    el.setAttribute("href", buildWhatsAppLink());
  });

  // Call Us button
  const callBtn = document.getElementById("callUsBtn");
  if (callBtn) callBtn.setAttribute("href", buildTelLink());

  // Instagram buttons
  document.querySelectorAll("#instagramBtn").forEach((el) => {
    el.setAttribute("href", buildInstagramLink());
  });

  // TikTok buttons
  document.querySelectorAll("#tiktokBtn").forEach((el) => {
    el.setAttribute("href", buildTiktokLink());
  });

  // Display text spans
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText("contactPhoneText", BUSINESS.phoneDisplay);
  setText("contactEmailText", BUSINESS.email);
  setText("contactInstagramText", `@${BUSINESS.instagramHandle}`);
  setText("contactTiktokText", `@${BUSINESS.tiktokHandle}`);
  setText("footerPhone", BUSINESS.phoneDisplay);
  setText("footerEmail", BUSINESS.email);

  // Make the email text itself clickable via mailto
  const emailSpan = document.getElementById("contactEmailText");
  if (emailSpan) {
    emailSpan.style.cursor = "pointer";
    emailSpan.addEventListener("click", () => {
      window.location.href = buildMailLink();
    });
  }
}

/* NAVIGATION — sticky shadow + mobile menu */
function initNavigation() {
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("mobileMenuClose");

  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    overlay.classList.add("is-open");
    hamburger.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    overlay.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ==========================================================================
   FADE-IN ON SCROLL
   ========================================================================== */
function initFadeIn() {
  const targets = document.querySelectorAll(".fade-in");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((t) => observer.observe(t));
}

/* ==========================================================================
   GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  let currentIndex = 0;

  const openAt = (index) => {
    currentIndex = index;
    const item = items[currentIndex];
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const showPrev = () => openAt((currentIndex - 1 + items.length) % items.length);
  const showNext = () => openAt((currentIndex + 1) % items.length);

  items.forEach((item, index) => {
    item.addEventListener("click", () => openAt(index));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("is-open");
      });
      item.classList.toggle("is-open", !isOpen);
    });
  });
}

/* ==========================================================================
   APPOINTMENT FORM — validation + confirmation message
   ========================================================================== */
function initAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  const confirmation = document.getElementById("confirmationMessage");
  const requestAnotherBtn = document.getElementById("requestAnotherBtn");

  const fields = {
    fullName: { el: document.getElementById("fullName"), required: true },
    phone: { el: document.getElementById("phone"), required: true },
    email: { el: document.getElementById("email"), required: false },
    service: { el: document.getElementById("service"), required: true },
    date: { el: document.getElementById("date"), required: true },
    time: { el: document.getElementById("time"), required: true },
  };

  const setFieldError = (name, hasError) => {
    const wrapper = document.getElementById(`field-${name}`);
    if (wrapper) wrapper.classList.toggle("error", hasError);
  };

  const validate = () => {
    let isValid = true;

    Object.entries(fields).forEach(([name, { el, required }]) => {
      const value = el.value.trim();
      let hasError = false;

      if (required && !value) {
        hasError = true;
      }
      if (name === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
        hasError = true;
      }

      setFieldError(name, hasError);
      if (hasError) isValid = false;
    });

    return isValid;
  };

  // Clear individual field errors as the user corrects them
  Object.entries(fields).forEach(([name, { el }]) => {
    el.addEventListener("input", () => setFieldError(name, false));
    el.addEventListener("change", () => setFieldError(name, false));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

  
    const submission = {
      fullName: fields.fullName.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      email: fields.email.el.value.trim(),
      service: fields.service.el.value,
      date: fields.date.el.value,
      time: fields.time.el.value,
      message: document.getElementById("message").value.trim(),
    };
    console.log("Appointment request (not yet sent anywhere):", submission);

    form.style.display = "none";
    confirmation.classList.add("is-visible");
  });

  requestAnotherBtn.addEventListener("click", () => {
    form.reset();
    Object.keys(fields).forEach((name) => setFieldError(name, false));
    confirmation.classList.remove("is-visible");
    form.style.display = "";
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  populateBusinessInfo();
  initNavigation();
  initFadeIn();
  initGalleryLightbox();
  initFaq();
  initAppointmentForm();
});
