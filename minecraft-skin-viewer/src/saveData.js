import { BONE_NAMES, MODELS, loadSkinInp, configBtns, skinImg, defaultSkin } from "./const.js"
import { loadVariables } from "./utils.js"

const dataName = "minecraft-skin-viewer-config-michael-coffey"
const pageConfigStr = localStorage.getItem(dataName)

export const saveData = () => {
  const pageConfigJson = JSON.stringify(window.pageConfig)
  localStorage.setItem(dataName, pageConfigJson)
}

export const pageConfig = loadVariables.then(() => {
  if ('pageConfig' in window) {
    return window.pageConfig
  }
  
  if (pageConfigStr != null) {
    window.pageConfig = JSON.parse(pageConfigStr)
    return window.pageConfig
  }
  
  window.pageConfig = Object.fromEntries(
    configBtns.map(configBtn => {
      const { id, checked } = configBtn
      
      if (configBtn === loadSkinInp) {
        return [ 'skinImgSrc', defaultSkin ]
      }
      
      return [ id, checked ]
    }).concat([[
      'bones',
      Object.assign(
        Object.fromEntries(BONE_NAMES.map(boneName => {
          return [ boneName, true ]
        })),
        { skinType: 'classic' }
      )
    ]])
  )
  
  return window.pageConfig
})