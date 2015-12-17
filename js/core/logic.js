
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
	var i = 0;
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

var ExecuteOrders = function()
{
	var c_MovingSpeed = 0.05;
	var c_RotatingSpeed = 2.0;
	
	if(g_OrderRotateLeft)
		g_HumanDirection += c_RotatingSpeed;
	
	if(g_OrderRotateRight)
		g_HumanDirection -= c_RotatingSpeed;
	
	if(g_OrderMoveForward)
	{
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

