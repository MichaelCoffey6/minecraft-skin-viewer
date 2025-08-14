import { BONE_NAMES, MODELS, loadSkinInp, configBtns, skinImg, defaultSkin } from "./const.js"
import { loadVariables } from "./utils.js"

const pageConfigObjName = "pageConfig"
const dataName = "minecraft-skin-viewer-config-michael-coffey"
const pageConfigStr = localStorage.getItem(dataName)

export const saveData = () => {
  const pageConfigJson = JSON.stringify(window.pageConfig)
  localStorage.setItem(dataName, pageConfigJson)
}

export const pageConfig = loadVariables.then(() => {
  if (pageConfigObjName in window) {
    return window[pageConfigObjName]
  }
  
  if (pageConfigStr != null) {
    window[pageConfigObjName] = JSON.parse(pageConfigStr)
    return window[pageConfigObjName]
  }
  
  window[pageConfigObjName] = {
    skinImgSrc: defaultSkin,
    bones: {
      skinType: 'classic'
    }
  }
  
  configBtns.forEach(configBtn => {
    if (configBtn === loadSkinInp) return
    
    const { id, checked } = configBtn
    window[pageConfigObjName][id] = checked
  })
  
  BONE_NAMES.forEach(boneName => {
    window[pageConfigObjName].bones[boneName] = true
  })
  
  return window[pageConfigObjName]
})