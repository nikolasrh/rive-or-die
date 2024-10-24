import './style.css'
import { createRiveElement } from './create-rive-element'

const dropzone = document.querySelector<HTMLDivElement>('#dropzone')!
const dropzoneInput = document.querySelector<HTMLInputElement>('#dropzone-input')!

let inputX = 0
let inputY = 0

dropzone.ondblclick = (event) => {
  inputX = event.clientX
  inputY = event.clientY
  dropzoneInput.click()
}

dropzoneInput.onchange = () => {
  uploadFiles(dropzoneInput.files, inputX, inputY)
}

dropzone.ondragover = (event) => {
  event.preventDefault()
}

dropzone.ondrop = (event) => {
  event.preventDefault()
  event.stopPropagation()
  uploadFiles(event.dataTransfer?.files, event.clientX, event.clientY)
}

const uploadFiles = (files: FileList | undefined | null, x: number, y: number) => {
  Array.from(files || [])
    .map(file => createRiveElement(file, x, y))
    .forEach(newElement => {
      // Remove element on double click
      newElement.ondblclick = event => {
        event.stopPropagation()
        dropzone.removeChild(newElement)
      }

      dropzone.appendChild(newElement)
    })
}

