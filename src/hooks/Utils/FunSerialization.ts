const funSerialization = () => {
  // 自定义序列化 
  const funSerializer = (key: string, value: any): any => {
    // 如果属性值是函数，则将其转换为字符串
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  }

  // 自定义反序列化 
  const funReviver = (key: string, value: any): any => {
    // 如果属性值是字符串且可以解析为函数，则将其转换为函数
    if (typeof value === 'string' && value.indexOf('function') !== -1) {
      return eval(`(${value})`);
    }
    return value;
  }

  return {
    funSerializer,
    funReviver
  }
}

export default funSerialization;