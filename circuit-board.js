class CircuitBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 128px;
          height: 128px;
        }
        .circuit-board {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .line {
          position: absolute;
          background-color: #00ff00;
          opacity: 0.7;
        }
        .horizontal {
          height: 2px;
          width: 0;
          animation: drawHorizontal 4s infinite;
        }
        .vertical {
          width: 2px;
          height: 0;
          animation: drawVertical 4s infinite;
        }
        .intersection {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #00ff00;
          border-radius: 50%;
          opacity: 0;
          animation: appear 4s infinite;
        }
        @keyframes drawHorizontal {
          0% { width: 0; left: 0; opacity: 0; }
          25% { width: 100%; left: 0; opacity: 0.7; }
          50% { width: 100%; left: 0; opacity: 0.7; }
          75% { width: 0; left: 100%; opacity: 0; }
          100% { width: 0; left: 0; opacity: 0; }
        }
        @keyframes drawVertical {
          0% { height: 0; top: 0; opacity: 0; }
          25% { height: 100%; top: 0; opacity: 0.7; }
          50% { height: 100%; top: 0; opacity: 0.7; }
          75% { height: 0; top: 100%; opacity: 0; }
          100% { height: 0; top: 0; opacity: 0; }
        }
        @keyframes appear {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      </style>
      <div class="circuit-board">
        ${this.generateLines('horizontal', 7)}
        ${this.generateLines('vertical', 7)}
        ${this.generateIntersections(7)}
      </div>
    `;
  }

  generateLines(direction, count) {
    return Array.from({ length: count }, (_, i) => {
      const delay = direction === 'horizontal' ? i * -0.5 : i * -0.5 - 0.25;
      const style = direction === 'horizontal'
        ? `top: ${(i + 1) * 16}px; left: 0;`
        : `top: 0; left: ${(i + 1) * 16}px;`;
      return `<div class="line ${direction}" style="${style} animation-delay: ${delay}s;"></div>`;
    }).join('');
  }

  generateIntersections(count) {
    return Array.from({ length: count }, (_, i) => {
      const delay = i * -0.5 - 0.25;
      return `<div class="intersection" style="top: ${(i + 0.5) * 16}px; left: ${(i + 0.5) * 16}px; animation-delay: ${delay}s;"></div>`;
    }).join('');
  }
}

customElements.define('circuit-board', CircuitBoard);
