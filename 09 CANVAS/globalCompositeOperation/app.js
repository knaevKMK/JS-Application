const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';
ctx.fillRect(200, 200, 150, 150);

ctx.globalCompositeOperation =
    //first-default
    'destination-over';
// 'overlay';
// 'color-dodge';

// 'destination-in';
// 'destination-out';
// 'destination-atop';

//second
// 'source-over';
// 'source-in';
// 'source-out';
// 'source-atop';

//'lighter';
//'lighten';
// 'xor;'
// 'copy';
// 'multiply';
// 'darken';
// 'lighten';
// 'color-burn';
// 'hard-light'
// 'soft-light'
// 'difference';
// 'exclusions';
// 'hue';
// 'saturation';
// 'color';
// 'luminosity';

ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(350, 350, 75, 0, Math.PI * 2);
ctx.fill();