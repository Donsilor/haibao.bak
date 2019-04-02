var app = new Vue({
    el: '#app',
    data: {
	curr: 1,
        save: false,
        editName: false,
        editSign: false,
        name: '',
        sign: '',
        signFormat: '写下你最喜欢的<br><span>保险语录</span>',
        photo: 'images/photo.jpg',
        backgroundImage: {
            "background-image": "url('images/photo.jpg')"
        },
    },
    methods: {
	back: function() {
		this.editSign = false;
		this.editName = false;
	},
	pre: function() {
		this.back();
		var c = this.curr - 1 ;
		if (c < 1) {
			this.curr = 3;
		} else {
			this.curr = c;	
		}
		console.log(this.curr)
	},
	post: function() {
		this.back();
		var c = this.curr + 1 ;
                if (c > 3) {
                        this.curr = 1;
                } else {
                        this.curr = c;
                }	
		console.log(this.curr)
	},
        toEditSign: function (n) {
            if (n == 1) {
                this.editName = true
            }
            if (n == 2) {
                this.editSign = true;
            }
        },
        saveName: function (e) {
            this.editName = false
        },

        saveInput: function (e) {
            this.editSign = false
            if (this.sign <= 7) {
                this.signFormat = this.sign
            } else {
                this.signFormat = this.sign.substr(0, 7) + '<br><span>' + this.sign.substr(7, 5) + '</span>'
            }
        },

        handleExceed: function (response, file, fileList) {
            console.log('===========success======', response, file, fileList)
            this.photo = file.url;
            this.backgroundImage = {"background-image": "url('" + file.url + "')"}
        },

        saveAll: function (e) {
            this.editSign = false;
            this.editName = false;
            this.save = true;
            // html2canvas(document.getElementById("app"),{allowTaint : true}).then(function(canvas) {
            //     console.log('=============', canvas)
            //     var link = document.createElement("a");
            //     document.body.appendChild(link);
            //     link.download = "html_image.png";
            //     link.href = canvas.toDataURL("image/png");
            //     link.target = '_blank';
            //     link.click();
            //     //document.body.appendChild(canvas);
            // });
            this.convert2canvas();
        },

        convert2canvas: function() {
            //var shareContent = document.getElementById("app");
            var shareContent = document.getElementsByClassName("absPhoto");
            var width = shareContent.offsetWidth;
            var height = shareContent.offsetHeight;
            var canvas = document.createElement("canvas");
            var scale = 2;
console.log('====================', shareContent, width,height , shareContent.scrollHeight)
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.getContext("2d").scale(scale, scale);

            var opts = {
                scale: scale,
                canvas: canvas,
                logging: true,
                width: width,
                height: height
            };
            console.log(shareContent)
            html2canvas(shareContent, opts).then(function (canvas) {
                console.log('==============', canvas)
                var context = canvas.getContext('2d');

               var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
//console.log('=============', img)
               document.body.appendChild(img);
                // var link = document.createElement("a");
                //     link.download = "html_image.png";
                //     link.href = canvas.toDataURL("image/png");
                //     link.target = '_blank';
                //     link.click();
                    //document.body.appendChild(canvas);
                // $(img).css({
                //     "width": canvas.width / 2 + "px",
                //     "height": canvas.height / 2 + "px",
                // })
            });
        },


        returnAll: function (e) {
            this.editSign = false;
            this.editName = false;
            this.save = false;
        },
    }
})
