#version 300 es

in vec3 a_Position;
in vec4 a_Color;
in vec2 a_TexCoord;
in float a_TexIndex;

uniform mat4 u_ViewProj;

out vec4 v_Color;
out vec2 v_TexCoord;
out float v_TexIndex;

void main() {
  gl_Position = u_ViewProj * vec4(a_Position, 1.0);
  v_Color = a_Color;
  v_TexIndex = a_TexIndex;
  v_TexCoord = a_TexCoord;
}
