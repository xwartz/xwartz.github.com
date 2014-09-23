 var images = new Array()
 function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
            images[i] = new Image()
            images[i].src = preload.arguments[i]
        }

        return images;
    }
    preload(
    	
    	'http://f7.topit.me/7/57/f9/113112783973df9577l.jpg',
    	'http://f7.topit.me/7/86/b9/112487028510bb9867l.jpg',
    	'http://f4.topit.me/4/2d/a8/11248702340eda82d4l.jpg',
    	'http://ff.topit.me/f/0d/f9/118743658375ef90dfl.jpg',
    	'http://i10.topit.me/t109/10109535808d4098e9.jpg',
    	'http://f12.topit.me/l122/101226730290e41761.jpg',
    	'http://f1.topit.me/1/f4/86/112264645936386f41l.jpg',
    	'http://i10.topit.me/l025/1002507191611a5ccf.jpg',
    	'http://i5.topit.me/5/45/e8/1183010778b02e8455l.jpg',
    	'http://f12.topit.me/l101/10101314567fd63b2e.jpg',
    	'http://f1.topit.me/1/31/49/112654227158b49311l.jpg',
    	'http://fd.topit.me/d/69/c4/1121794847615c469dl.jpg',
    	'http://i10.topit.me/l167/10167697908d22345d.jpg',
    	'http://i10.topit.me/l128/1012886157888bf2e5.jpg',
    	'http://f11.topit.me/t/201010/04/12862016599260.jpg',
    	'http://f11.topit.me/l/201002/26/12671528975935.jpg',
    	'http://f11.topit.me/l/201005/10/12735029693898.jpg',
    	'http://i10.topit.me/t154/101545352827be1f30.jpg',
    	'http://i11.topit.me/l/201011/01/12886163338383.jpg'
    	
       );