import React from 'react';
import {
  Widget,
  AboutWidget,
  RecentPostWidget,
  GalleryWidget,
  IconLink,
  Logo
} from '../../components/';

// Widgets Data
import widgetsData from '../../data/widgets.json';
const { recentPosts, galleryImages } = widgetsData;


const SidebarPopup = ({ className, show, onHide }) => (
  <div className={`sidemenu-wrapper ${className || ''} ${show ? 'show' : ''}`} >
    <div className="sidemenu-content">
      <button className="closeButton sideMenuCls" onClick={onHide} ><i className="far fa-times" /></button>
      <Widget>
        <AboutWidget>
          <Logo image="/images/indieur_logo.png" className="footer-logo" />
          <AboutWidget.Text>Digital growth strategy, performance marketing, WhatsApp automation, customer retention and analytics for businesses across India.</AboutWidget.Text>
          <IconLink className="footer-social">
            <IconLink.Item icon="fab fa-linkedin-in" path="https://www.linkedin.com/company/indieur" />
            <IconLink.Item icon="fab fa-instagram" path="https://www.instagram.com/indieur_/" />
            <IconLink.Item icon="fab fa-facebook-f" path="https://www.facebook.com/people/Indieur/61582584459630/" />
            <IconLink.Item icon="fab fa-youtube" path="https://www.youtube.com/@Indieur" />
          </IconLink>
        </AboutWidget>
      </Widget>
      <Widget widgetTitle="Gallery Posts">
        <GalleryWidget>
          {galleryImages.map((img, index) => (
            <GalleryWidget.Item key={index} src={`/${img}`} alt="thumb" />
          ))}
        </GalleryWidget>
      </Widget>
      {/* <Widget widgetTitle="Recent Posts">
        {recentPosts.slice(0, 2).map(post => (
          <RecentPostWidget key={post.id}
            title={post.title}
            image={post.image}
            date={post.date}
            path={post.path}
          />
        ))}
      </Widget>         */}
    </div>
  </div>
);



export default SidebarPopup;