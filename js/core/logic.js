
var IsNeedToRefreshFloor = function()
{
	var x = g_FloorRefreshStartPosX - g_HumanPosX;
	var z = g_FloorRefreshStartPosZ - g_HumanPosZ;
	
	return Math.sqrt(x*x + z*z) > c_FloorRefreshDistance;
}

var RefreshFloor = function()
{
	console.log("Refreshing floor!");
	
	var c_FloorTilesX = 10;
	var c_FloorTilesY = 10;
	var c_Geometry = new THREE.PlaneGeometry(1.0, 1.0);
	var c_Material = new THREE.MeshBasicMaterial( {map: g_FloorTexture} );
	
	var i;
	for(i in g_FloorTiles)
	{
		var floorTile = g_FloorTiles[i];
		g_MainScene.remove(floorTile);
	}
	
	g_FloorRefreshStartPosX = g_HumanPosX;
	g_FloorRefreshStartPosZ = g_HumanPosZ;
	
	g_FloorTiles = [];
	
	var posX = Math.round(g_HumanPosX);
	var posZ = Math.round(g_HumanPosZ);
	
	var x, y;
	i = 0;
	for(x = 0; x < 2*c_FloorTilesX; x++) 
	for(y = 0; y < 2*c_FloorTilesY; y++)
	{
		g_FloorTiles[i] = new THREE.Mesh(c_Geometry, c_Material);
		g_FloorTiles[i].rotation.x = Math.PI * 1.5;
		g_FloorTiles[i].position.x = posX + x - c_FloorTilesX;
		g_FloorTiles[i].position.z = posZ + y - c_FloorTilesY;
		i++;
	}
	
	var i;
	for(i in g_FloorTiles)
	{
		var floorTile = g_FloorTiles[i];
		g_MainScene.add(floorTile);
	}
}

var LoadCategories = function(categoriesList)
{
	g_CategoriesNames = [];
	
	var i;
	for(i in categoriesList)
	{
		var category = categoriesList[i];
		g_CategoriesNames[i] = category;
	}
}

var LoadFiles = function(filesList)
{
	g_DocumentsNames = [];
	
	var i, j;
	for(i in g_CategoriesNames)
	{
		var category = g_CategoriesNames[i];
		g_DocumentsNames[category] = [];
		
		var fileIt = 0;
		for(j in filesList)
		{
			var file = filesList[j];
			
			if(file.fileCategory == category)
			{
				g_DocumentsNames[category][fileIt] = file.fileName;
				++fileIt;
			}
		}
	}
}

