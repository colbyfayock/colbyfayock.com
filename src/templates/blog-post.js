import React from "react";

const PostContent = ({html}) => {
    return (
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }}></div>
    )
}

const Post = ({content, html}) => {

    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <h1>{ content.title }</h1>
                <h2>{ content.date }</h2>
                <PostContent html={html} />
            </div>
        </div>
    )

}

export default function Template({ data }) {
    return <Post content={data.markdownRemark.frontmatter} html={data.markdownRemark.html} />;
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
            }
        }
    }
`;