// enemy.js
const scoreContainer = document.getElementById("scoreContainer");
let currentscore = 0;

class Enemy {
  constructor(x, y, health, speed, attackChance, bulletSpeed, attackSpeed, score) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = speed;
    this.attackChance = attackChance;
    this.attackSpeed = attackSpeed;
    this.score = score;
    this.bulletSpeed = bulletSpeed;
    this.element = this.createEnemyElement(); // HTML 요소 생성
    this.collisionInterval = setInterval(() => this.checkCollision(), 10);
    this.attackInterval = setInterval(()=> this.attack(), attackSpeed);
    this.moveInterval = setInterval(() => this.move(), 10);
  }

  createEnemyElement() {
    const enemyElement = document.createElement('div');
    enemyElement.classList.add('enemy');
    enemyElement.style.left = `${this.x}px`;
    enemyElement.style.top = `${this.y}px`;
    document.body.appendChild(enemyElement);
    return enemyElement;
  }

  move() {
  }

  attack() {

    if (Math.random() > this.attackChance || isPaused){
      return;
    }
      
    // 적의 공격 함수: 기본적으로 0.5초마다 공격
    const enemyBullet = document.createElement('div');
    enemyBullet.classList.add('enemy-bullet');
    enemyBullet.style.left = `${this.x + 25}px`;
    enemyBullet.style.top = `${this.y + 50}px`;
    document.body.appendChild(enemyBullet);
    
    // 발사체 이동
    const moveEnemyBullet = () => {
      if (isPaused){
        return;
      }
      enemyBullet.style.top = `${enemyBullet.offsetTop + this.bulletSpeed}px`;
      if (enemyBullet.offsetTop > window.innerHeight) {
        enemyBullet.remove();
        clearInterval(bulletInterval);
      }
    };
    
    const bulletInterval = setInterval(moveEnemyBullet, 20);
  }
  checkCollision() {
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach((bullet) => {
      const bulletRect = bullet.getBoundingClientRect();
      const enemyRect = this.element.getBoundingClientRect();
      
      // 충돌 조건 확인
      if (
        bulletRect.left < enemyRect.right &&
        bulletRect.right > enemyRect.left &&
        bulletRect.top < enemyRect.bottom &&
        bulletRect.bottom > enemyRect.top
      ) {
        this.takeDamage(1); // 적 체력 감소
        bullet.remove(); // 총알 제거
      }
    });
  }
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      currentscore += this.score;
      scoreContainer.innerText = `Score: ${currentscore}`;
      this.die();
    }
  }

  die() {
    this.element.remove();
    clearInterval(this.collisionInterval);
    clearInterval(this.attackInterval);
    clearInterval(this.moveInterval);
    const index = enemies.indexOf(this);
  if (index > -1) {
    enemies.splice(index, 1);
    }
  }
}

class ChargingEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 1, 2, 0, 5, 1000, 100); // Stage1 적은 체력 1, 속도 2
    this.element.classList.add("charging-enemy");
  }

  move() {
    if (isPaused) {
      return;
    }
    // 플레이어의 위치를 가져옴
    const playerRect = player.getBoundingClientRect();
    const playerX = playerRect.left + playerRect.width / 2; // 플레이어 중심 X 좌표
    const playerY = playerRect.top + playerRect.height / 2; // 플레이어 중심 Y 좌표
  
    // 적이 플레이어를 향해 이동
    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    // 단위 방향 벡터 계산
    const unitX = dx / distance;
    const unitY = dy / distance;
  
    // 이동 방향에 따라 회전 각도를 계산
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // radian to degrees
  
    // 회전 적용 (이미지 회전)
    this.element.style.transform = `rotate(${angle}deg)`;
  
    // 속도를 적용해 위치 이동
    this.x += unitX * this.speed;
    this.y += unitY * this.speed;
  
    // 화면 상 위치 업데이트
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  
}

class CrossEnemy extends Enemy{
  constructor(x, y){
    super(x, y, 1, 2, 1, 5, 600, 150); // Stage1 적은 체력 2, 속도 1
    this.element.classList.add("cross-enemy");

    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = 1; // 아래로 이동
  }

  move() {
    if (isPaused){
      return;
    }
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    // 좌우 벽에 충돌 시 방향 반전
    if (this.x <= 0) {
      this.directionX = 1; // 오른쪽으로 반전
    } else if (this.x + this.element.offsetWidth >= window.innerWidth) {
      this.directionX = -1; // 왼쪽으로 반전
    }

    // 화면 상 위치 업데이트
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    // 아래로 이동한 적이 화면 밖으로 나가면 제거
    if (this.y >= window.innerHeight) {
      this.die();
    }
  }
}

class StraightEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 2, 1, 1, 5, 1000, 200); // 체력 2, 속도 1
    this.element.classList.add("straight-enemy");
  }

  move() {
    if (isPaused) {
      return;
    }

    // 아래로 이동
    this.y += this.speed;

    // 화면 상 위치 업데이트
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    // 화면 아래로 나가면 제거
    if (this.y >= window.innerHeight) {
      this.die();
    }
  }
}

class ChargingEnemy2 extends Enemy {
  constructor(x, y) {
    super(x, y, 2, 3, 0, 5, 1000, 300); // Stage1 적은 체력 1, 속도 2
    this.element.classList.add("charging-enemy");
  }

  move() {
    if (isPaused) {
      return;
    }
    // 플레이어의 위치를 가져옴
    const playerRect = player.getBoundingClientRect();
    const playerX = playerRect.left + playerRect.width / 2; // 플레이어 중심 X 좌표
    const playerY = playerRect.top + playerRect.height / 2; // 플레이어 중심 Y 좌표
  
    // 적이 플레이어를 향해 이동
    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    // 단위 방향 벡터 계산
    const unitX = dx / distance;
    const unitY = dy / distance;
  
    // 이동 방향에 따라 회전 각도를 계산
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // radian to degrees
  
    // 회전 적용 (이미지 회전)
    this.element.style.transform = `rotate(${angle}deg)`;
  
    // 속도를 적용해 위치 이동
    this.x += unitX * this.speed;
    this.y += unitY * this.speed;
  
    // 화면 상 위치 업데이트
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  
}

class CrossEnemy2 extends Enemy{
  constructor(x, y){
    super(x, y, 2, 3, 1, 7, 550, 500); // Stage1 적은 체력 2, 속도 1
    this.element.classList.add("cross-enemy");

    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = 1; // 아래로 이동
  }

  move() {
    if (isPaused){
      return;
    }
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    // 좌우 벽에 충돌 시 방향 반전
    if (this.x <= 0) {
      this.directionX = 1; // 오른쪽으로 반전
    } else if (this.x + this.element.offsetWidth >= window.innerWidth) {
      this.directionX = -1; // 왼쪽으로 반전
    }

    // 화면 상 위치 업데이트
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    // 아래로 이동한 적이 화면 밖으로 나가면 제거
    if (this.y >= window.innerHeight) {
      this.die();
    }
  }
}

class StraightEnemy2 extends Enemy {
  constructor(x, y) {
    super(x, y, 4, 2, 1, 7, 850, 700); // 체력 2, 속도 1
    this.element.classList.add("straight-enemy");
  }

  move() {
    if (isPaused) {
      return;
    }

    // 아래로 이동
    this.y += this.speed;

    // 화면 상 위치 업데이트
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    // 화면 아래로 나가면 제거
    if (this.y >= window.innerHeight) {
      this.die();
    }
  }
}