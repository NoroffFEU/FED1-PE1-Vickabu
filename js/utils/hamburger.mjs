import { configureUserAccess } from "./adminLinks.mjs";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".small-nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("activ");
    navMenu.classList.toggle("activ");
})

document.querySelectorAll(".small-nav-li").forEach(n => n. addEventListener ("click", () => {
    hamburger.classList.remove("activ"); 
    navMenu.classList.remove("activ");
}))


configureUserAccess ()


