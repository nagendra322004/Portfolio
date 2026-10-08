```javascript
/* =========================================================
   PORTFOLIO WEBSITE - UPDATED JAVASCRIPT
   ========================================================= */

/* ---------- MOBILE NAVIGATION ---------- */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}


/* ---------- CLOSE MOBILE MENU ---------- */

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
    });
});


/* ---------- TYPING ANIMATION ---------- */

const typingText = document.querySelector(".typing-text");

if (typingText) {

    const text = typingText.getAttribute("data-text") ||
                 typingText.textContent.trim();

    typingText.textContent = "";

    let index = 0;

    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;

            setTimeout(typeText, 100);
        }
    }

    typeText();
}


/* ---------- CURRENT YEAR ---------- */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ---------- DARK / LIGHT MODE ---------- */

const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("portfolio-theme", "dark");
        } else {
            localStorage.setItem("portfolio-theme", "light");
        }

    });
}


/* ---------- SCROLL REVEAL ---------- */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("visible");
        }

    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ---------- ACTIVE NAVIGATION ---------- */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {
            link.classList.add("active");
        }

    });
}

window.addEventListener("scroll", updateActiveNavigation);


/* ---------- BACK TO TOP BUTTON ---------- */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================================================
   CERTIFICATIONS / ACHIEVEMENTS
   ========================================================= */

/*
   Certification details are stored in the browser's
   localStorage.

   No database is required.

   Users can add certification details directly from
   the webpage.
*/

const CERTIFICATION_STORAGE_KEY = "portfolio-certifications";


/* ---------- GET CERTIFICATIONS ---------- */

function getCertifications() {

    const savedData = localStorage.getItem(
        CERTIFICATION_STORAGE_KEY
    );

    if (!savedData) {
        return [];
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        console.error("Unable to read certifications:", error);
        return [];
    }
}


/* ---------- SAVE CERTIFICATIONS ---------- */

function saveCertifications(certifications) {

    localStorage.setItem(
        CERTIFICATION_STORAGE_KEY,
        JSON.stringify(certifications)
    );

}


/* ---------- CREATE CERTIFICATION ID ---------- */

function createCertificationId() {

    return Date.now().toString() +
           Math.random().toString(36).substring(2, 8);

}


/* ---------- DISPLAY CERTIFICATIONS ---------- */

function displayCertifications() {

    const container = document.getElementById(
        "certifications-container"
    );

    if (!container) {
        return;
    }

    const certifications = getCertifications();

    container.innerHTML = "";

    if (certifications.length === 0) {

        container.innerHTML = `
            <div class="no-certifications">
                <p>No certifications or achievements added yet.</p>
            </div>
        `;

        return;
    }


    certifications.forEach(certification => {

        const card = document.createElement("div");

        card.className = "certification-card";

        card.innerHTML = `
            <div class="certification-content">

                <h3>${escapeHTML(certification.title)}</h3>

                ${
                    certification.platform
                    ? `<p class="certification-platform">
                        <strong>Platform:</strong>
                        ${escapeHTML(certification.platform)}
                       </p>`
                    : ""
                }

                ${
                    certification.type
                    ? `<p class="certification-type">
                        <strong>Type:</strong>
                        ${escapeHTML(certification.type)}
                       </p>`
                    : ""
                }

                ${
                    certification.date
                    ? `<p class="certification-date">
                        <strong>Date/Year:</strong>
                        ${escapeHTML(certification.date)}
                       </p>`
                    : ""
                }

                ${
                    certification.description
                    ? `<p class="certification-description">
                        ${escapeHTML(certification.description)}
                       </p>`
                    : ""
                }

                ${
                    certification.link
                    ? `
                    <a
                        href="${escapeAttribute(certification.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="certificate-link"
                    >
                        View Certificate
                    </a>
                    `
                    : ""
                }

                <button
                    class="delete-certification"
                    data-id="${certification.id}"
                    type="button"
                >
                    Delete
                </button>

            </div>
        `;

        container.appendChild(card);

    });


    /* ---------- DELETE CERTIFICATION ---------- */

    document
        .querySelectorAll(".delete-certification")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = button.getAttribute("data-id");

                const confirmDelete = confirm(
                    "Are you sure you want to delete this certification?"
                );

                if (!confirmDelete) {
                    return;
                }

                const certifications = getCertifications();

                const updatedCertifications =
                    certifications.filter(
                        certification =>
                            certification.id !== id
                    );

                saveCertifications(updatedCertifications);

                displayCertifications();

            });

        });

}


/* ---------- ESCAPE HTML ---------- */

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ---------- ESCAPE URL ATTRIBUTE ---------- */

function escapeAttribute(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


/* =========================================================
   ADD CERTIFICATION PANEL
   ========================================================= */

const certificationPanel =
    document.getElementById("certification-admin-panel");

const certificationForm =
    document.getElementById("certification-form");

const closeCertificationPanel =
    document.getElementById("close-certification-panel");


/* ---------- OPEN PANEL ---------- */

function openCertificationPanel() {

    if (certificationPanel) {
        certificationPanel.classList.add("active");
    }

}


/* ---------- CLOSE PANEL ---------- */

function closeCertificationAdminPanel() {

    if (certificationPanel) {
        certificationPanel.classList.remove("active");
    }

}


/* ---------- CLOSE BUTTON ---------- */

if (closeCertificationPanel) {

    closeCertificationPanel.addEventListener(
        "click",
        closeCertificationAdminPanel
    );

}


/* ---------- ESC KEY ---------- */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeCertificationAdminPanel();
    }

});


/* =========================================================
   HIDDEN CERTIFICATION ACCESS
   ========================================================= */

/*
   Press Ctrl + Shift + A to open the certification
   management panel.

   This avoids adding another visible button to the
   portfolio navigation.
*/

document.addEventListener("keydown", event => {

    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "a"
    ) {

        event.preventDefault();

        openCertificationPanel();

    }

});


/* =========================================================
   CERTIFICATION FORM
   ========================================================= */

if (certificationForm) {

    certificationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const title =
                document.getElementById(
                    "certificate-title"
                )?.value.trim();


            const platform =
                document.getElementById(
                    "certificate-platform"
                )?.value.trim();


            const type =
                document.getElementById(
                    "certificate-type"
                )?.value.trim();


            const date =
                document.getElementById(
                    "certificate-date"
                )?.value.trim();


            const description =
                document.getElementById(
                    "certificate-description"
                )?.value.trim();


            const link =
                document.getElementById(
                    "certificate-link"
                )?.value.trim();


            /* ---------- VALIDATION ---------- */

            if (!title) {

                alert(
                    "Please enter the certificate or achievement title."
                );

                return;

            }


            /* ---------- CREATE OBJECT ---------- */

            const newCertification = {

                id: createCertificationId(),

                title: title,

                platform: platform,

                type: type,

                date: date,

                description: description,

                link: link

            };


            /* ---------- SAVE ---------- */

            const certifications =
                getCertifications();

            certifications.push(
                newCertification
            );

            saveCertifications(
                certifications
            );


            /* ---------- REFRESH DISPLAY ---------- */

            displayCertifications();


            /* ---------- RESET FORM ---------- */

            certificationForm.reset();


            /* ---------- CLOSE PANEL ---------- */

            closeCertificationAdminPanel();


            alert(
                "Certification/Achievement added successfully!"
            );

        }
    );

}


/* =========================================================
   LOAD CERTIFICATIONS WHEN PAGE LOADS
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayCertifications();

    }
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            alert(
                "Thank you for contacting me! " +
                "I will get back to you soon."
            );

            contactForm.reset();

        }
    );

}


/* =========================================================
   SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            document
                .querySelector(targetId)
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =========================================================
   END OF SCRIPT
   ========================================================= */
```
