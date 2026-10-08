```javascript
/* =========================================================
   NAGENDRA PUTREVU - PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

/*
   IMPORTANT:
   Change this password before publishing your website.

   Example:
   const ADMIN_PASSWORD = "YourOwnPassword123";
*/

const ADMIN_PASSWORD = "Nagendra1*";

const CERT_STORAGE_KEY = "nagendra_portfolio_certifications";


/* =========================================================
   WAIT FOR PAGE TO LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {
                navLinks.classList.remove("active");
            }

        });

    });


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

                themeToggle.textContent = "☀️";

            } else {

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

                themeToggle.textContent = "🌙";

            }

        });

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingText =
        document.getElementById("typing-text");

    if (typingText) {

        const originalText =
            typingText.textContent.trim();

        typingText.textContent = "";

        let index = 0;

        function typeText() {

            if (index < originalText.length) {

                typingText.textContent +=
                    originalText.charAt(index);

                index++;

                setTimeout(typeText, 80);

            }

        }

        typeText();

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    function revealOnScroll() {

        revealElements.forEach(function (element) {

            const elementTop =
                element.getBoundingClientRect().top;

            if (elementTop < window.innerHeight - 100) {

                element.classList.add("visible");

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("back-to-top");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {

                    backToTop.classList.add("show");

                } else {

                    backToTop.classList.remove("show");

                }

            }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (anchor) {

        anchor.addEventListener(
            "click",
            function (event) {

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


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contact-form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                alert(
                    "Thank you for contacting me! " +
                    "I will get back to you soon."
                );

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       CERTIFICATION SYSTEM
    ===================================================== */

    initializeCertificationSystem();

});


/* =========================================================
   CERTIFICATION SYSTEM
========================================================= */

function initializeCertificationSystem() {


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const overlay =
        document.getElementById("cert-admin-overlay");

    const closeButton =
        document.getElementById("cert-admin-close");

    const passwordInput =
        document.getElementById("cert-admin-password");

    const loginButton =
        document.getElementById(
            "cert-admin-login-button"
        );

    const loginSection =
        document.getElementById("cert-admin-login");

    const adminContent =
        document.getElementById("cert-admin-content");

    const loginMessage =
        document.getElementById(
            "cert-admin-login-message"
        );

    const logoutButton =
        document.getElementById("cert-admin-logout");

    const certificationForm =
        document.getElementById(
            "certification-form"
        );


    /* =====================================================
       DISPLAY CERTIFICATIONS
    ===================================================== */

    displayCertifications();


    /* =====================================================
       OPEN ADMIN PANEL
    ===================================================== */

    function openAdminPanel() {

        if (!overlay) {
            return;
        }

        overlay.classList.add("show");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        /*
           Always start with login screen.
        */

        if (loginSection) {
            loginSection.hidden = false;
        }

        if (adminContent) {
            adminContent.hidden = true;
        }

        if (passwordInput) {

            passwordInput.value = "";

            setTimeout(function () {

                passwordInput.focus();

            }, 100);

        }

        if (loginMessage) {

            loginMessage.textContent = "";

            loginMessage.classList.remove("error");

        }

    }


    /* =====================================================
       CLOSE ADMIN PANEL
    ===================================================== */

    function closeAdminPanel() {

        if (!overlay) {
            return;
        }

        overlay.classList.remove("show");

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        if (passwordInput) {
            passwordInput.value = "";
        }

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeAdminPanel
        );

    }


    /* =====================================================
       CLICK OUTSIDE PANEL TO CLOSE
    ===================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {

                    closeAdminPanel();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                overlay &&
                overlay.classList.contains("show")
            ) {

                closeAdminPanel();

            }

        }
    );


    /* =====================================================
       CTRL + SHIFT + A
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.ctrlKey &&
                event.shiftKey &&
                event.key.toLowerCase() === "a"
            ) {

                event.preventDefault();

                openAdminPanel();

            }

        }
    );


    /* =====================================================
       LOGIN BUTTON
    ===================================================== */

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            checkAdminPassword
        );

    }


    /* =====================================================
       PASSWORD ENTER KEY
    ===================================================== */

    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    checkAdminPassword();

                }

            }
        );

    }


    /* =====================================================
       CHECK PASSWORD
    ===================================================== */

    function checkAdminPassword() {

        if (!passwordInput) {
            return;
        }

        const enteredPassword =
            passwordInput.value;


        if (
            enteredPassword === ADMIN_PASSWORD
        ) {

            if (loginSection) {
                loginSection.hidden = true;
            }

            if (adminContent) {
                adminContent.hidden = false;
            }

            if (loginMessage) {

                loginMessage.textContent = "";

                loginMessage.classList.remove(
                    "error"
                );

            }

            displayAdminList();

        } else {

            if (loginMessage) {

                loginMessage.textContent =
                    "Incorrect password. Please try again.";

                loginMessage.classList.add(
                    "error"
                );

            }

            passwordInput.value = "";

            passwordInput.focus();

        }

    }


    /* =====================================================
       LOGOUT / LOCK
    ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                if (loginSection) {
                    loginSection.hidden = false;
                }

                if (adminContent) {
                    adminContent.hidden = true;
                }

                if (passwordInput) {

                    passwordInput.value = "";

                }

                if (loginMessage) {

                    loginMessage.textContent = "";

                    loginMessage.classList.remove(
                        "error"
                    );

                }

                if (passwordInput) {
                    passwordInput.focus();
                }

            }
        );

    }


    /* =====================================================
       ADD CERTIFICATION
    ===================================================== */

    if (certificationForm) {

        certificationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM VALUES
                ----------------------------------------- */

                const title =
                    document
                        .getElementById("cert-title")
                        .value
                        .trim();


                const platform =
                    document
                        .getElementById("cert-platform")
                        .value
                        .trim();


                const type =
                    document
                        .getElementById("cert-type")
                        .value
                        .trim();


                const date =
                    document
                        .getElementById("cert-date")
                        .value
                        .trim();


                const description =
                    document
                        .getElementById(
                            "cert-description"
                        )
                        .value
                        .trim();


                const link =
                    document
                        .getElementById("cert-link")
                        .value
                        .trim();


                /* -----------------------------------------
                   VALIDATION
                ----------------------------------------- */

                if (!title) {

                    alert(
                        "Please enter the certification title."
                    );

                    return;

                }


                if (!platform) {

                    alert(
                        "Please enter the platform."
                    );

                    return;

                }


                if (!description) {

                    alert(
                        "Please enter the course details."
                    );

                    return;

                }


                /* -----------------------------------------
                   CREATE CERTIFICATION
                ----------------------------------------- */

                const certification = {

                    id:
                        Date.now().toString(),

                    title:
                        title,

                    platform:
                        platform,

                    type:
                        type,

                    date:
                        date,

                    description:
                        description,

                    link:
                        link

                };


                /* -----------------------------------------
                   GET EXISTING CERTIFICATIONS
                ----------------------------------------- */

                const certifications =
                    getCertifications();


                /* -----------------------------------------
                   ADD NEW CERTIFICATION
                ----------------------------------------- */

                certifications.push(
                    certification
                );


                /* -----------------------------------------
                   SAVE
                ----------------------------------------- */

                saveCertifications(
                    certifications
                );


                /* -----------------------------------------
                   REFRESH PAGE SECTION
                ----------------------------------------- */

                displayCertifications();

                displayAdminList();


                /* -----------------------------------------
                   RESET FORM
                ----------------------------------------- */

                certificationForm.reset();


                /* -----------------------------------------
                   SUCCESS MESSAGE
                ----------------------------------------- */

                alert(
                    "Certification added successfully!"
                );

            }
        );

    }

}


/* =========================================================
   GET CERTIFICATIONS FROM LOCAL STORAGE
========================================================= */

function getCertifications() {

    const stored =
        localStorage.getItem(
            CERT_STORAGE_KEY
        );


    if (!stored) {

        return [];

    }


    try {

        const certifications =
            JSON.parse(stored);


        if (Array.isArray(certifications)) {

            return certifications;

        }


        return [];

    } catch (error) {

        console.error(
            "Error reading certifications:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE CERTIFICATIONS
========================================================= */

function saveCertifications(
    certifications
) {

    localStorage.setItem(
        CERT_STORAGE_KEY,
        JSON.stringify(certifications)
    );

}


/* =========================================================
   DISPLAY CERTIFICATIONS ON WEBSITE
========================================================= */

function displayCertifications() {

    const container =
        document.getElementById(
            "certifications-list"
        );


    if (!container) {
        return;
    }


    const certifications =
        getCertifications();


    /* -----------------------------------------
       EMPTY STATE
    ----------------------------------------- */

    if (certifications.length === 0) {

        container.innerHTML = `

            <div class="certifications-empty">

                <div class="cert-empty-icon">
                    🏆
                </div>

                <h3>
                    No certifications added yet
                </h3>

                <p>
                    Certifications and achievements
                    will appear here after they are
                    added through the private admin panel.
                </p>

            </div>

        `;

        return;

    }


    /* -----------------------------------------
       CLEAR CONTAINER
    ----------------------------------------- */

    container.innerHTML = "";


    /* -----------------------------------------
       CREATE CARDS
    ----------------------------------------- */

    certifications.forEach(
        function (certification) {

            const card =
                document.createElement("article");


            card.className =
                "certification-card";


            let linkHTML = "";


            if (certification.link) {

                linkHTML = `

                    <a
                        href="${escapeHTML(
                            certification.link
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="certification-link"
                    >
                        View Credential →
                    </a>

                `;

            }


            let dateHTML = "";


            if (certification.date) {

                dateHTML = `

                    <span class="certification-date">
                        ${escapeHTML(
                            certification.date
                        )}
                    </span>

                `;

            }


            card.innerHTML = `

                <div class="certification-top">

                    <div class="certification-icon">
                        🏆
                    </div>

                    <span class="certification-type">
                        ${escapeHTML(
                            certification.type ||
                            "Certification"
                        )}
                    </span>

                </div>


                <h3>
                    ${escapeHTML(
                        certification.title
                    )}
                </h3>


                <p class="certification-platform">
                    ${escapeHTML(
                        certification.platform
                    )}
                </p>


                <p class="certification-description">
                    ${escapeHTML(
                        certification.description
                    )}
                </p>


                <div class="certification-bottom">

                    ${dateHTML}

                    ${linkHTML}

                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================================
   DISPLAY ADMIN LIST
