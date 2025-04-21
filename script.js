//#region Header

const buttonThemeToggler = document.querySelector(".button__theme-toggler");
const divThemeAndAppInfo = document.querySelector(".div__theme-and-app-info");
console.log(buttonThemeToggler);
console.log(divThemeAndAppInfo);
buttonThemeToggler.addEventListener("click", () => {
    divThemeAndAppInfo.classList.toggle("is-hidden");
});

//#endregion