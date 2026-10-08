```javascript
/* =========================================================
   NAGENDRA PUTREVU - PERSONAL PORTFOLIO
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   SETTINGS
   ========================================================= */

/*
    IMPORTANT:
    Change this password before publishing your website.

    Example:
    const ADMIN_PASSWORD = "MySecurePassword123";
*/

const ADMIN_PASSWORD = "CHANGE_ME_2026";


/*
    Certificate data is stored in the browser's localStorage.
    No database is required for this version.
*/

const CERT_STORAGE_KEY = "nagendra_portfolio_certifications";



/* =========================================================
   PAGE LOAD
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


        /*
            Close mobile menu when a navigation link
            is clicked.
        */

        const navigationLinks =
            navLinks.querySelectorAll(".nav-link");


        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

            });

        });

    }



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

    } else {

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");


            const darkMode =
                document.body.classList.contains("dark-mode");


            if (darkMode) {

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
       TYPING ANIMATION
       ===================================================== */

    const typingText =
        document.getElementById("typing-text");


    if (typingText) {

        const typingWords = [
            "Computer Science Engineer",
            "Software Developer",
            "Python Developer",
            "AI Enthusiast",
            "Technology Learner"
        ];


        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                typingWords[wordIndex];


            if (!deleting) {

                characterIndex++;

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1600
                    );

                    return;

                }

            } else {

                characterIndex--;

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        typingWords.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 55 : 90
            );

        }


        typeEffect();

    }



    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;


        revealElements.forEach(function (element) {

            const elementTop =
                element.getBoundingClientRect().top;


            if (elementTop < windowHeight - 80) {

                element.classList.add("active");

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
        document.querySelectorAll("main section[id]");


    const navItems =
        document.querySelectorAll(".nav-link");


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            const scrollPosition =
                window.scrollY;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === "#" + currentSection
            ) {

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


    function updateBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    updateBackToTop();


    if (backToTop) {

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

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allAnchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
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


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                alert(
                    "Thank you, " +
                    name +
                    "! Your message has been received."
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

    const adminOpenButton =
        document.getElementById(
            "cert-admin-open"
        );


    const adminOverlay =
        document.getElementById(
            "cert-admin-overlay"
        );


    const adminCloseButton =
        document.getElementById(
            "cert-admin-close"
        );


    const adminPassword =
        document.getElementById(
            "cert-admin-password"
        );


    const adminLoginButton =
        document.getElementById(
            "cert-admin-login-button"
        );


    const adminLogin =
        document.getElementById(
            "cert-admin-login"
        );


    const adminContent =
        document.getElementById(
            "cert-admin-content"
        );


    const adminMessage =
        document.getElementById(
            "cert-admin-login-message"
        );


    const adminLogout =
        document.getElementById(
            "cert-admin-logout"
        );


    const certificationForm =
        document.getElementById(
            "certification-form"
        );


    const certTitle =
        document.getElementById(
            "cert-title"
        );


    const certPlatform =
        document.getElementById(
            "cert-platform"
        );


    const certType =
        document.getElementById(
            "cert-type"
        );


    const certDate =
        document.getElementById(
            "cert-date"
        );


    const certDescription =
        document.getElementById(
            "cert-description"
        );


    const certLink =
        document.getElementById(
            "cert-link"
        );


    const certificationsList =
        document.getElementById(
            "certifications-list"
        );


    const adminList =
        document.getElementById(
            "cert-admin-list"
        );


    const adminCount =
        document.getElementById(
            "cert-admin-count"
        );



    /* =====================================================
       OPEN ADMIN PANEL
       ===================================================== */

    function openAdminPanel() {

        if (!adminOverlay) {
            return;
        }


        adminOverlay.classList.add("show");

        adminOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        if (adminLogin) {
            adminLogin.hidden = false;
        }


        if (adminContent) {
            adminContent.hidden = true;
        }


        if (adminMessage) {

            adminMessage.textContent = "";

            adminMessage.classList.remove(
                "error"
            );

        }


        if (adminPassword) {

            adminPassword.value = "";

            setTimeout(function () {

                adminPassword.focus();

            }, 100);

        }

    }



    /* =====================================================
       CLOSE ADMIN PANEL
       ===================================================== */

    function closeAdminPanel() {

        if (!adminOverlay) {
            return;
        }


        adminOverlay.classList.remove("show");


        adminOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }



    /* =====================================================
       ADD CERTIFICATE BUTTON
       ===================================================== */

    if (adminOpenButton) {

        adminOpenButton.addEventListener(
            "click",
            function () {

                openAdminPanel();

            }
        );

    }



    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    if (adminCloseButton) {

        adminCloseButton.addEventListener(
            "click",
            function () {

                closeAdminPanel();

            }
        );

    }



    /* =====================================================
       CLICK OUTSIDE ADMIN PANEL
       ===================================================== */

    if (adminOverlay) {

        adminOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    adminOverlay
                ) {

                    closeAdminPanel();

                }

            }
        );

    }



    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                adminOverlay &&
                adminOverlay.classList.contains("show")
            ) {

                closeAdminPanel();

            }

        }
    );



    /* =====================================================
       OPTIONAL KEYBOARD SHORTCUT
       ===================================================== */

    /*
        Ctrl + Shift + A is kept as an optional shortcut.

        The important difference is that preventDefault()
        is used so the browser does not perform its normal
        shortcut action.
    */

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

    if (adminLoginButton) {

        adminLoginButton.addEventListener(
            "click",
            function () {

                loginToAdminPanel();

            }
        );

    }



    /* =====================================================
       PASSWORD ENTER KEY
       ===================================================== */

    if (adminPassword) {

        adminPassword.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    loginToAdminPanel();

                }

            }
        );

    }



    /* =====================================================
       LOGIN FUNCTION
       ===================================================== */

    function loginToAdminPanel() {

        if (!adminPassword) {
            return;
        }


        const enteredPassword =
            adminPassword.value;


        if (
            enteredPassword ===
            ADMIN_PASSWORD
        ) {

            if (adminLogin) {
                adminLogin.hidden = true;
            }


            if (adminContent) {
                adminContent.hidden = false;
            }


            if (adminMessage) {

                adminMessage.textContent =
                    "Admin panel unlocked.";

                adminMessage.classList.remove(
                    "error"
                );

            }


            displayAdminList();

            adminPassword.value = "";

        } else {

            if (adminMessage) {

                adminMessage.textContent =
                    "Incorrect password. Please try again.";

                adminMessage.classList.add(
                    "error"
                );

            }


            adminPassword.value = "";

            adminPassword.focus();

        }

    }



    /* =====================================================
       LOGOUT / LOCK
       ===================================================== */

    if (adminLogout) {

        adminLogout.addEventListener(
            "click",
            function () {

                if (adminLogin) {
                    adminLogin.hidden = false;
                }


                if (adminContent) {
                    adminContent.hidden = true;
                }


                if (adminPassword) {
                    adminPassword.value = "";
                }


                if (adminMessage) {

                    adminMessage.textContent = "";

                    adminMessage.classList.remove(
                        "error"
                    );

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


                const title =
                    certTitle.value.trim();


                const platform =
                    certPlatform.value.trim();


                const type =
                    certType.value;


                const date =
                    certDate.value.trim();


                const description =
                    certDescription.value.trim();


                const link =
                    certLink.value.trim();



                /* =========================================
                   VALIDATION
                   ========================================= */

                if (
                    title === "" ||
                    platform === "" ||
                    description === ""
                ) {

                    alert(
                        "Please fill in the required fields."
                    );

                    return;

                }



                /* =========================================
                   LINK VALIDATION
                   ========================================= */

                if (link !== "") {

                    try {

                        const parsedURL =
                            new URL(link);


                        if (
                            parsedURL.protocol !==
                                "http:" &&
                            parsedURL.protocol !==
                                "https:"
                        ) {

                            alert(
                                "Please enter a valid HTTP or HTTPS link."
                            );

                            return;

                        }

                    } catch (error) {

                        alert(
                            "Please enter a valid credential or course link."
                        );

                        return;

                    }

                }



                /* =========================================
                   CREATE CERTIFICATION
                   ========================================= */

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



                /* =========================================
                   SAVE
                   ========================================= */

                const certifications =
                    getCertifications();


                certifications.push(
                    certification
                );


                saveCertifications(
                    certifications
                );



                /* =========================================
                   REFRESH DISPLAY
                   ========================================= */

                displayCertifications();

                displayAdminList();



                /* =========================================
                   RESET FORM
                   ========================================= */

                certificationForm.reset();


                certType.value =
                    "Certification";


                alert(
                    "Certification added successfully!"
                );

            }
        );

    }



    /* =====================================================
       INITIAL DISPLAY
       ===================================================== */

    displayCertifications();

    displayAdminList();



    /* =====================================================
       LOCAL FUNCTIONS
       ===================================================== */

    function getCertifications() {

        try {

            const savedData =
                localStorage.getItem(
                    CERT_STORAGE_KEY
                );


            if (!savedData) {

                return [];

            }


            const parsedData =
                JSON.parse(savedData);


            if (!Array.isArray(parsedData)) {

                return [];

            }


            return parsedData;

        } catch (error) {

            console.error(
                "Unable to load certifications:",
                error
            );

            return [];

        }

    }



    function saveCertifications(
        certifications
    ) {

        try {

            localStorage.setItem(
                CERT_STORAGE_KEY,
                JSON.stringify(
                    certifications
                )
            );

        } catch (error) {

            console.error(
                "Unable to save certifications:",
                error
            );

        }

    }



    /* =====================================================
       DISPLAY CERTIFICATIONS
       ===================================================== */

    function displayCertifications() {

        if (!certificationsList) {
            return;
        }


        const certifications =
            getCertifications();


        certificationsList.innerHTML = "";



        /* ================================================
           EMPTY STATE
           ================================================ */

        if (certifications.length === 0) {

            certificationsList.innerHTML = `

                <div
                    id="certifications-empty"
                    class="certifications-empty"
                >

                    <div class="cert-empty-icon">
                        🏆
                    </div>

                    <h3>
                        No certifications added yet
                    </h3>

                    <p>
                        Click the
                        <strong>+ Add Certificate</strong>
                        button above to add your courses,
                        certifications or achievements.
                    </p>

                </div>

            `;

            return;

        }



        /* ================================================
           CREATE CERTIFICATE CARDS
           ================================================ */

        certifications.forEach(
            function (certification) {


                const card =
                    document.createElement("article");


                card.className =
                    "certification-card reveal active";



                /* ========================================
                   TOP SECTION
                   ======================================== */

                const top =
                    document.createElement("div");


                top.className =
                    "certification-top";


                const icon =
                    document.createElement("div");


                icon.className =
                    "certification-icon";


                icon.textContent =
                    getCertificationIcon(
                        certification.type
                    );


                const type =
                    document.createElement("span");


                type.className =
                    "certification-type";


                type.textContent =
                    certification.type;


                top.appendChild(icon);

                top.appendChild(type);



                /* ========================================
                   TITLE
                   ======================================== */

                const title =
                    document.createElement("h3");


                title.textContent =
                    certification.title;



                /* ========================================
                   PLATFORM
                   ======================================== */

                const platform =
                    document.createElement("div");


                platform.className =
                    "certification-platform";


                platform.textContent =
                    certification.platform;



                /* ========================================
                   DESCRIPTION
                   ======================================== */

                const description =
                    document.createElement("p");


                description.className =
                    "certification-description";


                description.textContent =
                    certification.description;



                /* ========================================
                   BOTTOM SECTION
                   ======================================== */

                const bottom =
                    document.createElement("div");


                bottom.className =
                    "certification-bottom";



                /* Date */

                const date =
                    document.createElement("span");


                date.className =
                    "certification-date";


                date.textContent =
                    certification.date ||
                    "Completed";



                /* Credential Link */

                if (
                    certification.link &&
                    isSafeURL(
                        certification.link
                    )
                ) {

                    const link =
                        document.createElement("a");


                    link.className =
                        "certification-link";


                    link.href =
                        certification.link;


                    link.target =
                        "_blank";


                    link.rel =
                        "noopener noreferrer";


                    link.textContent =
                        "View Credential →";


                    bottom.appendChild(
                        date
                    );

                    bottom.appendChild(
                        link
                    );

                } else {

                    bottom.appendChild(
                        date
                    );

                }



                /* ========================================
                   ADD EVERYTHING TO CARD
                   ======================================== */

                card.appendChild(top);

                card.appendChild(title);

                card.appendChild(platform);

                card.appendChild(description);

                card.appendChild(bottom);


                certificationsList.appendChild(
                    card
                );

            }
        );

    }



    /* =====================================================
       DISPLAY ADMIN LIST
       ===================================================== */

    function displayAdminList() {

        if (!adminList) {
            return;
        }


        const certifications =
            getCertifications();


        adminList.innerHTML = "";



        /* ================================================
           UPDATE COUNT
           ================================================ */

        if (adminCount) {

            adminCount.textContent =
                certifications.length +
                (
                    certifications.length === 1
                        ? " item"
                        : " items"
                );

        }



        /* ================================================
           EMPTY ADMIN LIST
           ================================================ */

        if (certifications.length === 0) {

            const empty =
                document.createElement("p");


            empty.style.color =
                "var(--text-light)";


            empty.style.fontSize =
                "0.8rem";


            empty.textContent =
                "No certifications have been added yet.";


            adminList.appendChild(
                empty
            );


            return;

        }



        /* ================================================
           CREATE ADMIN ITEMS
           ================================================ */

        certifications.forEach(
            function (certification) {


                const item =
                    document.createElement("div");


                item.className =
                    "cert-admin-item";



                const info =
                    document.createElement("div");


                info.className =
                    "cert-admin-item-info";



                const title =
                    document.createElement("strong");


                title.textContent =
                    certification.title;



                const details =
                    document.createElement("span");


                details.textContent =
                    certification.platform +
                    " • " +
                    certification.type +
                    (
                        certification.date
                            ? " • " +
                              certification.date
                            : ""
                    );



                info.appendChild(title);

                info.appendChild(details);



                /* Delete Button */

                const deleteButton =
                    document.createElement("button");


                deleteButton.type =
                    "button";


                deleteButton.className =
                    "cert-admin-delete";


                deleteButton.textContent =
                    "Delete";


                deleteButton.addEventListener(
                    "click",
                    function () {

                        deleteCertification(
                            certification.id
                        );

                    }
                );



                item.appendChild(info);

                item.appendChild(
                    deleteButton
                );


                adminList.appendChild(item);

            }
        );

    }



    /* =====================================================
       DELETE CERTIFICATION
       ===================================================== */

    function deleteCertification(id) {

        const confirmed =
            confirm(
                "Are you sure you want to delete this certification?"
            );


        if (!confirmed) {
            return;
        }


        const certifications =
            getCertifications();


        const updatedCertifications =
            certifications.filter(
                function (certification) {

                    return certification.id !== id;

                }
            );


        saveCertifications(
            updatedCertifications
        );


        displayCertifications();

        displayAdminList();

    }



    /* =====================================================
       CERTIFICATION ICON
       ===================================================== */

    function getCertificationIcon(type) {

        switch (type) {

            case "Certification":
                return "🏆";

            case "Course":
                return "📚";

            case "Achievement":
                return "⭐";

            case "Workshop":
                return "🛠️";

            default:
                return "🏆";

        }

    }



    /* =====================================================
       SAFE URL CHECK
       ===================================================== */

    function isSafeURL(url) {

        try {

            const parsed =
                new URL(url);


            return (
                parsed.protocol === "http:" ||
                parsed.protocol === "https:"
            );

        } catch (error) {

            return false;

        }

    }

}
```
