"use client";

import { createContext, useState, useRef, useEffect } from "react";
import tracksList from "../../../assets/tracksList";

const defaultTrack = tracksList[0];

export const AudioContext = createContext({});

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const playPromiseRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "none";
    
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsLoading(false);
      handleNextTrack();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('loadstart', handleLoadStart);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        
        // Очищаем промис при размонтировании
        if (playPromiseRef.current) {
          playPromiseRef.current.catch(() => {});
        }
        audioRef.current.pause();
      }
    };
  }, []);

  const handleToggleAudio = async (track) => {
    if (!audioRef.current) return;

    // Очищаем предыдущий промис если есть
    if (playPromiseRef.current) {
      playPromiseRef.current.catch(() => {});
      playPromiseRef.current = null;
    }

    if (currentTrack.id !== track.id) {
      // Пауза без ожидания
      audioRef.current.pause();
      setIsLoading(true);
    
      setCurrentTrack(track);
      setCurrentTime(0);
    
      try {
        audioRef.current.src = track.src;
        audioRef.current.currentTime = 0;
        
        // Сохраняем промис и обрабатываем ошибки
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
        setIsPlaying(true);
      } catch (error) {
        // Игнорируем ошибку "request was interrupted"
        if (error.name !== 'AbortError') {
          console.error("Play failed:", error);
        }
        setIsPlaying(false);
        setIsLoading(false);
        playPromiseRef.current = null;
      }
      return;
    }

    if (isPlaying) {
      // Пауза без прерывания play()
      audioRef.current.pause();
      setIsPlaying(false);
      playPromiseRef.current = null;
    } else {
      try {
        // Сохраняем промис и обрабатываем ошибки
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
        setIsPlaying(true);
      } catch (error) {
        // Игнорируем ошибку "request was interrupted"
        if (error.name !== 'AbortError') {
          console.error("Play failed:", error);
        }
        setIsPlaying(false);
        playPromiseRef.current = null;
      }
    }
  };

  // Функция для переключения на следующий трек
  const handleNextTrack = () => {
    const currentIndex = tracksList.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracksList.length;
    const nextTrack = tracksList[nextIndex];
    
    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Автоматически запускаем следующий трек
    setTimeout(() => {
      handleToggleAudio(nextTrack);
    }, 100);
  };

  // Функция для переключения на предыдущий трек
  const handlePrevTrack = () => {
    const currentIndex = tracksList.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracksList.length) % tracksList.length;
    const prevTrack = tracksList[prevIndex];
    
    setCurrentTrack(prevTrack);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Автоматически запускаем предыдущий трек
    setTimeout(() => {
      handleToggleAudio(prevTrack);
    }, 100);
  };

  // Функция для перемотки трека
  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    handleToggleAudio,
    handleNextTrack,
    handlePrevTrack,
    handleSeek
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};