window.onload=function(){

  $(function(){
    var url = window.location.href; 
    $(".navMenu a").each(function() {
        if(url == (this.href)) { 
            $(this).closest("a").addClass("current");
        }
    });
});
(function(){
  	var parallax = document.querySelectorAll(".parallax"),
      speed = 0.35;
	window.onscroll = function(){
    	[].slice.call(parallax).forEach(function(el,i){
	      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "0 " + (windowYOffset * speed) + "px";  
	      el.style.backgroundPosition = elBackgrounPos;
    });
  };
})();

(function() {
  // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }

  [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
    // in case the input is already filled..
    if( inputEl.value.trim() !== '' ) {
      classie.add( inputEl.parentNode, 'input--filled' );
    }

    // events:
    inputEl.addEventListener( 'focus', onInputFocus );
    inputEl.addEventListener( 'blur', onInputBlur );
  } );

  function onInputFocus( ev ) {
    classie.add( ev.target.parentNode, 'input--filled' );
  }

  function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
      classie.remove( ev.target.parentNode, 'input--filled' );
    }
  }
})();
};

(function() {
  // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }

  [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
    // in case the input is already filled..
    if( inputEl.value.trim() !== '' ) {
      classie.add( inputEl.parentNode, 'input--filled' );
    }

    // events:
    inputEl.addEventListener( 'focus', onInputFocus );
    inputEl.addEventListener( 'blur', onInputBlur );
  } );

  function onInputFocus( ev ) {
    classie.add( ev.target.parentNode, 'input--filled' );
  }

  function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
      classie.remove( ev.target.parentNode, 'input--filled' );
    }
  }
})();
   
$(function(){
    var url = window.location.href; 
    $(".navMenu a").each(function() {
        if(url == (this.href)) { 
            $(this).closest("a").addClass("current");
        }
    });
});
(function(){
    var parallax = document.querySelectorAll(".parallax"),
      speed = 0.35;
  window.onscroll = function(){
      [].slice.call(parallax).forEach(function(el,i){
        var windowYOffset = window.pageYOffset,
          elBackgrounPos = "0 " + (windowYOffset * speed) + "px";  
        el.style.backgroundPosition = elBackgrounPos;
    });
  };
})();
 
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in-3', classout : 'dl-animate-out-3' }
  });
});
   
 
        
