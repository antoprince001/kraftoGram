import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import vid from './video/bc.mp4'

export default class Timeline extends Component{
    render()
    {
        return (
            <div  >
                <h4>
                    <center> Track your product </center>
                </h4>
<VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#b2dfdb', color: '#000' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="விற்பனையாளர்"
    iconStyle={{ background: '#0288d1', color: '#fff' }}
  >
      <center>
      <h5 className="vertical-timeline-element-title"> Retailer </h5>
      </center>
   <center>
   <img src="https://images.all-free-download.com/images/graphicthumb/crafts_store_logo_circle_and_ribbon_decoration_6826731.jpg" width="200px" height="150px"
   />
   <h2>
        Owner: <br/>
        Product: <br/>
        Domain: <br/>
        Source Location <br/>
    </h2>
   </center>

  </VerticalTimelineElement>


  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#b2dfdb', color: '#000' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="வர்த்தகர்"
    iconStyle={{ background: '#0288d1', color: '#fff' }}
  >
      <center>
      <h5 className="vertical-timeline-element-title"> Trader </h5>
      </center>
   <center>
   <img src="https://www.tripsavvy.com/thmb/j6NVQt8Dz9nhrA9zfQCN9lMvbaQ=/960x640/filters:no_upscale():max_bytes(150000):strip_icc()/25498181_10156011317873979_3005717289735900312_n-5b5e8ad4c9e77c0050a46fb3.jpg" width="200px" height="150px"
    style={{ borderRadius : '5px!important'}}/> <br/>
    <h2>
    Trader Name <br/>
    Id: <br/>
    Location: <br/>
    </h2>

       </center>
  </VerticalTimelineElement>

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#b2dfdb', color: '#000' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="கைவினைஞர்"
    iconStyle={{ background: '#0288d1', color: '#fff' }}
  >
      <center>
      <h5 className="vertical-timeline-element-title"> Producer (Cheif Artisan) </h5>
      </center>
   <center>
   <img src="https://i.pinimg.com/originals/15/55/a6/1555a62dab01ceaa78cfd8ad861c11f9.jpg" width="200px" height="150px"
    style={{ borderRadius : '5px!important'}}/>
       </center>
       <br/>
       <h2>
       Artisan name <br/>
       Location <br/>
       Certification <br/>
       </h2>

  </VerticalTimelineElement>


  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#c8e6c9', color: '#000' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="STL"
    iconStyle={{ background: '#388e3c', color: '#fff' }}
  >
      <center>
      <h1 className="vertical-timeline-element-title"> Seed Testing Lab: </h1>
      </center>

   <img src="https://www.nova-seedlab.com/wp-content/uploads/2018/12/logo.png"
    style={{ borderRadius : '5px!important'}}/>



       <h2>
       SamplePassed: <br/>
       SampleSecreteCode <br/>
        SampleTestDate <br/>
       </h2>
  </VerticalTimelineElement> */}

  <VerticalTimelineElement
    iconStyle={{ background: '#0288d1', color: '#fff' }}
  />
</VerticalTimeline>
            </div>

        )
    }
}
