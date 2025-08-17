import { BONE_NAMES, MODELS, loadSkinInp, configBtns, skinImg, defaultSkin } from "./const.js"

const pageConfigName = "minecraft-skin-viewer-config-michael-coffey"
const pageConfigStr = localStorage.getItem(pageConfigName)

export const pageConfig = pageConfigStr !== null
  ? JSON.parse(pageConfigStr)
  : {
    skinImgSrc: defaultSkin,
    ...Object.fromEntries(configBtns.map(({ id, checked }) => {
      return [ id, checked ]
    })),
    bones: {
      skinType: 'classic',
      ...Object.fromEntries(BONE_NAMES.map(boneName => {
        return [ boneName, true ]
      }))
    }
  }

export const saveData = () => {
  const pageConfigJson = JSON.stringify(pageConfig)
  localStorage.setItem(pageConfigName, pageConfigJson)
}