// ID 저장 함수
let myId = "guest";

function initializeMyId() {
    const savedId = localStorage.getItem("playerId"); // 로컬 저장소에서 ID 가져오기
    if (savedId) {
      myId = savedId; // 저장된 ID로 myId 초기화
    }
  }

// ID 저장 함수
function saveId() {
    const playerIdInput = document.getElementById("playerId");
    const playerId = playerIdInput.value.trim();
  
    if (!playerId) {
        defaultId = "guest";
        localStorage.setItem("playerId", defaultId); // ID를 로컬 저장소에 저장
        alert(`ID "${defaultId}" saved successfully!`);
        playerIdInput.value = defaultId; // 입력창 초기화
      return;
    }
  
    localStorage.setItem("playerId", playerId); // ID를 로컬 저장소에 저장
    alert(`ID "${playerId}" saved successfully!`);
    playerIdInput.value = playerId; // 입력창 초기화
  }
  
  // 저장된 ID 확인 함수
  function getSavedId() {
    return localStorage.getItem("playerId") || "No ID saved";
  }
  
  initializeMyId();