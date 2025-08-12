import { MODELS, MODEL_BONES, ARM_NAMES, selectSkinType, reader, skinImg, loadSkinInp, skinCanvas, skinCtx } from "./const.js"
import { getBoneAndStruct } from "./createModel.js"
import { setPreview, setSkinSelectorOpts, openInvalidSkin } from "./skinPreview.js"
import { saveData, pageConfig } from "./saveData.js"

export const loadFile = () => {
  const [ skinFile ] = loadSkinInp.files
  if (skinFile) reader.readAsDataURL(skinFile)
  loadSkinInp.value = ""
}

export const loadSkin = async skinType => {
  const notSameSkinType = skinType !== window.pageConfig.bones.skinType
  window.pageConfig.bones.skinType = skinType
  
  const bones = Object.entries(MODEL_BONES).map(async ([ boneName, bone ]) => {
    if (notSameSkinType && ARM_NAMES.includes(boneName)) {
      const { geometry, materials } = await getBoneAndStruct(boneName, () => bone)
      bone.material.forEach(({ map }, i) => Object.assign(map, materials[i].map))
      bone.geometry = geometry
    }
    
    bone.material.forEach(({ map }) => map.dispose())
  })
  
  return Promise.all(bones)
}

export const loadImage = async () => {
  const src = reader.result
  selectSkinType.style.display = "grid"
  
  try {
    if (!src.startsWith('data:image/png')) await openInvalidSkin()
    
    skinImg.src = src
    await skinImg.decode()
    
    const { width, height } = skinImg
    
    if (
      width === height &&
      (width === 64 || width === 128) &&
      (height === 64 || height === 128)
    ) {
      skinCanvas.width = width
      skinCanvas.height = height
      skinCtx.clearRect(0, 0, 128, 128)
      skinCtx.drawImage(skinImg, 0, 0)
      
      setPreview()
      
      const skinType = await setSkinSelectorOpts()
      window.pageConfig.skinImgSrc = src
      loadSkin(skinType)
      saveData()
    } else await openInvalidSkin()
  } catch (e) { cl(e) }
  
  selectSkinType.classList.remove('invalid')
  selectSkinType.style.display = ""
}