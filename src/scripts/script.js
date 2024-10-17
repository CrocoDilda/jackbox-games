const header = document.querySelector("[data-header]")
const questionsList = document.querySelector("[data-list]")
const burger = document.querySelector("[data-burger]")
const animatedImages = document.querySelectorAll("[data-animation]")
const cookies = document.querySelector("[data-cookies]")
const input = document.querySelector("[data-input]")
const submit = document.querySelector("[data-submit]")
const errorText = document.querySelector("[data-error]")

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40)
})

if (!window.localStorage.getItem("cookies")) {
  cookies.classList.add("cookie--active")
}

cookies.addEventListener("click", (e) => {
  if (e.target.attributes[0].name == "data-cookies-button") {
    if (!!+e.target.attributes[0].value) {
      window.localStorage.setItem("cookies", "Yes! Use my cookies!")
    } else {
      window.localStorage.setItem("cookies", "Don't touch my cookies!")
    }
    cookies.classList.remove("cookie--active")
    cookies.classList.add("cookie--hidden")
  }
})

// слушатель на бургер хэдера
burger.addEventListener("click", () => {
  if (burger.attributes[0].value == 1) {
    burger.parentElement.children[1].style.display = "none"
    burger.attributes[0].value = 0
  } else {
    burger.parentElement.children[1].style.display = "block"
    burger.attributes[0].value = 1
  }
})

submit.addEventListener("click", () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(input.value)) {
    errorText.style.display = "block"
  } else {
    errorText.style.display = "none"
  }
})

// слушатель на список вопросов секции questions
questionsList.addEventListener("click", (event) => {
  const targetAttr = event.target.parentElement

  if (targetAttr.attributes[0].name == "data-question") {
    const questionText = targetAttr.parentElement.children[1]
    if (questionText.attributes[0].value == 0) {
      targetAttr.children[2].classList.add("icon-rotate")
      questionText.classList.add("questions--text-active")
      questionText.classList.remove("questions--text-hidden")
      questionText.style.display = "block"
      questionText.attributes[0].value = 1
    } else {
      targetAttr.children[2].classList.remove("icon-rotate")
      questionText.classList.add("questions--text-hidden")
      questionText.classList.remove("questions--text-active")
      setTimeout(() => {
        questionText.style.display = "none"
      }, 400)
      questionText.attributes[0].value = 0
    }
  }
})

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const classElement = entry.target.attributes[0].value
      entry.target.children[0].classList.add(classElement)
    }
  })
}

const options = {
  rootMargin: "0px 0px -150px 0px",
  threshold: 0,
}

const observer = new IntersectionObserver(callback, options)

animatedImages.forEach((image) => observer.observe(image))
