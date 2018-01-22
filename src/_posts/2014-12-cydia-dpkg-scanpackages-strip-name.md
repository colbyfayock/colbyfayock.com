---
template: post
title: dpkg-scanpackages Stripping Name Field
path: /2014/12/cydia/dpkg-scanpackages-strip-name/
date: 2014-12-25T14:46:32Z
categories: Cydia, Theming
---
dpkg-scanpackages isn't designed to take in some of the user defined fields Cydia repos use. Saurik points out in his How to Host a Cydia Package post how to easily fix this.
<blockquote>This is rather easy: simply add "Name", "Author", "Homepage", and "Icon" to the end of the array "fieldpri".</blockquote>
Not sure which one the mac specifically uses, but you can find the script files for dpkg-scanpackages in these locations (assuming they might be in the same spot :) ):
<blockquote>./sw/bin/dpkg-scanpackages

./opt/local/bin/dpkg-scanpackages</blockquote>
Otherwise do a little search from the root directory with:
<blockquote>sudo find . -name "*scanpackages*"</blockquote>
        <wp:postmeta>
            media-links
            {"How to Host a Cydia Repo via Saurik": "http://www.saurik.com/id/7"}
        </wp:postmeta>
    </item>