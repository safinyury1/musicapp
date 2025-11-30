import { AudioContext } from "@/app/context/audioContext";
import { useContext, useState, useRef, useEffect } from "react";
import { Title, Artist, Cover, Duration, CurrentDuration } from "../shared";
import secondsToMMSS from "@/app/utils/secondsToMMSS";

export const CurrentSong = () => {
    const { 
        currentTrack, 
        isPlaying, 
        currentTime,
        duration,
        handleToggleAudio, 
        handleNextTrack, 
        handlePrevTrack,
        handleSeek
    } = useContext(AudioContext);
    
    const { preview, title, artists } = currentTrack;
    const [isSeeking, setIsSeeking] = useState(false);
    const progressBarRef = useRef(null);

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleProgressClick = (e) => {
        if (!progressBarRef.current) return;
        
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        
        handleSeek(newTime);
    };

    const handleProgressDrag = (e) => {
        if (e.type === 'mousedown') {
            setIsSeeking(true);
        } else if (e.type === 'mouseup' || e.type === 'mouseleave') {
            setIsSeeking(false);
        } else if (e.type === 'mousemove' && isSeeking) {
            handleProgressClick(e);
        }
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="flex flex-col w-full rounded-t-[15px] bg-[#86C232] py-[15px] pl-[24px] pr-[44px]">
            {/* Верхняя часть - информация о треке и управление */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                    <Cover children={preview} />
                    <div className="flex flex-col">
                        <Title>{title}</Title>
                        <Artist>{artists}</Artist>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    {/* Кнопка предыдущего трека */}
                    <button 
                        onClick={handlePrevTrack}
                        className="hover:opacity-70 transition-opacity p-2 rounded-full hover:bg-[#67912D]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#222629" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </button>

                    {/* Кнопка play/pause */}
                    <button 
                        onClick={() => handleToggleAudio(currentTrack)}
                        className="hover:scale-105 transition-transform p-2 rounded-full hover:bg-[#67912D]"
                    >
                        {isPlaying ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#222629" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#222629" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                            </svg>
                        }
                    </button>

                    {/* Кнопка следующего трека */}
                    <button 
                        onClick={handleNextTrack}
                        className="hover:opacity-70 transition-opacity p-2 rounded-full hover:bg-[#67912D]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#222629" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </button>
                </div>

                {/* УБРАНО: Дублирующее время из правой части */}
                <div className="flex-1 flex justify-end">
                    {/* Оставляем пустым для баланса布局 */}
                </div>
            </div>

            {/* Нижняя часть - прогресс бар и время */}
            <div className="flex items-center gap-4">
                {/* Текущее время */}
                <div className="w-12 text-right">
                    <span className="font-regular text-[14px] text-[#222629] font-[Montserrat]">
                        {formatTime(currentTime)}
                    </span>
                </div>

                {/* Прогресс бар - УБРАН CURSOR-POINTER */}
                <div 
                    ref={progressBarRef}
                    className="flex-1 h-2 bg-[#67912D] rounded-full relative"
                    onClick={handleProgressClick}
                    onMouseDown={handleProgressDrag}
                    onMouseUp={handleProgressDrag}
                    onMouseLeave={handleProgressDrag}
                    onMouseMove={handleProgressDrag}
                >
                    <div 
                        className="h-full bg-[#222629] rounded-full relative"
                        style={{ width: `${progressPercent}%` }}
                    >
                        {/* Ползунок */}
                        <div 
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#222629] rounded-full border-2 border-white shadow-lg"
                        />
                    </div>
                </div>

                {/* Общее время */}
                <div className="w-12">
                    <span className="font-regular text-[14px] text-[#222629] font-[Montserrat]">
                        {secondsToMMSS(duration)}
                    </span>
                </div>
            </div>
        </div>
    )
}