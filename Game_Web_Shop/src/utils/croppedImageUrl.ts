import noImage from '../assets/noImage.png';
// Funktion som beskär en bild till 600x400
const croppedImageUrl  = (url : string) => {
    if (!url) return noImage;
    const index = url.indexOf('media/') + 'media/'.length; // Hitta startindex efter media/ i URL 
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index);  // Skapar ny URL med crop/600/400/ insatt
}


export default croppedImageUrl;