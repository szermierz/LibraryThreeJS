
var OnSocketConnect = function()
{
	g_SocketConnected = true;
	--g_ObjectToLoad;
	
	console.log("Socket connected!");
}

var OnSocketDisconnect = function()
{
	g_SocketConnected = false;
	
	console.log("Socket disconnected!");
}

var OnSocketMessageArrived = function(message)
{
	var queryType = g_Queries[message.sha1];
	g_Queries.splice(message.sha1, 1);
	
	switch(queryType)
	{
	case 1:
		LoadCategories(message.data);
		RefreshCategories();
		break;
	}
}

var SendDataViaSocket = function(message)
{
	if(g_SocketConnected)
		g_Socket.send(message);
}

var SendCategoriesRequest = function()
{
	var message = { name: 'categorieslist' };
	g_Queries[sha1(message.name)] = 1;
	
	SendDataViaSocket(message);
}