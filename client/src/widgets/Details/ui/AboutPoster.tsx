import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import { Image } from "shared/ui/Image/Image";

interface PosterProps {
    posterUrl?: string;
    link?: string;
    className?: string;
}

export const AboutPoster = (props: PosterProps) => {
    const { posterUrl, link, className } = props;

    return (
        <div className={classNames("flex flex-col gap-4", {}, [className])}>
            <div className="relative rounded-xl overflow-hidden">
                <Image
                    containerClassName="h-72 w-full"
                    src={posterUrl}
                    alt="poster"
                    className="select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-transparent to-50% z-[1] rounded-b-xl vsm:hidden" />
            </div>
            {link && (
                <form>
                    <Button
                        type="submit"
                        formTarget="_blank"
                        formAction={link}
                        className="w-full"
                        theme="blue"
                    >
                        На Кинопоиск
                    </Button>
                </form>
            )}
        </div>
    );
};
