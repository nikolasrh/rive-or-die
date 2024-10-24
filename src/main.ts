import './style.css'
import { Rive } from '@rive-app/canvas';

const dropzone = document.querySelector<HTMLDivElement>('#dropzone')!
const dropzoneInput = document.querySelector<HTMLInputElement>('#dropzone-input')!

let inputX = 0
let inputY = 0

dropzone.onclick = (event) => {
  event.stopImmediatePropagation();
  inputX = event.clientX
  inputY = event.clientY
  console.log(inputX, inputY)
  dropzoneInput.click()
}

dropzoneInput.onchange = () => {
  uploadFiles(dropzoneInput.files, inputX, inputY)
}

dropzone.ondragover = (event) => { event.preventDefault() }

dropzone.ondrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  uploadFiles(event.dataTransfer?.files, event.clientX, event.clientY)
}

const uploadFiles = (files: FileList | undefined | null, x: number, y: number) => {
  Array.from(files || [])
      .map(file => fileToRive(file, x, y))
      .forEach(newElement => dropzone.appendChild(newElement))
}

const fileToRive = (file: File, x: number, y: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.className = 'rive-canvas'
  canvas.style.position = 'absolute'
  canvas.style.left = `${x}px`
  canvas.style.top = `${y}px`
  canvas.style.transform = 'translate(-50%, -50%)'

  const r = new Rive({
    src: URL.createObjectURL(file),
    canvas,
    autoplay: true,
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
  });

  return canvas
}
