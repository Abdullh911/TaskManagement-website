function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const currentTime = hours + ':' + minutes + ' ' + ampm;
    return currentTime;
  }
  module.exports=getCurrentTime;