function setupMenu() {
    const menu = document.querySelector("header nav")
        || document.querySelector("nav");
 
    if (!menu) {
        return;
    }
 
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-toggle";
 
    if (!menu.id) {
        menu.id = "portfolio-menu";
    }
 
    button.setAttribute("aria-controls", menu.id);
    menu.before(button);
 
    const mobileScreen = window.matchMedia("(max-width: 768px)");
 
    function updateMenu() {
        button.hidden = !mobileScreen.matches;
        menu.hidden = mobileScreen.matches;
        button.textContent = "☰";
        button.setAttribute("aria-expanded", "false");
    }
 
    button.addEventListener("click", function () {
        menu.hidden = !menu.hidden;
        button.textContent = menu.hidden ? "☰" : "✕ Close";
        button.setAttribute("aria-expanded", String(!menu.hidden));
    });
 
    menu.addEventListener("click", function (event) {
        if (mobileScreen.matches && event.target.closest("a")) {
            updateMenu();
        }
    });
 
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && mobileScreen.matches && !menu.hidden) {
            updateMenu();
            button.focus();
        }
    });
 
    mobileScreen.addEventListener("change", updateMenu);
    updateMenu();
}
 
 
// 3. КНОПКА «НАВЕРХ»
function setupScrollTop() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.textContent = "↑";
    button.setAttribute("aria-label", "Вернуться наверх");
    document.body.appendChild(button);
 
    function updateButton() {
        button.hidden = window.scrollY < 300;
    }
 
    window.addEventListener("scroll", updateButton);
 
    button.addEventListener("click", function () {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
 
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    });
 
    updateButton();
}

window.onload = function() {
    let themeButton = document.createElement("button");
    themeButton.className = "theme-btn";
    
    let savedTheme = localStorage.getItem("myTheme");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeButton.innerHTML = "☀️";
    } else {
        themeButton.innerHTML = "🌙";
    }
    
    document.body.appendChild(themeButton);
    
    themeButton.onclick = function() {
        document.body.classList.toggle("dark-theme");
        
        if (document.body.classList.contains("dark-theme")) {
            themeButton.innerHTML = "☀️";
            localStorage.setItem("myTheme", "dark");
        } else {
            themeButton.innerHTML = "🌙";
            localStorage.setItem("myTheme", "light");
        }
    };
};
setupMenu();
setupScrollTop();
