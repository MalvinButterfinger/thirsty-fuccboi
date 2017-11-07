function rotateImage(image,angle) {
    var offscreenCanvas = document.createElement('canvas');
    var offscreenCtx = offscreenCanvas.getContext('2d');

    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;

    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(angle);
    offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));

    return offscreenCanvas;
}