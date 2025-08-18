import { SRGBColorSpace } from "./src/three-js/three.module.min.js"
import { canvasSize, app, defaultSkin, titleImg, camera, renderer, scene, skinModel, centerPoint, canvas, skinParts, viewer, config, distance, skinImg, loadSkinInp, reader } from "./src/const.js"
import { loadFile, loadImage, loadSkin } from "./src/loadSkinFile.js"
import { onPointerDown, onPointerMove, onPointerUp } from "./src/tactilRotation.js"
import { onConfigBtnClick, onSkinPartChkClick, onSkinPartClick, configBtnFocus } from "./src/onBtnClick.js"
import { pageConfig } from "./src/saveData.js"
import { animate } from "./src/animation.js"

const onWindowResize = () => {
  if (viewer.clientWidth <= width / height * viewer.clientHeight) {
    canvas.style.width = "100%"
    canvas.style.height = ""
  } else if (viewer.clientHeight <= viewer.clientWidth / width * height) {
    canvas.style.width = ""
    canvas.style.height = "100%"
  }
}

const appearPage = () => {
  onWindowResize()
  selectSkinType.style.display = "none"
  app.style.opacity = 1
}

const initPage = async () => {
  const { 
    bones, 
    camera: cameraPositions,
    skinType,
    skinImgSrc,
    ...configBtns
  } = pageConfig
  
  if (cameraPositions) {
    const { x, y, z } = cameraPositions
    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(centerPoint)
  }
  
  skinImg.src = skinImgSrc || defaultSkin
  
  for (const [ boneName, visible ] of Object.entries(bones)) {
    window[`${boneName}Path`]?.classList[visible ? 'remove' : 'add']('invisible')
  }
  
  for (const [ configBtnId, checked ] of Object.entries(configBtns)) {
    Object.assign(window[configBtnId] ?? {}, { checked })
  }
  
  const initPageTimeout = setTimeout(appearPage, 3000)
  
  await Promise.all([
    document.fonts.ready,
    titleImg.decode(),
    skinImg.decode()
  ])
  
  clearTimeout(initPageTimeout)
  appearPage()
  loadSkin(skinType).then(animate)
}

const { width, height } = canvasSize
camera.position.z = distance
renderer.outputColorSpace = SRGBColorSpace
renderer.setSize(width, height)
scene.add(skinModel)

window.addEventListener('resize', onWindowResize, false)
window.addEventListener('touchend', onPointerUp)
window.addEventListener('mouseup', onPointerUp)
viewer.addEventListener('pointerdown', onPointerDown)
viewer.addEventListener('touchmove', onPointerMove)
viewer.addEventListener('mousemove', onPointerMove)
config.addEventListener('click', onSkinPartChkClick)
config.addEventListener('change', onConfigBtnClick)
reader.addEventListener('load', loadImage)
loadSkinInp.addEventListener('click', configBtnFocus)
loadSkinInp.addEventListener('change', loadFile)
skinParts.addEventListener('click', onSkinPartClick)

initPage()