import React from 'react';
import {Link} from 'react-router-dom';

const CommentList = ({comment, title})=> (
  <div className="vs-comments-wrap">
    <h2 className="blog-inner-title">{title}</h2>
    <ul className="comment-list">
      {comment.map((getComment, index) => (
        <CommentItem key={index} singleComment={getComment} />
      ))}
    </ul>
  </div>
);

const CommentItem = ({singleComment})=> (
  <li className="vs-comment-item">
    <div className="vs-post-comment">
      <div className="comment-avater">
        <img src={singleComment.avater} alt="Comment Author"/>
      </div>
      <div className="comment-content">
        <span className="commented-on">{singleComment.date}</span>
        <h4 className="name h4">{singleComment.author}</h4>
        <p className="text">{singleComment.comment}</p>
        <div className="reply_and_edit">
          <Link to="/blog-details" className="replay-btn"><i className="fas fa-reply"/>Replay</Link>
        </div>
      </div>
    </div>
    {singleComment.replies && (
      <ul className="children">
        {singleComment.replies.map((replay, index) => (
          <CommentItem key={index} 
            singleComment={replay}
          />
        ))}
      </ul>
    )}
  </li>
)

export default CommentList;