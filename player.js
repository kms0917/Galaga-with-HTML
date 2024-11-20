    const player = document.getElementById("player");
    const pauseOverlay = document.getElementById("pauseOverlay");
    const moveDistance = 4;
    const keys = {};
    let isPaused = false;
    let playerHealth = 3; // 플레이어 초기 체력

    // 체력 표시 업데이트 함수
    function updateHealthDisplay() {
      healthContainer.innerHTML = ""; // 기존 하트 초기화
      for (let i = 0; i < playerHealth; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        healthContainer.appendChild(heart);
      }
    }
    
    // 초기 체력 표시
    updateHealthDisplay();
    // 키 이벤트 리스너 추가
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        togglePause();
      } else {
        keys[event.key.toLowerCase()] = true;
        if (!isPaused && event.key === " ") {
          shootBullet();
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      keys[event.key.toLowerCase()] = false;
    });

    function updatePosition() {
      if (isPaused) return;

      const playerRect = player.getBoundingClientRect();

      if (keys["w"] && playerRect.top > 0) {
        player.style.top = `${player.offsetTop - moveDistance}px`;
      }
      if (keys["a"] && playerRect.left > 0) {
        player.style.left = `${player.offsetLeft - moveDistance}px`;
      }
      if (keys["s"] && playerRect.bottom < window.innerHeight) {
        player.style.top = `${player.offsetTop + moveDistance}px`;
      }
      if (keys["d"] && playerRect.right < window.innerWidth) {
        player.style.left = `${player.offsetLeft + moveDistance}px`;
      }
    }

    function shootBullet() {
      if (isPaused) return;

      const bullet = document.createElement("div");
      bullet.classList.add("bullet");

      bullet.style.left = `${player.offsetLeft + (player.offsetWidth / 2) - 27}px`;
      bullet.style.top = `${player.offsetTop - 20}px`;

      document.body.appendChild(bullet);

      function moveBullet() {
        if (isPaused) return;

        const bulletRect = bullet.getBoundingClientRect();

        if (bulletRect.bottom < 0) {
          bullet.remove();
          clearInterval(bulletInterval);
        } else {
          bullet.style.top = `${bullet.offsetTop - 10}px`;
        }
      }

      const bulletInterval = setInterval(moveBullet, 10);
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const enemyBullets = document.querySelectorAll(".enemy-bullet");
      
        // 적의 발사체와 플레이어 충돌 확인
        enemyBullets.forEach((bullet) => {
          const bulletRect = bullet.getBoundingClientRect();
      
          // 충돌 조건 검사
          if (
            bulletRect.left < playerRect.right &&
            bulletRect.right > playerRect.left &&
            bulletRect.top < playerRect.bottom &&
            bulletRect.bottom > playerRect.top
          ) {
            bullet.remove(); // 발사체 제거
            playerHealth--; // 체력 감소
            updateHealthDisplay();
      
            if (playerHealth <= 0) {
              gameOver();
            }
          }
        });
      
        // 적과 플레이어 충돌 확인
        enemies.forEach((enemy, index) => {
          const enemyRect = enemy.getBoundingClientRect();
      
          // 충돌 조건 검사
          if (
            enemyRect.left < playerRect.right &&
            enemyRect.right > playerRect.left &&
            enemyRect.top < playerRect.bottom &&
            enemyRect.bottom > playerRect.top
          ) {
            removeEnemy(enemy, index);
            playerHealth--; // 체력 감소
            updateHealthDisplay();
      
            if (playerHealth <= 0) {
              gameOver();
            }
          }
        });
      }      
      
function gameOver() {
    isPaused = true; // 게임을 일시 정지 상태로 전환
    const gameOverOverlay = document.getElementById("gameOverOverlay");
    gameOverOverlay.style.display = "flex"; // 게임 오버 화면 표시
  }
  
  // 게임 재시작
  function restartGame() {
    window.location.reload(); // 페이지를 새로고침하여 게임 재시작
  }
    function togglePause() {
        isPaused = !isPaused;
        pauseOverlay.style.display = isPaused ? "flex" : "none";
      }
  
      function resumeGame() {
        isPaused = false;
        pauseOverlay.style.display = "none";
      }
  
      function exitGame() {
        window.location.href = "index.html";
      }
      setInterval(checkCollision, 10);
      setInterval(updatePosition, 10);