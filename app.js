/*navbar handlebar*/

document.getElementById('html_navbar_toggle')
  .addEventListener('click', function () {
    document.getElementById('ul_menu').classList.toggle('active');
  })


// Get modal element
var modal = document.getElementById("modal_div");
var modalButton = document.getElementById("quote_button");
//Events
//Listen For open modal
modalButton.addEventListener("click", openModal);
//Function to open modal
function openModal() {
  modal.style.display = "block";

  //Random Quote machine
  var randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
  document.getElementById('modal_p').innerHTML = randomQuote;
}
//Listen for close modal on outside modal div
window.addEventListener("click", closeModal);
//Function to close modal
// make sure that the target is the modal
function closeModal(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
}

/*
random quote array
*/
let quoteArray = [
  'Trick the type of guy to have his first words to his parents are “BIGGEST MISTAKE OF YOUR LIFE”',
  'Trick the type of guy to moan when the barber brushes off the back of his neck',
  'Trick the type of guy to go swimming in his bathtub',
  'Trick the type of guy to go to the circus and yell "DO IT AGAIN" when a stunt goes wrong',
  'Trick the type of guy to open his task manager and yell MULTIPLE APPLICATIONS!',
  'Trick the type of guy to say U DEAD when he sees a ghost',
  'Trick the type of guy would visit his grandma in the hospital for that STROKE GAMEPLAY',
  'Trick the type of guy who screams WHO NEXT at a funeral',
  'Trick the type of guy to cancel a doctors appointment cuz he’s sick',
  'Trick the type of guy who makes you believe he is bronze and challenger in the same game',
  'Trick the type of dude to steal a blind man"s cane and say WALK IT OUT',
  'Trick the type of dude to pay his bills then ask for a refund',
  'Trick the type of guy who finishes his apology letter with triple dot just to disrespect'
];

/*
Global variables and constants
*/


const key = 'AIzaSyDKxuIPPLYh9lxuLXlVhzStyqHAWvl6IdE';
const playlistId = 'UUuSrv3qgQA7SSi6R9bWag5A';
var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

const options = {
  playlistId: playlistId,
  maxResults: 50,
  key: key,
  part: 'snippet'
};


/* 
HTTP request
*/
URL += '?' + Object.keys(options).map((k) => k + '=' + encodeURIComponent(options[k])).join('&');

fetch(URL)
  .then(res => res.json())
  .then(function (data) {
    let mainVideoID;
    mainVideoID = data.items[0].snippet.resourceId.videoId;
    renderPlaylist(data);
    renderMainVideo(mainVideoID);
  });

/*
Render main video
 */
function renderMainVideo(mainVideoID) {
  document.getElementById('youtube_feed').innerHTML = `
        <iframe width="1280" height="720" src="https://www.youtube.com/embed/${mainVideoID}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}




/*
Render Playlist
*/
function renderPlaylist(data) {
  // console.log(data.items.length); 

  //let's try loop through the array using for loop
  for (let i = 1; i < data.items.length; i++) {
    var thumbnail = data.items[i].snippet.thumbnails.medium.url;
    var title = data.items[i].snippet.title.substring(0, 80);
    var videoID = data.items[i].snippet.resourceId.videoId;
    var desc = data.items[i].snippet.description.substring(0, 80);


    document.getElementById('youtube_playlist').innerHTML += `
      <div class="individual_list_item" data-key = "${videoID}">
      <img src="${thumbnail}" alt="video_thumbnail_placeholder" class="thumbnails">
      <div class="details">
        <p class="playlist_titles">${title}</p>
        <p class="playlist_desc">${desc}</p>
      </div>
        
    </div>
      `;
  }
}

/*
Call back function for the click event
*/

/* every time you click the video, you want to get the videoID of that specific video */

document.getElementById('youtube_playlist')
  .addEventListener('click', function (event) {
    const target = event.target;

    let mainVideoID_forclick;
    if (event.target.dataset.key) {
      mainVideoID_forclick = event.target.dataset.key;
      renderMainVideo(mainVideoID_forclick);
    } else {
      mainVideoID_forclick = event.target.parentElement.dataset.key;
      renderMainVideo(mainVideoID_forclick);
    }
  })