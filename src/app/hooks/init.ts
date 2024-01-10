"use client"

// 11. 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 12.导入MMD文件数据加载器的RGBELoader 
// import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js'
// 12.导入glb文件数据加载器的RGBELoader 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const initFun = (THREE: typeof import("three")) => {
    // 2. 初始化场景
    const scene = new THREE.Scene()

    // 3. 初始化相机
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    // 10.设置相机位置 (才能见到物体) 尽量靠近相机位置更逼真5 ---> 0.1
    camera.position.z = 0.1 // 这里只能看到z轴的面，需要添加控制器进行查看物体

    // 4. 初始化渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)


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


    // 加载hdr环境图
    //    const mmdELoader = new MMDLoader()
    //    mmdELoader.load('/pmx/Stage.pmx', mesh => {
    //     scene.add(mesh)
    //    },xhr => {
    //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    //    },error =>{
    //     console.log( 'An error happened' );
    //    })

    const gltfELoader = new GLTFLoader()
    gltfELoader.load('/glb/spaceship.glb', gltf => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 白光，强度为1
        scene.add(ambientLight);
    
        const dirLight = new THREE.DirectionalLight('rgb(253,253,253)', 5);
        dirLight.position.set(10, 10, 5); // 根据需要自行调整位置
        scene.add(dirLight);
    
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.material.side = THREE.DoubleSide; // 模型双面渲染
              child.castShadow = true;  // 光照是否有阴影
              child.receiveShadow = true;  // 是否接收阴影
              child.frustumCulled = false;
            }
        });

        scene.add(gltf.scene);
    }, xhr => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, error => {
        console.log('An error happened');
    })

    return {
        // 渲染器
        renderer,
        // 渲染函数
        render,
        // 场景
        scene,
        // 相机
        camera
    }
}


export default initFun