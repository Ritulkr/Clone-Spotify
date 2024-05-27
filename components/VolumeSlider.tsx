"use client";
import * as RadixSlider from "@radix-ui/react-slider";
import React from "react";

interface VolumeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-emerald-500 rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default VolumeSlider;
