const header = document.querySelector("[data-header]")

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40)
})
