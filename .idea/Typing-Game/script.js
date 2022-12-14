const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for the game:
const words =[
    'grenadine','Pandemic','hefty','gladiolus','Effeminate', 'typical',
    'concretize','manikin','canvass','lubbrly', 'clumsy','unskilled', 'cordial', 'polite', 'warm', 'friendly',
    'jocular', 'characterized','jokes', 'good', 'humor','Utopian','Ecstasy', 'happiness', 'excitement',
'obbligato','part','score','performed', 'without','change','mission','woodsy','laborer','effervescence',
    'bromidic','canoodle','satrap','congeries','twain','kind', 'kittiwake', 'pearl', 'grey', 'northern',
    'bollard','ague','contemplate','Hyperbole','subsequently','massacre','civilian',
    'revered','authority','triumphantly','Pretoria','culminate','Ferdinand',
'Burmese','Beijing','Kyrgyzstan','charismatic','daw','upsurge','suffrage','minimal','insurgency',
  'Guatemala','Bangladesh', 'Kaleidoscope','Torpedo','Tapestry','Pendulum','Floccinaucinihilipilification',
];
// init word
let randomWord;

//init score
let score = 0;

//init time

let time = 10;

// set difficulty to value in ls or medium lvl
let difficulty = localStorage.getItem('difficulty') !== null?
localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null?
    localStorage.getItem('difficulty') : 'medium';

// focus on text on start

text.focus();

// start counting down
const timeInterval = setInterval(updateTime,1000);


// Generate random word from array
function getRandomWord(){
    return words [Math.floor(Math.random()* words.length)];
}

// console.log(getRandomWord())

// add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
// Update score
function  updateScore(){
    score++;
    scoreEl.innerHTML = score;
}
// update time
function updateTime(){
time--;
timeEl.innerHTML = time + 's';

if (time ===0){
    clearInterval(timeInterval);
    //endgame
    gameOver();
}
}

// game over, show end screen
function gameOver(){
    endgameEl.innerHTML =  `<h1>Time ran out </h1>` +
        `<p>Your final score is ${score} </p>` +
        `<button onclick="location.reload()">Reload</button>`;
    endgameEl.style.display = 'flex';

}
addWordToDOM()

//Event listeners

text.addEventListener('input',e=> {
    const insertedText = e.target.value;
    if (insertedText === randomWord){
        addWordToDOM();
        updateScore();

        //clear
        e.target.value = '';

   if ( difficulty === 'hard'){
       time += 2;} else if (difficulty === 'medium'){
       time += 3;} else {
       time += 5;
   }
        updateTime();

    }
});
// settings button click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change',
        e=> {difficulty = e.target.value;
localStorage.setItem('difficulty', difficulty);
});