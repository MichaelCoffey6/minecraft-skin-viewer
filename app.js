import { viewer, config, skinParts, loadSkinInp, reader } from "./src/const.js"
import { loadFile, loadImage } from "./src/loadSkinFile.js"
import { onPointerDown, onPointerMove, onPointerUp } from "./src/tactilRotation.js"
import { onConfigBtnChange, onSkinPartSelClick, onSkinPartClick, configBtnFocus } from "./src/onBtnClick.js"
import { initPage, onWindowResize } from "./src/initPage.js"

window.addEventListener('resize', onWindowResize, false)
window.addEventListener('touchend', onPointerUp)
window.addEventListener('mouseup', onPointerUp)
viewer.addEventListener('pointerdown', onPointerDown)
viewer.addEventListener('touchmove', onPointerMove)
viewer.addEventListener('mousemove', onPointerMove)
config.addEventListener('click', onSkinPartSelClick)
config.addEventListener('change', onConfigBtnChange)
reader.addEventListener('load', loadImage)
loadSkinInp.addEventListener('click', configBtnFocus)
loadSkinInp.addEventListener('change', loadFile)
skinParts.addEventListener('click', onSkinPartClick)

initPage()