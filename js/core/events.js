
var OnLoaded = function()
{
	console.log('Finished loading resources!');

	RefreshFloor();
	LoadLibraryCamera();
	
	var geo = new THREE.PlaneGeometry(0.5, 0.5);
	var mat = new THREE.MeshBasicMaterial( {map: g_FloorTexture, side: THREE.DoubleSide} );
	
	var mesh = new THREE.Mesh(geo, mat);
	mesh.position.x = 1.0;
	mesh.position.y = 1.0;
	mesh.position.z = 0.0;
	console.log(mesh.position);
	mesh.rotation.x = 45.0;
	mesh.rotation.y = 45.0;
	mesh.rotation.z = 45.0;
	
	g_MainScene.add(mesh);
}

var OnUpdate = function()
{
	if(IsNeedToRefreshFloor())
		RefreshFloor();
	
	g_HumanDirection += 1.0;
	
	RefreshCamera();
}