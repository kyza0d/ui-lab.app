import { ColorArea, ColorRoot, ColorSlider, ColorTrigger } from "./Color";

const Color = Object.assign(ColorRoot, {
  Trigger: ColorTrigger,
  Area: ColorArea,
  Slider: ColorSlider,
});

export { Color };
export type { ColorAreaProps, ColorProps, ColorSliderProps, ColorTriggerProps } from "./Color";




