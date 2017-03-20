<div class="container">
  <div class="section">
    <!--   Icon Section   -->
    <div class="row">
      <div class="col s12 center">
        <div class="icon-block">
          <h2 class="center lime-text"><i class="material-icons star">star</i></h2>
        </div>
        <h1><span class="background-heading">Portland Streetcar Bars</span></h1><h1>Your Favorites</h1>
        
        <h3><i class="mdi-content-send brown-text"></i></h3>
        <h4>Here's a list of your saved favorites.</h4>
        <div class="col s12 m6">
          <div class="icon-block">
            <h2 class="center lime-text"><i class="material-icons">star</i></h2>
            <h5 class="center">Favorites</h5>
            <ul class="collection">
              <li ng-repeat="data in datas | filter: wine" class="wine">
                <div class="collection-item avatar">
                  <img class="circle " ng-src="{{data.image}}" />
                  <span class="title">{{data.name}}</span>
                  <p ng-bind-html="data.features  | to_trusted"></p>
                  <div class="filterblock">
                    <!-- <input id="savetofave" type="checkbox" name="check" value="0" class="savetofave">
                    <label for="savetofave">save to favorites</label> -->
                  </div>
                 <!--  <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
                </div>
              </li>
            </ul>           
          </div><!-- e-iconblock --> 
	</div> 
   </div>
 </div>
</div>