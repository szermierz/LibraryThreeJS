
ResourceLoader = function()
{
	//Methods
	this.LoadPDFTexture = function(PDFFileName, Page, Callback)
	{
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
		var fileTexture = new THREE.ImageUtils.loadTexture(TextureFileName, {}, function()
		{
			Callback(fileTexture);
		} );
	}
}

