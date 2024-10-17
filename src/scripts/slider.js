const wrapper = document.querySelector("[data-wrapper]")
const buttonBack = document.querySelector("[data-back]")
const buttonForward = document.querySelector("[data-forward]")
const pointsWrapper = document.querySelector("[data-points-list]")

let activeSliderIndex = 0
let stepWidth = wrapper.scrollWidth / wrapper.children.length

//Управление клавишами
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && !buttonForward.disabled) {
    changeSlide(1)
  } else if (event.key === "ArrowLeft" && !buttonBack.disabled) {
    changeSlide(-1)
  }
})

pointsWrapper.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    changeSlide(+event.target.getAttribute("data-point") - activeSliderIndex)
  }
})

buttonBack.addEventListener("click", () => {
  changeSlide(-1)
})

buttonForward.addEventListener("click", () => {
  changeSlide(1)
})

// Добавляю точки согласно количеству блоков слайдера
for (let i = 0; i < wrapper.children.length; i++) {
  const button = document.createElement("button")
  button.setAttribute("data-point", i)
  button.className = "slider--point"
  if (i === 0) button.classList.add("slider--point-active")
  pointsWrapper.appendChild(button)
}

// Массив с точками для дальнейшей работы
const points = Array.from(pointsWrapper.children)

// При рендере страницы блокаю кнопку "назад"
buttonBack.disabled = true

// функция переключения слайда
function changeSlide(stepsValue) {
  const previousSlide = activeSliderIndex
  stepWidth = wrapper.scrollWidth / wrapper.children.length

  activeSliderIndex += stepsValue
  wrapper.style.left = `${-stepWidth * activeSliderIndex}px`

  toggleButtonLock()
  togglePointActive(activeSliderIndex, previousSlide)
}

// функция переключения состояния блокировки кнопок навигации по слайдеру
function toggleButtonLock() {
  buttonBack.disabled = stepWidth * activeSliderIndex <= 0
  buttonForward.disabled = !(
    Math.ceil(stepWidth * activeSliderIndex) <
    Math.ceil(wrapper.scrollWidth - stepWidth)
  )
}

// функция активации точки
function togglePointActive(index, previousIndex) {
  points[previousIndex].classList.remove("slider--point-active")
  points[index].classList.add("slider--point-active")
}
