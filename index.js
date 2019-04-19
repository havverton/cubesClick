var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

var score = 0;
var isGameStarted = false;


function startGame() {
    score = 0;  //обнуление счётчика
    show($timeHeader);
    hide($resultHeader);
    setGameTime();
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true;
  $game.style.backgroundColor = '#fff'
  hide($start)
    
    var interval = setInterval(function(){
        var time = parseFloat($time.textContent)
        
        if (time <= 0){
           clearInterval(interval)
           endGame();
        }else{
           $time.textContent = (time - 0.1).toFixed(1);
        }   
    }, 100)
    
  renderBox()
}

function setGameScore(){
    $result.textContent = score.toString();
}

function setGameTime(){
    var time = +$gameTime.value;
    $time.textContent = time.toFixed(1); 
}

function endGame(){
    isGameStarted = false;
    setGameScore();
    show($start);
    $game.innerHTML = " ";
    $game.style.backgroundColor = "#ccc";
    hide($timeHeader);
    show($resultHeader);
    $gameTime.removeAttribute('disabled')
}

function handleBoxClick(event){
    if (!isGameStarted){
        return
        
        }
    if (event.target.dataset.box){  //проверка кликнули ли мы на квадрат
        score++
        renderBox();
    }
}

//функция случайных цветов
function getRandomColor(){
    var colors = ["#FF0000", "#0000FF" , "#FFFF00" , "#F5DEB3" , "#32CD32"];
    return colors[getRandom(1,5)];
}

function renderBox() {
    $game.innerHTML = ' '; //очистка поля
    var box = document.createElement('div'); //создаем квадрат
    var boxSize = getRandom(30, 100); //получаем значение случайного размера
    var gameSize = $game.getBoundingClientRect(); // проверяем наразмерность поля
    var maxTop = gameSize.height - boxSize; //определяем допустимые значения по вертикали
    var maxLeft = gameSize.width - boxSize; //получаем допустимые положения по горизонтали
    
    box.style.height = box.style.width = boxSize +'px';  //задаем случайный размер
    box.style.position = 'absolute'; 
    box.style.backgroundColor = getRandomColor(); //рандом цвет
    box.style.top = getRandom(0, maxTop)+ 'px'; //опредляем положение
    box.style.left = getRandom(0, maxLeft) + 'px'; //определяем положение по горизонтали
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');
        
    $game.insertAdjacentElement('afterbegin', box )
}

//берём рандом
function getRandom(min, max){
    return Math.floor(Math.random() * (max-min) + min);
    
}

//функции для показа и скрытия элементов
function show($el){
    $el.classList.remove('hide')
}

function hide($el){
    $el.classList.add('hide')
}
