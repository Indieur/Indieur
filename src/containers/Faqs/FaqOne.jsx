import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {
  ImageBoxTwo,
  SecSubTitle,
  SecTitle
} from '../../components';

// FAQ Data
import faqData from '../../data/faq.json';

const FaqOne = ({className})=> (
  <div className={`faq-wrap1 ${className || ''}`}>
    <div className="faq-shape1 background-image" style={{backgroundImage: 'url(images/bg/faq-bg-1-1.jpg)'}}></div>
    <div className="faq-shape2 background-image" style={{backgroundImage: 'url(images/bg/faq-bg-1-2.jpg)'}}></div>    
    <div className="container">
      <div className="row gx-60">
        <div className="col-lg-6 pb-20 pb-lg-0">
          <ImageBoxTwo 
            imageOne="images/faq/faq-1-1.jpg"
            imageTwo="images/faq/faq-1-2.jpg"
            video="https://www.dropbox.com/s/b4k0p5swok5l8t2/videoplayback.mp4?dl=1"
          />
        </div>
        <div className="col-lg-6 align-self-center">
          <SecSubTitle className="text-white"><i className="fas fa-bring-forward"/>Talk About Something</SecSubTitle>
          <SecTitle className="text-white mb-4 pb-2 h1">FREQUENTLY ASKED QUESTIONS</SecTitle>
          <Accordion defaultActiveKey={faqData[0].questionId} className="accordion-style1">
            {faqData.map(item => (
              <Accordion.Item key={item.questionId} eventKey={item.questionId}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body><p>{item.answer}</p></Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
);


export default FaqOne;