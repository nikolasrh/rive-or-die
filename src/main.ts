import { createRiveElement } from "./create-rive-element";
import "./style.css";
import { onAnimation, supabaseClient } from "./supabase/client";

const dropzone = document.querySelector<HTMLDivElement>("#dropzone")!;
const dropzoneInput =
  document.querySelector<HTMLInputElement>("#dropzone-input")!;

let inputX = 0;
let inputY = 0;

dropzone.ondblclick = (event) => {
  inputX = event.clientX;
  inputY = event.clientY;
  dropzoneInput.click();
};

dropzoneInput.onchange = () => {
  uploadFiles(dropzoneInput.files, inputX, inputY);
};

dropzone.ondragover = (event) => {
  event.preventDefault();
};

dropzone.ondrop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  uploadFiles(event.dataTransfer?.files, event.clientX, event.clientY);
};

const uploadFiles = (
  files: FileList | undefined | null,
  x: number,
  y: number
) => {
  Array.from(files || []).forEach(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);    const { error } = await supabaseClient
      .from("animations")
      .insert({ pos_x: x, pos_y: y, data });
    if (error) {
      console.error("Error uploading new animation!");
    }
  });
};

onAnimation(payload => {
  console.log('onAnimation')
  console.log(payload)
  return;

  const file = new File(payload.new.data, payload.new.id) //, 'animation.riv', { type: 'application/octet-stream' });

  const newElement = createRiveElement(payload.new.data, payload.new.pos_x, payload.new.pos_y)

  // Remove element on double click
  newElement.ondblclick = (event) => {
    event.stopPropagation();
    dropzone.removeChild(newElement);
  };

  dropzone.appendChild(newElement); 
})
