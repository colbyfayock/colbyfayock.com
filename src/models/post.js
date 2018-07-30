const DEFAULT_CATEGORY = 'updates';

const CATEGORIES = [
    {
        label: 'Coding',
        value: 'coding',
    },
    {
        label: 'Graphic Design',
        value: 'graphic-design',
    },
    {
        label: 'Photography',
        value: 'photography',
    },
    {
        label: 'Theming',
        value: 'theming',
    },
    {
        label: 'UI Design',
        value: 'ui-design',
    },
    {
        label: 'Updates',
        value: 'updates',
    },
    {
        label: 'Web Design',
        value: 'web-design',
    },
];

class Post {

    constructor(node) {
        this.title = node.frontmatter.title;
        this.path = node.fields.slug;
        this.date = node.frontmatter.date;
        this.template = node.frontmatter.template;
        this.category = this.categoryFromValue(node.frontmatter.category);
        this.excerpt = node.excerpt;
        this.html = node.html;
    }

    categoryFromValue( category_value = DEFAULT_CATEGORY ) {

        let matching_category = CATEGORIES.find((category) => category.value === category_value);

        if ( !matching_category ) {
            matching_category = CATEGORIES.find((category) => category.value === DEFAULT_CATEGORY);
        }

        if ( typeof matching_category !== 'object' ) {
            return null;
        }

        return matching_category.label;

    }

}

export default Post;