import SceneComponent from "../components/SceneComponent"
import "@babylonjs/loaders"
import {
  Color3,
  HemisphericLight,
  Material,
  Scene,
  SceneLoader,
  Vector3,
  FreeCamera,
  MeshBuilder,
} from "@babylonjs/core"

const onSceneReady = (scene) => {
  // Get the canvas from our engine
  const canvas = scene.getEngine().getRenderingCanvas()
  var camera = new FreeCamera("freeCamera", new Vector3(1, 1, 1), scene);
  camera.attachControl(canvas); 
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.ellipsoid = new Vector3(1.2, 0.82, 1.2);
  camera.speed = 0.10;
  camera.keysUp.push('w'.charCodeAt(0));
  camera.keysUp.push('W'.charCodeAt(0));
  camera.keysLeft.push('a'.charCodeAt(0));
  camera.keysLeft.push('A'.charCodeAt(0));
  camera.keysDown.push('s'.charCodeAt(0));
  camera.keysDown.push('S'.charCodeAt(0));
  camera.keysRight.push('d'.charCodeAt(0));
  camera.keysRight.push('D'.charCodeAt(0));
  camera.position = new Vector3(-20.54923757511364, 12.539500463676452, 21.571411803738556);
  camera.rotation = new Vector3(-0.0044657201001599145, 8.319440534657161, 0);
  
  

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
  light.diffuse = new Color3(0.7, 0.42, 0.42)
  light.specular = new Color3(0.7, 0.42, 0.42)

  // Load our OBJ
  SceneLoader.Append("./assets/scene/scene.babylon", "", scene, onSceneImported);
  function onSceneImported(){
    scene.activeCamera = camera;
    scene.gravity = new Vector3(0, -0.1, 0);
    scene.fogMode = Scene.FOGMODE_NONE;
    var camSphere = MeshBuilder.CreateSphere("sphere", {diameterY: 3, diameterX: 0.1}, scene);
    camSphere.parent = camera;
    camSphere.visibility = 0;
    scene.registerBeforeRender();
  }
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