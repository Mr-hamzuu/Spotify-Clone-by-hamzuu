let currentsong = new Audio();
let curfolder;
let songs;
let song;
let pics; // Declare pics globally so it's accessible in getsong and main
let playbtn = document.querySelectorAll(".r-card")

let play = "M5 3.5v17l14-8.5-14-8.5z";
let pause = "M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z";

playbtn.forEach(btn => {

    let path = btn.querySelector("svg path")
    btn.addEventListener('click', () => {
        let isplaying = path.getAttribute('d') === pause;

        if (isplaying) {
            path.setAttribute('d', play)
            currentsong.pause(); // Pause the song 
            document.querySelector("#play").querySelector("svg path").setAttribute("d", "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z");
        }
        else {
            path.setAttribute('d', pause)

        }
    })
});
// time convertion 
function convertToMMSS(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    // Pad with leading zeros if needed
    let formattedMins = String(mins).padStart(2, '0');
    let formattedSecs = String(secs).padStart(2, '0');

    return `${formattedMins}:${formattedSecs}`;
}



async function getsong(folder) {


    curfolder = folder;
  
    let a = await fetch(`./song/${folder.toLowerCase()}/`)
    let response = await a.text()
  
    let div = document.createElement('div')
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    song = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index].href;
        if (element.endsWith('.mp3')) {
            song.push(element.split(`/${folder}/`)[1]);
        }
    }
    songs = song; // <-- Add this line to update the global songs variable
    const artists = [
        "Arijit Singh, Palak Muchhal",
        "Lata Mangeshkar",
        "Humaira Arshad, Abdullah Siddiqui",
        "Kishore Kumar",
        "Kaifi Khalil",
        "Jubin Nautiyal"
    ];
    let title = document.querySelector('.scrollbar').getElementsByTagName('ul')[0];
    title.innerHTML = "";
    if (songs && pics) {
        for (let s = 0; s < songs.length; s++) {
            if (pics[s]) {
                title.innerHTML += `<li>
               <img src="${pics[s]}" alt="">
               <div class="info">
               <div>Song name:  ${songs[s].replaceAll("%20", " ")}</div>
               <div>Artist name: ${artists[s]}</div>
               </div>
               </li>`;
            }
        }
    }

    let defaultcolor = null;

    Array.from(document.querySelector(".scrollbar").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {

            console.log(e.querySelector(".info").firstElementChild.innerHTML.split(": ")[1]);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.split(": ")[1].trim())
            console.log(e);

            if (defaultcolor) {
                defaultcolor.querySelector(".info").firstElementChild.style.color = ""
            }
            e.querySelector(".info").firstElementChild.style.color = "#1db954";
            defaultcolor = e
            play.querySelector("svg path").setAttribute("d", "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z");
        })
    });


    return song;
}


// Pic portion
async function picsreturn(images) {
    let pics = await fetch(`./assits/${images.toLowerCase()}/`)
    let picsreponse = await pics.text()
    let divpic = document.createElement('div')
    divpic.innerHTML = picsreponse;


    let img = divpic.getElementsByTagName('a');
    let picarray = []
    for (let index = 0; index < img.length; index++) {
        const element = img[index].href;
        if (element.endsWith(".jpeg")) {
            picarray.push(new URL(element).pathname)

        }
    }
    // console.log(picarray);

    return picarray;
}


let playmusic = (track, paused = false) => {
    currentsong.src = `song/${curfolder}/` + decodeURI(track)

    if (!paused) {

        currentsong.play().catch((error) => {
            console.error("The error is :", error)

        })

    }

    document.querySelector(".songinfo marquee").innerHTML = decodeURI(track);
    document.querySelector(".songtime ").innerHTML = "00:00 / 00:00";


}

