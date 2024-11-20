// enemy.js
class Enemy {
  constructor(x, y, health, speed, attackChance) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = speed;
    this.attackChance = attackChance;
    this.element = this.createEnemyElement(); // HTML 요소 생성
  }

  createEnemyElement() {
    const enemyElement = document.createElement('div');
    enemyElement.classList.add('enemy');
    enemyElement.style.left = `${this.x}px`;
    enemyElement.style.top = `${this.y}px`;
    document.body.appendChild(enemyElement);
    return enemyElement;
  }

  move(playerX, playerY) {
  }

  attack() {
    // 적의 공격 함수: 기본적으로 0.5초마다 공격
    const enemyBullet = document.createElement('div');
    enemyBullet.classList.add('enemy-bullet');
    enemyBullet.style.left = `${this.x + 25}px`;
    enemyBullet.style.top = `${this.y + 50}px`;
    document.body.appendChild(enemyBullet);
    
    // 발사체 이동
    function moveEnemyBullet() {
      enemyBullet.style.top = `${enemyBullet.offsetTop + 5}px`;
      if (enemyBullet.offsetTop > window.innerHeight) {
        enemyBullet.remove();
        clearInterval(bulletInterval);
      }
    }
    
    const bulletInterval = setInterval(moveEnemyBullet, 20);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.element.remove();
    clearInterval(this.shootInterval); // 공격 정지
  }
}

class ChargingEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 1, 2, 0); // Stage1 적은 체력 1, 속도 2
  }

  // 이동이나 공격을 덮어쓸 수도 있음
  move(playerX, playerY) {
       // 기본적인 적의 이동: 플레이어를 향해 이동하는 예시
       const dx = playerX - this.x;
       const dy = playerY - this.y;
       const distance = Math.sqrt(dx * dx + dy * dy);
       const unitX = dx / distance;
       const unitY = dy / distance;
   
       this.x += unitX * this.speed;
       this.y += unitY * this.speed;
   
       this.element.style.left = `${this.x}px`;
       this.element.style.top = `${this.y}px`;
  }
}

// 적의 체력 감소 및 제거 처리
function checkBulletCollision(enemy, bullet) {
  const enemyRect = enemy.element.getBoundingClientRect();
  const bulletRect = bullet.getBoundingClientRect();
  
  // 충돌 검사
  if (
    bulletRect.left < enemyRect.right &&
    bulletRect.right > enemyRect.left &&
    bulletRect.top < enemyRect.bottom &&
    bulletRect.bottom > enemyRect.top
  ) {
    enemy.takeDamage(1); // 총알 맞고 체력 1 감소
    bullet.remove(); // 총알 제거
  }
}
