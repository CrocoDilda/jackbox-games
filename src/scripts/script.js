const header = document.querySelector("[data-header]")

const slider = document.querySelector("[data-slider]")
const wrapper = document.querySelector("[data-wrapper]")
const buttonBack = document.querySelector("[data-back]")
const buttonForward = document.querySelector("[data-forward]")
const pointsWrapper = document.querySelector("[data-points-list]")
const questionsList = document.querySelector("[data-list")

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40)
})

let quantityImage = 1 // переменная счётчик, которая увеличивается до размера массива
let stepWidth = wrapper.scrollWidth / wrapper.children.length
let sliderPosition = wrapper.scrollWidth

for (let i = 0; i < wrapper.children.length; i++) {
  if (!i) {
    pointsWrapper.innerHTML += `<button data-point="${i}" class="slider--point slider--point-active"></button>`
  } else {
    pointsWrapper.innerHTML += `<button data-point="${i}" class="slider--point"></button>`
  }
}

quantityImage == 1
  ? (buttonBack.disabled = true)
  : (buttonBack.disabled = false)

buttonBack.addEventListener("click", () => {
  wrapper.style.left = `${-(sliderPosition -= stepWidth)}px`
  quantityImage--
  disabledButton()
  activePoint(quantityImage - 1, false)
})

buttonForward.addEventListener("click", () => {
  sliderPosition = stepWidth * quantityImage
  wrapper.style.left = `${-sliderPosition}px`
  quantityImage++
  disabledButton()
  activePoint(quantityImage - 1, true)
})

// слушатель на список вопросов секции questions
questionsList.addEventListener("click", (event) => {
  const targetAttr = event.target.parentElement

  if (targetAttr.attributes[0].name == "data-question") {
    const questionText = targetAttr.parentElement.children[1]
    console.dir(targetAttr.children[2])
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

// функция отключения кнопок
function disabledButton() {
  quantityImage == wrapper.children.length
    ? (buttonForward.disabled = true)
    : (buttonForward.disabled = false)
  quantityImage == 1
    ? (buttonBack.disabled = true)
    : (buttonBack.disabled = false)
}

// функция активации точки
function activePoint(index, operator) {
  const point = document.querySelector(`[data-point="${index}"]`)
  const previousPoint = document.querySelector(
    `[data-point="${!operator ? ++index : --index}"]`
  )
  point.classList.add("slider--point-active")
  previousPoint.classList.remove("slider--point-active")
}
