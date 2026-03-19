const initialEchoes = [
  {
    message: 'I finally feel like the storm inside me is turning into weather I can name.',
    track: 'Midnight tide / ambient piano',
    arc: 'bloom',
    age: 0
  },
  {
    message: 'I miss someone I never really had, and somehow the song knows exactly what that means.',
    track: 'Static hearts / dream pop',
    arc: 'fade',
    age: 1
  },
  {
    message: 'Tonight feels soft around the edges, like my worries are dissolving into reverb.',
    track: 'Blue room / lo-fi rain',
    arc: 'drift',
    age: 2
  }
];

const phases = {
  fade: ['raw signal', 'softening', 'fading out'],
  bloom: ['raw signal', 'opening up', 'blooming'],
  drift: ['raw signal', 'loosening', 'dream drift']
};

const feed = document.getElementById('echo-feed');
const template = document.getElementById('echo-template');
const form = document.getElementById('echo-form');

const echoes = [...initialEchoes];

function getPhase(arc, age) {
  return phases[arc][Math.min(age, phases[arc].length - 1)];
}

function getPhaseClass(arc, age) {
  if (age === 0) return '';
  if (arc === 'fade') return 'phase-fading';
  if (arc === 'bloom') return 'phase-blooming';
  return 'phase-drifting';
}

function renderEchoes() {
  feed.innerHTML = '';

  echoes.forEach((echo) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector('.echo-card');
    const phase = getPhase(echo.arc, echo.age);

    card.classList.add(getPhaseClass(echo.arc, echo.age));
    node.querySelector('.echo-track').textContent = echo.track;
    node.querySelector('.echo-phase').textContent = phase;
    node.querySelector('.echo-message').textContent = `“${echo.message}”`;
    node.querySelector('.echo-arc').textContent = `${echo.arc} arc`;
    node.querySelector('.echo-timer').textContent = `stage ${echo.age + 1}/3`;

    feed.appendChild(node);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = document.getElementById('message').value.trim();
  const track = document.getElementById('track').value.trim();
  const arc = document.getElementById('arc').value;

  if (!message || !track) {
    return;
  }

  echoes.unshift({ message, track, arc, age: 0 });
  form.reset();
  renderEchoes();
});

setInterval(() => {
  echoes.forEach((echo) => {
    if (echo.age < 2) {
      echo.age += 1;
    }
  });
  renderEchoes();
}, 5000);

renderEchoes();
