import './style.css';

if (typeof window !== 'undefined') {
  const { hostname, protocol } = window.location;
  if (protocol === 'http:' && !/^(localhost|127.0.0.1)/.test(hostname)) {
    window.location.protocol = 'https:';
  }
}

// import typescriptLogo from "./typescript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from './counter.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>heya</h1>
  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
