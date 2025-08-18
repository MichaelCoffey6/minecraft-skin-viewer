import { BONE_NAMES, configBtns, defaultSkin, camera } from "./const.js"

const pageConfigName = "minecraft-skin-viewer-config-michael-coffey"
const pageConfigStr = localStorage.getItem(pageConfigName)

export const pageConfig = pageConfigStr !== null
  ? JSON.parse(pageConfigStr)
  : {
    skinImgSrc: defaultSkin,
    skinType: 'classic',
    ...Object.fromEntries(configBtns.map(({ id, checked }) => {
      return [ id, checked ]
    })),
    bones: Object.fromEntries(BONE_NAMES.map(boneName => {
      return [ boneName, true ]
    }))
  }

export const saveData = () => {
  const pageConfigJson = JSON.stringify(pageConfig)
  localStorage.setItem(pageConfigName, pageConfigJson)
}