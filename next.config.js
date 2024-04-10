/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 关闭 React 严格模式
  distDir: "build",
  output: 'export' // 这里是添加的配置代码
}

module.exports = nextConfig
