
Renderer2DShaders = {

	uniforms: {

		"textureTexture"    : { type: "t",  value: null },
		"vec3Background"    : { type: "c",  value: new THREE.Color( 0x000000 ) },
		"floatOpacity"      : { type: "f",  value: 1.0 },
		"vec2TextureOffset" : { type: "v2", value: new THREE.Vector2(0.0, 0.0) },
		"vec2SizeScale"     : { type: "v2", value: new THREE.Vector2(1.0, 1.0) }
	},

	vertexShader: [
		"uniform vec2      vec2SizeScale;",
		"uniform vec2      vec2TextureOffset;",
		
		"varying vec2 vUv;",

		"void main() {",
			"vUv = vec2SizeScale * uv + vec2TextureOffset;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D textureTexture;",
		"uniform vec3      vec3Background;",
		"uniform float     floatOpacity;",
		
		"varying vec2 vUv;",

		"void main() {",
		
			"vec4 color = texture2D( textureTexture, vUv);",
			"vec4 diff = color - vec4(vec3Background, 1.0);",
			
			"float diffvalue = abs(diff.r) + abs(diff.g) + abs(diff.b);",
			"if(diffvalue == 0.0)",
				"discard;",
			
			// todo test if alpha without if is faster than discard with if
			//color.a *= nequal(diffvalue, 0.0);
			
			"color.a *= floatOpacity;",			
			
			"gl_FragColor = color;",

		"}"

	].join( "\n" )

};
