import React from "react";

const NewsItem = (props)=> {
    let { title, description, imageurl, newsurl, author, date, source } = props;
    return (
      <>
        <div className="my-3">
          <div className="card bg-dark">
            <span className="position-absolute top-0  translate-middle badge rounded-pill text-bg-danger " style={{left:'80%',zindex:'1'}}>
             Source: {source}
            </span>
            <img src={!imageurl ? "https://media.kcentv.com/assets/KCEN/images/bae2a88d-a2ad-4915-896e-bac155464013/20250123T010107/bae2a88d-a2ad-4915-896e-bac155464013_1140x641.jpg": imageurl } alt={source} className="text-white"/>
            <div className="card-body text-white">
              <h5 className="card-title">{title} </h5>
              <p className="card-text"> {description}</p>
              <hr className="border border-light opacity-75 h-3"/>
              <p className="card-text">
                <small className="text-white">
                  By {author} on {new Date(date).toGMTString()}
                </small>
              </p>
              
              <a
                rel="noreferrer"
                href={newsurl}
                target="_blank"
                className="btn btn-outline-info"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  
}

export default NewsItem;
