import React from 'react';
import Link from 'gatsby-link';

import BlogListPost from './blog-list-post';

import FaHandODown from 'react-icons/lib/fa/hand-o-down';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

const DEFAULT_POSTS_TO_SHOW = 5;

class BlogList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            posts_to_show: this.props.posts_to_show || DEFAULT_POSTS_TO_SHOW
        }

        this.handleClick = this.handleClick.bind(this);

    }

    blogPosts() {

        if ( !Array.isArray(this.props.posts) ) return [];

        let posts = this.props.posts;

        if ( this.state.posts_to_show !== 'all' ) {
            posts = posts.slice(0, this.state.posts_to_show + 1);
        }

        return posts.filter(post => post.node.frontmatter.template === 'post');

    }

    handleClick(e) {

        e.preventDefault();

        this.setState({
            posts_to_show: this.state.posts_to_show + 5
        });

    }

    render() {
        return (
            <div className="blog-list">

                <BlogListPosts posts={this.blogPosts()} />

                <BlogListMore posts_count={this.blogPosts().length} posts_to_show={this.state.posts_to_show} handleClick={this.handleClick} />

            </div>
        );
    }

}

const BlogListPosts = ({posts}) => {
    if ( !Array.isArray(posts) ) return null;
    return (
        <div>
            { posts.map(({ node }, index) => <BlogListPost key={`BlogList-${index}`} excerpt={node.excerpt} content={node.frontmatter} />) }
        </div>
    );
}

const BlogListMore = ({posts_count, posts_to_show, handleClick}) => {
    if ( posts_count < posts_to_show || posts_to_show === 'all' ) return null;
    return (
        <div className="blog-list-more text-center">
            <a href="#" onClick={handleClick}>
                More Posts, Please...
                <span className="fa-hand-o-down">
                    <FaHandODown />
                </span>
                <span className="fa-thumbs-o-up">
                    <FaThumbsOUp />
                </span>
            </a>
        </div>
    );
}

export default BlogList;