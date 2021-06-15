const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');



// 列印在終端機上
function defaultTask(cb) {
    console.log('hello cfd101');
    cb();
}

exports.do = defaultTask;


function missA(cb){
    console.log('任務Ａ');
    cb();
}

function missB(cb){
    console.log('任務B');
    cb();
}


//順序
exports.async = series(missA , missB);


//並行
exports.sync = parallel(missA , missB);



//======= 合併檔案  ===============
//  src(來源檔案).pipe().pipe(dest(目的地))

var concat = require('gulp-concat');

function concatcss(){
    return src(['css/**/*.css' , 'css/*.css' ,'!css/aboutus/*.css' ])
    .pipe(concat('style.css'))
    .pipe(dest('css/allcss/'))
}

function concatjs(){
    return src('js/*.js')
    .pipe(concat('script.js'))
    .pipe(dest('js/all/'))
}


exports.allcss = concatcss;
exports.alljs = concatjs;

 
//======= 壓縮css  ===============
const cleanCSS = require('gulp-clean-css');

function cleancss(){
  return src('css/allcss/*.css')
  .pipe(cleanCSS({compatibility: 'ie10'}))
  .pipe(dest('minicss')) 
}

exports.minicss = cleancss;

//======= 壓縮js  ===============
const uglify = require('gulp-uglify');

function ugjs(){
    return src('js/b.js')
    .pipe(uglify())
    .pipe(dest('minijs'))
}

exports.minijs = ugjs;

// === rename 更改檔案名稱 ===
 const rename = require('gulp-rename');

//====== 合併 + 壓縮css + 更改檔名

function concat_css(){
    return src('css/**/*.css')
    .pipe(concat('style.css'))// 合併
    .pipe(cleanCSS({compatibility: 'ie10'})) // 壓縮
    .pipe(rename({
             extname: '.min.css'
        })) // 改副檔名
    .pipe(dest('css/'))
}
// exports.all = series(concat_css);

// 監看任務 執行打包
// function watchfile(){
//     watch('css/**/*.css' ,concat_css)
//     // watch('js/**/*.js' ,任務)
// }

// exports.w = watchfile;


// // 合併 -> 壓縮
// function concat_css(){
//     return src('css/**/*.css')
//     .pipe(concat('style.css'))
//     .pipe(dest('minicss'))
// }


// function mini_css(){
//     return src('minicss/style.css')
//     .pipe(cleanCSS({compatibility: 'ie10'}))
//     .pipe(dest('minicss/mini/'))
// }

// exports.all = series(concat_css , mini_css);

// css sass 編譯
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');// 回朔到原本開發的檔案
const autoprefixer = require('gulp-autoprefixer');


// 沒有壓縮的  expanded 
function sass_style(){
    return src('dev/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
    .on('error', sass.logError))
    .pipe(sourcemaps.write())
    //.pipe(cleanCSS({compatibility: 'ie10'}))
//     .pipe(rename({
//         extname: '.min.css'
//    })) // 改副檔名
    .pipe(dest('dist/css'))
}

// 解決跨瀏覽器的問題 

function prefixer(){
    return src('dist/css/*.css')
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(dest('dist/css/prefix'))
}

exports.prefix = prefixer;



// gulp-file-include 合併 html
const fileinclude = require('gulp-file-include');

function html(){
    return src(['dev/*.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('dist'))
}


// 監看 sass html 變動
// function watch_all(){
//     watch(['dev/sass/**/*.css' , 'dev/sass/*.scss'] , sass_style)
//     watch(['dev/*.html' , 'dev/**/*.html'] , html)
//     //console.log('執行成功')
//     // watch('js/**/*.js' ,任務)
// } 

// exports.default = watch_all;

// ================ 壓縮圖片============

const imagemin = require('gulp-imagemin');

function min_images(){
    return src('dev/images/*.*')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 70, progressive: true}) // 壓縮品質 
    ]))
    .pipe(dest('dist/images'))
}

exports.minify_img = min_images;


// ================ 清除舊檔案 ============
 
const clean = require('gulp-clean');

function cleanfile(){
    return src(['dist/*.*' , 'dist/**/*.*'], { read : false })
    .pipe(clean({force : true }))
}






// ================ 瀏覽器 ============
const browserSync = require('browser-sync');
const reload = browserSync.reload;

function browser(done){
   browserSync.init({
     server: {
         baseDir : "dist",
         index: 'index.html'
     },
     port : 3000  
   });
   watch(['dev/sass/**/*.css' , 'dev/sass/*.scss'] , sass_style).on('change' , reload)
   watch(['dev/*.html' , 'dev/**/*.html'] , html).on('change' , reload)
   done();
}

exports.default = series(cleanfile ,browser);















