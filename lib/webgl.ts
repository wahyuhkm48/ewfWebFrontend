export function releaseWebGL(
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement
) {
  const ext = gl.getExtension("WEBGL_lose_context");
  if (!ext) return;

  // Ditunda satu tick supaya aman di React Strict Mode (dev):
  // context hanya dilepas kalau canvas benar-benar sudah lepas dari DOM.
  setTimeout(() => {
    if (!canvas.isConnected) ext.loseContext();
  }, 0);
}