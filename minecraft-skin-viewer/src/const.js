import * as THREE from "./three-js/three.module.min.js"
import { getJSON } from "./utils.js"

export const TACTIL_STATE = {
  touchStartX: 0, 
  touchStartY: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  pointerDown: false,
  pointerType: TouchEvent
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
export const canvasSize = { width: 500, height: 800 }
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
export const camera = new THREE.PerspectiveCamera(75, canvasSize.width / canvasSize.height, 0.1, 1000)
export const renderer = new THREE.WebGLRenderer({ alpha: true, canvas })
export const defaultSkin = await import.meta.resolve('@/assets/Coffey.png')
export const importationType = { with: { type: 'json' } }
export const MODELS = await getJSON('@/src/geometry.json')