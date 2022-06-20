class Shader {
  /**
   * @param {WebGL2RenderingContext} gl 
   * @param {string} vsID 
   * @param {string} fsID 
   */
  constructor(gl, vsSource, fsSource) {
    this.gl = gl;
    this.initialized = false;
    this.init(vsSource, fsSource);
  }

  /**
   * @param {string} vsID 
   * @param {string} fsID 
   */
  init(vsSrc, fsSrc) {
    if (!this.initialized) {

      this.program = this.gl.createProgram();

      this.compile(vsSrc, this.gl.VERTEX_SHADER);
      this.compile(fsSrc, this.gl.FRAGMENT_SHADER);
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
    // Process tokens
    src = src.replace('${MAX_TEXTURES}', this.gl.getParameter(this.gl.MAX_SAMPLES).toString());

    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);

    // Compile errors
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const gpuLog = this.gl.getShaderInfoLog(shader);
      const shaderType =  type === this.gl.VERTEX_SHADER ? 'Vertex Shader' : 
                          type === this.gl.FRAGMENT_SHADER ? 'Fragment Shader' : 
                          'Unknown Shader Type';
      console.error('Failed to compile shader!\nShader Type: ' + shaderType + '\n\nGPU Log:\n' + gpuLog);
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
