import {
    SceneFun,
    CameraFun,
    RendererFun,
    RaycasterFun
} from "./Base";
import {
    SizesFun,
    TimeFun
} from "./Utils";
import { InitFunResult } from '@/types/init'
import { PageEleProps } from '@/types/page'



const initFun = (
    THREE: typeof import("three"),
    { HoverIconRef }: PageEleProps
): InitFunResult => {
    const { sizes } = SizesFun()
    const { timeData } = TimeFun()

    // 2. 初始化场景
    const sceneFun = SceneFun(THREE, sizes)

    // 3. 初始化相机
    const cameraFun = CameraFun(
        THREE,
        sceneFun.scene,
        sizes,
        timeData
    )
    cameraFun.camera.position.set(0, 6, 10)


    // 4. 初始化渲染器
    const rendererFun = RendererFun(
        THREE,
        sceneFun.scene,
        cameraFun.camera,
        sizes,
    )

    const raycasterFun = RaycasterFun(THREE,
        sceneFun.scene,
        cameraFun.camera,
        { HoverIconRef }
    )


    // 7.定义一个渲染函数
    const render = () => {
        cameraFun.update()
        rendererFun.update()
        raycasterFun.update()

        requestAnimationFrame(render)
    }

    const onResize = () => {
        cameraFun.resize()
        rendererFun.resize()
    }


    return {
        // 渲染器
        ...rendererFun,
        // 渲染函数
        render,
        // 场景
        ...sceneFun,
        // 相机
        ...cameraFun,

        ...raycasterFun,
        onResize,
    }
}


export default initFun