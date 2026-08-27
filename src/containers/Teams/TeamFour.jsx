import React from 'react';
import {TeamBoxOne} from '../../components';

const TeamFour = ({...restProps})=> (
  <div {...restProps}>    
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Daniel Matthew"
            desgination="Cheif Expert"
            image="images/team/t-1-1.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Grayson Gabriel"
            desgination="Head Manager"
            image="images/team/t-1-2.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Alexander Mason"
            desgination="Founder & CEO"
            image="images/team/t-1-3.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Maverick Cameron"
            desgination="Pro Developer"
            image="images/team/t-1-4.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Marian Widjya"
            desgination="Lead Developer"
            image="images/team/t-1-5.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Marian Widjya"
            desgination="Team Leader"
            image="images/team/t-1-6.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Maverick Cameron"
            desgination="Assistant"
            image="images/team/t-1-7.jpg"
          />
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TeamBoxOne path="/team-details"
            name="Jerzzy Lamot"
            desgination="Member"
            image="images/team/t-1-8.jpg"
          />
        </div>
      </div>
    </div>
  </div>
);


export default TeamFour;