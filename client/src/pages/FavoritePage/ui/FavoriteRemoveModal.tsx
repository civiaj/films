import { useState } from "react";
import { useTranslation } from "react-i18next";
import { routePath } from "app/router/router";
import { TFavorite, useRemoveOneFavoriteMutation } from "entities/Favorite";
import { Checked } from "shared/assets/icons";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Modal } from "shared/ui/Boxes/Modal";
import { Button } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";

import { listVariants } from "../model/data";
import { FavoriteListVariantT } from "../model/types";
import { GridMsg } from "shared/ui/GridMsg/GridMsg";
import formatServerError from "shared/api/helpers/formatServerError";
import { getFilmTitle } from "shared/lib/getFilmTitle";
import { TLngs } from "shared/i18n/types";

type Props = {
    onClose: () => void;
    listVariant: FavoriteListVariantT;
    film?: (FilmT & TFavorite) | null;
};

export const FavoriteRemoveModal = (props: Props) => {
    const { t, i18n } = useTranslation();
    const { onClose, listVariant, film } = props;
    const { filmId } = film ?? {};
    const title = getFilmTitle(film, i18n.language as TLngs);
    const category = listVariants.find((e) => e.value === listVariant)!.label;

    const [all, setAll] = useState(false);
    const toggleAll = () => setAll((p) => !p);

    const [removeOneFavorite, { isLoading, isError, error }] = useRemoveOneFavoriteMutation();

    const onDelete = async () => {
        if (!filmId) return;
        removeOneFavorite({
            body: { filmId, field: all ? "all" : listVariant },
            listVariant: all ? "all" : listVariant,
            filmTitle: title,
        })
            .unwrap()
            .then(() => onClose());
    };
    const link = `${routePath.details}/${film?.filmId}`;

    return (
        <Modal onClose={onClose} header={t("favorite.remove-t")} theme="danger">
            <div>
                <Text as="span" className="text-start">
                    {t("favortie.remove-b")}{" "}
                </Text>
                {title ? (
                    <AppLink
                        className="hover:underline hover:text-my-neutral-700 text-blue-500 "
                        to={link}
                    >
                        {title}
                    </AppLink>
                ) : (
                    <Text as="span">{t("Film")}</Text>
                )}
                <Text as="span"> {t("favorite.remove-from-list")} </Text>
                <Text as="span" className="font-medium">
                    {t(category)}?
                </Text>
            </div>

            {listVariant !== "all" && (
                <label className="flex items-center gap-4 cursor-pointer self-start hover:underline relative">
                    <input
                        className="appearance-none checked:bg-blue-500 cursor-pointer w-4 h-4 text-blue-500 bg-my-neutral-300 rounded focus:ring-blue-500 peer outline-none focus:ring-2 "
                        type="checkbox"
                        checked={all}
                        onChange={toggleAll}
                    />
                    <Text>{t("favorite.remove-all")}</Text>
                    <Checked className="text-my-neutral-50 absolute left-0 top-1/2 -translate-y-1/2 hidden peer-checked:block" />
                </label>
            )}
            {isError && (
                <GridMsg
                    className="bg-my-red-200"
                    isOpen={isError}
                    msg={formatServerError(error)}
                />
            )}
            <div className="self-end flex items-center justify-center gap-2">
                <Button
                    className="font-medium"
                    theme="danger"
                    onClick={onDelete}
                    isLoading={isLoading}
                >
                    <Text>{t("btn.delete")}</Text>
                </Button>
                <Button onClick={onClose} theme="regular" className="font-medium">
                    <Text>{t("btn.cancel")}</Text>
                </Button>
            </div>
        </Modal>
    );
};
