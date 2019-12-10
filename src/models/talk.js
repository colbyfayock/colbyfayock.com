import { normalizePathname } from 'lib/routes';

class Talk {
  constructor(node) {
    const { frontmatter = {}, fields = {}, html, excerpt } = node;
    const { title, date, video, slides } = frontmatter;
    const { slug } = fields;

    this.title = title;
    this.date = date;
    this.path = normalizePathname(slug);
    this.video = video;
    this.slides = slides;
    this.html = html;
    this.excerpt = excerpt;
  }
}

export default Talk;