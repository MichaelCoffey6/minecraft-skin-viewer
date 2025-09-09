import { renderer, scene, camera, animationChk } from "./const.js"
import { MODEL_BONES, setPositionBone } from "./createModel.js"

let positionChanged = true
let alpha = 0

export const animate = () => {
  const {
    head, hat,
    body, jacket,
    leftArm, leftSleeve,
    leftLeg, leftPants,
    rightArm, rightSleeve,
    rightLeg, rightPants
  } = MODEL_BONES
  
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  
  if (!animationChk.checked) {
    if (!positionChanged) return
    
    setPositionBone(leftLeg)
    setPositionBone(leftPants)
    setPositionBone(rightLeg)
    setPositionBone(rightPants)
    
    setPositionBone(leftArm)
    setPositionBone(leftSleeve)
    setPositionBone(rightArm)
    setPositionBone(rightSleeve)
    
    positionChanged = false
    return
  }
  
  positionChanged = true
  alpha += Math.PI / 320
  
  //Leg Swing
  leftPants.rotation.x = leftLeg.rotation.x = Math.cos(alpha * 4)
  leftPants.position.y = leftLeg.position.y = 12 - (6 * Math.abs(Math.cos(leftLeg.rotation.x)))
  leftPants.position.z = leftLeg.position.z = 0 - (6 * Math.sin(leftLeg.rotation.x))
  rightPants.rotation.x = rightLeg.rotation.x = Math.cos(alpha * 4 + Math.PI)
  rightPants.position.y = rightLeg.position.y = 12 - (6 * Math.abs(Math.cos(rightLeg.rotation.x)))
  rightPants.position.z = rightLeg.position.z = 0 - (6 * Math.sin(rightLeg.rotation.x))
  
  //Arm Swing
  leftSleeve.rotation.x = leftArm.rotation.x = Math.cos(alpha * 4 + Math.PI)
  leftSleeve.position.y = leftArm.position.y = 24 - (6 * Math.abs(Math.cos(leftArm.rotation.x)))
  leftSleeve.position.z = leftArm.position.z = 0 - (6 * Math.sin(leftArm.rotation.x))
  rightSleeve.rotation.x = rightArm.rotation.x = Math.cos(alpha * 4)
  rightSleeve.position.y = rightArm.position.y = 24 - (6 * Math.abs(Math.cos(rightArm.rotation.x)))
  rightSleeve.position.z = rightArm.position.z = 0 - (6 * Math.sin(rightArm.rotation.x))
}