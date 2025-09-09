import { MODELS, ARM_NAMES, selectSkinType, reader, skinImg, loadSkinInp, skinCanvas, skinCtx } from "./const.js"
import { MODEL_BONES, getBoneAndStruct } from "./createModel.js"
import { InvalidSkin, setPreview, setSkinSelectorOpts, openInvalidSkin } from "./skinPreview.js"
import { saveData, pageConfig } from "./saveData.js"

export const loadFile = () => {
  const [ skinFile ] = loadSkinInp.files
  if (skinFile) reader.readAsDataURL(skinFile)
  loadSkinInp.value = ""
}

export const loadSkin = skinType => {
  const notSameSkinType = skinType !== pageConfig.skinType
  pageConfig.skinType = skinType
  saveData()
  
  for (const [ boneName, bone ] of Object.entries(MODEL_BONES)) {
    if (notSameSkinType && ARM_NAMES.includes(boneName)) {
      const { geometry, materials } = getBoneAndStruct(boneName, () => bone)
      bone.material.forEach(({ map }, i) => Object.assign(map, materials[i].map))
      bone.geometry = geometry
    }
    
    bone.material.forEach(({ map }) => map.dispose())
  }
}

export const loadImage = async () => {
  const src = reader.result
  selectSkinType.style.display = ""
  
  try {
    if (!src.startsWith('data:image/png'))
      await openInvalidSkin('Image format.')
    
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
      pageConfig.skinImgSrc = src
      loadSkin(skinType)
    } else await openInvalidSkin('Image size.')
  } catch (err) {
    if (err instanceof InvalidSkin) cl(err)
    else throw err
  }
  
  selectSkinType.classList.remove('invalid')
  selectSkinType.style.display = "none"
}