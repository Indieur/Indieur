import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import {
  TitleWrap,
  SecSubTitle,
  SecTitle,
  List,
  Button
} from '../../components';

const AboutSix = ({className})=> {

  const TABDATA = [
    {
      id: 'tab1',
      title: 'Digital Marketing',
      subtitle: '259 Jobs Done',
      icon: 'images/icon/sr-icon-3-1.png',
      image: 'images/about/ab-6-1.jpg',
      text: 'Energistically brand efficient paradigms vis resource maximizing process improvements. Dramatically repurpose stand-alone bandwidth after centric strategic theme areas. Intrinsicly build synergistic...',
      feature: ['Fast Growing Sells', '24/7 Quality Services', 'Skilled Team Members', 'Best Quality Services'],
      btntext: 'Learn More',
      path: '/service-details'
    },
    {
      id: 'tab2',
      title: 'Web Development',
      subtitle: '156 Jobs Done',
      icon: 'images/icon/sr-icon-3-2.png',
      image: 'images/about/ab-6-2.jpg',
      text: 'Energistically brand efficient paradigms vis resource maximizing process improvements. Dramatically repurpose stand-alone bandwidth after centric strategic theme areas. Intrinsicly build synergistic...',
      feature: ['Fast Growing Sells', '24/7 Quality Services', 'Skilled Team Members', 'Best Quality Services'],
      btntext: 'Learn More',
      path: '/service-details'
    },
    {
      id: 'tab3',
      title: 'Machine Learning',
      subtitle: '592 Jobs Done',
      icon: 'images/icon/sr-icon-3-3.png',
      image: 'images/about/ab-6-3.jpg',
      text: 'Energistically brand efficient paradigms vis resource maximizing process improvements. Dramatically repurpose stand-alone bandwidth after centric strategic theme areas. Intrinsicly build synergistic...',
      feature: ['Fast Growing Sells', '24/7 Quality Services', 'Skilled Team Members', 'Best Quality Services'],
      btntext: 'Learn More',
      path: '/service-details'
    },
    {
      id: 'tab4',
      title: 'Software Services',
      subtitle: '1259 Jobs Done',
      icon: 'images/icon/sr-icon-3-4.png',
      image: 'images/about/ab-6-4.jpg',
      text: 'Energistically brand efficient paradigms vis resource maximizing process improvements. Dramatically repurpose stand-alone bandwidth after centric strategic theme areas. Intrinsicly build synergistic...',
      feature: ['Fast Growing Sells', '24/7 Quality Services', 'Skilled Team Members', 'Best Quality Services'],
      btntext: 'Learn More',
      path: '/service-details'
    },
  ]  
  
  return (
    <div className={`position-relative ${className || ''}`}>
      <div className="service-shape1"></div>
      <div className="container">
        <TitleWrap className="text-center">
          <SecSubTitle>Types Of Our Services</SecSubTitle>
          <SecTitle className="text-capitalize h1">Our Available Services</SecTitle>
        </TitleWrap>
        <Tab.Container id="serviceTab" defaultActiveKey={TABDATA[0].id}>
          <Nav className="service-tab-menu">
            {TABDATA.map((item) => (
              <Nav.Link key={item.id} eventKey={item.id}>
                <span className="btn-img"><img src={item.icon} alt="tabicon"/></span>
                <span className="btn-title h6">{item.title}</span>
                <span className="btn-text">{item.subtitle}</span>
              </Nav.Link>
            ))}
          </Nav>
          <Tab.Content>
            {TABDATA.map((item) => (
              <Tab.Pane key={item.id} eventKey={item.id}>
                <div className="row gx-60 gy-30">
                  <div className="col-lg-6">
                    <img src={item.image} alt="tabthumb" style={{borderRadius: '7px', width: '100%'}} />
                  </div>
                  <div className="col-lg-6">
                    <div className="about-box1">                      
                      <h2 className="about-title h3">{item.title}</h2>
                      <span className="about-subtitle">{item.subtitle}</span>
                      <p className="about-text">{item.text}</p>
                      <List className="list-style2">
                        {item.feature.map((list, index) => (
                          <List.Item key={index}><i className="fas fa-check-circle"/>{list}</List.Item>
                        ))}
                      </List>
                      <Button path={item.path}>{item.btntext}<i className="far fa-arrow-right"/></Button>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default AboutSix;