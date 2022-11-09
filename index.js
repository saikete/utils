// 实现数组新旧比对
// equalsObj(
// 	newList.sort(this.compare('RSSI')),
// 	oldList.sort(this.compare('RSSI')),
// )
//排序
export function compare(key) {
	return function (value1, value2) {
		var val1 = value1[key]
		var val2 = value2[key]
		return val1 - val2
	}
}

/**
 * 判断此对象是否是Object类型
 * @param {Object} obj
 */
export function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}
/**
 * 判断此类型是否是Array类型
 * @param {Array} arr
 */
export function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
/**
 *  深度比较两个对象是否相同
 * @param {Object} oldData
 * @param {Object} newData
 */
export function equalsObj(oldData, newData) {
	// 类型为基本类型时,如果相同,则返回true
	if (oldData === newData) return true
	if (
		this.isObject(oldData) &&
		this.isObject(newData) &&
		Object.keys(oldData).length === Object.keys(newData).length
	) {
		// 类型为对象并且元素个数相同

		// 遍历所有对象中所有属性,判断元素是否相同
		for (const key in oldData) {
			if (oldData.hasOwnProperty(key)) {
				if (!this.equalsObj(oldData[key], newData[key]))
					// 对象中具有不相同属性 返回false
					return false
			}
		}
	} else if (
		this.isArray(oldData) &&
		this.isArray(oldData) &&
		oldData.length === newData.length
	) {
		// 类型为数组并且数组长度相同
		for (let i = 0, length = oldData.length; i < length; i++) {
			if (!this.equalsObj(oldData[i], newData[i]))
				// 如果数组元素中具有不相同元素,返回false
				return false
		}
	} else {
		// 其它类型,均返回false
		return false
	}

	// 走到这里,说明数组或者对象中所有元素都相同,返回true
	return true
}

/**
 * @description 查找包含自身节点的父代节点
 * @param tree 需要查找的树数据
 * @param curKey 当前节点key
 * @param keyField 自定义 key 字段
 * @param node 找到的node 可以不传
 */
export function findCurNode(tree, curKey, keyField, node = null) {
	tree.forEach((item) => {
		if (item[keyField] === curKey) {
			node = item
		}

		if (item.children && item.children.length) {
			const findChildren = findCurNode(item.children, curKey, keyField, node)
			if (findChildren) {
				node = findChildren
			}
		}
	})
	return node
}
