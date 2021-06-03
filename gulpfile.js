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








