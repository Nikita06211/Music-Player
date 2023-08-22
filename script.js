const songs = [
    {
        name: "song-1",
        song: "Runaway",
        artist: "aurora",
        background: "linear-gradient(145deg, rgba(115,95,67,1) 15%, rgba(222,186,161,1) 100%)"
    },
    {
        name: "song-2",
        song: "i l y",
        artist: "Surf Mesa",
        background: "linear-gradient(145deg, rgba(123,171,105,1) 0%, rgba(214,241,240,1) 55%, rgba(161,222,217,1) 100%)"
    },
    {
        name: "song-3",
        song: "Dandelions",
        artist: "Ruth B",
        background: "linear-gradient(145deg, rgba(141,136,136,1) 0%, rgba(255,255,255,1) 100%)"
    },
    {
        name: "song-4",
        song: "Alone pt: II",
        artist: "alan walker",
        background: "linear-gradient(145deg, rgba(145,238,147,1) 0%, rgba(67,189,218,1) 100%)"
    }
];

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const img = document.querySelector("#song_image");
const audio = document.querySelector("audio");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const main= document.querySelector(".main");
const seek=document.querySelector(".seek-bar");
const current_time=document.querySelector(".current-time");
const song_duration=document.querySelector(".song-duration");

let songIndex = 0;

next.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    load(songs[songIndex]);
    play_music();
    
})

prev.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length ) % songs.length;
    load(songs[songIndex]);
    play_music();
    
})

let play_song = false;

const pause_music = () => {
    play_song = false;
    audio.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("rotate");
}

const play_music = () => {
    play_song = true;
    audio.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("rotate");
    
}

play.addEventListener("click", () => {
    if (play_song) {
        pause_music();
    }
    else {
        play_music();
    }
});

const load=(songs)=>{
    seek.value=0;
    seek.max=audio.duration;
    title.innerText = songs.song;
    artist.innerText = songs.artist;
    img.src = `images/${songs.name}.webp`;
    audio.src = `songs/${songs.name}.mp3`;
    main.style.background = songs.background;

    setTimeout(()=>{
        song_duration.innerHTML=format_time(audio.duration);
        console.log(audio.duration);
    },1000);

    
    
}

const format_time =(time)=>{
    let min = Math.floor(time/60);
    if(min<10){
        min=`0${min}`;
    }
    let sec = Math.floor(time%60);
    if(sec<10){
        sec=`0${sec}`;
    }
    return `${min}:${sec}`;
}

setInterval(()=>{
    seek.value=audio.currentTime;
    current_time.innerHTML=format_time(audio.currentTime);
},500)

seek.addEventListener('change',()=>{
    audio.currentTime=seek.value;
})
