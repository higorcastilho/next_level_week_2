export default function convertMinutesToHours (time: number) {
	const hour = Math.trunc(time / 60)
	const minutes = (time % 60)
	const twoDigitMinutes = ("0"+minutes).slice(-2)
	return [hour, twoDigitMinutes]
}