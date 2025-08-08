import { SRGBColorSpace } from "./src/three-js/three.module.min.js"
import { MODELS, defaultSkin, titleImg, camera, renderer, scene, skinModel, canvas, skinParts, viewer, config, distance, skinInp, reader } from "./src/const.js"
import { loadFile, loadImage, loadSkin } from "./src/loadSkinFile.js"
import { onPointerDown, onTouchMove, onTouchEnd } from "./src/tactilRotation.js"
import { onConfigBtnClick, onSkinPartClick } from "./src/onBtnClick.js"
import { animate } from "./src/animation.js"

camera.position.z = distance
renderer.outputColorSpace = SRGBColorSpace
renderer.setSize(250, 400)
scene.add(skinModel)

const onWindowResize = () => {
  if (canvas.width >= viewer.clientWidth) {
    canvas.style.width = `${viewer.clientWidth}px`
    canvas.style.height = ""
  } else if (canvas.height >= viewer.clientHeight) {
    canvas.style.width = ""
    canvas.style.height = `${viewer.clientHeight}px`
  } else if (viewer.clientWidth <= 250 / 400 * viewer.clientHeight) {
    canvas.style.width = "100%"
    canvas.style.height = ""
  } else if (viewer.clientHeight <= viewer.clientWidth / 250 * 400) {
    canvas.style.width = ""
    canvas.style.height = "100%"
  }
}

await Promise.all([
  document.fonts.ready,
  titleImg.decode()
])

onWindowResize()
canvas.style.opacity = 1

window.addEventListener('resize', onWindowResize, false)
viewer.addEventListener('pointerdown', onPointerDown)
viewer.addEventListener('touchmove', onTouchMove)
viewer.addEventListener('touchend', onTouchEnd)
config.addEventListener('click', onConfigBtnClick)
reader.addEventListener('load', loadImage)
skinInp.addEventListener('change', loadFile)
skinParts.addEventListener('click', onSkinPartClick)

await loadSkin(defaultSkin, MODELS.current)
animate()