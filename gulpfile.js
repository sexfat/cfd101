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













