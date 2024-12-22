const data = {}; // 사용자 단어 데이터

// 단어 등록
function registerWord() {
  const page = document.getElementById("pageNumber").value;
  const word = document.getElementById("word").value;
  const meaning = document.getElementById("meaning").value;

  if (!page || !word || !meaning) {
    alert("모든 필드를 입력해주세요!");
    return;
  }

  if (!data[page]) data[page] = [];
  data[page].push({ word, meaning });

  alert("단어가 등록되었습니다!");
  displayPages(); // 페이지 버튼 갱신
}

// 무작위 단어 보기
function shuffleAndDisplayWords(count) {
  const allWords = Object.values(data).flat();
  const shuffled = allWords.sort(() => Math.random() - 0.5).slice(0, count);

  const display = document.getElementById("randomWords");
  display.innerHTML = shuffled
    .map(word => `<div>${word.word} - ${word.meaning}</div>`)
    .join("");
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
    .map(word => `<div>${word.word} - ${word.meaning}</div>`)
    .join("");
}
