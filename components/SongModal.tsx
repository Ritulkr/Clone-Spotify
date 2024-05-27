"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useSongModal from "@/hooks/useSongModal";
import Modal from "./Modal";
import { useUser } from "@/hooks/useUser";
import { Input, Button, ModalArtistItem } from "../components";
import { Artist } from "@/types";
import useGetArtistClientSIde from "@/hooks/useGetArtistClientSIde";
import { PuffLoader } from "react-spinners";

const SongModal = () => {
  const songModal = useSongModal();

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    // Toggle selection on click
    setSelectedImageId((prevId) => (prevId === imageId ? null : imageId));
  };

  const { artists, isLoading: artistLoading } = useGetArtistClientSIde();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      song_uri: null,
      image_uri: null,
      user_id: "",
      artist_id: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      songModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const pictureFile = values.image_uri?.[0];
      const songFile = values.song_uri?.[0];

      if (!pictureFile || !songFile || !user || !selectedImageId) {
        toast.error("Missing Filds");
        return;
      }
      const uniqueId = uniqid();

      //   uploading the image to storage
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`song-image-${uniqueId}`, pictureFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        console.log(imageError);
        setIsLoading(false);
        return toast.error("Falied to upload an image");
      }

      //   uploading the song
      //   uploading the image to storage
      const { data: audioData, error: audioError } =
        await supabaseClient.storage
          .from("songs")
          .upload(`song-${uniqueId}`, songFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (audioError) {
        console.log(audioError);
        setIsLoading(false);
        return toast.error("Falied to upload an audio");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          title: values.title,
          song_uri: audioData.path,
          image_uri: imageData.path,
          user_id: user?.id,
          artist_id: selectedImageId,
        });
      if (supabaseError) {
        setIsLoading(false);
        console.log(supabaseError);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("New Song Added");
      reset();
      songModal.onClose();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Song"
      description="List out your own music here"
      isOpen={songModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Name"
        />

        <div>
          <div className="pb-1">Select an image file</div>
          <Input
            id="image_uri"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image_uri", { required: true })}
            placeholder="Song cover image"
          />
        </div>

        <div>
          <div className="pb-1">Select an audio file</div>
          <Input
            id="song_uri"
            type="file"
            disabled={isLoading}
            accept="audio/*"
            {...register("song_uri", { required: true })}
            placeholder="Upload your song"
          />
        </div>

        <div>
          <div className="pb-1">Choose an artist</div>
          <div className="grid grid-cols-3 gap-2 py-4 cursor-pointer">
            {artistLoading ? (
              <React.Fragment>
                <div className="w-full flex items-center justify-center col-span-3">
                  <PuffLoader size={35} color="#10B981" />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {artists?.map((item) => (
                  <ModalArtistItem
                    key={item.id}
                    data={item}
                    onClick={() => handleImageClick(item.id)}
                    selected={selectedImageId === item.id}
                  />
                ))}
              </React.Fragment>
            )}
          </div>
        </div>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default SongModal;
