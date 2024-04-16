import { Mesh } from "three";
import gsap from "gsap";

const DesktopsFun = (
  THREE: typeof import("three"),
  baseModel: { children: any; add: any; },
  resources: Record<string, string>
) => {
  let desktop0,
    desktop1,
    notification;

  const setNotification = (desktop1: Mesh<any, any, any>) => {
    notification = desktop1.clone()
    notification.material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(resources.desktop1Notification),
      transparent: true,
      fog: false,
      opacity: 0
    })
    notification.position.x += .01
    baseModel.add(notification)
  }

  const setDesktop1 = () => {
    desktop1 = baseModel.children.find((e: { name: string; }) => e.name === "desktop-plane-1")
    const texture = new THREE.TextureLoader().load(resources.desktop1)
    texture.colorSpace = THREE.SRGBColorSpace;
    // 材质
    const desktop1PlaneMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      fog: false
    })
    if (desktop1 instanceof THREE.Mesh) {
      desktop1.material = desktop1PlaneMaterial
      desktop1.scale.x = 1.01

      setNotification(desktop1)
    }
  }

  const setDesktop0 = () => {
    // 加载desktops0
    desktop0 = baseModel.children.find((e: { name: string; }) => e.name === "desktop-plane-0")
    const texture = new THREE.TextureLoader().load(resources.desktop0)
    texture.colorSpace = THREE.SRGBColorSpace;
    // 材质
    const desktop0Layer0Material = new THREE.MeshBasicMaterial({
      map: texture,
      fog: false
    })
    if (desktop0 instanceof THREE.Mesh) {
      desktop0.material = desktop0Layer0Material
    }
  }

  // 加载desktops1
  setDesktop1()
  // 加载desktops0
  setDesktop0()

  const scrollDesktop0 = () => {
    const offsetY = Math.random() * -0.5 + 0.25;
    gsap.to(new THREE.TextureLoader().load(resources.desktop0).offset, {
      y: offsetY,
      duration: 1
    })
    // sounds.play("mouseWheel")
  }

  return {
    desktop0,
    desktop1,
    notification,
    scrollDesktop0,
  }
}
export default DesktopsFun