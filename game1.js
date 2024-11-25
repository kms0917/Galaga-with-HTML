// game1.js
let stage = 1;
const spawnProbabilities = 0.9;

const enemies = []; // 적들이 저장될 배열
const obstacles = [];

function spawnEnemy() {
    if (isPaused) {
        return;
    }
  if (Math.random() <= spawnProbabilities) {
    const x = Math.random() * window.innerWidth;
    const y = 0; // 화면 상단에 적이 스폰됨
    const newEnemy = new ChargingEnemy(x, y);
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
    const obstacle = new WaveObstacle(x, y);
    obstacles.push(obstacle);
  }
  
  // 일정 시간마다 장애물 생성
  setInterval(spawnObstacle, 2000);

setInterval(spawnEnemy, 2000); // 2초마다 스폰
