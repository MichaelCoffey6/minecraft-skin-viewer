import { SRGBColorSpace } from "./src/three-js.min/three.module.min.js"
import { MODELS, defaultSkin, camera, renderer, scene, skinModel, canvas, distance, skinInp, reader } from "./src/const.js"
import { loadFile, loadImage, loadSkin } from "./src/loadSkinFile.js"
import { onPointerDown, onTouchMove, onTouchEnd } from "./src/tactilRotation.js"
import { animate } from "./src/animation.js"

camera.position.z = distance
renderer.outputColorSpace = SRGBColorSpace
renderer.setSize(250, 400)
scene.add(skinModel)

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  alert(innerWidth + ' ' + innerHeight)
}

//window.addEventListener('resize', onWindowResize, false)
viewer.addEventListener('pointerdown', onPointerDown)
viewer.addEventListener('touchmove', onTouchMove)
viewer.addEventListener('touchend', onTouchEnd)
reader.addEventListener('load', loadImage)
skinInp.addEventListener('change', loadFile)

await loadSkin(defaultSkin, MODELS.current)
animate()