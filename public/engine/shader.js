class Shader {
  /**
   * @param {WebGL2RenderingContext} gl 
   * @param {string} vsID 
   * @param {string} fsID 
   */
  constructor(gl, vsID, fsID) {
    this.gl = gl;
    this.initialized = false;
    this.init(vsID, fsID);
  }

  /**
   * @param {string} vsID 
   * @param {string} fsID 
   */
  init(vsID, fsID) {
    if (!this.initialized) {
      const vsSrc = document.getElementById(vsID).innerHTML;
      const fsSrc = document.getElementById(fsID).innerHTML;

      this.program = gl.createProgram();

      this.compile(vsSrc, gl.VERTEX_SHADER);
      this.compile(fsSrc, gl.FRAGMENT_SHADER);
      this.link();

      this.initialized = true;
    } else {
      console.warn('You are trying to reinitialize shader pipeline, you must dispose it before!');
    }
  }

  /**
   * @param {string} src 
   * @param {number} type 
   */
  compile(src, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);

    // Compile errors
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const gpuLog = this.gl.getShaderInfoLog(shader);
      console.error('Failed to compile shader!\nShader Type: ' + type + '\n\nGPU Log:\n' + gpuLog);
      return;
    }

    this.gl.attachShader(this.program, shader);
    this.gl.deleteShader(shader);
  }

  link() {
    this.gl.linkProgram(this.program);

    // Linking errors
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      const gpuLog = this.gl.getProgramInfoLog(this.program);
      console.error('Failed to link shader program!\n\nGPU Log:\n' + gpuLog);
    }
  }

  use() {
    if (this.initialized) this.gl.useProgram(this.program);
    else console.error('You must initialize pipeline before use it!');
  }

  dispose() {
    if (!this.initialized) return;
    
    this.gl.deleteProgram(this.program);
    this.program = 0;
    this.initialized = false;
  }
}
