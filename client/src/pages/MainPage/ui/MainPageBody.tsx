import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { FilmsList } from "@/features/FilmsList";
import { Page } from "@/entities/Ui";
import formatFilmError from "@/shared/api/helpers/formatFilmError";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Box } from "@/shared/ui/Boxes/Box";
import { EndBox } from "@/shared/ui/Boxes/EndBox";
import { PageLikeBox } from "@/shared/ui/Boxes/PageLikeBox";
import { StatusBox } from "@/shared/ui/Boxes/StatusBox";
import { useFilmsQuery } from "../model/mainPageApi";
import { getMainPage, getMainPageInfiniteFilms, getMainQuery } from "../model/selectors";
import { mainPageActions } from "../model/slice";
import { MainPageHeader } from "./MainPageHeader";

const cardStyles: TCardStyles = {
    label: "text-xl",
};

export const MainPageBody = () => {
    const mainQuery = useAppSelector(getMainQuery);
    const dispatch = useAppDispatch();
    const infiniteFilms = useAppSelector(getMainPageInfiniteFilms);
    const page = useAppSelector(getMainPage);

    const { isEnd, isError, isFetching, isLoading, onScrollEnd, error } = useInfiniteScroll({
        queryHook: useFilmsQuery,
        queryParams: { page, mainQuery },
        setPage: (newPage: number) => dispatch(mainPageActions.setPage(newPage)),
        setFilms: (films) => dispatch(mainPageActions.setMainPageFilms(films)),
    });

    const films = useMemo(() => infiniteFilms ?? [], [infiniteFilms]);
    const showEnd = !isLoading && !isFetching && isEnd && !!films.length;

    if (!infiniteFilms.length && isError)
        return (
            <PageLikeBox>
                <StatusBox msgOrChildren={formatFilmError(error)} isError={isError} reload />
            </PageLikeBox>
        );

    return (
        <Page onScrollEnd={onScrollEnd}>
            <Box>
                <MainPageHeader />
            </Box>

            <FilmsList
                films={films}
                page={page}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                cardProps={{ cardStyles }}
                showEnd={showEnd}
            />
            {showEnd && <EndBox />}
        </Page>
    );
};
