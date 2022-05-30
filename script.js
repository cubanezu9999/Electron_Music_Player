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
    vol = document.getElementById("volume")
    seekSlider = document.getElementById("timeSeek");
    durTime = document.getElementById("durTime")
    currentTime = document.getElementById("currentTime")

    playBtn.addEventListener("click", playPause);
    muteBtn.addEventListener("click", mute);
    stopBtn.addEventListener("click", stop);
    vol.addEventListener("mousemove", volume);
    audio.addEventListener("timeupdate", tu)

    seeking = null;

    seekSlider.addEventListener("click", function(event) {


        seeking = true;
        seek(event);

    });

    function tu() {
        var nt = audio.currentTime * (100 / audio.duration);
        seekSlider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) { cursecs = "0" + cursecs; }
        if (dursecs < 10) { dursecs = "0" + dursecs; }
        if (curmins < 10) { curmins = "0" + curmins; }
        if (durmins < 10) { durmins = "0" + durmins; }
        currentTime.innerHTML = curmins + ":" + cursecs;
        durTime.innerHTML = durmins + ":" + dursecs;
    }



    function seek(event) {

        if (seeking) {


            seekto = audio.duration * (seekSlider.value / 100);
            audio.currentTime = seekto;
            seeking = false;

        }
    }

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



    function volume() {

        audio.volume = vol.value / 100;

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