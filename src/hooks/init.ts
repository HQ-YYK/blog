// 11. 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const initFun = (THREE: typeof import("three")) => {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    // 2. 初始化场景
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog("#002C6A", 10, 17);

    // 3. 初始化相机
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        1,
        70
    )
    // 10.设置相机位置 (才能见到物体) 尽量靠近相机位置更逼真5 ---> 0.1
    camera.position.set(0, 6, 10) // 这里只能看到y轴的面，需要添加控制器进行查看物体
    camera.rotation.order = 'YXZ';

    // 4. 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启锯齿
    renderer.setClearColor("#F5EFE6")
    // 包含颜色信息（.map、.emissiveMap 和 .specularMap）的纹理在 glTF 中始终使用 sRGB 颜色空间，而顶点颜色和材质属性（.color、.emissive、.specular）使用线性颜色空间。在典型的渲染工作流程中，渲染器将纹理转换为线性色彩空间，进行光照计算，然后将最终输出转换回 sRGB 并显示在屏幕上。除非您需要在线性色彩空间中进行后期处理，否则在使用 glTF 时始终按如下方式配置 WebGLRenderer 
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(sizes.pixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height)


    // 7.定义一个渲染函数
    const render = () => {
        // 14.需要动态更新
        controls.update()

        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    // 12.添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    // 13. 添加控制器阻尼的感觉,让控制器更有真实效果
    controls.enableDamping = true
    // 调整摄像机
    controls.target.set(0, 0, - Math.PI / 2 - 3);
    // 开启缩放功能
    controls.enableZoom = true;
    // 设置最大缩放距离为10米
    controls.maxDistance = 10;
    // 设置最小缩放距离为5米
    controls.minDistance = 5;

    const onResize = () => {
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
    }


    return {
        // 渲染器
        renderer,
        // 渲染函数
        render,
        // 场景
        scene,
        // 相机
        camera,
        // 轨道控制器
        controls,
        onResize
    }
}


export default initFun