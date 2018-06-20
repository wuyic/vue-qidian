var Canvas = require('canvas')
var fs = require('fs')
var tesseract = require('tesseract.js');

const Image = Canvas.Image;

// 初始化 img 和 start time
// 获取命令行输入的源图片和保存的图片地址
let img = new Image
	, start = new Date()
	, rawPath =  './112.jpg'
	, savePath = './111over.jpg';

// 在命令行中没有输入图片地址，抛错
if(!rawPath)
	throw new Error('input raw image path')

if(!savePath)
	throw new Error('input save image path')

img.onerror = function(err){
	throw err
}

// 图片加载完成
img.onload = function(){
	//    获取图片的width和height
	let width = img.width
		, height = img.height
		, canvas =  Canvas.createCanvas(width, height)
		, ctx = canvas.getContext('2d')

	// 将源图片复制到画布上
	// canvas 所有的操作都是在 context 上，所以要先将图片放到画布上才能操作
	ctx.drawImage(img, 0, 0, width, height)

	let imageData = ctx.getImageData(0, 0, width, height)

		// 获取画布的像素信息
		// 是一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示
		// 如：图片由两个像素构成，一个像素是白色，一个像素是黑色，那么 data 为
		// [255,255,255,255,0,0,0,255]
		// 这个一维数组可以看成是两个像素中RBGA通道的数组的集合即:
		// [R,G,B,A].concat([R,G,B,A])
		, data = imageData.data;

	let back = imageData;

	// 对像素集合中的单个像素进行循环，每个像素是由4个通道组成，所以 i=i+4
	for(let i = 0; i < data.length; i+=4) {
		// 得到 RGBA 通道的值
		let r = data[i]
			, g = data[i+1]
			, b = data[i+2]

		// 我们从最下面那张颜色生成器中可以看到在图片的右上角区域，有一小块在
		// 肉眼的观察下基本都是白色的，所以我在这里把 RGB 值都在 245 以上的
		// 的定义为白色
		// 大家也可以自己定义的更精确，或者更宽泛一些
		if (r < 120 && g < 120) {

		} else {
			data[i+3] = 0;
		}


		if (r == g && g == b) {
			data[i+3] = 0;
		}
		//
		// if (Math.max(g-r, r-g) < 50 && Math.max(g-b, b-g) < 50 && Math.max(b-r, r-b) < 50 && b < 60) {
		// 	data[i+3] = 0;
		// }


		if (b < 150) {
			data[i+3] = 0;
		}
	}

	// 将修改后的代码复制回画布中
	ctx.putImageData(imageData, 0, 0);

	tesseract.recognize(back)
		.then(function(result){
			console.log(result)
		}).catch(e=>{
			console.log(e);
	});

	// 将修改后的图片保存
	let out = fs.createWriteStream(`${__dirname}/${savePath}`)
		, stream = canvas.pngStream()

	stream.on('data', function (chunk) {
		out.write(chunk)
	});

	stream.on('end', function () {
		console.log(`保存到 ${__dirname}/${savePath}`)
		console.log(`耗时: ${new Date()-start}ms`)
	})
}

img.src = `${__dirname}/${rawPath}`;