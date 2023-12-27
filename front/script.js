let score = 0;
let timer = 0;

document.querySelectorAll('.cell').forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

document.querySelector('.grid').addEventListener('dragover', dragOver);
document.querySelector('.grid').addEventListener('drop', dragDrop);

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  const id = e.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  if (draggableElement.classList.contains('cell')) {
    e.target.appendChild(draggableElement);
    score++;
    document.getElementById('score').innerText = score;
    if (score === 9) {
      clearInterval(timerInterval);
      alert('You won!');
    }
  }
  if (time === 10) {
    clearInterval(timerInterval);
    alert('You lose!');
  }
}

const timerInterval = setInterval(() => {
  timer++;
  document.getElementById('timer').innerText = timer;
}, 1000);