
ResourceLoader = function()
{
	
	//test
	/*
	g_Loader.LoadPDFTexture('test.pdf', 1, function(texture) 
	{
		var geo = new THREE.PlaneGeometry(100,100);
		var mat = new THREE.MeshBasicMaterial( {map: texture} );
		
		var mesh = new THREE.Mesh(geo, mat);
		
		g_MainScene.add(mesh);
	});
	*/
	//====
	
	//Methods
	this.LoadPDFTexture = function(PDFFileName, Page, Callback)
	{
		/*
		var BASE64_MARKER = ';base64,';

		function convertDataURIToBinary(dataURI) {
		  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		  var base64 = dataURI.substring(base64Index);
		  var raw = window.atob(base64);
		  var rawLength = raw.length;
		  var array = new Uint8Array(new ArrayBuffer(rawLength));

		  for(var i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		  }
		  return array;
		}

		var pdfAsDataUri = "data:application/pdf;base64,JVBERi0xLjUK..."; // shortened
		var pdfAsArray = convertDataURIToBinary(pdfAsDataUri);
		PDFJS.getDocument(pdfAsArray)
		*/

		PDFJS.getDocument(PDFFileName).then(function(pdf) 
		{
			pdf.getPage(Page).then(function(page) 
			{
				var scale = 1.5;
				var viewport = page.getViewport(scale);
				
				var canvas = document.createElement( 'canvas' );
				var context = canvas.getContext('2d');
				canvas.height = viewport.height;
				canvas.width = viewport.width;

				var renderContext = { canvasContext: context, viewport: viewport };
				
				page.render(renderContext).then(function()
				{
						var texture = new THREE.Texture(canvas)
						texture.needsUpdate = true;
						
						Callback(texture);
				});
			});
		});
	};
	
	this.LoadTexture = function(TextureFileName, Callback)
	{
		/*
		var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var jpgData = new Uint8Array([255,217]);


// Convert the array of data into a base64 string
var stringData = String.fromCharCode.apply(null, new Uint16Array(jpgData));
var encodedData = window.btoa(stringData);
var dataURI = "data:image/jpeg;base64," + encodedData;

// Connect the image to the Texture
var texture = new THREE.Texture();

var image = new Image();
image.onload = function () {
	texture.image = image;
	texture.needsUpdate = true;
};
image.src = dataURI;


var geometry = new THREE.PlaneBufferGeometry(1, 1);
var material = new THREE.MeshBasicMaterial({map: texture});
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 1;

var render = function () {
	requestAnimationFrame( render );

	renderer.render(scene, camera);
};

render();
		*/
		
		var fileTexture = new THREE.ImageUtils.loadTexture(TextureFileName, {}, function()
		{
			Callback(fileTexture);
		});
	}
}

