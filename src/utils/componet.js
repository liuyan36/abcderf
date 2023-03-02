//判断是否为空
export function isNotNull(data) {
	let flag
	if (data !== undefined && data !== null && data !== "") {
		flag = true
	} else {
		flag = false
	}
	return flag
}
