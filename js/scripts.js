import $ from 'jquery'; // jquery 
import TweenMax from 'gsap'; // gsap

$('body').css('background-color' , 'green');


TweenMax.to('.box' , 1,{
   x: 400,
   rotation : 180    
} )


let age = 26;



console.log(age);