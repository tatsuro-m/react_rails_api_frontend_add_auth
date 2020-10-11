import React from "react";
import Post from "./Post";
import Grid from "@material-ui/core/Grid";

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    get axios() {
        console.log(process.env.REACT_APP_DEV_API_URL);
        const axiosBase = require('axios');
        return axiosBase.create({
            baseURL: process.env.REACT_APP_DEV_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json'
        });
    }

    componentDidMount() {
        this.axios.get('/posts')
            .then(results => {
                console.log(results);
                this.setState({
                    posts: results.data
                });
            })
            .catch(data => {
                console.log(data);
            })
    }

    render() {
        const posts = this.state.posts.map((post) => {
            return (
                <Grid item xs={4} key={post.id}>
                    <Post
                        title={post.title}
                        content={post.content}
                    />
                </Grid>);
        });

        return (
            <Grid container spacing={4}>
                {posts}
            </Grid>
        );
    }
}

export default PostList;
