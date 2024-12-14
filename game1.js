// game1.js
let stage = 1;
const spawnProbabilities = 0.9;

const enemies = []; // 적들이 저장될 배열
const enemyTypes = [CrossEnemy, StraightEnemy]; // 적의 종류를 담은 배열
const obstacles = [];
const obstacleTypes = [FallingRock];

function spawnEnemy() {
    if (isPaused) {
        return;
    }
  if (Math.random() <= spawnProbabilities) {
    const x = Math.random() * window.innerWidth;
    const y = 0; // 화면 상단에 적이 스폰됨
    const randomIndex = Math.floor(Math.random() * enemyTypes.length);
    const SelectedEnemyType = enemyTypes[randomIndex];
    const newEnemy = new SelectedEnemyType(x, y);
    enemies.push(newEnemy);
  }
}

  // 장애물 생성 예시
  function spawnObstacle() {
    if (isPaused){
      return;
    }
    const x = Math.random() * window.innerWidth; // 랜덤 x 좌표
    const y = 0; // 화면 상단에서 시작
    const randomIndex = Math.floor(Math.random() * obstacleTypes.length);
    const SelectedObstacleType = obstacleTypes[randomIndex];
    const obstacle = new SelectedObstacleType(x, y);
    obstacles.push(obstacle);
  }

  function checkGameClear() {
    if (currentscore >= 10000) {
      isPaused = true; // 게임을 일시 정지 상태로 전환
    const scores = JSON.parse(localStorage.getItem("highScore")) || [];

    const gameClearOverlay = document.getElementById("gameClearOverlay");
    const scoreInputSection = document.getElementById("scoreInputSection");
    const idInput = document.getElementById("playerIDInputClear");

    // ID 입력 창 숨기기 초기화
    scoreInputSection.style.display = "none";
    idInput.value = "";

    if (scores.length < 10 || currentscore > scores[scores.length - 1].score) {
      // 순위에 들어가는 경우
      scoreInputSection.style.display = "block"; // ID 입력 창 표시
      const playerIdInput = document.getElementById("playerIDInput");
      document.getElementById("finalScoreDisplay").innerText = currentscore;
      playerIdInput.value = myId; // 입력창에 저장된 ID를 미리 채움 
    }
    gameClearOverlay.style.display = "flex"; // Game Clear 화면 표시
    clearInterval(gameClearInterval);
    }
  }

  function saveRecordFromClearOverlay() {
    const idInput = document.getElementById("playerIDInputClear");
    const playerID = idInput.value.trim(); // 입력된 ID 가져오기
  
    if (playerID === "") {
      alert("Please enter a valid ID!");
      return false; // 저장 실패
    }
  
    const scores = JSON.parse(localStorage.getItem("highScore")) || [];
    scores.push({ id: playerID, score: currentscore });
  
    // 점수 정렬 및 상위 10개만 유지
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 10);
    localStorage.setItem("highScore", JSON.stringify(topScores));
  
    return true; // 저장 성공
  }

  function goToMain() {
    if (document.getElementById("scoreInputSection").style.display !== "none") {
      if (!saveRecordFromClearOverlay()) return; // 저장 실패 시 함수 종료
    }
    window.location.href = "index.html"; // 메인 메뉴로 이동
  }
  
  function nextStage() {
    if (document.getElementById("scoreInputSection").style.display !== "none") {
      if (!saveRecordFromClearOverlay()) return; // 저장 실패 시 함수 종료
    }
    window.location.href = "game2.html"; // 다음 스테이지로 이동
  }
  

  gameClearInterval = setInterval(checkGameClear, 50);
  // 일정 시간마다 장애물 생성
  setInterval(spawnObstacle, 1500);

setInterval(spawnEnemy, 1500);
