const Phy2DModule = await import("./lib/2d-phy/Phy2D")
const Phy2D = await Phy2DModule.default()

const c = document.getElementById('c') as HTMLCanvasElement
const gl = c.getContext("webgl2")

resize()
requestAnimationFrame(drawFrame)

function drawFrame(ts) {
  gl.viewport(0, 0, c.width, c.height)
  gl.clearColor(1, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  requestAnimationFrame(drawFrame)
}

function resize() {
  c.width = innerWidth * devicePixelRatio
  c.height = innerHeight * devicePixelRatio
  c.style.setProperty('width', `${innerWidth}px`)
  c.style.setProperty('height', `${innerHeight}px`)
}