async function main() {
    pics = await picsreturn("nfak");
    songs = await getsong("nfak");
    playmusic(songs[0], true)


    try {
        //***************** */ Attach an event listner to each song*********************************
        let play = document.querySelector("#play")


        currentsong.addEventListener('play', () => {
            play.querySelector("svg path").setAttribute("d", "M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z");
        });

        currentsong.addEventListener('pause', () => {
            play.querySelector("svg path").setAttribute("d", "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z");
        });

        currentsong.addEventListener('ended', () => {
            play.querySelector("svg path").setAttribute("d", "M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z");
            let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
            let length = songs.length
            if ((index + 1) < length) {
                playmusic(songs[index + 1]);
            } else {
                playmusic(songs[0]);
            }
        });
        // ****************************************controls ***********************************************
        play.addEventListener("click", () => {
            if (currentsong.paused) {
                currentsong.play();

            }
            else {
                currentsong.pause();
            }
        })

        currentsong.addEventListener("timeupdate", () => {

            document.querySelector(".songtime").innerHTML = `${convertToMMSS(currentsong.currentTime)} / ${convertToMMSS(currentsong.duration)}`;
            document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        })
        document.querySelector(".seekbar").addEventListener("click", (e) => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            currentsong.currentTime = ((currentsong.duration) * percent) / 100;
        })

        //********************************************* */ Aside*******************************************************************
        document.querySelector(".side-icon").addEventListener("click", () => {
            document.querySelector("aside").style.left = "0";
            document.querySelector(".side-icon").style.left = "-478px";
            document.querySelector(".library").style.left = "0";
        })
        document.querySelector(".btn2").addEventListener("click", () => {
            document.querySelector("aside").style.left = "-564px";
            document.querySelector(".library").style.left = " -130px";
            document.querySelector(".side-icon").style.left = "165px";
        })

        let back = document.querySelector("#back")
        let next = document.querySelector("#next")
        back.addEventListener("click", () => {
            console.log(currentsong.src.split("/").slice(-1)[0]);

            let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
            if ((index - 1) >= 0) {
                playmusic(songs[index - 1])
            }
        })
        next.addEventListener("click", () => {
            console.log(currentsong.src.split("/").slice(-1)[0]);
            console.log("next clicked");
            let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
            let length = songs.length
            if ((index + 1) < length) {
                playmusic(songs[index + 1])
            }
        })
        document.querySelector(".three_line").addEventListener("click", () => {

            document.querySelector(".tablet_menu").style.right = "0px"
        })
        document.querySelector(".tablet_menu button").addEventListener("click", () => {

            document.querySelector(".tablet_menu").style.right = "-254px"
        })
        document.querySelector(".range").addEventListener("change", (e) => {
            console.log("setting volume of ", e.target.value, "/100");
            currentsong.volume = parseInt(e.target.value) / 100
        })
    } catch (error) {
        console.error("The Error is : ", error)
    }


    // Attach click event listeners to each card**********************************************************************
    Array.from(document.getElementsByClassName("r-card")).forEach((e) => {
        e.addEventListener("click", async (item) => {
         let folder = item.currentTarget.dataset.folder;
          console.log("Folder selected:", folder);
         
            
          
            pics = await picsreturn(folder); // update pics for the selected folder
            songs = await getsong(folder);   // update songs and related playlist
            playmusic(songs[0], true);       // optionally, load first song paused
            console.log(songs)

            console.log(e.querySelector("p").innerHTML);
            const songname_from_html_tag = e.querySelector("p").innerHTML.trim().toLowerCase();

            let matching_song = songs.find(song => {
                const cleand_song_name = decodeURI(song).replace(".mp3", " ").trim().toLowerCase();
                console.log("cleand song : ", cleand_song_name);

                return cleand_song_name === songname_from_html_tag;
            });
            if (matching_song) {

                console.log("songname", songname_from_html_tag);

                playmusic(matching_song, false); // Play the selected song
            }
            else {
                console.log(songname_from_html_tag, "Song not found in the playlist.");
                playmusic(songs[0], true); // Fallback to the first song if not found
            }
        });
    })

    // Attach click event listeners to the artist list
    document.querySelector(".sec-head").getElementsByTagName("li")[0].lastElementChild.addEventListener("click", () => {
        document.querySelector(".artist_list").style.display = "block";
        document.querySelector(".card").style.display = "none";
    })

    document.querySelector(".sec-head").getElementsByTagName("li")[0].firstElementChild.addEventListener("click", () => {
        document.querySelector(".artist_list").style.display = "none";
        document.querySelector(".card").style.display = "block";
    })

    // *************** music list click event listener ****************
    document.querySelector("#all").addEventListener("click", () => {
        let all = document.querySelector("#all")
        let music = document.querySelector("#music")

        all.style.backgroundColor = "white";
        all.style.color = "black";
        music.style.backgroundColor = "#2d2d2d";
        music.style.color = "white";
        document.querySelector(".music").style.display = "none";
        document.querySelector(".All").style.display = "block";
    })
    document.querySelector("#music").addEventListener("click", (e) => {
        let all = document.querySelector("#all")
        let music = document.querySelector("#music")
        music.style.backgroundColor = "white";
        music.style.color = "black";
        all.style.backgroundColor = "#2d2d2d";
        all.style.color = "white";
        document.querySelector(".music").style.display = "flex";
        document.querySelector(".All").style.display = "none";
        document.querySelector(".music").addEventListener("click", (event) => {
           
            if(event.target.style.color === "white"){
                event.target.style.color = "1db954";
            }
            else {
                event.target.style.color = "";
            }
    
            // Extract the song name from the clicked element
            const songName = event.target.textContent.trim().split(": ")[1];
            console.log("Clicked song name:", songName);
            playmusic(songName, false);
        })
    })
}
main();




















