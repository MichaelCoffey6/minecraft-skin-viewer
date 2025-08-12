import * as THREE from "./three-js/three.module.min.js"
import { getJSON, variablesLoaded } from "./utils.js"
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
  app,
  viewer,
  config,
  canvas,
  skinParts,
  titleImg,
  slimPreview,
  classicPreview, 
  selectSkinType, 
  selectClassicSkin, 
  selectSlimSkin,
  closeSkinSelector,
  audioChk, 
  animationChk, 
  bodyPartsChk,
  clotesPartsChk,
  loadSkinInp,
} = window

export const distance = 32 
export const configBtns = Array.from(document.querySelectorAll('.configBtn input'))
export const skinCanvas = document.createElement('canvas')
export const skinCtx = skinCanvas.getContext('2d')
export const frontSkinCanvas = document.createElement('canvas')
export const frontSkinCtx = frontSkinCanvas.getContext('2d')
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
export const MODELS = await getJSON('@/src/geometry.json')

variablesLoaded()

export const MODEL_BONES = Object.fromEntries(
  await Promise.all(
    BONE_NAMES.map(async boneName => {
      const setBone = (gmtry, mtrls) => new THREE.Mesh(gmtry, mtrls)
      const { bone } = await getBoneAndStruct(boneName, setBone)
      skinModel.add(bone)
      return [boneName, bone]
    })
  )
)

const boxModel = new THREE.Box3().setFromObject(skinModel)
const modelCenter = boxModel.getCenter(new THREE.Vector3())
skinModel.position.sub(modelCenter)