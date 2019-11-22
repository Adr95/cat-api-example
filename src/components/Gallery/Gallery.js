import React, { Component } from "react";
import axios from "axios";
import GalleryImage from './GalleryImage/GalleryImage';
import './Gallery.scss';

const headers = {
    "x-api-key": "6e011be9-66ff-4bca-82e6-4d23a6878904"
}

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    cats: [],
    isScrollable: false,
    enableScroll: true,
    interval: null
  };

  getCats = () => {
    
    //I want to make sure to not send to many requests on scrolling before the fetched 10 images are displayed on first call
    this.setState({
        enableScroll: false
    })

    axios
        .get("https://api.thecatapi.com/v1/images/search?limit=10",{headers})
        .then(response => {
            const data = response.data;
            this.setState({
            cats: [...this.state.cats.concat(data)],
            enableScroll: true
            });
            this.checkWindowFill()   
        })
        .catch(error => {
            alert(error)
        });
    }

    // I want to make sure that the document is scrollable. If not I load as much images as neccesary to make it scrollable
    checkWindowFill = () => {
        if (window.innerHeight > document.body.clientHeight) {
            this.getCats();
        } else {
            this.setState({
                isScrollable: true
            })
        }
    }   

    moveBottomHandler = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    // Clicking on a button should move user to the bottom of the page after 10 seconds,
    //but have i used 4 seconds in order to not wait for for so long.
    clickHandler = () => {
        let moveBottom = setInterval(() => this.moveBottomHandler(), 4000);
        this.setState({
            interval: moveBottom
        })
    }

  scrollHandler = () => {
    if(this.state.enableScroll){
        const lastElement = document.querySelector('.Gallery .GalleryImage:last-child')
        const lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight
        if(pageOffset >= lastElementOffset) {
            this.getCats();
        }
    }else {
        return false;
    }
    
}

  componentDidMount() {
    this.getCats();
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({
        interval: null
    })
  }

  render() {
    return (
            <div className="Gallery">
                <h1>Cats gallery</h1>
                <div className="ButtonWrapper">
                    <button onClick={this.clickHandler}>press for autoplay</button> or use your scroll wheel : P
                </div>
                <div className="Gallery_inner">
                {this.state.cats.map((item, index) => (
                        <GalleryImage key={index} source={item.url} />
                    ))}
                </div>     
            </div>
    );
  }
}


export default Gallery;



