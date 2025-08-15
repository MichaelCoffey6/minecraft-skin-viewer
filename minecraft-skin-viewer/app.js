import { SRGBColorSpace } from "./src/three-js/three.module.min.js"
import { MODELS, canvasSize, app, defaultSkin, titleImg, camera, renderer, scene, skinModel, canvas, skinParts, viewer, config, distance, skinImg, loadSkinInp, reader } from "./src/const.js"
import { loadFile, loadImage, loadSkin } from "./src/loadSkinFile.js"
import { onPointerDown, onTouchMove, onTouchEnd } from "./src/tactilRotation.js"
import { onConfigBtnClick, onSkinPartClick, configBtnFocus } from "./src/onBtnClick.js"
import { pageConfig } from "./src/saveData.js"
import { animate } from "./src/animation.js"

const { 
  bones: { skinType, ...bones }, 
  skinImgSrc, 
  ...configBtns 
} = await pageConfig

const { width, height } = canvasSize

skinImg.src = skinImgSrc || defaultSkin
camera.position.z = distance
renderer.outputColorSpace = SRGBColorSpace
renderer.setSize(width, height)
scene.add(skinModel)

for (const [boneName, visible] of Object.entries(bones)) {
  if (boneName === 'skinType') continue
  window[`${boneName}Path`]?.classList[visible ? 'remove' : 'add']('invisible')
}

for (const [configBtnId, checked] of Object.entries(configBtns)) {
  Object.assign(window[configBtnId] ?? {}, { checked })
}

const onWindowResize = () => {
  if (viewer.clientWidth <= width / height * viewer.clientHeight) {
    canvas.style.width = "100%"
    canvas.style.height = ""
  } else if (viewer.clientHeight <= viewer.clientWidth / width * height) {
    canvas.style.width = ""
    canvas.style.height = "100%"
  }
}

await Promise.all([
  document.fonts.ready,
  titleImg.decode(),
  skinImg.decode()
])

onWindowResize()
app.style.opacity = 1

window.addEventListener('resize', onWindowResize, false)
viewer.addEventListener('pointerdown', onPointerDown)
viewer.addEventListener('touchmove', onTouchMove)
viewer.addEventListener('touchend', onTouchEnd)
config.addEventListener('change', onConfigBtnClick)
reader.addEventListener('load', loadImage)
loadSkinInp.addEventListener('click', configBtnFocus)
loadSkinInp.addEventListener('change', loadFile)
skinParts.addEventListener('click', onSkinPartClick)

loadSkin(skinType).then(animate)