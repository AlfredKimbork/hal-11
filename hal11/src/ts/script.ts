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

    pageNavItem.innerHTML = `<a href="#section-${i + 1}"><span>section ${i + 1}</span><span class="square"></span></a>`;
    const anchor = pageNavItem.lastChild as HTMLAnchorElement;

    pageNavItem.setAttribute("id", `dot-${i + 1}`); // give anchor a class to access them later
    anchor.setAttribute("aria-current", 'true'); // give it accebility feature

    let span = anchor.firstChild as HTMLElement
    anchor.addEventListener("mouseover", () => span.style.opacity = '1');
    anchor.addEventListener("mouseout", () => span.style.opacity = '0');
    anchor.addEventListener("touchstart", () => span.style.opacity = '1');
    anchor.addEventListener("touchend", () => span.style.opacity = '0');

    pageNav.append(pageNavItem);
        
    // show position and disable prevBtn
    i == 0 ? toggleAriaCurrent(anchor) : "";
        
    return pageNavItem;
});

const scrollAnimation = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        const id = entry.target.getAttribute("id")?.slice(8);
        
        pageNavItems.forEach(pageNavItem =>{
            const anchor = pageNavItem.lastChild as HTMLAnchorElement;

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

// show models
const models = document.querySelectorAll(".model-viewer") as NodeListOf<HTMLDivElement>;

models.forEach(model => {
    model.addEventListener("click", e => {
        models.forEach(model => model.parentElement!.classList.remove("current"))
        const target = e.target as HTMLDivElement;
        target.parentElement!.classList.add("current")
    })
})

// validate
const validate = (event: any) => {
    event.preventDefault()

    let form = event.target;
    const checkEmail = (email: string) => {
        let emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/; 
        if (emailRegEx.test(email)){ 
    return true; 
        } 
        return false; 
    }
    if(!form.name.value) {
        form.name.setCustomValidity("Udfyld dit navn!")
        form.name.nextElementSibling.innerText = form.name.validationMessage
    } else {
        form.name.setCustomValidity("")
        form.name.nextElementSibling.innerText = form.name.validationMessage
    }
    if(!form.address.value) {
        form.address.setCustomValidity("Udfyld din adresse!")
        form.address.nextElementSibling.innerText = form.address.validationMessage
    } else {
        form.address.setCustomValidity("")
        form.address.nextElementSibling.innerText = form.address.validationMessage
    }
    if(!form.zip.value) {
        form.zip.setCustomValidity("Udfyld dit postnummer!")
        form.zip.nextElementSibling.innerText = form.zip.validationMessage
    } else if(form.zip.value.length !== 4) {
        form.zip.setCustomValidity("Udfyld dit postnummer!")
        form.zip.nextElementSibling.innerText = form.zip.validationMessage
    } else if(isNaN(form.zip.value)) {
        form.zip.setCustomValidity("Udfyld dit postnummer!")
        form.zip.nextElementSibling.innerText = form.zip.validationMessage
    } else {
        form.zip.setCustomValidity("")
        form.zip.nextElementSibling.innerText = form.zip.validationMessage
    }
    if(!form.city.value) {
        form.city.setCustomValidity("Udfyld din by!")
        form.city.nextElementSibling.innerText = form.city.validationMessage
    } else {
        form.city.setCustomValidity("")
        form.city.nextElementSibling.innerText = form.city.validationMessage
    }
    if(!form.email.value) {
        form.email.setCustomValidity("Udfyld dit email!")
        form.email.nextElementSibling.innerText = form.email.validationMessage
        // alert(form.email.validationMessage);
        form.email.focus()
        // return false;
    } else if(!checkEmail(form.email.value)){
        form.email.setCustomValidity("Udfyld dit email!")
        form.email.nextElementSibling.innerText = form.email.validationMessage
        // alert(form.email.validationMessage);
        form.email.focus()
        // return false;
    } else {
        form.email.setCustomValidity("")
        form.email.nextElementSibling.innerText = form.email.validationMessage
        
    }
    if(!form.message.value) {
        form.message.setCustomValidity("Skriv en besked!")
        form.message.nextElementSibling.innerText = form.message.validationMessage
        // alert(form.message.validationMessage);
        form.message.focus()
        // return false;
    } else {
        form.message.setCustomValidity("")
        form.message.nextElementSibling.innerText = form.message.validationMessage
    }
}

// remove splash
const splashScreen = document.querySelector(".splash-screen") as HTMLDivElement
setTimeout(() => {
    splashScreen.style.opacity = "0"
    setTimeout(() => splashScreen.style.display = "none", 400)
}, 1000)