import React, { Component } from 'react';
import './GalleryImage.scss';


class GalleryImage extends Component {
    constructor(props){
        super(props)
    }

    state = {
        loaded: false
    }

    onLoad = () => {
        this.setState({
            loaded: true
        })
    }

    render(){
        
        return(
            <div className={"GalleryImage" + (this.state.loaded ? ' loaded' : '')}>
                <div className="GalleryImage_inner">    
                    <div className="GalleryImage_positioner">
                        {!this.state.loaded ? <div className="loader">Loading</div> : null }
                        <img src= {this.props.source} onLoad={this.onLoad} className={(this.state.loaded ? 'loaded' : '')}/> 
                    </div>
                </div>
            </div>
        )
    }
}

export default GalleryImage;