const convertHMS = (value: any) => {
  const sec = parseInt(value, 10) // convert value to number if it's string
  let hours: any = Math.floor(sec / 3600) // get hours
  let minutes: any = Math.floor((sec - hours * 3600) / 60) // get minutes
  let seconds: any = sec - hours * 3600 - minutes * 60 //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
}

export default convertHMS
