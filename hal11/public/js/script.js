"use strict";
const sections = document.querySelectorAll(".main__section");
const pageNav = document.querySelector("#page-nav ul");
let pageNavItems;
const toggleAriaCurrent = (anchor) => {
    anchor.getAttribute("aria-current") == "true" ?
        anchor.setAttribute("aria-current", 'false')
        : anchor.setAttribute("aria-current", 'true');
};
// create anchor
pageNavItems = Array.from(sections).map((section, i) => {
    let pageNavItem = document.createElement("li");
    pageNavItem.innerHTML = `<a href="#section-${i + 1}"><span>section ${i + 1}</span><span class="square"></span></a>`;
    const anchor = pageNavItem.lastChild;
    pageNavItem.setAttribute("id", `dot-${i + 1}`); // give anchor a class to access them later
    anchor.setAttribute("aria-current", 'true'); // give it accebility feature
    let span = anchor.firstChild;
    anchor.addEventListener("mouseover", () => span.style.opacity = '1');
    anchor.addEventListener("mouseout", () => span.style.opacity = '0');
    anchor.addEventListener("touchstart", () => span.style.opacity = '1');
    anchor.addEventListener("touchend", () => span.style.opacity = '0');
    pageNav.append(pageNavItem);
    // show position and disable prevBtn
    i == 0 ? toggleAriaCurrent(anchor) : "";
    return pageNavItem;
});
let i = 0;
const scrollAnimation = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        var _a;
        entry.target.classList.toggle("show", entry.isIntersecting);
        const id = (_a = entry.target.getAttribute("id")) === null || _a === void 0 ? void 0 : _a.slice(8);
        console.log(id);
        pageNavItems.forEach(pageNavItem => {
            const anchor = pageNavItem.lastChild;
            if (pageNavItem.id == `dot-${id}`) {
                toggleAriaCurrent(anchor);
            }
        });
    });
}, {
    threshold: .5,
});
sections.forEach(section => {
    scrollAnimation.observe(section);
});
