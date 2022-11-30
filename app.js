const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
ctx.lineWidth = lineWidth.value;

let isPainting = false;

function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onColor(e) {
  const CurrentTarget = e.target;
  if (e.target.dataset.color) {
    ctx.strokeStyle = CurrentTarget.dataset.color;
    ctx.fillStyle = CurrentTarget.dataset.color;
    color.value = CurrentTarget.dataset.color;
  } else {
    ctx.strokeStyle = CurrentTarget.value;
    ctx.fillStyle = CurrentTarget.value;
  }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColor);

colorOptions.forEach((color) => color.addEventListener("click", onColor));
