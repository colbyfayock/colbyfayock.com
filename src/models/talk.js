import { normalizePathname } from 'lib/routes';

class Talk {
  constructor(node) {
    const { frontmatter = {}, fields = {}, html, excerpt } = node;
    const { title, date, video, video_embed, slides, link, link_label } = frontmatter;
    const { slug } = fields;

    this.title = title;
    this.date = date;
    this.path = normalizePathname(slug);
    this.video = video;
    this.video_embed = video_embed;
    this.slides = slides;
    this.link = link;
    this.link_label = link_label;
    this.html = html;
    this.excerpt = excerpt;
  }
}

export default Talk;