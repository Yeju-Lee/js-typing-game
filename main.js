'use strict';

// 변수 정의
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
let isPlaying = false;
let score = 0;
let words = [];
// 하드코딩
// words = ['apple', 'banana', 'candy', 'dessert', 'elephant', 'flower', 'grass', 'highway'];
const GAME_TIME = 6;
let time = GAME_TIME;
let timeInterval;
let checkInterval;

// 함수 정의 : 입력값과 제시된 단어가 같은지 체크
function checkMatch() {
  if (wordInput.value === wordDisplay.innerText) {
    wordInput.value = "";
    if(!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME; // 단어가 맞는지 확인 후 시간 초기화
    // 무작위 단어 제시
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}

// 함수 정의 : 버튼체인지
function buttonChange(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

// 함수 정의 : 카운트다운
function countDown() {
  time > 0 ? time-- : isPlaying = false;
  timeDisplay.innerText = time;
  if(!isPlaying) {
    clearInterval(timeInterval);
  }
}

// 함수 정의 : 0초일 때 게임이 완료되고 재시작
function checkStatus() {
  if(!isPlaying && time === 0) {
    buttonChange('게임시작');
    clearInterval(checkInterval);
  }
}

// 함수 정의 : 
function getWords() {
  axios.get('https://random-word-api.herokuapp.com/word?number=200')
  .then(function (response) {
    // handle success
    words = response.data;
    buttonChange('게임시작');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
};

// 함수 정의 : 맨 처음부터 실행되는 로직 설정
function init() {
  buttonChange('로딩 중');
  wordInput.addEventListener('input', checkMatch);
  getWords();
}

// 함수 정의 : 게임시작 누르면 게임 시작
function run() {
  if(isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  scoreDisplay.innerText = 0;
  score = 0;
  buttonChange('게임중');
  wordInput.focus();
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
}

buttonChange('게임시작');
init();

