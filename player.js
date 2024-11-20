    const player = document.getElementById("player");
    const pauseOverlay = document.getElementById("pauseOverlay");
    const moveDistance = 4;
    const keys = {};
    let isPaused = false;
    let enemies = [];

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
  
      setInterval(updatePosition, 10);