

function getLayer(source, coordinateConversion, style, icon) {
    let layer = {
        "id": source,            
        "source": source              
    }
    if(icon){
        layer.type = "symbol";
        layer.layout={
            "icon-allow-overlap":true,
            "icon-image": source
        }
    }
    
    return layer;
   
}

export default getLayer