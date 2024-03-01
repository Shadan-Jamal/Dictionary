const search_btn=document.getElementById('search-btn');
const word_input=document.getElementById('enter-word');
const entire_content=document.getElementById('result-area');
const audio = document.getElementsByTagName('audio')[0];

//searching a word
search_btn.addEventListener( 'click', ()=>{
    let  word = word_input.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response_from_server) => response_from_server.json())
    .then((data_received) => {
        console.log(data_received)

        entire_content.innerHTML=
        `<div class="col-9">
            <h4 class="text-start text-capitalize fw-medium fs-3">${word}</h4>
        </div>
        <div class="col-3" id="audio-icon">
            <i class="bi bi-volume-off-fill" onclick="playvoice()"></i>    
        </div>
        </div>
        <div class="row d-flex flex-row mb-4">
        <div class="col-6 pb-0 ">
            <p class="text-start fs-6 -dark mb-0">
            ${data_received[0].meanings[0].partOfSpeech} , ${data_received[0].phonetic}
            </p>
            <p class="text-start fs-6 mt-0">Antonyms: ${data_received[0].meanings[0].antonyms} </p>
        </div>
        </div>
        
        <div class="row mb-2" id="content-bar">
        <div class="col-12">
            <p class="ms-2 ps-3 text-start text-wrap fs-5 lh-base fw-lighter text-break">
                1. ${data_received[0].meanings[0].definitions[0].definition}<br>    
                2. ${data_received[0].meanings[1].definitions[0].definition}    
            </p>
        </div>`;
        audio.setAttribute("src", 
        data_received[0].phonetics[0].audio || data_received[0].phonetics[1].audio ||
        data_received[0].phonetics[2].audio || data_received[0].phonetics[3].audio)
    })
    .catch((error) =>{
        
    })
});

function playvoice(){
   let audio_icon=document.getElementById('audio-icon');
    audio_icon.innerHTML='<i class="bi bi-volume-up-fill" onclick="playvoice()"></i>';
    audio.play();
}
