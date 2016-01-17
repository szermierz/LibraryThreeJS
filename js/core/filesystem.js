
var LoadSelectedFile = function(OnEndCallback)
{
	if(g_SelectedFile == null)
		return;
	
	var reader = new FileReader();
	reader.onloadend = function() 
	{
		g_SelectedFileData = reader.result;
		
		OnEndCallback();
		
		console.log("Successfuly loaded file");
	};
	
	reader.readAsDataURL(g_SelectedFile);
}