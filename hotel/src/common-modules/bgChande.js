function bgChange(pathsToImg, container, interval) {
  let index = 0;
  setInterval( () => {
    container.style.backgroundImage = 'url(' + pathsToImg[index] + ')';
    index++;
    if (index >= pathsToImg.length) index = 0;
  }, interval);
}

export { bgChange };
