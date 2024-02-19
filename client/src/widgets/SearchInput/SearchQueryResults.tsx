import { routePath } from "app/router/router";
import { useAppDispatch } from "app/store";
import { searchPageActions } from "pages/SearchPage/model/slice";
import { EMPTY_LINE } from "shared/const/const";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { ColoredNumber } from "shared/ui/ColoredNumber/ColoredNumber";
import { Image } from "shared/ui/Image/Image";
import { Spinner } from "shared/ui/Spinner/Spinner";

type Props = {
    results?: FilmT[];
    isLoading: boolean;
    isError: boolean;
    inputValue?: string;
    onClose: () => void;
};

export const SearchQueryResults = (props: Props) => {
    const { results, isError, isLoading, inputValue, onClose } = props;
    const dispatch = useAppDispatch();

    const handleQueryClick = (queryName?: string) => {
        onClose();
        if (!queryName) return;
        dispatch(searchPageActions.addUserQuery(queryName));
    };

    if (isLoading && inputValue)
        return (
            <div className="flex items-center justify-center py-2">
                <Spinner className="h-6 w-6" />
            </div>
        );

    if (isError && inputValue)
        return (
            <div className="flex items-center justify-center py-2">
                <p className="font-medium">Что-то пошло не так.</p>
            </div>
        );

    if (results && !results.length && inputValue)
        return (
            <div className="flex items-center justify-center py-2">
                <p className="font-medium">Ничего не найдено.</p>
            </div>
        );

    return (
        !!results?.length && (
            <>
                <p className="px-2 text-sm font-medium">Результаты</p>
                <ul className="flex flex-col">
                    {results.map((item) => (
                        <li key={item.filmId} className="rounded-xl overflow-hidden">
                            <AppLink
                                theme="clean"
                                to={`${routePath.details}/${item.filmId}`}
                                onClick={() =>
                                    handleQueryClick(
                                        item.nameRu ?? item.nameEn ?? item.nameOriginal
                                    )
                                }
                                className="py-1 block"
                            >
                                <div className="px-2 flex gap-2">
                                    <div className="h-24 w-16 rounded-xl overflow-hidden">
                                        <Image src={item.posterUrlPreview} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <p className="font-medium line-clamp-1 text-ellipsis flex-1">
                                            {item.nameRu ?? EMPTY_LINE}
                                        </p>

                                        <p className="line-clamp-1 text-ellipsis flex-1 text-sm font-normal">
                                            {item.nameEn ?? item.nameOriginal ?? EMPTY_LINE}
                                        </p>
                                        <ColoredNumber number={Number(item.rating)} />
                                        <p className="font-base">{item.year}</p>
                                    </div>
                                </div>
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </>
        )
    );
};
