Renderable = function(Material, Geometry)
{
	// Fields
	this.m_material = Material;
	this.m_geometry = Geometry;
	this.m_renderableObject = new THREE.Mesh(this.m_geometry, this.m_material);
	this.m_isInitialized = true;
	
	// Methods
	this.GetSceneObject = function()
	{
		if(!this.m_isInitialized)
			return null;
		
		return this.m_renderableObject;
	}
	
	this.CreateCopySceneObject = function()
	{
		if(!this.m_isInitialized)
			return null;
		
		return new THREE.Mesh(this.m_geometry, this.m_material);
	}
}

Library = function(BlockPosX, BlockPosY)
{
	
}