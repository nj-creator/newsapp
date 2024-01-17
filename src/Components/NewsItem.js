import React, { Component } from 'react'
import image from './blank-profile-picture-973460.svg'
export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, date, author, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={imageUrl ? imageUrl : image} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%' ,zIndex: '1'}}>{source}</span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted"> By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={url} className="btn btn-sn btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
