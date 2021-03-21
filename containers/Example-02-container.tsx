import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders"
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  Material,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core"

const onSceneReady = (scene) => {
  // Get the canvas from our engine
  const canvas = scene.getEngine().getRenderingCanvas()

  // Camera
  var camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero(), scene)

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero())

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
  light.diffuse = new Color3(0.7, 0.42, 0.42)
  light.specular = new Color3(0.7, 0.42, 0.42)

  // Load our OBJ
  SceneLoader.Append("./assets/sample-01.obj", "", scene, (newScene: Scene) => {
    const { meshes, geometries } = scene
    console.log(
      `Successfully loaded asset -> ${meshes?.length} meshes :: ${geometries?.length} geometries`
    )

    // Experiment - Display the wireframe
    const material: Material = newScene.materials[0]
    material.wireframe = true
  })
}

/**
 * Will run on every frame render.  Useful for animation such as rotating the object along the y-axis, etc.
 */
const onRender = (scene) => {
  //   if (box !== undefined) {
  //     var deltaTimeInMillis = scene.getEngine().getDeltaTime()
  //     const rpm = 10
  //     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
  //   }
}

export default () => {
  return (
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="demo-example-02"
    />
  )
}