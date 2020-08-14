export default function jwtDecode(token: string): any {
	const payload = atob(token.split('.')[1])
	const payloadObj = JSON.parse(payload)
	return payloadObj.sub			
}