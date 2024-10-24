import './style.css'
import { Rive } from '@rive-app/canvas';

const dropzone = document.querySelector<HTMLDivElement>('#dropzone')!

dropzone.ondragover = (event) => { event.preventDefault() }

dropzone.ondrop  = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const files = event.dataTransfer?.files || []

  Array.from(files)
      .map(file => fileToRive(file, event.clientX, event.clientY))
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
