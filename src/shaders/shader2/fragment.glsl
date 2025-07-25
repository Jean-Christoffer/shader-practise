uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;

#include "../cnoise.glsl";

void main()
{
    vec3 color = vec3(0);
    vec3 innerColor = vec3(vUv, 0.5);
    vec3 outerColor = vec3(0.0);
   
    vec2 center = vUv - 0.5;

    float distance = length(center);

    float angle = atan(center.y, center.x);
    angle *= sin(angle * 5.0);

    float safeDist = max(distance, 0.01);

    float tunnel = fract(1.0 / safeDist + u_time);
    tunnel = fract(tunnel + angle * 0.1);

    float radius = 0.20;

    float blur = 0.20;

    //float mask = 1.0 - step(radius, distance);
    float mask = 1.0 - smoothstep(radius, radius + blur, distance);
    float centerFade = smoothstep(0.02, 0.1, distance);
    tunnel *= centerFade;

    //float tunnelStripes = smoothstep(0.4, 0.5, fract(tunnel));
    mask *= tunnel;

   

    color = mix(outerColor, innerColor, mask);

    gl_FragColor = vec4(color, 1.0);

}
