(function () {
    var loaderScriptSrc = document.currentScript && document.currentScript.src;
    var fallbackMenuMarkup = [
        '<nav class="top-menu" aria-label="Menu principal">',
        '    <div class="top-menu__shell">',
        '        <a class="top-menu__brand" href="/index" data-top-menu-link="home">',
        '            <span class="top-menu__brand-mark">',
        '                <img src="/sources/images/index/LGTV.gif" alt="LGTV">',
        '            </span>',
        '            <span class="top-menu__brand-text">',
        '                <span class="top-menu__eyebrow">Portal</span>',
        '                <span class="top-menu__title">LGTV Games</span>',
        '            </span>',
        '        </a>',
        '        <div class="top-menu__nav">',
        '            <a class="top-menu__link" href="/index" data-top-menu-link="home">Inicio</a>',
        '            <a class="top-menu__link" href="/index#games" data-top-menu-link="games">Games</a>',
        '            <a class="top-menu__link" href="/index#eventos" data-top-menu-link="events">Eventos</a>',
        '        </div>',
        '    </div>',
        '</nav>'
    ].join("");

    function getBaseUrl() {
        if (!loaderScriptSrc) {
            return new URL("/", window.location.href);
        }

        return new URL("../", new URL(loaderScriptSrc, window.location.href));
    }

    function ensureMenuHost() {
        var menuHost = document.getElementById("menu");

        if (!menuHost) {
            menuHost = document.createElement("div");
            menuHost.id = "menu";
        }

        if (menuHost.parentElement !== document.body) {
            document.body.insertAdjacentElement("afterbegin", menuHost);
        }

        return menuHost;
    }

    function normalizePath(pathname) {
        if (!pathname) {
            return "/";
        }

        return pathname.replace(/\/+$/, "") || "/";
    }

    function applyActiveState(menuHost) {
        var currentPath = normalizePath(window.location.pathname);
        var currentHash = window.location.hash || "";
        var links = menuHost.querySelectorAll("[data-top-menu-link]");

        links.forEach(function (link) {
            var type = link.getAttribute("data-top-menu-link");
            var isActive = false;

            if (type === "home") {
                isActive = currentPath === "/" || currentPath === "/index";
            } else if (type === "games") {
                isActive = currentPath.indexOf("/games") === 0 || currentHash === "#games";
            } else if (type === "events") {
                isActive = currentPath.indexOf("/eventos") === 0 || currentHash === "#eventos";
            }

            link.classList.toggle("is-active", isActive);
        });
    }

    async function loadTopMenu() {
        var menuHost = ensureMenuHost();
        var baseUrl = getBaseUrl();
        var menuUrl = new URL("top-menu.html", baseUrl);

        try {
            var response = await fetch(menuUrl.toString(), {
                headers: {
                    "X-Requested-With": "top-menu-loader"
                }
            });

            if (!response.ok) {
                throw new Error("Falha ao carregar o top menu");
            }

            menuHost.innerHTML = await response.text();
            applyActiveState(menuHost);
        } catch (error) {
            menuHost.innerHTML = fallbackMenuMarkup;
            applyActiveState(menuHost);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadTopMenu);
    } else {
        loadTopMenu();
    }
})();
