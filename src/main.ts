import './style.css';
import './toggle.scss';

if (typeof window !== 'undefined') {
  const { hostname, protocol } = window.location;
  if (protocol === 'http:' && !/^(localhost|127.0.0.1)/.test(hostname)) {
    window.location.protocol = 'https:';
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1 class='font'>hello world</h1>
  </div>
`;

// Check if API exists
if (document && document.fonts) {
  // Do not block page loading
  setTimeout(function () {
    document.fonts.load('3.2em "Adobe Text Pro"').then(() => {
      // Make font using elements visible
      document.documentElement.classList.add('font-loaded');
    });
  }, 0);
} else {
  // Fallback if API does not exist
  document.documentElement.classList.add('font-loaded');
}

const toggle = document.getElementById('toggle') as HTMLInputElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const { documentElement, body } = document;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  toggle.checked = true;
  documentElement.classList.toggle('light-theme');
} else if (toggle != null && (currentTheme === 'dark' || prefersDarkScheme.matches)) {
  toggle.checked = false;
  documentElement.classList.toggle('dark-theme');
}

toggle.addEventListener('input', (_e: Event) => {
  if (prefersDarkScheme.matches) {
    documentElement.classList.toggle('light-theme');
  } else {
    documentElement.classList.toggle('dark-theme');
  }
  // const isChecked = (e.target as HTMLInputElement)!.checked;
  const isChecked = toggle!.checked;
  const theme = isChecked ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});

window.addEventListener('load', () => {
  body.classList.remove('preload');
});

const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.has('debug') || (urlParams.get('debug')?.toLowerCase() || '') === 'true';

if (debug) {
  const { GUI } = await import('lil-gui');
  const gui = new GUI({ title: 'controls' });
  gui.domElement.id = 'gui-main';
  gui.add({ fn: () => gui.hide() }, 'fn').name('❌ close');

  const htmlStyle = getComputedStyle(document.documentElement);
  const { backgroundColor, background, backgroundImage } = htmlStyle;
  console.log('background', background);
  console.log('backgroundColor', backgroundColor);
  console.log('backgroundImage', backgroundImage);
  gui.addColor({ backgroundColor }, 'backgroundColor').onChange((color: string) => {
    document.documentElement.style.backgroundColor = `${color}`;
    console.log('backgroundColor', color);
  });
  gui.add({ value: 0 }, 'value', 0, 100);
}
