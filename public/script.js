class App {
  /**
   * @param {string} canvasID 
   */
  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    /**
     * @type {WebGL2RenderingContext}
    */
    this.gl = this.canvas.getContext('webgl2');
    if (!this.gl) alert(`Your machine doesn't support WebGL 2.0!`);

    // App state
    this.appState = {
      running: false
    };

    // Assets
    this.assets = {};

    // Time
    this.lastFrame = 0;
    this.deltaTime = 0;
  }

  async run() {
    await this.loadAssets();
    this.initialize();
    this.appState.running = true;
    this.start();
    requestAnimationFrame(this.update.bind(this));
  }

  async loadAssets() {
    await fetch('/resources').then(res => res.json().then(data => this.assets = data));
    console.log(this.assets);
  }

  initialize() {
    // Initialize renderer
    Renderer2D.initialize(this.gl, this.assets.shaders.defaultVert, this.assets.shaders.defaultFrag);
  }

  start() {
    
  }

  update(timestamp) {
    // Update time
    this.deltaTime = timestamp - this.lastFrame;
    this.lastFrame = timestamp;

    // Update canvas & viewport dimensions
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Clear screen
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(this.update.bind(this));
  }

  dispose() {
    // Dispose resources here
    Renderer2D.dispose();
  }
}

window.onload = async () => {
  const app = new App('game-canvas');
  await app.run();
}
