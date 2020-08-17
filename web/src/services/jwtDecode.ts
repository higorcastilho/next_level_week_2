export default function jwtDecode(token: string | null): any {
	if (token) {
		const payload = atob(token.split('.')[1])
		const payloadObj = JSON.parse(payload)
		return payloadObj.sub 
	} else {
		console.log('Invalid token')
	}
}