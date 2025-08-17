import * as THREE from "./three-js/three.module.min.js"
import { MODELS, BONE_NAMES, texture, skinModel } from "./const.js"
import { pageConfig } from "./saveData.js"

const getMaterial = ({ width, height, uv, isBottom = false }) => {
  const [ x = 0, y = height ] = uv
  const offsetY = isBottom ? 1 / 64 * y : 1 / 64 * (64 - (y + height))
  const transparent = true
  const alphaTest = 1
  const map = texture.clone()
  map.flipY = !isBottom
  map.magFilter = THREE.NearestFilter
  map.minFilter = THREE.NearestMipMapNearestFilter
  map.colorSpace = THREE.SRGBColorSpace
  map.repeat.set(1 / 64 * width, 1 / 64 * height)
  map.offset.set(1 / 64 * x, offsetY)
  
  const material = new THREE.MeshBasicMaterial({ map, transparent, alphaTest })
  material.needsUpdate = true
  return material
}

export const setPositionBone = ({ name: boneName, position, rotation }) => {
  const { skinType } = pageConfig.bones
  const { [boneName]: boneModel } = MODELS[skinType]
  const { size, origin } = boneModel
  const [ width, height ] = size
  const [ x, y ] = origin
  
  position.x = x + (width / 2)
  position.y = y + (height / 2)
  position.z = 0
  rotation.x = 0
}

export const getBoneAndStruct = (boneName, getBone = () => null) => {
  const { skinType } = pageConfig.bones
  const { [boneName]: boneModel } = MODELS[skinType]
  const { size, uv, origin, inflate } = boneModel
  const [ width, height, length ] = size
  const [ x, y ] = uv
  const left = [x + length + width, y + length]
  const right = [x, y + length]
  const top = [x + length, y]
  const bottom = [x + length + width, y]
  const front = [x + length, y + length]
  const back = [x + length + width + length, y + length]
  
  const materials = [
    getMaterial({ width: length, height, uv: left }),
    getMaterial({ width: length, height, uv: right }),
    getMaterial({ width, height: length, uv: top }),
    getMaterial({ width, height: length, uv: bottom, isBottom: true }),
    getMaterial({ width, height, uv: front }),
    getMaterial({ width, height, uv: back })
  ]
  
  const sizes = size.map(xyz => inflate != null ? xyz + inflate : xyz)
  const geometry = new THREE.BoxGeometry(...sizes)
  
  const bone = getBone(geometry, materials)
  bone.name = boneName
  bone.visible = pageConfig.bones[boneName]
  
  setPositionBone(bone)

  return { bone, geometry, materials }
}

export const MODEL_BONES = Object.fromEntries(
  BONE_NAMES.map(boneName => {
    const setBone = (gmtry, mtrls) => new THREE.Mesh(gmtry, mtrls)
    const { bone } = getBoneAndStruct(boneName, setBone)
    skinModel.add(bone)
    return [ boneName, bone ]
  })
)

const boxModel = new THREE.Box3().setFromObject(skinModel)
const modelCenter = boxModel.getCenter(new THREE.Vector3())
skinModel.position.sub(modelCenter)