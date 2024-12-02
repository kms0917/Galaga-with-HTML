// obstacle.js
class Obstacle {
    constructor(x, y, speed) {
      this.x = x; // 장애물의 x 좌표
      this.y = y; // 장애물의 y 좌표
      this.speed = speed; // 장애물의 이동 속도
      this.element = this.createObstacleElement(); // HTML 요소 생성
      this.collisionInterval = setInterval(() => this.checkCollision(), 10);
      this.moveInterval = setInterval(() => this.move(), 10);
    }
  
    // 장애물 요소 생성
    createObstacleElement() {
      const obstacleElement = document.createElement('div');
      obstacleElement.classList.add('obstacle');
      obstacleElement.style.left = `${this.x}px`;
      obstacleElement.style.top = `${this.y}px`;
      document.body.appendChild(obstacleElement);
      return obstacleElement;
    }
  
    // 장애물이 아래쪽으로 움직이게 함
    move() {
    }

    checkCollision() {
        const bullets = document.querySelectorAll(".bullet");
        bullets.forEach((bullet) => {
          const bulletRect = bullet.getBoundingClientRect();
          const obstacleRect = this.element.getBoundingClientRect();
          
          // 충돌 조건 확인
          if (
            bulletRect.left < obstacleRect.right &&
            bulletRect.right > obstacleRect.left &&
            bulletRect.top < obstacleRect.bottom &&
            bulletRect.bottom > obstacleRect.top
          ) {
            bullet.remove(); // 총알 제거
          }
        });
      }
  
    // 장애물 제거
    destroy() {
      this.element.remove(); // HTML 요소 제거
      clearInterval(this.moveInterval); // 이동 타이머 정지
      const index = obstacles.indexOf(this);
      if (index > -1) {
        obstacles.splice(index, 1); // 배열에서 제거
      }
    }
  }
  
  // 장애물 자식 클래스: FallingRock
  class WaveObstacle extends Obstacle {
    constructor(x, y) {
      super(x, y, 3); // 기본 속도 3으로 설정
      this.element.classList.add("wave-obstacle");
    }
  
    // 필요하다면 추가 동작 정의
    move() {
        if (isPaused) {
            return;
          }
          this.y += this.speed; // 속도를 적용하여 아래로 이동
          this.element.style.top = `${this.y}px`;
      
          // 화면 아래 끝에 닿으면 제거
          if (this.y > window.innerHeight) {
            this.destroy();
          }
      this.x += Math.sin(Date.now() / 100) * 0.5; // 가로로 살짝 흔들림
      this.element.style.left = `${this.x}px`;
    }
  }  

  class FallingRock extends Obstacle {
    constructor(x, y) {
      super(x, y, 4); // 기본 속도 3으로 설정
      this.element.classList.add("falling-obstacle");
    }
  
    // 필요하다면 추가 동작 정의
    move() {
        if (isPaused) {
            return;
          }
          this.y += this.speed; // 속도를 적용하여 아래로 이동
          this.element.style.top = `${this.y}px`;
      
          // 화면 아래 끝에 닿으면 제거
          if (this.y > window.innerHeight) {
            this.destroy();
          }
    }
  }