import { classNames } from "shared/lib/classNames";
import { Image } from "shared/ui/Image/Image";
import { SwiperOptions } from "swiper/types";
import { FilmImages } from "widgets/FilmImages/model/types";
import { Slider } from "widgets/Slider";

const sliderSettings: SwiperOptions = {
    centeredSlides: true,
    slideToClickedSlide: true,
    breakpoints: {
        1280: {
            slidesPerView: 8,
        },
        1024: {
            slidesPerView: 6,
        },
        768: {
            slidesPerView: 4,
        },
        450: {
            slidesPerView: 3,
        },
        300: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
};

interface ImagePreviewSliderProps {
    initialSlide: number;
    activeSlide: number;
    images: FilmImages[];
    onSetSlide: (newSlide: number) => void;
    className?: string;
}

export const ImagePreviewSlider = (props: ImagePreviewSliderProps) => {
    const { activeSlide, images, initialSlide, onSetSlide, className } = props;

    return (
        <Slider
            className={className}
            render={(image, index) => (
                <button
                    className={classNames(
                        "w-full h-32 opacity-50 transition-opacity rounded-xl overflow-hidden border-2 border-transparent",
                        {
                            ["opacity-100 border-neutral-50"]: activeSlide === index,
                        }
                    )}
                    onClick={() => onSetSlide(index!)}
                >
                    <Image src={image.previewUrl} containerClassName="bg-black" />
                </button>
            )}
            slides={images}
            activeSlide={activeSlide}
            initialSlide={initialSlide}
            {...sliderSettings}
        />
    );
};
