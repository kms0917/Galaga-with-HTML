// game2.js
let stage = 3;
const spawnProbabilities = 1.0;

const enemies = []; // 적들이 저장될 배열
const enemyTypes = [CrossEnemy2, ChargingEnemy2, StraightEnemy2]; // 적의 종류를 담은 배열
const obstacles = [];
const obstacleTypes = [WaveObstacle, FallingRock];

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
  
  // 일정 시간마다 장애물 생성
  setInterval(spawnObstacle, 1200);

setInterval(spawnEnemy, 1000);
