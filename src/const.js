import * as THREE from "./three-js.min/three.module.min.js"
import { getJSON } from "./utils.js"
import { getBoneAndStruct } from "./createModel.js"

export const TACTIL_STATE = {
  touchStartX: 0, 
  touchStartY: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  pointerType: 'mouse'
}

export const ARM_NAMES = [
  'leftArm', 'leftSleeve',
  'rightArm', 'rightSleeve'
]

export const BONE_NAMES = [
  'head', 'hat',
  'body', 'jacket',
  'leftLeg', 'leftPants',
  'rightLeg', 'rightPants'
].concat(ARM_NAMES)

export const { 
  viewer,
  config,
  canvas,
  selectSkinType, 
  animationChk, 
  bodyPartsChk,
  clotesPartsChk,
  loadSkinInp: skinInp,
} = window

export const distance = 32 
export const skinImg = new Image()
export const reader = new FileReader()
export const skinModel = new THREE.Group()
export const centerPoint = new THREE.Vector3()
export const texture = new THREE.Texture(skinImg)
export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(75, 250 / 400, 0.1, 1000)
export const renderer = new THREE.WebGLRenderer({ alpha: true, canvas })
export const defaultSkin = await import.meta.resolve('@/assets/Coffey64.png')
export const importationType = { with: { type: 'json' } }
export const MODELS = await getJSON('./geometry.json')

export const MODEL_BONES = Object.fromEntries(BONE_NAMES.map(boneName => {
  const setBone = (gmtry, mtrls) => new THREE.Mesh(gmtry, mtrls)
  const { bone } = getBoneAndStruct(boneName, setBone)
  skinModel.add(bone)
  return [boneName, bone]
}))

const boxModel = new THREE.Box3().setFromObject(skinModel)
const modelCenter = boxModel.getCenter(new THREE.Vector3())
skinModel.position.sub(modelCenter)