/**
 * 获取组件注册对象
 * @param {Array<VueComponent>}} VueComponent list
 * @return {Object} vue component register object
 */
export function getComponentRegister(comps) {
  const result = {}
  if (Array.isArray(comps)) {
    comps.forEach(comp => {
      result[comp.name] = comp
    })
  }
  return result
}
