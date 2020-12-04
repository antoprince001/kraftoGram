// import React, { useState, useEffect }from 'react'
 import ReactPlayer from 'react-player'
 import tour from './video/kraft.mp4'
 //import useSound from 'use-sound';
import React from 'react';
import audio1 from './sound/GTLENG.ogg'
import audio2 from './sound/GTLTAM.ogg'
import audio5 from './sound/GTLKAN.ogg'
import audio4 from './sound/GTLTEL.ogg'
import audio3 from './sound/GTLHIN.ogg'

class Tour extends React.Component {
    //const [play] = useSound(music);
    constructor (props) {
        super(props);
        this.audios = props.list.map(audio => new Audio(audio));
    }

    getCurrentAudio () {
        return this.audios.find(audio => false === audio.paused);
    }

    toggle (nextAudio) {
        const currentAudio = this.getCurrentAudio();
        if (currentAudio && currentAudio !== nextAudio) {
            currentAudio.pause();
        }
        nextAudio.paused ? nextAudio.play() : nextAudio.pause();
    }

    render () {
        return (
            <div>
                 <center>
        <ReactPlayer controls url={tour} onStart={()=> console.log('started')}/>
       <br/>
        <h5> To know more ,choose your preferred language</h5>
         <br/>

         <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    English 
             </button>
             &nbsp;&nbsp;&nbsp;
             <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                தமிழ்
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
              हिंदी
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
              తెలుగు
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
              ಕನ್ನಡ
              </button>
              &nbsp;&nbsp;&nbsp;
             {/* <button onClick={play}>Boop!</button>; */}
            <br/>
                { this.audios.map((audio, index) =>
                    <button onClick={() => this.toggle(audio) }>
                        PLAY {index+1}
                    </button> 
                ) 
                }
             
             </center>
            </div>
        )
    }
}

export default () => <Tour list={[audio1, audio2, audio3, audio4, audio5 ]}/>;