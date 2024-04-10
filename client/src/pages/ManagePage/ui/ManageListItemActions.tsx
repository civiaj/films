import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TUser } from "@/entities/User";
import { UserBoxSeparator } from "@/shared/ui/Boxes/UserBox";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { ManageActionViews } from "../model/types";
import { ManageBan } from "../ui/ManageBan";
import { ManageListItemActionsHeader } from "../ui/ManageListItemActionsHead";
import { ManageViewAndUpdate } from "../ui/ManageViewAndUpdate";

type Props = {
    user: TUser;
    onSetActive: (newId: string | null) => void;
    onPreventClose: (newValue: boolean) => void;
};

export const ManageListItemActions = ({ user, onSetActive, onPreventClose }: Props) => {
    const { displayName } = user;
    const { t } = useTranslation();
    const [manageView, setManageView] = useState<ManageActionViews>("info");
    const onSetManageView = (newView: ManageActionViews) => setManageView(newView);

    const manageActionHeader: Record<ManageActionViews, string> = useMemo(
        () => ({
            ban: t("manage.ban-t", { displayName }),
            update: t("manage.change-t", { displayName }),
            info: t("manage.info-t", { displayName }),
        }),
        [displayName, t]
    );

    return (
        <GridMsg isOpen={true} className="border border-border rounded-xl my-2">
            <div className="w-full flex flex-col gap-4 px-4 py-4">
                <ManageListItemActionsHeader headerText={manageActionHeader[manageView]} />

                <UserBoxSeparator />

                {(manageView === "info" || manageView === "update") && (
                    <ManageViewAndUpdate
                        onPreventClose={onPreventClose}
                        manageView={manageView}
                        user={user}
                        onSetManageView={onSetManageView}
                        onSetActive={onSetActive}
                    />
                )}

                {manageView === "ban" && (
                    <ManageBan
                        user={user}
                        onSetManageView={onSetManageView}
                        onSetActive={onSetActive}
                    />
                )}
            </div>
        </GridMsg>
    );
};
