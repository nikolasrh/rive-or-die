import "./style.css";
//import { createRiveElement } from "./create-rive-element";
import supabaseClient from "./supabase/client";

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
    const data = new Uint8Array(arrayBuffer);
    console.log(data);
    const { error } = await supabaseClient
      .from("animations")
      .insert({ pos_x: x, pos_y: y, data });

    if (error) {
      console.error("Error uploading new animation!");
    }
  });
};

// Remove element on double click
/*
  newElement.ondblclick = (event) => {
    event.stopPropagation();
    dropzone.removeChild(newElement);
  };

      .map((file) => createRiveElement(file, x, y))

  if (data) {
    console.log(data);
    dropzone.appendChild(newElement);
  }*/
