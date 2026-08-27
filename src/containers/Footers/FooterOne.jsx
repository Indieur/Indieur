import React from 'react';
import {Link} from 'react-router-dom';
import {
  InfoMedia, 
  Widget, 
  AboutWidget, 
  CategoryWidget, 
  RecentPostWidget, 
  IconLink
} from '../../components/';

// Widget Datas
import widgetsdata from '../../data/widgets.json';

const {pageList, exploreLinks, recentPosts} = widgetsdata;


const FooterOne = ()=> (
  <footer className="footer-wrapper footer-layout1 background-image" style={{backgroundImage: 'url(images/shape/bg-footer-1-1.jpg)'}}>
    <div className="footer-top">
      <div className="container">        
        <div className="row">        
          <div className="footer-media col-sm">
            <InfoMedia
              icon="fal fa-map-marker-alt"
              title="Office Address"
              info="259 Hilton Street, MK 256 North, United State"
            />
          </div>
          <div className="footer-media col-sm">
            <InfoMedia
              icon="fal fa-clock"
              title="Working Hours"
              info="Weekdays 8am - 22pm Weekend 10am - 12pm"
            />
          </div>
          <div className="footer-media col-sm">
            <InfoMedia
              icon="fal fa-phone-volume"
              title="Contact Us"
              info={<>
                <a href="mailto:info@example.com">info@example.com</a>
                <br/>
                <a href="tel:+2597462153">(+259) 746 2153</a>
              </>}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="widget-area">
      <div className="container">
        <div className="row justify-content-between">            
          <div className="col-md-6 col-xl-auto">
            <Widget widgetTitle="About Us" className="footer-widget">
              <AboutWidget>
                <AboutWidget.Text>Intrinsicly evisculate emerging cutting edge scenarios redefine future-proof e-markets demand line</AboutWidget.Text>
                <IconLink className="footer-social">
                  <IconLink.Item icon="fab fa-facebook-f" path="/"/>
                  <IconLink.Item icon="fab fa-twitter" path="/"/>
                  <IconLink.Item icon="fab fa-behance" path="/"/>
                  <IconLink.Item icon="fab fa-youtube" path="/"/>
                  <IconLink.Item icon="fab fa-instagram" path="/"/>
                </IconLink>
              </AboutWidget>
            </Widget>
          </div>
          <div className="col-6 col-xl-auto">            
            <Widget widgetTitle="Links" className="widget_nav_menu footer-widget">
              <CategoryWidget>
                {pageList.map(cat => (
                  <CategoryWidget.Item key={cat.name} path={cat.path}>{cat.name}</CategoryWidget.Item>
                ))}
              </CategoryWidget>
            </Widget>
          </div>
          <div className="col-6 col-xl-auto">            
            <Widget widgetTitle="Explore" className="widget_nav_menu footer-widget">
              <CategoryWidget>
                {exploreLinks.map(cat => (
                  <CategoryWidget.Item key={cat.name} path={cat.path}>{cat.name}</CategoryWidget.Item>
                ))}
              </CategoryWidget>
            </Widget>
          </div>
          <div className="col-md-6 col-xl-auto">            
            <Widget widgetTitle="Lastest Post" className="footer-widget">
              {recentPosts.slice(0, 2).map(post => (
                <RecentPostWidget key={post.id}
                  title={post.title}
                  image={post.image}
                  date={post.date}
                />
              ))}
            </Widget>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright-wrap">
      <div className="container">
        <p className="copyright-text">Copyright <i className="fal fa-copyright"/> 2022 <Link className="text-white" to="/">TechBiz</Link>. All rights reserved by <a className="text-white" href="https://themeforest.net/user/vecuro_themes">Vecuro</a>.</p>
      </div>
    </div>    
  </footer>
);

export default FooterOne;