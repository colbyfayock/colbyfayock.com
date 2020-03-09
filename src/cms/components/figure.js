// Via https://gist.github.com/lnalex/2881c29649bc5d477954f79b3071e408

export const figure = {
  id: 'figure',
  label: 'Figure',
  fields: [
    {
      name: 'src',
      label: 'Image',
      widget: 'image'
    },
    {
      name: 'caption',
      label: 'Caption',
      widget: 'string'
    },
    {
      name: 'link',
      label: 'Link',
      widget: 'string'
    }
  ],
  pattern: /^{{<\s*figure (?:(src|caption|link)="([^"]*)")*\s*(?:(src|caption|link)="([^"]*)")*\s* (?:(src|caption|link)="([^"]*)")*\s*(?:(src|caption|link)="([^"]*)")*\s*>}}$/,
  fromBlock: function(match) {

    var src = '';
    var caption = '';
    var link = '';

    for ( var i = 1; i < match.length; i += 2 ) {
      if ( typeof match[i] === 'string' ) {
        if ( match[i].includes('src') ) {
          src = match[i + 1];
        } else if ( match[i].includes('caption') ) {
          caption = match[i + 1];
        } else if ( match[i].includes('link') ) {
          link = match[i + 1];
        }
      }
    }

    return {
      src: src,
      caption: caption,
      link: link
    };
  },
  toBlock: function(obj) {
    return '{{<figure src="' + obj.src + '" caption="' + obj.caption + '" link="'+ obj.link +'">}}';
  },
  toPreview: function(obj) {

    var output = "";

    if (obj.link.length > 0) {
      output =
        '<a href="'+ obj.link + '" target="_blank"><img src="' + obj.src + '"/></a>'
      ;
    } else {
      output =
        '<img src="' + obj.src + '"/>'
      ;
    }

    if (obj.caption.length > 0) {
      output += '<br> <i style="font-size: 0.7em">'+ obj.caption +'</i>';
    }

    return ( output );
  }
}