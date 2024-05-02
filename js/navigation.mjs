
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".admin-nav.main-nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("activ");
    navMenu.classList.toggle("activ");
})

document.querySelectorAll(".nav-link").forEach(n => n. addEventListener ("click", () => {
    hamburger.classList.remove("activ"); 
    navMenu.classList.remove("activ");
}))



