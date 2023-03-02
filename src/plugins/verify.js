/*
正则校验手机号和邮箱
*/
export function codeVerification(phone) {
	let phoneCodeVerification = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return phoneCodeVerification.test(phone);
}

export function emailVerification(email) {
	let emailVerification = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
	return emailVerification.test(email);
}
