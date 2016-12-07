
var img = new Image();
img.src = 'controllers/SMB-logo1-circle.jpg';
img.height = '100';
var divy = document.getElementById('logo');

img.onload = function()
{
	divy.appendChild(img);	

}	
console.log(divy);
