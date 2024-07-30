const header = document.querySelector("[data-header]")

const slider = document.querySelector("[data-slider]")
const wrapper = document.querySelector("[data-wrapper]")
const buttonBack = document.querySelector("[data-back]")
const buttonForward = document.querySelector("[data-forward]")
const pointsWrapper = document.querySelector("[data-points-list]")

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
