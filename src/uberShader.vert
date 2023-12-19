#version 300 es

-- DEFINES_HOOK --

uniform mat4 uProjectionViewMatrix;

in vec4 aInstanceTransform;
in vec4 aPosition;
in vec4 aColor;
in vec2 aUV;

out vec2 vUV;
out vec4 vColor;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, s, -s, c);
	return m * v;
}

void main () {
  vec4 pos = aPosition;

  #ifdef IS_LINES
    if (aPosition.x == 0.0f) {
      pos.xy = aInstanceTransform.xy;
    } else {
      pos.xy = aInstanceTransform.zw;
    }
  #else
    vec2 offset = aInstanceTransform.xy;
    float angle = aInstanceTransform.z;
    float scale = aInstanceTransform.w;

    pos.xy *= scale;
    pos.xy = rotate(pos.xy, angle);
    pos.xy += offset;
  #endif
  
  gl_Position = uProjectionViewMatrix * pos;

  vUV = aUV;
  vColor = aColor;
}