========================================================= */

function displayAdminList() {

    const list =
        document.getElementById(
            "cert-admin-list"
        );


    const count =
        document.getElementById(
            "cert-admin-count"
        );


    if (!list) {
        return;
    }


    const certifications =
        getCertifications();


    list.innerHTML = "";


    /* -----------------------------------------
       UPDATE COUNT
    ----------------------------------------- */

    if (count) {

        count.textContent =
            certifications.length +
            (
                certifications.length === 1
                    ? " item"
                    : " items"
            );

    }


    /* -----------------------------------------
       EMPTY LIST
    ----------------------------------------- */

    if (certifications.length === 0) {

        list.innerHTML = `

            <p style="
                color: var(--text-light);
                font-size: 12px;
            ">
                No certifications have been added yet.
            </p>

        `;

        return;

    }


    /* -----------------------------------------
       CREATE ADMIN ITEMS
    ----------------------------------------- */

    certifications.forEach(
        function (certification) {

            const item =
                document.createElement("div");


            item.className =
                "cert-admin-item";


            item.innerHTML = `

                <div class="cert-admin-item-info">

                    <strong>
                        ${escapeHTML(
                            certification.title
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            certification.platform
                        )}
                        ${
                            certification.date
                                ? " • " +
                                  escapeHTML(
                                      certification.date
                                  )
                                : ""
                        }
                    </span>

                </div>


                <button
                    type="button"
                    class="cert-admin-delete"
                    data-id="${escapeHTML(
                        certification.id
                    )}"
                >
                    Delete
                </button>

            `;


            list.appendChild(item);

        }
    );


    /* -----------------------------------------
       DELETE BUTTONS
    ----------------------------------------- */

    list.querySelectorAll(
        ".cert-admin-delete"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        this.getAttribute(
                            "data-id"
                        );


                    const confirmDelete =
                        confirm(
                            "Are you sure you want to delete this certification?"
                        );


                    if (!confirmDelete) {
                        return;
                    }


                    deleteCertification(id);

                }
            );

        }
    );

}


/* =========================================================
   DELETE CERTIFICATION
========================================================= */

function deleteCertification(id) {

    const certifications =
        getCertifications();


    const updated =
        certifications.filter(
            function (certification) {

                return certification.id !== id;

            }
        );


    saveCertifications(updated);


    displayCertifications();

    displayAdminList();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   END OF JAVASCRIPT
========================================================= */
```
