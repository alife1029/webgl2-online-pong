#version 300 es

#define MAX_TEXTURES 16

precision highp float;

in vec4 v_Color;
in vec2 v_TexCoord;
in float v_TexIndex;

uniform sampler2D u_Samplers[MAX_TEXTURES];

out vec4 fragColor;

void main() {
  int texIndex = int(v_TexIndex);
  vec4 sampled;

  switch(texIndex) {
    case 0: sampled = texture(u_Samplers[0], v_TexCoord); break;
    case 1: sampled = texture(u_Samplers[1], v_TexCoord); break;
    case 2: sampled = texture(u_Samplers[2], v_TexCoord); break;
    case 3: sampled = texture(u_Samplers[3], v_TexCoord); break;
    case 4: sampled = texture(u_Samplers[4], v_TexCoord); break;
    case 5: sampled = texture(u_Samplers[5], v_TexCoord); break;
    case 6: sampled = texture(u_Samplers[6], v_TexCoord); break;
    case 7: sampled = texture(u_Samplers[7], v_TexCoord); break;
    case 8: sampled = texture(u_Samplers[8], v_TexCoord); break;
    case 9: sampled = texture(u_Samplers[9], v_TexCoord); break;
    case 10: sampled = texture(u_Samplers[10], v_TexCoord); break;
    case 11: sampled = texture(u_Samplers[11], v_TexCoord); break;
    case 12: sampled = texture(u_Samplers[12], v_TexCoord); break;
    case 13: sampled = texture(u_Samplers[13], v_TexCoord); break;
    case 14: sampled = texture(u_Samplers[14], v_TexCoord); break;
    case 15: sampled = texture(u_Samplers[15], v_TexCoord); break;
    default: sampled = vec4(1.0, 1.0, 1.0, 1.0); break;
  }

  fragColor = sampled * v_Color;
}
