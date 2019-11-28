<?php
//we need to get our variables first

$email_to = 'jb.t.leloup@gmail.com'; //the address to which the email will be sent

$name = isset($_POST['name']) ? $_POST['name'] : "";
$email = isset($_POST['email']) ? $_POST['email']: "";
$phone = isset($_POST['phone']) ? $_POST['phone'] : "";
$companyName = isset($_POST['company-name']) ? $_POST['company-name'] : "";
$companyWebsite = isset($_POST['company-website']) ? $_POST['company-website'] : "";
$budget = isset($_POST['budget']) ? $_POST['budget'] : "";
$consulting = isset($_POST['consultingCheckbox']) ? $_POST['consultingCheckbox'] : "";
$marketing = isset($_POST['marketingCheckbox']) ? $_POST['marketingCheckbox'] : "";
$socialMedia = isset($_POST['socialMediaCheckbox']) ? $_POST['socialMediaCheckbox'] : "";
$influencers = isset($_POST['influencersCheckbox']) ? $_POST['influencersCheckbox'] : "";
$paidAdvertisement = isset($_POST['paidAdvertisementCheckbox']) ? $_POST['paidAdvertisementCheckbox'] : "";
$website = isset($_POST['websiteCheckbox']) ? $_POST['websiteCheckbox']: "";
$event = isset($_POST['eventCheckbox']) ? $_POST['eventCheckbox'] : "";
$contentCreation = isset($_POST['contentCreationCheckbox']) ? $_POST['contentCreationCheckbox'] : "";
$message = isset($_POST['message']) ? $_POST['message'] : "";

/*the $header variable is for the additional headers in the mail function,
 we are asigning 2 values, first one is FROM and the second one is REPLY-TO.
 That way when we want to reply the email gmail(or yahoo or hotmail...) will know
 who are we replying to. */
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

$emailContent = "Name: " . $name . "\n"
    . "Email: " . $email . "\n"
    . "Company Name: " . $companyName . "\n"
    . "Company Website: " . $companyWebsite . "\n"
    . "Budget: $" . $budget . "\n"
    . "Interests: " . $consulting . "-" . $marketing . "-" . $socialMedia . "-" . $influencers
    . "-" . $paidAdvertisement . "-" . $website . "-" . $event . "-" . $contentCreation . "\n"
    . "Message: " . $message;

$subject = "Contact Formed Submitted at BMM-agency.com";

echo $emailContent;
/*if(mail($email_to, $subject, $emailContent, $headers)){
    echo 'sent'; // we are sending this text to the ajax request telling it that the mail is sent..
}else{
    echo 'failed';// ... or this one to tell it that it wasn't sent
}*/
