
var OnKeyUp = function(event)
{
		event.preventDefault();
		
		//console.log(event.keyCode);
		
		switch(event.keyCode) 
		{
			case 87: // up
				g_OrderMoveForward = false; break;
			case 83: // down
				g_OrderMoveBackward = false; break;
			case 65: // left
				g_OrderRotateLeft = false; break;
			case 68: // right
				g_OrderRotateRight = false; break;
			case 81: // Q - left
				g_OrderMoveToLeft = false; break;
			case 69: // E - right
				g_OrderMoveToRight = false; break;
			case 85: // U - upload file
				g_OrderUploadFile = true; break;
		}
}

var OnKeyDown = function(event)
{
		event.preventDefault();
		
		//console.log(event.keyCode);
		
		switch(event.keyCode) 
		{
			case 87: // up
				g_OrderMoveForward = true; break;
			case 83: // down
				g_OrderMoveBackward = true; break;
			case 65: // left
				g_OrderRotateLeft = true; break;
			case 68: // right
				g_OrderRotateRight = true; break;
			case 81: // Q - left
				g_OrderMoveToLeft = true; break;
			case 69: // E - right
				g_OrderMoveToRight = true; break;
		}
}

var OnLoaded = function()
{
	console.log('Finished loading resources!');

	RefreshFloor();
	LoadLibraryCamera();

	RefreshCategories();
}

var OnUpdate = function()
{
	if(IsNeedToRefreshFloor())
		RefreshFloor();
	
	ExecuteOrders();
	
	RefreshCamera();
}

function OnChangedSelectedFile(e) 
{
	var file = e.target.files[0];
	if (!file)
		return;
	
	g_SelectedFile = file;
}