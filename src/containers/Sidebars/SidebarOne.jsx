import React from 'react';
import {
  Widget, 
  SearchWidget, 
  RecentPostWidget, 
  CategoryWidget,
  GalleryWidget,
  TagWidget
} from '../../components';

// Widgets Data
import widgetsData from '../../data/widgets.json';
const {recentPosts, blogTags, galleryImages, categoryList} = widgetsData;

const SidebarOne = ({className})=> (
  <aside className={`sidebar-area ${className || ''}`}>
    <Widget>
      <SearchWidget/>
    </Widget>
    <Widget widgetTitle="Recent Posts">
      {recentPosts.map(post => (
        <RecentPostWidget key={post.id}
          title={post.title}
          image={post.image}
          date={post.date}
          path={post.path}
        />
      ))}
    </Widget>
    <Widget widgetTitle="Categories" className="widget_nav_menu">
      <CategoryWidget>
        {categoryList.map(cat => (
          <CategoryWidget.Item key={cat} path="/blog">{cat}</CategoryWidget.Item>
        ))}
      </CategoryWidget>
    </Widget>
    <Widget widgetTitle="Gallery Posts">
      <GalleryWidget>
        {galleryImages.map((img, index) => (          
          <GalleryWidget.Item key={index} src={img} alt="thumb"/>
        ))}
      </GalleryWidget>
    </Widget>
    <Widget widgetTitle="Popular Tags" className="widget_tag_cloud">
      <TagWidget>
        {blogTags.map((tag, index) => (          
          <TagWidget.Item key={index} path="/blog">{tag}</TagWidget.Item>
        ))}
      </TagWidget>
    </Widget>
  </aside>
);

export default SidebarOne;