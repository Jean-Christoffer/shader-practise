uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;

#include "../cnoise.glsl";

void main()
{
 
    vec2 strangeColor = vec2(u_time * 0.1,0.5);
    float t = cnoise(strangeColor * 10.0);
    t = t * 0.5 + 0.5;

    vec3 blue = vec3(t * 0.2, t * 0.3, 1.0);
    vec3 yellow = vec3(t * 0.9, 1.0, 1.0);

    float radius = 0.35;

    float blur = 0.02;
    float distance = length(vUv - 0.5);
    float mask = 1.0 - smoothstep(radius, radius + blur, distance);

   
   float n1 = cnoise(vUv * 20.0);
   float n2 = cnoise((vUv + 13.37) * 20.0); 
   vec2 diff = vec2(n1, n2) - vec2(0.5);

    float angle = atan(diff.y, diff.x);

    float swirl = angle + distance * 150.0 + u_time * 5.0;


   swirl = fract(swirl / (2.0 * 3.1415926) + 0.5);     



    vec3 color = mix(blue,yellow,swirl);


    color *= mask; 


    gl_FragColor = vec4(color, 1.0);


}
