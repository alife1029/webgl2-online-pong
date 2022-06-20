class Renderer2D {
  /**
   * @param {WebGL2RenderingContext} gl 
   * @param {string} vsSrc
   * @param {string} fsSrc
   */
  static initialize(gl, vsSrc, fsSrc) {
    this.gl = gl;
    this.shader = new Shader(gl, vsSrc, fsSrc);
  }

  static dispose() {
    this.shader.dispose();
  }
}
