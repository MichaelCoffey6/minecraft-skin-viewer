import { configBtns, bodyPartsChk, clotesPartsChk, loadSkinInp } from "./const.js"
import { playClickAudio } from "./utils.js"
import { saveData, pageConfig } from "./saveData.js"
import { MODEL_BONES } from "./createModel.js"

const skinPartsChks = Array.from(document.getElementsByName('skinPartsChk'))

export const configBtnFocus = ({ target }) => {
  const label = document.querySelector(`label[for="${target.id}"]`)
  label.classList.add('focus')
  setTimeout(() => label.classList.remove('focus'), 200)
  playClickAudio()
}

export const onSkinPartChkClick = ({ target }) => {
  if (!target.closest('.configBtn label')) return
  
  const input = document.getElementById(target.htmlFor)
  const newIndex = Math.abs(skinPartsChks.indexOf(input) - 1)
  cl(newIndex, skinPartsChks)
  skinPartsChks[newIndex]?.click()
}

export const onConfigBtnClick = ({ target }) => {
  if (!target.closest('.configBtn input')) return
  if (target === loadSkinInp) return
  
  configBtns.forEach(({ type, id, checked }) => {
    if (type !== loadSkinInp.type) {
      pageConfig[id] = checked
    }
  })
  
  configBtnFocus({ target })
  saveData()
}

export const onSkinPartClick = async ({ target }) => {
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