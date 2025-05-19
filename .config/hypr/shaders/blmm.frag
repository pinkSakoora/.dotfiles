#version 320 es

precision mediump float;

uniform sampler2D u_texture;
uniform float u_time; // Optional for animated noise
in vec2 v_texcoord;
out vec4 fragColor;

// Configuration parameters
const float BLOOM_THRESHOLD = 0.99;
const float BLOOM_INTENSITY = 0.4;
const float NOISE_INTENSITY = 0.2;
const float NOISE_SCALE = 700.0;

// Simple pseudorandom noise function
float random(vec2 st) {
    return fract(
        sin(dot(st.xy, vec2(12.9898, 78.233))) * 
        43758.5453123
    );
}

void main() {
    // Original bloom implementation
    vec4 color = texture(u_texture, v_texcoord);
    
    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 brightColor = (brightness > BLOOM_THRESHOLD) ? color.rgb : vec3(0.0);
    
    vec3 bloomColor = vec3(0.0);
    for (float i = -4.0; i <= 4.0; i += 1.0) {
        for (float j = -4.0; j <= 4.0; j += 1.0) {
            vec2 offset = vec2(i, j) * 0.004;
            bloomColor += texture(u_texture, v_texcoord + offset).rgb;
        }
    }
    bloomColor /= 81.0;
    
    // Combine bloom with original color
    vec3 finalColor = color.rgb + (bloomColor * BLOOM_INTENSITY);
    
    // Add noise overlay
    vec2 noiseCoord = v_texcoord * NOISE_SCALE;
    #define ANIMATE_NOISE 0 // Set to 0 for static noise
    #if ANIMATE_NOISE
        float noise = random(floor(noiseCoord + u_time * 10.0));
    #else
        float noise = random(floor(noiseCoord));
    #endif
    
    // Apply noise using overlay blend mode
    finalColor = mix(
        finalColor,
        finalColor * (1.0 - noise + finalColor * noise),
        NOISE_INTENSITY
    );

    fragColor = vec4(clamp(finalColor, 0.0, 1.0), color.a);
}

