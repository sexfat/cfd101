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
function watchfile(){
    watch('css/**/*.css' ,concat_css)
    // watch('js/**/*.js' ,任務)
}

exports.w = watchfile;


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













