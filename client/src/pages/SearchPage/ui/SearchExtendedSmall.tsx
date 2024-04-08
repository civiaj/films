import { useState } from "react";
import { Settings } from "shared/assets/icons";
import { Button } from "shared/ui/Button/Button";
import { Heading } from "shared/ui/Text/Heading";

import { SearchFiltersT, SearchQuery } from "../model/types";
import { SearchExtended } from "../ui/SearchExtended";
import { useTranslation } from "react-i18next";

type Props = {
    disabled: boolean;
    data?: SearchFiltersT;
    skip: boolean;
    prevQuery: SearchQuery;
};

export const SearchExtendedSmall = (props: Props) => {
    const { disabled, data, skip, prevQuery } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen((p) => !p);
    const handleClose = () => setIsOpen(false);
    const { t } = useTranslation();

    return (
        <div className="flex lg:hidden flex-col gap-2 sm:gap-4">
            <div className="flex items-center justify-between flex-1">
                <Heading headinglevel={4}>{t("search.extended")}</Heading>
                <Button theme="regularIcon" onClick={handleToggle}>
                    <Settings />
                </Button>
            </div>
            {isOpen && (
                <SearchExtended
                    prevQuery={prevQuery}
                    data={data}
                    disabled={disabled}
                    onClose={handleClose}
                    skip={skip}
                />
            )}
        </div>
    );
};
