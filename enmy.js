function createEnemy() {
    if (isPaused) return;

    if (Math.random() > 0.3) return;

    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = `${Math.random() * (window.innerWidth - 50)}px`;

    document.body.appendChild(enemy);
    enemies.push(enemy);

    setInterval(() => enemyShoot(enemy), 1000); // 0.5초마다 발사체 발사
  }

  function enemyShoot(enemy) {
    if (isPaused || !enemy.parentNode) return;

    const enemyBullet = document.createElement("div");
    enemyBullet.classList.add("enemy-bullet");

    enemyBullet.style.left = `${enemy.offsetLeft + (enemy.offsetWidth / 2) - 5}px`;
    enemyBullet.style.top = `${enemy.offsetTop + enemy.offsetHeight}px`;

    document.body.appendChild(enemyBullet);

    function moveEnemyBullet() {
      if (isPaused) return;

      const bulletRect = enemyBullet.getBoundingClientRect();

      if (bulletRect.top > window.innerHeight) {
        enemyBullet.remove();
        clearInterval(bulletInterval);
      } else {
        enemyBullet.style.top = `${enemyBullet.offsetTop + 5}px`;
      }
    }

    const bulletInterval = setInterval(moveEnemyBullet, 20);
  }

  setInterval(createEnemy, 2000); // 2초마다 적 생성