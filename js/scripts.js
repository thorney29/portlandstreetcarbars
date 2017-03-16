$(document).ready(function(){
	// $(".chip").each(function(){
	// 	 $(this).contents().filter(function(){ 
	// 	  return this.nodeType == 3; 
	// 	})[0].nodeValue = ""
	// }); 
 //   var text =
 $('.modal-trigger').leanModal();

 $('a[href*="http"]').each(function() {
		 $(this).attr('target', '_blank');
 });
});

jQuery.fn.justtext = function() {
  
	return $(this)	.clone()
			.children()
			.remove()
			.end()
			.text();

};
$(document).ready(function() {

  $("#dropdown").change(function() {
     var address = $("#dropdown :selected")[0].text;
    $('input#barQuery').val(address);           
  }); 

  // $(function(){
  //   var url = window.location.pathname, 
  //   urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
  //   // now grab every link from the navigation
  //   $('nav a').each(function(){
  //       // and test its normalized href against the url pathname regexp
  //       if(urlRegExp.test(this.href.replace(/\/$/,''))){
  //           $(this).addClass('current');
  //       }
  //   });
  // });

  // Scroll back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
          backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    $('li a').click(function() {
      $("li a.current").removeClass("current");
      $(this).addClass('current');
});
  
     
}); //end documentready 
// $(document).ready(function(){
//   $(function(){
//     var url = window.location.href; 
//     $("nav a").each(function() {
//         if(url == (this.href)) { 
//             $(this).closest("a").addClass("current");
//         }
//     });
//   $('h2.name a').each(function() { 
//     var str = $(this).text();
//       if(str.length > 13) {
//        $(this).parent().css('font-size','2.8rem');
//       $(this).parent().addClass('larger');
//       $(this).addClass('larger');
//     }
//   });
//   $(function(){
//     var url = window.location.href; 
//     $(".shutter li a").each(function() {
//       if(url == (this.href)) { 
//           $(this).closest("a").addClass("current");
//       }
//     });
//   });
// });
// (function(){
//   $('h2.name a').each(function() { 
//     var str = $(this).text();
//       if(str.length > 13) {
//        $(this).parent().css('font-size','2.8rem');
//       $(this).parent().addClass('larger');
//       $(this).addClass('larger');
//     }
//   });
// })();

// (function(){
//   	var parallax = document.querySelectorAll(".parallax"),
//       speed = 0.35;
// 	window.onscroll = function(){
//     	[].slice.call(parallax).forEach(function(el,i){
// 	      var windowYOffset = window.pageYOffset,
//           elBackgrounPos = "0 " + (windowYOffset * speed) + "px";  
// 	      el.style.backgroundPosition = elBackgrounPos;
//     });
//   };
// })();

// (function() {
//   // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
//   if (!String.prototype.trim) {
//     (function() {
//       // Make sure we trim BOM and NBSP
//       var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
//       String.prototype.trim = function() {
//         return this.replace(rtrim, '');
//       };
//     })();
//   }

//   [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
//     // in case the input is already filled..
//     if( inputEl.value.trim() !== '' ) {
//       classie.add( inputEl.parentNode, 'input--filled' );
//     }

//     // events:
//     inputEl.addEventListener( 'focus', onInputFocus );
//     inputEl.addEventListener( 'blur', onInputBlur );
//   } );

//   function onInputFocus( ev ) {
//     classie.add( ev.target.parentNode, 'input--filled' );
//   }

//   function onInputBlur( ev ) {
//     if( ev.target.value.trim() === '' ) {
//       classie.remove( ev.target.parentNode, 'input--filled' );
//     }
//   }
// })();
// });

// (function() {
//   // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
//   if (!String.prototype.trim) {
//     (function() {
//       // Make sure we trim BOM and NBSP
//       var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
//       String.prototype.trim = function() {
//         return this.replace(rtrim, '');
//       };
//     })();
//   }

//   [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
//     // in case the input is already filled..
//     if( inputEl.value.trim() !== '' ) {
//       classie.add( inputEl.parentNode, 'input--filled' );
//     }

//     // events:
//     inputEl.addEventListener( 'focus', onInputFocus );
//     inputEl.addEventListener( 'blur', onInputBlur );
//   } );

//   function onInputFocus( ev ) {
//     classie.add( ev.target.parentNode, 'input--filled' );
//   }

//   function onInputBlur( ev ) {
//     if( ev.target.value.trim() === '' ) {
//       classie.remove( ev.target.parentNode, 'input--filled' );
//     }
//   }
// })();
   
// $(function(){
//     var url = window.location.href; 
//     $(".shutter li a").each(function() {
//         if(url == (this.href)) { 
//             $(this).closest("a").addClass("current");
//         }
//     });
// });
// (function(){
//     var parallax = document.querySelectorAll(".parallax"),
//       speed = 0.35;
//     window.onscroll = function(){
//       [].slice.call(parallax).forEach(function(el,i){
//         var windowYOffset = window.pageYOffset,
//           elBackgrounPos = "0 " + (windowYOffset * speed) + "px";  
//         el.style.backgroundPosition = elBackgrounPos;
//     });
//   };
// })();
 
// // $(function() {
// //   $( '#dl-menu' ).dlmenu({
// //     animationClasses : { classin : 'dl-animate-in-3', classout : 'dl-animate-out-3' }
// //   });
// //  })();
        
