import {
    SceneFun,
    CameraFun,
    RendererFun
} from "./Base";
import {
    SizesFun,
    TimeFun
} from "./Utils";
import { InitFunResult } from '@/types/init'



const initFun = (THREE: typeof import("three")): InitFunResult => {
    const { sizes } = SizesFun()
    const { timeData } = TimeFun()

    // 2. 初始化场景
    const { scene } = SceneFun(THREE, sizes)

    // 3. 初始化相机
    const { camera, cameraResize } = CameraFun(
        THREE,
        scene,
        sizes,
        timeData
    )
    camera.position.set(0, 6, 10)


    // 4. 初始化渲染器
    const { renderer, rendererUpdate } = RendererFun(
        THREE,
        scene,
        camera,
        sizes,
    )


    // 7.定义一个渲染函数
    const render = () => {
        rendererUpdate()
        requestAnimationFrame(render)
    }

    const onResize = () => {
        cameraResize()

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
        onResize
    }
}


export default initFun