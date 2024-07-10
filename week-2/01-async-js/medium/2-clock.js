let currentTime = new Date();

function count() {

    let hours = currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}` ;
    let minutes = currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}` ;
    let seconds = currentTime.getSeconds() > 9 ? currentTime.getSeconds() : `0${currentTime.getSeconds()}` ;



    console.log(`${hours}:${minutes}:${seconds}`);
    currentTime = new Date()

}

setInterval(count,1000)