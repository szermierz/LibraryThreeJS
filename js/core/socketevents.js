
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

var OnSocketMessageArrived = function(data)
{
	
}

var SendDataViaSocket = function(data)
{
	if(g_SocketConnected)
		g_Socket.send(data);
}