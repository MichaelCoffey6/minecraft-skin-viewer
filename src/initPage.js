import { SRGBColorSpace } from "./three-js/three.module.min.js"
import { viewer, canvas, canvasSize, selectSkinType, distance, camera, skinImg, defaultSkin, centerPoint, renderer, scene, skinModel } from "./const.js"
import { pageConfig } from "./saveData.js"
import { animate } from "./animation.js"
import { loadSkin } from "./loadSkinFile.js"

export const onWindowResize = () => {
  if (viewer.clientWidth <= width / height * viewer.clientHeight) {
    canvas.style.width = "100%"
    canvas.style.height = ""
  } else if (viewer.clientHeight <= viewer.clientWidth / width * height) {
    canvas.style.width = ""
    canvas.style.height = "100%"
  }
}

export const initPage = () => {
  const { 
    bones, 
    camera: cameraPositions,
    skinType,
    skinImgSrc,
    ...configBtns
  } = pageConfig
  
  camera.position.z = distance
  renderer.outputColorSpace = SRGBColorSpace
  renderer.setSize(width, height)
  scene.add(skinModel)
  skinImg.src = skinImgSrc || defaultSkin
  
  if (cameraPositions) {
    const { x, y, z } = cameraPositions
    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(centerPoint)
  }
  
  for (const [ boneName, visible ] of Object.entries(bones)) {
    const classListAction = visible ? "remove" : "add"
    const bonePath = window[`${boneName}Path`]
    bonePath?.classList[classListAction]('invisible')
  }
  
  for (const [ configBtnId, checked ] of Object.entries(configBtns)) {
    const configBtn = window[configBtnId]
    Object.assign(configBtn ?? {}, { checked })
  }
  
  const appearPage = () => {
    onWindowResize()
    selectSkinType.style.display = "none"
    app.style.opacity = 1
    loadSkin(skinType)
    animate()
  }
  
  const initPageTimeout = setTimeout(appearPage, 3000)
  
  Promise.all([
    document.fonts.ready,
    titleImg.decode(),
    skinImg.decode()
  ]).then(() => {
    clearTimeout(initPageTimeout)
    appearPage()
  })
}

const { width, height } = canvasSize