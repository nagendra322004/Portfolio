/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");

const navItems =
    document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});



/* =========================================
   TYPING ANIMATION
========================================= */

const typingText =
    document.getElementById("typing-text");


const roles = [

    "Computer Science Engineer",

    "Python Developer",

    "AI Enthusiast",

    "Software Developer"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const speed =
        deleting ? 45 : 80;


    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();



/* =========================================
   CURRENT YEAR
========================================= */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();



/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle =
    document.getElementById("theme-toggle");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        themeToggle.textContent =
            isDark ? "☀" : "🌙";


        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

    }
);



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(element);

    }
);



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener(
    "scroll",
    function () {

        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 150;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navItems.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );


                const href =
                    item.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "#" + currentSection
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

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



/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value;


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    }
);