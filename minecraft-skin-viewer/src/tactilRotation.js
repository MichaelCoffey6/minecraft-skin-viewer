import { TACTIL_STATE, camera, centerPoint, distance } from "./const.js"

const POINTER_TYPES = {
  mouse: 'mouse',
  touch: 'touch'
}

export const onPointerDown = ({ pointerType, clientX, clientY }) => {
  TACTIL_STATE.pointerType = pointerType === POINTER_TYPES.touch ? TouchEvent : MouseEvent
  TACTIL_STATE.pointerStartX = clientX
  TACTIL_STATE.pointerStartY = clientY
  TACTIL_STATE.pointerDown = true
}

export const onPointerMove = event => {
  const { touches, constructor } = event
  const { pointerStartX, pointerStartY, pointerType, pointerDown } = TACTIL_STATE
  
  if (pointerType !== constructor || !pointerDown) return
  
  const { clientX, clientY } = pointerType === TouchEvent 
    ? touches[0]
    : event
  
  const deltaX = clientX - pointerStartX
  const deltaY = clientY - pointerStartY
  const cameraRotationX = TACTIL_STATE.cameraRotationX += deltaX * 0.01
  const cameraRotationY = TACTIL_STATE.cameraRotationY += deltaY * 0.01
  const angle = cameraRotationX
  const phi = cameraRotationY
  const x = distance * Math.sin(phi) * Math.cos(angle)
  const y = distance * Math.cos(phi)
  const z = distance * Math.sin(phi) * Math.sin(angle)
  
  camera.position.x = x
  camera.position.y = y
  camera.position.z = z
  
  camera.lookAt(centerPoint)
  
  TACTIL_STATE.pointerStartX = clientX
  TACTIL_STATE.pointerStartY = clientY
}

export const onPointerUp = event => {
  const { constructor } = event
  const { pointerType, pointerDown } = TACTIL_STATE
  
  if (pointerType !== constructor || !pointerDown) return
  
  TACTIL_STATE.pointerStartX = 0
  TACTIL_STATE.pointerStartY = 0
  TACTIL_STATE.pointerDown = false
}