import { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import meditation1 from './assets/Krishna-Flute.mp3';
import dj from './assets/dj.mp3';
import './App.css'

function App() {
  const [mediAudio, setMeditationAudio] = useState('');
  //const [audioDuration, setAudioDuration] = useState<Number>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);


  useEffect(()=> {
    setMeditationAudio(meditation1);
  },[]);

   useEffect(() => {
    
    const intervalId = setInterval(() => {
      
      if (isPlaying && audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => {
      //setCurrentTime(0);
      clearInterval(intervalId)
    };
  }, [isPlaying]);

  // useEffect(()=> {
  //   playMeditation();
  // }, [mediAudio])

  const playMeditation = (audioType: any) => {
    
    setMeditationAudio(audioType);
    console.log(mediAudio);
    if(audioRef.current) {
      
    //audioRef.current.currentTime = 0;
    audioRef.current?.load();
    audioRef.current?.play();
    setIsPlaying(!isPlaying);
    //setCurrentTime(0);
    // setCurrentTime(audioRef.current.currentTime);
    //setAudioDuration(audioRef.current?.duration)

    }
  }

  const pauseMeditation = () => {
    audioRef.current?.pause();
    setIsPlaying(!isPlaying);
  }

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10   
 ? '0' : ''}${seconds}`;
  };

  return (
    <>

          <div className={!isPartyMode ? "meditationImg": ''}>
            <div style={{position: 'relative',top: '36rem'}}>
              <button onClick={()=> { setIsPartyMode(true); 
                setMeditationAudio(dj);
                pauseMeditation();
                }}>Party Mode</button>
              <button onClick ={()=>{ setIsPartyMode(false); 
                setMeditationAudio(meditation1);
                pauseMeditation();
                }} style={{marginLeft: '5px'}}>Meditation Mode</button>
            </div>
            <div className="audioPlayer">
              <audio ref={audioRef} className="audioPlayer"> 
                 <source src={mediAudio} type="audio/mp3"></source> 
              </audio>
            </div> 
            

           
             
            <div className='buttonContainer'>
              <button onClick={()=>playMeditation(mediAudio)}>Play</button>
              <button onClick={pauseMeditation} style={{marginLeft: '5px'}}>Pause</button>
            </div> 
            <div className='audioTimer'>
              <p className='timer'><span style={{marginTop: '30px'}}>{formatTime(currentTime)}</span></p>
            </div>
              
              


       
        {
          isPartyMode ? <img src="https://media4.giphy.com/media/yQb7zHGewDn4sctJNe/giphy.gif" style={{ position:'relative', bottom: '10rem'}}/> : ''
        }
      </div>
    </>
  )
}

export default App
