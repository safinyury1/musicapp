'use client'

import { CurrentDuration } from "../../shared";
import { Header } from "../../widgets/header";
import { SongList } from "../../widgets/songList";
import tracksList from "../../assets/tracksList";
import { useState } from "react";
import { AudioProvider } from "./context/audioContext";
import { CurrentSong } from "../../widgets/currentSong";


const runSearch = (query) =>{
  if(!query){
    return tracksList;
  }

  const lowerCaseQuery = query.toLowerCase();

  return tracksList.filter((track)=>
    track.title.toLowerCase().includes(lowerCaseQuery) ||
    track.artists.toLowerCase().includes(lowerCaseQuery)
  )
}

export default function Home() {
  const [tracks, setTracks] = useState(tracksList);

  const handleChange = (event) =>{
    const foundTracks = runSearch(event.target.value);
    setTracks(foundTracks);
  }

  return (
  <AudioProvider>
    <div className="bg-[#222629] px-[185px]">
      <Header functionSearchHeader={handleChange}/>
      <SongList songs={tracks}/>
      <CurrentSong />
    </div>
  </AudioProvider>
  
  );
}
