<?php
$txt_txtName = $_POST['name'];
$txt_txtEmail = $_POST['email'];
$txt_txtBusiness = $_POST['business'];
$txt_txtDiscovery = $_POST['discovery'];
$txt_txtMessage = $_POST['message'];
 

$mail_to = 'moderncultivator@gmail.com';
$mail_from = $txt_txtEmail;

$body_message = 'From: '.$txt_txtName."\n";
$body_message .= 'E-mail: '.$txt_txtEmail."\n";
$body_message .= 'Business: '.$txt_txtBusiness."\n";
$body_message .=  'Discovery:'.$txt_txtDiscovery."\n";
$body_message .= 'Message: '.$txt_txtMessage."\n";

$headers = 'From: '.$txt_txtName. ' '.$txt_txtEmail ."\r\n";
$headers .= 'Reply-To: '.$txt_txtEmail."\r\n";

$mail_status = mail($mail_to, $body_message, $headers);

if ($mail_status) { ?>
    <script language="javascript" type="text/javascript">
    alert('Message is sent. Thank you!');
        // window.location = '../thank-you';
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