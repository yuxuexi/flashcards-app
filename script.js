const data = {}; // 사용자 단어 데이터

// 섹션 보여주기
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => (section.style.display = 'none'));

  document.getElementById(sectionId).style.display = 'block';
}

// 여러 단어 등록
function registerMultipleWords() {
  const page = document.getElementById("pageNumber").value;
  const wordsInput = document.getElementById("wordsInput").value;

  if (!page || !wordsInput) {
    alert("페이지 번호와 단어를 입력해주세요!");
    return;
  }

  const words = wordsInput.split(",").map(item => {
    const [word, meaning] = item.split(":").map(str => str.trim());
    if (!word || !meaning) {
      alert("입력 형식이 잘못되었습니다. 단어:뜻 형식으로 입력하세요.");
      return null;
    }
    return { word, meaning };
  }).filter(Boolean);

  if (!data[page]) data[page] = [];
  data[page] = data[page].concat(words);

  alert(`${words.length}개의 단어가 등록되었습니다!`);
  displayPages(); // 페이지 버튼 갱신
}

// 특정 페이지 보기
function displayPages() {
  const pages = Object.keys(data).sort((a, b) => a - b);
  const pageButtons = document.getElementById("pageButtons");
  pageButtons.innerHTML = pages
    .map(page => `<button onclick="viewPage(${page})">페이지 ${page}</button>`)
    .join("");
}

function viewPage(page) {
  const words = data[page] || [];
  const display = document.getElementById("pageWords");

  display.innerHTML = words
    .map(
      (word, index) =>
        `<button class="word-button" onclick="showWord(${page}, ${index})">
          ${word.word} 또는 ${word.meaning}
        </button>
        <div id="word-${page}-${index}" class="word-detail" style="display: none;">
          <strong>${word.word}</strong> - ${word.meaning}
        </div>`
    )
    .join("");
}

function showWord(page, index) {
  const detail = document.getElementById(`word-${page}-${index}`);
  detail.style.display = detail.style.display === "none" ? "block" : "none";
}

// 무작위 단어 보기
function shuffleAndDisplayWords(count) {
  const allWords = Object.values(data).flat();
  const shuffled = allWords.sort(() => Math.random() - 0.5).slice(0, count);

  const display = document.getElementById("randomWords");
  display.innerHTML = shuffled
    .map(
      (word, index) =>
        `<button class="word-button" onclick="showRandomWord(${index})">
          ${word.word} 또는 ${word.meaning}
        </button>
        <div id="random-word-${index}" class="word-detail" style="display: none;">
          <strong>${word.word}</strong> - ${word.meaning}
        </div>`
    )
    .join("");
}

function showRandomWord(index) {
  const detail = document.getElementById(`random-word-${index}`);
  detail.style.display = detail.style.display === "none" ? "block" : "none";
}
