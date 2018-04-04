<?php
$txt_txtName = $_POST['full_name'];
$txt_txtEmail = $_POST['email'];
$txt_txtBusinessName = $_POST['business_name'];
$txt_txtBusinessType = $_POST['business_type'];
$txt_txtBusinessAddress = $_POST['business_address'];
$txt_txtDiscovery = $_POST['discovery'];
$txt_txtMessage = $_POST['message'];
 
$subject = "Inquiry re: portlandstreetcarbars";
$mail_to = 'moderncultivator@gmail.com';
$mail_from = $txt_txtEmail;

$body_message = $subject.' from '.$txt_txtBusinessName;
// $body_message .= 'E-mail: '.$txt_txtEmail."\n";
// $body_message .= 'Business: '.$txt_txtBusiness."\n";
// $body_message .=  'Discovery:'.$txt_txtDiscovery."\n";
// $body_message .= 'Message: '.$txt_txtMessage."\n";

$headers = 'From: '.$txt_txtName. ' <'.$txt_txtEmail .">\r\n";
//$headers .= 'Reply-To: '.$txt_txtEmail."\r\n";
$headers .= 'Business Name: '.$txt_txtBusinessName."\r\n";
$headers .= 'Business Type: '.$txt_txtBusinessType."\r\n";
$headers .= 'Business Address: '.$txt_txtBusinessAddress."\r\n";
$headers .= 'Discovery: '.$txt_txtDiscovery."\r\n";
$headers .= 'Message: '.$txt_txtMessage."\n";

$mail_status = mail($mail_to, $body_message, $headers);

if ($mail_status) { ?>
    <script language="javascript" type="text/javascript">
      console.log('Message is sent. Thank you!');
      window.location = '../thank-you';
    </script>
<?php
}
else { ?>
    <script language="javascript" type="text/javascript">
        alert('Message failed. Please, send an email to moderncultivator@gmail.com');
    //     window.location = 'fail.html';
    // </script>
<?php
}
?>