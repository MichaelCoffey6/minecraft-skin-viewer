import { BONE_NAMES, importationType } from "./const.js"

const getModelsGeometries = json => {
  const { 'minecraft:geometry': [ , classic, slim ] } = json
  const classicBones = {}
  const slimBones = {}
  
  classic.bones.forEach(({ name, cubes: [ boneInfo ] = [ null ] }) => {
    if (BONE_NAMES.includes(name)) classicBones[name] = boneInfo
  })
  
  slim.bones.forEach(({ name, cubes: [ boneInfo ] = [ null ] }) => {
    if (BONE_NAMES.includes(name)) slimBones[name] = boneInfo
  })
  
  return {
    classic: classicBones,
    slim: slimBones,
    current: 'classic'
  }
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