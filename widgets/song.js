import Image from "next/image";
import { Title } from "../shared";
import { Cover } from "../shared";
import { Duration } from "../shared";
import { Artist } from "../shared";
import secondsToMMSS from "@/app/utils/secondsToMMSS";
import { useState } from "react";
import { useContext } from "react";
import { AudioContext } from "@/app/context/audioContext";

export const Song = (track) => {
    const { id, src, preview, duration, title, artists } = track;
    const { currentTrack, isPlaying, handleToggleAudio } = useContext(AudioContext);

    const [like, setLike] = useState(false);

    const handleChangeLike = () => {
        if (like) {
            setLike(false);
        } else {
            setLike(true);
        }
    }

    const formatedDuration = secondsToMMSS(duration);
    const isCurrentTrack = currentTrack.id === id;

    return (
        <div className={`flex gap-3 rounded-xl p-3 items-center justify-between transition-all duration-200 ${
            isCurrentTrack ? 'bg-[#86C232]' : 'bg-[#53575B]'
        }`}>
            <div className="flex items-center gap-3"> 
                <Cover children={preview} />
                <div className="flex flex-col items-start"> 
                    <Title>{title}</Title> 
                    <Artist>{artists}</Artist>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => handleChangeLike()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={like ? '#86C232' : 'gray'} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                </button>
                <Duration>{formatedDuration}</Duration>
                <button onClick={() => handleToggleAudio(track)}>
                    {isPlaying && isCurrentTrack ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill={isCurrentTrack ? "#222629" : "#86C232"} viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill={isCurrentTrack ? "#222629" : "#86C232"} viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                        </svg>
                    }
                </button>
            </div>
        </div>
    )
}