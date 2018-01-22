---
template: blog-post
title: Custom Blacklist Contact Form 7
path: /2016/03/coding/custom-blacklist-contact-form-7/
date: 2016-03-11T02:58:58Z
categories: Coding
---
Easily set up a blacklist for those marketing lists that somehow get around <a href="https://akismet.com/">Akismet</a>. Throw the below in your functions.php file and customize the $blacklist array to filter by email address to your liking.

<code>
function contactFilterBlacklist( $result, $tag ) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$valid = true;
&nbsp;&nbsp;&nbsp;&nbsp;$tag = new WPCF7_Shortcode( $tag );
&nbsp;&nbsp;&nbsp;&nbsp;$blacklist = array(
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'filterme'
&nbsp;&nbsp;&nbsp;&nbsp;);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$yourEmail = isset( $_POST['your-email'] ) ? trim( $_POST['your-email'] ) : false;
&nbsp;&nbsp;&nbsp;&nbsp;if ( !$yourEmail ) return $result;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;foreach ( $blacklist as $keyword ) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( strpos($yourEmail, $keyword) !== false ) $valid = false;
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;if ( !$valid ) $result-&gt;invalidate( $tag, "Uh oh. Something's wrong here..." );
<br>
&nbsp;&nbsp;&nbsp;&nbsp;return $result;
}
<br>
add_filter( 'wpcf7_validate_email*', 'contactFilterBlacklist', 20, 2 );
</code>

Head over to this <a href="http://contactform7.com/2015/03/28/custom-validation/">Contact Form 7 post</a> or <a href="http://contactform7.com/docs/">their documentation</a> to learn more.
        <wp:postmeta>
            media-links
            {"Custom Validation": "http://contactform7.com/2015/03/28/custom-validation/"}
        </wp:postmeta>
    </item>