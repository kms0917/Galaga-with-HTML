// game1.js
let stage = 1;
const spawnProbabilities = 0.9;

const enemies = []; // 적들이 저장될 배열

function spawnEnemy() {
    if (isPaused) {
        return;
    }
  if (Math.random() < spawnProbabilities) {
    const x = Math.random() * window.innerWidth;
    const y = 0; // 화면 상단에 적이 스폰됨
    const newEnemy = new ChargingEnemy(x, y);
    enemies.push(newEnemy);
  }
}

setInterval(spawnEnemy, 2000); // 2초마다 스폰
