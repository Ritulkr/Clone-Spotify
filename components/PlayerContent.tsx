"use client";

import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import { MediaItem, VolumeSlider } from ".";
import useGetArtistClientSIde from "@/hooks/useGetArtistClientSIde";
import {
  FaPlay,
  FaPause,
  FaForwardStep,
  FaBackwardStep,
} from "react-icons/fa6";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { PuffLoader } from "react-spinners";
import usePlayer from "@/hooks/usePlayer";

import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const { artists, isLoading: artistLoading } = useGetArtistClientSIde();
  const player = usePlayer();
  const [volume, setVolume] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? FaPause : FaPlay;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toogleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  if (artistLoading)
    return (
      <div className="flex w-full h-20 items-center justify-center">
        <PuffLoader color="#10B981" size={40} />
      </div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start items-start">
        <MediaItem
          className="bg-transparent w-auto"
          onClick={() => {}}
          artist={artists.filter((artist) => artist.id === song.artist_id)[0]}
          data={song}
        />
      </div>

      {/* mobile controller */}

      <div className="flex md:hidden col-auto  justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white  p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon className=" text-black" size={20} />
        </div>
      </div>

      {/* desktop controller */}

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
        <FaBackwardStep
          size={20}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white  p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon className=" text-black" size={20} />
        </div>
        <FaForwardStep
          size={20}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      {/* volume section */}
      <div className="hidden md:flex justify-end w-full ">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={25}
            onClick={toogleMute}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
