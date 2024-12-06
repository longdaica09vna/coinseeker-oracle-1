/* eslint-disable @typescript-eslint/no-explicit-any */

const isObject = (data: any) => Object.prototype.toString.call(data) === '[object Object]'

const isArray = (data: any) => Object.prototype.toString.call(data) === '[object Array]'

const shallowFlatten = (data: any) =>
  !data.attributes
    ? data
    : {
        id: data.id,
        ...data.attributes,
      }

export const flatten = (data: any) => {
  if (isArray(data)) return data.map((item: any) => flatten(item))
  if (isObject(data)) {
    if (isArray(data.data)) data = [...data.data]
    else if (isObject(data.data)) data = shallowFlatten({ ...data.data })
    else if (data.data === null) data = null
    else data = shallowFlatten(data)
    for (const key in data) data[key] = flatten(data[key])
    return data
  }
  return data
}

export const strapiHelper = {
  flatten,
}
