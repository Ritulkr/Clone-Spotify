"use client";

import { useState } from "react";
import useArtistModal from "@/hooks/useArtistModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import uniqid from "uniqid";

import Modal from "./Modal";
import { Button, Input } from "../components";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const ArtistModal = () => {
  const artistModal = useArtistModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      description: "",
      followers: 0,
      picture: null,
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      artistModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const pictureFile = values.picture?.[0];

      if (!pictureFile || !user) {
        toast.error("Missing Filds");
        return;
      }

      const uniqueId = uniqid();

      //   uploading the image to storage
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${uniqueId}`, pictureFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        console.log(imageError);
        setIsLoading(false);
        return toast.error("Falied to upload an image");
      }

      const { error: supabaseError } = await supabaseClient
        .from("artists")
        .insert({
          author: values.author,
          description: values.description,
          followers: values.followers,
          facebook: values.facebook,
          instagram: values.instagram,
          linkedin: values.linkedin,
          picture: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Artist created");
      reset();
      artistModal.onClose();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add new Artist"
      description="Create your own artist"
      isOpen={artistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Artist Name"
        />

        <Input
          id="description"
          disabled={isLoading}
          {...register("description", { required: true })}
          placeholder="Artist description"
        />

        <div>
          <div className="pb-1">Select an image file</div>
          <Input
            id="picture"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("picture", { required: true })}
            placeholder="Artist picture"
          />
        </div>

        <Input
          id="facebook"
          disabled={isLoading}
          {...register("facebook", { required: true })}
          placeholder="www.facebook.com"
        />

        <Input
          id="instagram"
          disabled={isLoading}
          {...register("instagram", { required: true })}
          placeholder="www.instagram.com"
        />

        <Input
          id="linkedin"
          disabled={isLoading}
          {...register("linkedin", { required: true })}
          placeholder="www.linkedin.com"
        />

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default ArtistModal;
