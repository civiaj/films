import { routePath } from "app/router/router";
import { TUser } from "entities/User";
import { t } from "i18next";
import { SECTIONS_USER } from "pages/UserPage/model/types";
import { useTranslation } from "react-i18next";
import { Checked, Close, Right } from "shared/assets/icons";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Box } from "shared/ui/Boxes/Box";
import { UserBox } from "shared/ui/Boxes/UserBox";
import { AppImage } from "shared/ui/AppImage/AppImage";
import { Elipsis } from "shared/ui/Text/Elipsis";
import { Heading } from "shared/ui/Text/Heading";
import { Text } from "shared/ui/Text/Text";

type Props = {
    user: TUser;
};

const formatDate = (locale: string, value: string) => {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
};

export const UserSectionHome = ({ user }: Props) => {
    const { i18n } = useTranslation();

    return (
        <Box className="sm:p-0 p-0 gap-0 sm:gap-0">
            <UserBox className="gap-0">
                <Heading headinglevel={1}>{t("Profile")}</Heading>
                <div className="flex gap-2 self-end">
                    <Text className="text-xs sm:text-xs">Создан:</Text>
                    <Text className="text-xs sm:text-xs">
                        {formatDate(i18n.language, user.createdAt)}
                    </Text>
                </div>
                <div className="flex gap-2 self-end">
                    <Text className="text-xs sm:text-xs">Последнее обновление:</Text>
                    <Text className="text-xs sm:text-xs">
                        {formatDate(i18n.language, user.updatedAt)}
                    </Text>
                </div>
            </UserBox>
            <UserBox>
                <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                    <div className="font-medium min-w-0">Адрес электронной почты</div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <div>{user.email}</div>
                        {user.verified ? (
                            <div className="text-sm flex gap-2 items-center">
                                <div className="h-4 w-4 rounded-full bg-my-green-500 flex items-center justify-center">
                                    <Checked className="text-my-neutral-50" />
                                </div>
                                <Elipsis className="text-my-green-500">
                                    Адрес электронной почты подтвержден
                                </Elipsis>
                            </div>
                        ) : (
                            <div className="text-sm flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full bg-my-red-500 flex items-center justify-center">
                                    <Close className="text-my-neutral-50" />
                                </div>
                                <span className="text-my-red-500">
                                    Адрес электронной почты не подтвержден
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </UserBox>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.PHOTO}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">Фото профиля</div>
                        <div className="flex justify-between items-center">
                            <AppImage
                                containerClassName="rounded-full w-20 h-20 "
                                src={user.photo}
                                onErrorSrc="user"
                                className="transition-none"
                            />
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>

            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.NAME}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">Имя пользователя</div>
                        <div className="flex justify-between items-center">
                            <div>{user.displayName}</div>
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.DEVICES}`} theme="user-menu">
                <UserBox>
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">Устройства</div>
                        <div className="flex justify-between items-center">
                            <div>Показать все</div>
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
            <AppLink to={`${routePath.user}?section=${SECTIONS_USER.PASSWORD}`} theme="user-menu">
                <UserBox className="border-0">
                    <div className="grid grid-cols-[2fr,3fr] items-center gap-x-4">
                        <div className="font-medium">Пароль</div>
                        <div className="flex justify-between items-center">
                            <div>Изменить пароль</div>
                            <Right className="text-xl" />
                        </div>
                    </div>
                </UserBox>
            </AppLink>
        </Box>
    );
};