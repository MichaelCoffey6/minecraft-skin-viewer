import { MODEL_BONES, bodyPartsChk, clotesPartsChk } from "./const.js"

export const onConfigBtnClick = ({ target }) => {
  if (!target.closest('.configBtn label')) return
  
  const clickAudio = new Audio('./assets/clickAudio.mp3')
  clickAudio.oncanplaythrough = () => clickAudio.play()
  
  target.classList.add('focus')
  setTimeout(() => target.classList.remove('focus'), 200)
}

export const onSkinPartClick = async ({ target }) => {
  if (!target.closest('#skinParts path')) return
  
  const isInvisible = target.classList.contains('invisible')
  const partName = target.id.replace(/Path$/, '')
  const isClote = target.classList.contains('clotes')

  if (isClote && bodyPartsChk.checked) {
    const { bodyPart: bodyPartName } = target.dataset
    const { [bodyPartName]: bodyPart } = window
    onSkinPartClick({ target: bodyPart })
    
    return
  }
  
  const clickAudio = new Audio('./assets/clickAudio.mp3')
  clickAudio.oncanplaythrough = () => clickAudio.play()
  
  MODEL_BONES[partName].visible = isInvisible

  if (isInvisible) {
    target.classList.remove('invisible')
    
    if (clotesPartsChk.checked && isClote) {
      target.style.stroke = ""
      return
    }
    
    if (bodyPartsChk.checked && !isClote) {
      target.style.stroke = ""
      target.style.fill = ""
      return
    }
    
    return
  } 
  
  target.classList.add('invisible')

  if (clotesPartsChk.checked && isClote) {
    target.style.stroke = "#aaa"
    return
  }
  
  if (bodyPartsChk.checked && !isClote) {
    target.style.stroke = "#aaa"
    target.style.fill = "#aaa"
    return
  }
}