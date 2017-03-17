<div class="container">
  <div class="section">
    <!--   Icon Section   -->
    <div class="row">
      <div class="col s12">
        <div class="icon-block">
          <h2 class="center lime-text"><i class="material-icons directions">email</i></h2>
          <h1>Contact Us</h1>
          </div><!-- e-iconblock -->
          </div><!-- e-cols12m4 -->
    
         <form id="contactForm" class="container-flex" action="/php/contact.php" method="post" name="contactForm">
          <div class="row">
              <div class="input-field col m6 s12">
                <i class="material-icons prefix">account_circle</i>
                <input placeholder="Full Name" id="full_name" type="text" class="validate" name="full_name">
                <label for="full_name">Full Name</label>
              </div>
              <div class="input-field col m6 s12">
                <i class="material-icons prefix">business</i>
                <input placeholder="Business Name" id="business_name" type="text" class="validate" name="business_name">
                <label for="business_name">Business Name</label>
              </div>
                <div class="input-field col m6 s12">
                <i class="material-icons prefix">email</i>
                <input placeholder="Email" id="email" type="email" class="validate" name="email">
                <label for="email">Email</label>
              </div>
              <div class="input-field col m6 s12">
                <i class="material-icons prefix">business</i>
                <input placeholder="Business Address" id="business_address" type="text" class="validate" name="business_address">
                <label for="business_address">Business Address</label>
              </div>
             
               
                  <div class="input-field col s6">
                   <select name="discovery">
                    <option value="" disabled selected>How did you hear about Portland Streetcar Bars?</option>
                    <option value="Online">Online</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Word of mouth">Word of mouth</option>
                    <option value="Google">Google</option>
                    <option value="Other">Other</option>
                   </select>
                </div>       
            
                <div class="input-field col s6">  
                  <label></label>
                  <select name="business_type">
                    <option value="" disabled selected>Which word best describes your business?</option>
                    <option value="Bar">Bar</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Lounge">Lounge</option>
                    <option value="Theme">Theme</option>
                    <option value="Wine Bar">Wine Bar</option>
                    <option value="Sports Bar">Sports Bar</option>
                    <option value="Bowling Alley">Bowling Alley</option>
                    <option value="Brewery">Brewery</option>
                    <option value="Brew Pub">Brew Pub</option>
                    <option value="Cidery">Cidery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
            
            
              <div class="input-field col s12">
                <i class="material-icons prefix">mode_edit</i>
                <textarea id="message" name="message" class="materialize-textarea"></textarea>
                <label for="message">Your Message</label>
              </div>
              <div class="input-field col s12">
                <button class="btn waves-effect waves-light submit" type="submit" name="action" ng-submit="submit(contactForm)">Submit
                <i class="material-icons right">send</i>
                </button>
                
              </div>
            </div>
          </form> 
 
          </div><!-- e-cols12 -->
        </div><!-- e-row -->
      </div><!-- e-section -->
    </div><!-- e-container -->