import $ from 'jquery'; // jquery 
import TweenMax from 'gsap'; // gsap
import '../sass/style.scss';
// import '../css/header.css';
// import '../css/footer.css';

$('body').css('background-color' , 'green');


TweenMax.to('.box' , 2,{
   x: 400,
   y: 300,
   rotation : 180,
   backgroundColor : 'white' ,
   borderRadius: '50%'   
})








let age = 26;

// gulp
//src  進入點
// dest 輸出點 



console.log(age);