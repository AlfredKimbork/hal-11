const sections = document.querySelectorAll(".main__section") as NodeListOf<HTMLElement>;
const pageNav = document.querySelector("#page-nav ul") as HTMLElement;
let pageNavItems: Element[]

const toggleAriaCurrent = (anchor: HTMLAnchorElement) => {
    anchor.getAttribute("aria-current") == "true" ? 
        anchor.setAttribute("aria-current", 'false')
        : anchor.setAttribute("aria-current", 'true');
}

// create anchor
pageNavItems = Array.from(sections).map((section, i) => {  
    let pageNavItem = document.createElement("li");

    pageNavItem.innerHTML = `<a href="#section-${i + 1}">hello</a>`;
    const anchor = pageNavItem.firstChild as HTMLAnchorElement;

    pageNavItem.setAttribute("id", `dot-${i + 1}`); // give anchor a class to access them later
    anchor.setAttribute("aria-current", 'true'); // give it accebility feature


    // pageNavItem.firstChild!.addEventListener("click", e => {
    //     pageNavItems.forEach(() => {
    //         const target = e.target as HTMLAnchorElement;
    //         console.log(target)

    //         anchor.setAttribute("aria-current", 'false');
    //         target.setAttribute("aria-current", 'true');
    //     })
    // });

    pageNav.append(pageNavItem);
        
    // show position and disable prevBtn
    i == 0 ? toggleAriaCurrent(anchor) : "";
        
    return pageNavItem;
});

let i = 0
const scrollAnimation = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        const id = entry.target.getAttribute("id")?.slice(8);
        console.log(id)
        
        pageNavItems.forEach(pageNavItem =>{
            const anchor = pageNavItem.firstChild as HTMLAnchorElement;

            if (pageNavItem.id == `dot-${id}`) {
                toggleAriaCurrent(anchor)
            } 
        }); 
    });
}, {
    threshold: .6,
});

sections.forEach(section => {
    scrollAnimation.observe(section);
});
