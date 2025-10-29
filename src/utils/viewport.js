// src/utils/viewport.js
export function adjustViewport() {
  const metaViewport = document.querySelector('meta[name="viewport"]');
  if (!metaViewport) return;

  const screenWidth = window.innerWidth;
  let scale = 1;

  if (screenWidth < 360) scale = 0.8;
  else if (screenWidth < 480) scale = 0.85;
  else if (screenWidth < 768) scale = 0.9;
  else scale = 1;

  metaViewport.setAttribute(
    'content',
    `width=device-width, initial-scale=${scale}, maximum-scale=1, user-scalable=yes`
  );
}
