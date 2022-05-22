let div = document.getElementById("title")
let title1 = null;


var count = 0;

function sendMessage() {
    let customMessage = document.getElementById("audioPlayer").value;
    window.api.sendMsg(customMessage)

}
window.api.fileName((data) => {
    let fileName = data;
    title1 = fileName[0];
    console.log(title1)
    let title = title1.replace(/^.*[\\\/]/, '');


    div.innerHTML = title.replace(".mp3", "");




    let audio = new Audio(title1);


    audio.loop = true;
    audio.play();

    playBtn = document.getElementById("playBtn");
    muteBtn = document.getElementById("muteBtn");
    stopBtn = document.getElementById("stopBtn");

    playBtn.addEventListener("click", playPause);
    muteBtn.addEventListener("click", mute);
    stopBtn.addEventListener("click", stop);

    function playPause() {
        if (audio.paused) {
            audio.play();
            document.getElementById('play-pause').src = "file:///images/pause_circle.png"

        } else {
            audio.pause();
            document.getElementById('play-pause').src = "file:///images/play_circle.png"

        }
    }

    function stop() {
        audio.pause();
        audio.currentTime = 0;
        document.getElementById('play-pause').src = "file:///images/play_circle.png"

    }

    function mute() {
        if (audio.muted) {
            audio.muted = false;
            document.getElementById('mute').src = "file:///images/volume_off.png"

        } else {
            audio.muted = true;
            document.getElementById('mute').src = "file:///images/volume_up.png"

        }

    }


    div.addEventListener('DOMSubtreeModified', () => {
        audio.pause()
        audio = null;
    })



})