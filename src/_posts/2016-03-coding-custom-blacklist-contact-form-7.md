---
template: post
title: Custom Blacklist Contact Form 7
path: /2016/03/coding/custom-blacklist-contact-form-7/
date: 2016-03-11T02:58:58Z
categories: Coding
---
Easily set up a blacklist for those marketing lists that somehow get around [Akismet](https://akismet.com/). Throw the below in your functions.php file and customize the $blacklist array to filter by email address to your liking.

```
function contactFilterBlacklist( $result, $tag ) {
        $tag = new WPCF7_Shortcode( $tag );
        $blacklist = array(
                        'filterme'
        );

        $yourEmail = isset( $_POST['your-email'] ) ? trim( $_POST['your-email'] ) : false;
        if ( !$yourEmail ) return $result;

        foreach ( $blacklist as $keyword ) {
                        if ( strpos($yourEmail, $keyword) !== false ) $valid = false;
        }

        if ( !$valid ) $result-&gt;invalidate( $tag, "Uh oh. Something's wrong here..." );

        return $result;
}

add_filter( 'wpcf7_validate_email*', 'contactFilterBlacklist', 20, 2 );
```

Head over to this [Contact Form 7 post](http://contactform7.com/2015/03/28/custom-validation/) or [their documentation](http://contactform7.com/docs/) to learn more.