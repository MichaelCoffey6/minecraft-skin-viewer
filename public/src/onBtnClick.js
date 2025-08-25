import { configBtns, skinPartsSelChks, bodyPartsChk, clotesPartsChk, loadSkinInp, animationChk } from "./const.js"
import { playClickAudio } from "./utils.js"
import { saveData, pageConfig } from "./saveData.js"
import { MODEL_BONES } from "./createModel.js"

export const configBtnFocus = ({ target: { id } }) => {
  const label = document.querySelector(`label[for="${id}"]`)
  label.classList.add('focus')
  setTimeout(() => label.classList.remove('focus'), 200)
  playClickAudio()
}

export const onSkinPartSelClick = ({ target }) => {
  if (!target.closest('.configBtn label')) return
  
  const input = document.getElementById(target.htmlFor)
  const newIndex = Math.abs(skinPartsSelChks.indexOf(input) - 1)
  skinPartsSelChks[newIndex]?.click()
}

export const onConfigBtnChange = ({ target }) => {
  if (!target.closest('.configBtn input')) return
  if (target === loadSkinInp) return
  
  if (skinPartsSelChks.includes(target)) playClickAudio()
  else configBtnFocus({ target })
  
  const { id, checked } = target
  pageConfig[id] = checked
  saveData()
}

export const onSkinPartClick = ({ target }) => {
  if (!target.closest('#skinParts path')) return
  
  const partName = target.id.replace(/Path$/, '')
  const isClote = target.classList.contains('clotes')
  const isInvisible = target.classList.contains('invisible')
  const classListAction = isInvisible ? 'remove' : 'add'
  
  if (isClote && bodyPartsChk.checked) {
    const { bodyPart: bodyPartName } = target.dataset
    const { [bodyPartName]: bodyPart } = window
    onSkinPartClick({ target: bodyPart })
    
    return
  }
  
  target.classList[classListAction]('invisible')
  pageConfig.bones[partName] = !target.classList.contains('invisible')
  MODEL_BONES[partName].visible = isInvisible
  playClickAudio()
  saveData()
}