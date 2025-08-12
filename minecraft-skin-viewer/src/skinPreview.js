import { BONE_NAMES, MODELS, selectClassicSkin, selectSlimSkin, closeSkinSelector, classicPreview, slimPreview, skinCanvas, skinCtx, frontSkinCanvas, frontSkinCtx } from "./const.js"
import { playClickAudio } from "./utils.js"

let sizeMutiply = skinCanvas.width === 128 ? 2 : 1
  
export const setPreview = () => {
  sizeMutiply = skinCanvas.width === 128 ? 2 : 1
  
  for (const preview of [ classicPreview, slimPreview ]) {
    const { skinType } = preview.dataset
    const { leftArm, body } = MODELS[skinType]
    const previewCtx = preview.getContext('2d')
    const previewWidth = preview.width = ((leftArm.size[0] * 2) + body.size[0]) * sizeMutiply
    preview.height = 32 * sizeMutiply
    previewCtx.clearRect(0, 0, 32, 64)

    const previewImgData = previewCtx.getImageData(0, 0, skinCanvas.width, skinCanvas.height)
    
    for (const boneName of BONE_NAMES) {
      const { [boneName]: boneModel } = MODELS[skinType]
      const { size, uv, origin } = boneModel
      const [ width, height, length ] = size
      const [ x, y ] = uv
      const [ originX, originY ] = origin
      const front = [x + length, y + length]
      const frontImgData = skinCtx.getImageData(front[0] * sizeMutiply, front[1] * sizeMutiply, width * sizeMutiply, height * sizeMutiply)
      
      frontSkinCanvas.width = skinCanvas.width
      frontSkinCanvas.height = skinCanvas.height
      frontSkinCtx.putImageData(frontImgData, (Math.round(originX) * sizeMutiply) + (previewWidth / 2), (32 - originY - height) * sizeMutiply)
      
      const newFrontImgData = frontSkinCtx.getImageData(0, 0, skinCanvas.width, skinCanvas.height).data
      
      for (let i = 0; i < newFrontImgData.length; i += 4) {
        const r = newFrontImgData[i]
        const g = newFrontImgData[i + 1]
        const b = newFrontImgData[i + 2]
        const a = newFrontImgData[i + 3]
        
        if (a === 0) continue
        
        previewImgData.data[i] = r
        previewImgData.data[i + 1] = g
        previewImgData.data[i + 2] = b
        previewImgData.data[i + 3] = a
      }
    }
    
    previewCtx.putImageData(previewImgData, 0, 0)
  }
}

export const setSkinSelectorOpts = () => new Promise((res, rej) => {
  selectClassicSkin.onclick = selectSlimSkin.onclick = ({ target }) => {
    playClickAudio()
    res(target.value)
  }
  
  closeSkinSelector.onclick = () => {
    playClickAudio()
    rej()
  }
  
  setTimeout(rej, 10000)
})

export const openInvalidSkin = async () => {
  selectSkinType.classList.add('invalid')
  await setSkinSelectorOpts()
}