var RefreshCategories = function()
{
	if(g_IsLoading == true)
		return;
	
	console.log("Refreshing categories!");

	var c_CategorySize = 1.0;
	var c_CategoryHalfSize = c_CategorySize / 2.0;
	var c_CategoryGeometry = new THREE.PlaneGeometry(c_CategorySize, c_CategorySize);
	var c_CategoryMaterial = new THREE.MeshBasicMaterial( {map: g_CategoryTexture} );
	var c_DocumentSizeX = 2.0;
	var c_DocumentHalfSizeX = c_DocumentSizeX / 2.0;
	var c_DocumentSizeY = 0.5;
	var c_DocumentHalfSizeY = c_DocumentSizeY / 2.0;
	var c_DocumentGeometryX = new THREE.PlaneGeometry(c_DocumentSizeX, c_DocumentSizeX);
	var c_DocumentGeometryY = new THREE.PlaneGeometry(c_DocumentSizeX, c_DocumentSizeY);
	var c_DocumentMaterial = new THREE.MeshBasicMaterial( {map: g_DocumentTexture} );
	var c_TextMaterial = new THREE.MeshBasicMaterial( { color: 0xEEEEEE } );
	var c_DebugMaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
	var c_TextOffset = 0.0;
	var c_CategoryStartX = -2.0;
	var c_CategoryStartZ = -3.0;
	var c_CategoryStartY = 1.0;
	var c_CategoryDistanceX = 0.0;
	var c_CategoryDistanceZ = -3.0;
	var c_CategoryDistanceY = 0.0;
	var c_DocumentDistanceX = -3.0;
	var c_DocumentDistanceY = 0.0;
	var c_DocumentDistanceZ = 0.0;
	
	var i;
	for(i in g_CategoriesPlanes)
	{
		var categoryTile = g_CategoriesPlanes[i];
		g_MainScene.remove(categoryTile);
	}
	for(i in g_DocumentsPlanes)
	{
		var documentTile = g_DocumentsPlanes[i];
		g_MainScene.remove(documentTile);
	}
	
	g_CategoriesPlanes = [];
	g_DocumentsPlanes = [];
	
	var PosX = c_CategoryStartX;
	var PosY = c_CategoryStartY;
	var PosZ = c_CategoryStartZ;
	
	var meshIndex = 0;
	var documentMeshIndex = 0;
	for(i in g_CategoriesNames)
	{
		var categoryName = g_CategoriesNames[i];
		
		// 1
		var mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX - c_CategoryHalfSize;
		mesh.position.y = PosY;
		mesh.position.z = PosZ;
		mesh.rotation.y = Math.PI * 1.5;
		
		// 2 - front to highway
		mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX + c_CategoryHalfSize;
		mesh.position.y = PosY;
		mesh.position.z = PosZ;
		mesh.rotation.y = Math.PI * 0.5;
		
		// Category text
		var textGeo = new THREE.TextGeometry(categoryName, { size: 0.2, height: 0.05, curveSegments: 2 });
		var mesh = new THREE.Mesh(textGeo, c_TextMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX + c_CategoryHalfSize + c_TextOffset;
		mesh.position.y = PosY;
		mesh.position.z = PosZ + 0.075 * categoryName.length ;
		mesh.rotation.y = Math.PI * 0.5;
		
		// 3
		mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX;
		mesh.position.y = PosY - c_CategoryHalfSize;
		mesh.position.z = PosZ;
		mesh.rotation.x = Math.PI * 0.5;
		
		// 4
		mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX;
		mesh.position.y = PosY + c_CategoryHalfSize;
		mesh.position.z = PosZ;
		mesh.rotation.x = Math.PI * 1.5;
		
		// 5
		mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX;
		mesh.position.y = PosY;
		mesh.position.z = PosZ - c_CategoryHalfSize;
		mesh.rotation.y = Math.PI;
		
		// 6
		mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
		g_CategoriesPlanes[meshIndex] = mesh;
		++meshIndex;
		mesh.position.x = PosX;
		mesh.position.y = PosY;
		mesh.position.z = PosZ + c_CategoryHalfSize;
		
		var DocPosX = PosX + c_DocumentDistanceX;
		var DocPosY = PosY + c_DocumentDistanceY;
		var DocPosZ = PosZ + c_DocumentDistanceZ;
			
		var documentIt;
		for(documentIt in g_DocumentsNames[categoryName])
		{
			var documentName = g_DocumentsNames[categoryName][documentIt];

			// 1 - back to highway
			mesh = new THREE.Mesh(c_DocumentGeometryY, c_DocumentMaterial);
			g_DocumentsPlanes[documentMeshIndex] = mesh;
			++documentMeshIndex;
			mesh.position.x = DocPosX - c_DocumentHalfSizeX;
			mesh.position.y = DocPosY;
			mesh.position.z = DocPosZ;
			mesh.rotation.x = Math.PI * 0.5;
			mesh.rotation.y = Math.PI * 1.5;
			
			// 2 - front to highway
			mesh = new THREE.Mesh(c_DocumentGeometryY, c_DocumentMaterial);
			g_DocumentsPlanes[documentMeshIndex] = mesh;
			++documentMeshIndex;
			mesh.position.x = DocPosX + c_DocumentHalfSizeX;
			mesh.position.y = DocPosY;
			mesh.position.z = DocPosZ;
			mesh.rotation.x = Math.PI * 0.5;
			mesh.rotation.y = Math.PI * 0.5;
			
			// File text
			textgeo = new THREE.TextGeometry(documentName, { size: 0.2, height: 0.05, curveSegments: 2 });
			mesh = new THREE.Mesh(textgeo, c_TextMaterial);
			g_DocumentsPlanes[documentMeshIndex] = mesh;
			++documentMeshIndex;
			mesh.position.x = DocPosX - 0.075 * documentName.length;
			mesh.position.y = DocPosY;
			mesh.position.z = DocPosZ + c_DocumentHalfSizeY;
	
			//mesh.rotation.y = Math.PI * 0.5;
			
			// 3 - on the ground
			// mesh = new THREE.Mesh(c_CategoryGeometry, c_CategoryMaterial);
			// g_CategoriesPlanes[meshIndex] = mesh;
			// ++meshIndex;
			// mesh.position.x = PosX;
			// mesh.position.y = PosY - c_CategoryHalfSize;
			// mesh.position.z = PosZ;
			// mesh.rotation.x = Math.PI * 0.5;
			
			// 4 - upper
			mesh = new THREE.Mesh(c_DocumentGeometryY, c_DocumentMaterial);
			g_DocumentsPlanes[documentMeshIndex] = mesh;
			++documentMeshIndex;
			mesh.position.x = DocPosX;
			mesh.position.y = DocPosY + c_DocumentHalfSizeX;
			mesh.position.z = DocPosZ;
			mesh.rotation.x = Math.PI * 1.5;
			
			// 5
			mesh = new THREE.Mesh(c_DocumentGeometryX, c_DocumentMaterial);
			g_DocumentsPlanes[documentMeshIndex] = mesh;
			++documentMeshIndex;
			mesh.position.x = DocPosX;
			mesh.position.y = DocPosY;
			mesh.position.z = DocPosZ - c_DocumentHalfSizeY;
			mesh.rotation.y = Math.PI;
			
			// 6
			mesh = new THREE.Mesh(c_DocumentGeometryX, c_DocumentMaterial);
			g_DocumentsPlanes[documentMeshIndex] = mesh;
			++documentMeshIndex;
			mesh.position.x = DocPosX;
			mesh.position.y = DocPosY;
			mesh.position.z = DocPosZ + c_DocumentHalfSizeY;
			
			DocPosX += c_DocumentDistanceX;
			DocPosY += c_DocumentDistanceY;
			DocPosZ += c_DocumentDistanceZ;
		}
		
		PosX += c_CategoryDistanceX;
		PosY += c_CategoryDistanceY;
		PosZ += c_CategoryDistanceZ;
	}
	
	var i;
	for(i in g_CategoriesPlanes)
	{
		var categoryTile = g_CategoriesPlanes[i];
		g_MainScene.add(categoryTile);
	}
	
	for(i in g_DocumentsPlanes)
	{
		var documentTile = g_DocumentsPlanes[i];
		g_MainScene.add(documentTile);
	}
}

var LoadLibraryCamera = function()
{
	console.log("Loading Library Camera!");
	
	g_MainCamera = new THREE.PerspectiveCamera(45, g_ScreenWidth/g_ScreenHeight, 0.01, 100);
	
	g_MainCamera.position.x = g_HumanPosX;
	g_MainCamera.position.y = g_HumanPosY;
	g_MainCamera.position.z = g_HumanPosZ;
	g_MainCamera.rotation.order = 'YXZ';
	
	RefreshCamera();
}

var RefreshCamera = function()
{
	g_MainCamera.position.x = g_HumanPosX;
	g_MainCamera.position.y = g_HumanPosY;
	g_MainCamera.position.z = g_HumanPosZ;
	
	while(g_HumanDirection < 0.0)
		g_HumanDirection += 360.0;
	while(g_HumanDirection > 360.0)
		g_HumanDirection -= 360.0;

	g_MainCamera.rotation.y = g_HumanDirection * Math.PI / 180;
}

var ExecuteMovingOrders = function()
{
		var c_MovingSpeed = 0.05;
	var c_RotatingSpeed = 2.0;
	
	if(g_OrderRotateLeft)
		g_HumanDirection += c_RotatingSpeed;
	
	if(g_OrderRotateRight)
		g_HumanDirection -= c_RotatingSpeed;
	
	if(g_OrderMoveForward)
	{
		// todo: maybe someday im gonna improve this crap
		g_MainCamera.position.x = g_HumanPosX;
		g_MainCamera.position.y = g_HumanPosY;
		g_MainCamera.position.z = g_HumanPosZ;
		
		g_MainCamera.translateZ(-c_MovingSpeed);
		
		g_HumanPosX=g_MainCamera.position.x;
		g_HumanPosY=g_MainCamera.position.y;
		g_HumanPosZ=g_MainCamera.position.z;
	}
	
	if(g_OrderMoveBackward)
	{
		g_MainCamera.position.x = g_HumanPosX;
		g_MainCamera.position.y = g_HumanPosY;
		g_MainCamera.position.z = g_HumanPosZ;
		
		g_MainCamera.translateZ(c_MovingSpeed);
		
		g_HumanPosX=g_MainCamera.position.x;
		g_HumanPosY=g_MainCamera.position.y;
		g_HumanPosZ=g_MainCamera.position.z;
	}
	
	if(g_OrderMoveToLeft)
	{
		g_MainCamera.position.x = g_HumanPosX;
		g_MainCamera.position.y = g_HumanPosY;
		g_MainCamera.position.z = g_HumanPosZ;
		
		g_MainCamera.translateX(-c_MovingSpeed);
		
		g_HumanPosX=g_MainCamera.position.x;
		g_HumanPosY=g_MainCamera.position.y;
		g_HumanPosZ=g_MainCamera.position.z;
	}
	
	if(g_OrderMoveToRight)
	{
		g_MainCamera.position.x = g_HumanPosX;
		g_MainCamera.position.y = g_HumanPosY;
		g_MainCamera.position.z = g_HumanPosZ;
		
		g_MainCamera.translateX(c_MovingSpeed);
		
		g_HumanPosX=g_MainCamera.position.x;
		g_HumanPosY=g_MainCamera.position.y;
		g_HumanPosZ=g_MainCamera.position.z;
	}
}

var ExecuteFileOrders = function()
{
	if(g_OrderUploadFile == false)
		return;
	if(g_SelectedFile == null)
		return;
	
	var OnLoadedEvent = function()
	{
		
	}
	
	LoadSelectedFile(OnLoadedEvent);
	
	g_OrderUploadFile = false;	
}

var ExecuteOrders = function()
{
	ExecuteMovingOrders();
	ExecuteFileOrders();
}

var SendXHTTPRequest = function(HhttpRequestObject, Content, SuccessfulRespondCallback)
{	
	if(HhttpRequestObject == null || Content == null)
		return;
	
	HhttpRequestObject.onreadystatechange = function() 
	{
		if (HhttpRequestObject.readyState == 4) 
		{
			if(HhttpRequestObject.status == 200 || HhttpRequestObject.status == 201) 
			{
				var resp = JSON.parse(HhttpRequestObject.responseText)
				var sessionkey = resp.sessionkey;
				
				if(SuccessfulRespondCallback != null)
					SuccessfulRespondCallback(resp);
			} 
			else 
			{
				console.log("Error! Status: " + HhttpRequestObject.status);
			}
		}
	};
	
	HhttpRequestObject.send(Content);
}

var SendLoginRequest = function()
{
	var content = '{  "username": "'+g_Username+'",  "password": "'+g_PasswordHash+'"}';

	var respondCallback = function(resp)
	{
		console.log(resp);
		
		var sessionkey = resp.sessionkey;

		// Create cookies
		var d = new Date();
		d.setTime(d.getTime() + (7*24*60*60*1000)); // expires after a week
		var expires = "expires="+d.toUTCString(); 
		document.cookie = "username=" + g_Username +"; "+expires+"; path=/; domain=python.swierkot.org";
		document.cookie = "passwordHash=" + g_PasswordHash +"; "+expires+"; path=/; domain=python.swierkot.org";
		document.cookie = "sessionkey=" + sessionkey +"; "+expires+"; path=/; domain=python.swierkot.org";
	};
	
	g_XhttpLogin.send(content);
	
	if(g_XhttpLogin.status == 200 || g_XhttpLogin.status == 201) 
	{
		var resp = JSON.parse(g_XhttpLogin.responseText)
		g_SessionKey = resp.sessionkey;
		
		respondCallback(resp);
	} 
	else 
	{
		console.log("Error! Status: " + g_XhttpLogin.status);
	}
}

var SendFilelistRequest = function()
{
	var sessionkey = g_SessionKey;
	var content = '{  "sessionkey": "'+sessionkey+'" }';

	var respondCallback = function(resp)
	{
		var filelist = resp.result;
		var categoriesIt = 0;
		var categoriesList = [];
		var filesList = [];
		
		var fileIt;
		for(fileIt in filelist)
		{
			var file = filelist[fileIt];
			var splitFile = file.filename.split('_');
			
			var fileCategory = 'Default';
			var fileName;
			if(splitFile.length > 1)
			{			
				fileCategory = splitFile[0];
				
				var i;
				for (i = 1; i < splitFile.length; i++) 
					fileName += splitFile[i] + '_';
			}
			else
			{
				fileName =  file.filename; 
			}
			
			categoriesList[categoriesIt] = fileCategory;
			filesList[categoriesIt] = {};
			filesList[categoriesIt].fileName = fileName;
			filesList[categoriesIt].fileCategory = fileCategory;
			++categoriesIt;
		}
		
		var uniqueCategories = uniqueArray = categoriesList.filter(function(item, pos) {
			return categoriesList.indexOf(item) == pos;
		})

		LoadCategories(uniqueCategories);
		LoadFiles(filesList);
		RefreshCategories();
	};
	
	SendXHTTPRequest(g_XhttpFilelist, content, respondCallback);
}

