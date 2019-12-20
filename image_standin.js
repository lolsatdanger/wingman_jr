let SILENT_SAMPLE_SIZE = 30;

let silentCanvas = document.createElement('canvas');
silentCanvas.width = SILENT_SAMPLE_SIZE;
silentCanvas.height = SILENT_SAMPLE_SIZE;
let silentCtx = silentCanvas.getContext('2d');

async function silent_create_svg(img, unsafeScore, dataURL)
{
    silentCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, SILENT_SAMPLE_SIZE,SILENT_SAMPLE_SIZE);
    

    let visibleScore = Math.floor(unsafeScore*100);
    let svgText = '<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"   "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="'+img.width+'" height="'+img.height+'" version="1.1"      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
    //+ (isInReviewMode ? '<image href="'+dataURL+'" x="0" y="0" height="'+img.height+'px" width="'+img.width+'px" opacity="0.2" />' : '')
    let silentSample = silentCtx.getImageData(0,0,SILENT_SAMPLE_SIZE,SILENT_SAMPLE_SIZE);
    let data = silentSample.data;
    for(let r=0; r<SILENT_SAMPLE_SIZE; r++)
    {
        for(let c=0; c<SILENT_SAMPLE_SIZE; c++)
        {
            let si = (r*SILENT_SAMPLE_SIZE+c)*4;
            let rgba = 'rgba(' + data[si] + ', ' + data[si+1] + ', ' + data[si+2] + ', ' + (data[si+3] / 255) + ')';
            svgText += '<rect x="'+(img.width/SILENT_SAMPLE_SIZE*c)
                +'" y="'+(img.height/SILENT_SAMPLE_SIZE*r)
                +'" width="'+(img.width/SILENT_SAMPLE_SIZE)
                +'" height="'+(img.height/SILENT_SAMPLE_SIZE)
                +'" fill="'+rgba
                +'" ></rect>';
        }
    }
    
    svgText += '</svg>';
    return svgText;
}