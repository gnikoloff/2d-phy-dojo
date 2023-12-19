#version 300 es
precision highp float;

-- DEFINES_HOOK --

in vec2 vUV;
in vec4 vColor;

out vec4 finalColor;

void main () {
  #ifdef LINES
    finalColor = vec4(0.5843, 0.647, 0.6509, 1.0);
  #else
    finalColor = vColor;
  #endif
}
