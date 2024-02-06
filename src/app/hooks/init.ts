// 11. 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const initFun = (THREE: typeof import("three")) => {
    // 2. 初始化场景
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x88ccee, 0, 50);

    // 3. 初始化相机
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        70
    )
    // 10.设置相机位置 (才能见到物体) 尽量靠近相机位置更逼真5 ---> 0.1
    camera.position.set(0, 6, 10) // 这里只能看到y轴的面，需要添加控制器进行查看物体
    camera.rotation.order = 'YXZ';

    // 4. 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启锯齿
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;


    // 初始化性能监视器,显示帧率
    const stats = new Stats();
    // 设置监视器位置
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '0px';


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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
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
        stats,
        onResize
    }
}


export default initFun