import React, { Component } from 'react';
import Listing from './Listing';
import './Post.css';
 
class Posts extends Component {
    state = {  }
    render() { 
        console.log("burada")
        console.log(this.props.posts)
        return ( 
            <form className="col-md-10">
                <legend className="text-center">Post Listing Page</legend>
                <Listing 
                    posts={this.props.posts} 
                    deletePost={this.props.deletePost} 
                />
            </form>
         );
    }
}
 
export default Posts;