class Texture2D {
  /** 
   * @param {WebGL2RenderingContext} gl 
   * @param {HTMLImageElement} image 
   * @param {number} pixelPerUnit 
   */
  constructor(gl, image, pixelPerUnit = 100) {
    this.gl = gl;

    this.id = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.id);
    gl.texImage2D(this.id, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    this.width = image.width;
    this.height = image.height;
    this.pixelPerUnit = pixelPerUnit;
  }

  activate(textureUnit = 0) {
    this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
  }

  dispose() {
    this.gl.deleteTexture(this.id);
  }
}
