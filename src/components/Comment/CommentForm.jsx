import React from 'react';
import {Button} from '../';

const CommentForm = ({title, subtitle})=>{

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="vs-comment-form  ">
      <div id="respond" className="comment-respond">
        <div className="form-title">
          <h3 className="blog-inner-title">{title}</h3>
          <p className="form-text">{subtitle}</p>
        </div>
        <form action="#" className="form-inner" onSubmit={handleSubmit}>
          <div className="row gx-20">
            <div className="col-md-6 form-group">
              <input type="text" className="form-control" placeholder="Your Name"/>
              <i className="fal fa-user"></i>
            </div>
            <div className="col-md-6 form-group">
              <input type="email" className="form-control" placeholder="Your Email"/>
              <i className="fal fa-envelope"></i>
            </div>
            <div className="col-12 form-group">
              <textarea className="form-control" placeholder="Comment"/>
              <i className="fal fa-pencil"></i>
            </div>
            <div className="col-12 ">
              <div className="custom-checkbox notice">
                <input id="commentcheck" name="commentcheck" type="checkbox" value="yes"/>
                <label htmlFor="commentcheck">Save my name, email, and website in this browser for the next time I comment.</label>
              </div>
            </div>
            <div className="col-12 form-group mb-0">
              <Button>Post Comment<i className="far fa-arrow-right"/></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
