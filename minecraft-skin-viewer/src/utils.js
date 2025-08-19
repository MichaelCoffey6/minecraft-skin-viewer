import { BONE_NAMES, importationType, audioChk } from "./const.js"

export const $$ = sel => Array.from(document.querySelectorAll(sel))

const getModelsGeometries = json => {
  const { 'minecraft:geometry': [ , classicBones, slimBones ] } = json
  const geometriesEntries = [
    [ 'classic', {} ],
    [ 'slim', {} ]
  ]
  
  Array(classicBones, slimBones).forEach(({ bones }, i) => {
    bones.forEach(({ name, cubes: [ boneInfo ] = [ null ] }) => {
      if (BONE_NAMES.includes(name)) {
        geometriesEntries[i][1][name] = boneInfo
      }
    })
  })
  
  return Object.fromEntries(geometriesEntries)
}

export const getJSON = async url => {
  try {
    const { default: json } = await import(url, importationType)
    return getModelsGeometries(json)
  } catch (e) {
    console.warn('Your browser not suports import with type json')
    const parsedRoute = await import.meta.resolve(url)
    const res = await fetch(parsedRoute)
    const json = await res.json()
    return getModelsGeometries(json)
  }
}

export const playClickAudio = () => {
  const { promise, resolve } = Promise.withResolvers()
  
  if (audioChk.checked) {
    const clickAudio = new Audio('./assets/clickAudio.mp3')
    
    clickAudio.oncanplaythrough = () => {
      clickAudio.play()
      resolve()
    }
  } else resolve()
  
  return promise
}