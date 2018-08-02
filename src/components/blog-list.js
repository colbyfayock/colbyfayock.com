import React from 'react';

import Post from '../models/post';

import { Link } from 'gatsby';
import BlogListPost from './blog-list-post';
import { FaHandPointDown, FaThumbsUp } from 'react-icons/fa';

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


        return posts.map(post => new Post(post.node)).filter(post => post.template === 'post');

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
            { posts.map((post, index) => <BlogListPost key={`BlogList-${index}`} post={post} />) }
        </div>
    );

}

const BlogListMore = ({posts_count, posts_to_show, handleClick}) => {
    if ( posts_count < posts_to_show || posts_to_show === 'all' ) return null;
    return (
        <div className="blog-list-more text-center">
            <Link to="/all-posts" onClick={handleClick}>
                More Posts, Please...
                <span className="fa-hand-o-down">
                    <FaHandPointDown />
                </span>
                <span className="fa-thumbs-o-up">
                    <FaThumbsUp />
                </span>
            </Link>
        </div>
    );
}

export default BlogList;