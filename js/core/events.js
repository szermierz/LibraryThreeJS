
var OnLoaded = function()
{
	console.log('Finished loading resources!');
	
	RefreshFloor();
	LoadLibraryCamera();
	
	var geo = new THREE.PlaneGeometry(0.5, 0.5);
	var mat = new THREE.MeshBasicMaterial( {color: 0xDDDDDD} );
	
	var mesh = new THREE.Mesh(geo, mat);
	mesh.position.x = 50.0;
	mesh.position.y = 50.0;
	mesh.position.z = 0.0;
	mesh.rotation.x = 90.0;
	mesh.rotation.y = 0.0;
	
	g_MainScene.add(mesh);
}

var OnUpdate = function()
{
	g_HumanDirection += 1.0;
	
	RefreshCamera();
	
	//g_MainCamera.lookAt(50,50,0);
}