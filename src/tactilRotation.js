import { TACTIL_STATE, camera, centerPoint, distance } from "./const.js"

export const onPointerDown = ({ pointerType, clientX, clientY }) => {
  TACTIL_STATE.pointerType = pointerType
  TACTIL_STATE.touchStartX = clientX
  TACTIL_STATE.touchStartY = clientY
}

export const onTouchMove = ({ touches }) => {
  const { pointerType, touchStartX, touchStartY } = TACTIL_STATE
  
  if (pointerType !== 'touch') return
  
  const [ touch ] = touches
  const touchX = touch.clientX
  const touchY = touch.clientY
  const deltaX = touchX - touchStartX
  const deltaY = touchY - touchStartY
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
  
  TACTIL_STATE.touchStartX = touchX
  TACTIL_STATE.touchStartY = touchY
}

export const onTouchEnd = () => {
  const { pointerType } = TACTIL_STATE
  
  if (pointerType !== 'touch') return
  
  TACTIL_STATE.touchStartX = 0
  TACTIL_STATE.touchStartY = 0
}