import { MODELS, MODEL_BONES, ARM_NAMES, selectSkinType, reader, skinImg, skinInp } from "./const.js"
import { getBoneAndStruct } from "./createModel.js"

export const loadFile = () => {
  const [ skinFile ] = skinInp.files
  if (skinFile) reader.readAsDataURL(skinFile)
}

export const loadSkin = async (src, skinType) => {
  const notSameSkinType = skinType !== MODELS.current
  MODELS.current = skinType
  
  if (skinImg.src === src) return
  
  skinImg.src = src
  await skinImg.decode()
  
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
  selectSkinType.hidden = false
  
  try {
    const skinType = await new Promise((res, rej) => {
      const fn = ({ target }) => res(target.innerText)
      selectClassicSkin.onclick = fn
      selectSlimSkin.onclick = fn
      setTimeout(rej, 10000)
    })
    
    loadSkin(reader.result, skinType)
  } catch {}
  
  selectSkinType.hidden = true
}