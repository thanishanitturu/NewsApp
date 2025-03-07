// import React, { Component } from 'react'

// export default class NewsItem extends Component {
//   render() {
//     let {title,description,ImageUrl,newsUrl,title1,author,date,source}=this.props;
//     return (
//       <div>
        
//     <div className="card" >
    
//   <span class="position-absolute top-0 translate-middle badge rounded-pill bg-info" id="tag" style={{left:"90%", zIndex:1}}>
//     {source}
//   </span>

  
//     <img src={ImageUrl} className="card-img-top" alt="picture not available" height="200px"></img>
//     <div className="card-body">
//     <h5 className="card-title" title={title1}>{title}...</h5>
//     <p className="card-text">{description}...</p>
//     <p class="card-text"><small class="text-body-secondary">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
//     <a href={newsUrl} target='_blank' className="btn btn-dark">Read more</a>
//   </div>
// </div>
//       </div>
//     )
//   }
// }

import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, ImageUrl, newsUrl, title1, author, date, source } = this.props;
    return (
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info" id="tag" style={{ left: "90%", zIndex: 1 }}>
          {source}
        </span>
        <img src={ImageUrl} className="card-img-top" alt="picture not available" />
        <div className="card-body">
          <h5 className="card-title" title={title1}>{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-dark">
            Read more
          </a>
        </div>
      </div>
    );
  }
}