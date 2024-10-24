import { Rive } from '@rive-app/canvas'

export function createRiveElement(file: File, initialX: number, initialY: number): HTMLCanvasElement {
  let x = initialX
  let y = initialY
  let isDragging = false

  const canvas = document.createElement('canvas')
  canvas.style.cursor = 'grab'
  canvas.style.position = 'absolute'
  canvas.style.transform = 'translate(-50%, -50%)'

  const rive = new Rive({
    src: URL.createObjectURL(file),
    canvas,
    autoplay: true,
    onLoad: () => {
      rive.resizeDrawingSurfaceToCanvas()
    },
  })

  const updatePosition = () => {
    canvas.style.left = `${x}px`
    canvas.style.top = `${y}px`
  }

  const enableDragging = () => {
    isDragging = true
    canvas.style.cursor = 'grabbing'
  }

  const disableDragging = () => {
    isDragging = false
    canvas.style.cursor = 'grab'
  }

  canvas.onmousedown = enableDragging
  document.onmouseup = disableDragging

  document.onmousemove = event => {
    if (isDragging) {
      x += event.movementX
      y += event.movementY
      updatePosition()
    }
  }

  updatePosition()

  return canvas
}
