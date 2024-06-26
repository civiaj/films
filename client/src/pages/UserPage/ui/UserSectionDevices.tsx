import { t } from "i18next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { routePath } from "@/app/router/router";
import { SessionIdentifier, useGetSessionsQuery, useRemoveSessionMutation } from "@/entities/User";
import formatServerError from "@/shared/api/helpers/formatServerError";
import { Close, Left, Stop } from "@/shared/assets/icons";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Box } from "@/shared/ui/Boxes/Box";
import { Modal } from "@/shared/ui/Boxes/Modal";
import { UserBox } from "@/shared/ui/Boxes/UserBox";
import { Button } from "@/shared/ui/Button/Button";
import { GridMsg } from "@/shared/ui/GridMsg/GridMsg";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { Elipsis } from "@/shared/ui/Text/Elipsis";
import { Heading } from "@/shared/ui/Text/Heading";
import { Text } from "@/shared/ui/Text/Text";

type ModalData = SessionIdentifier | "all" | null;

export const UserSectionDevices = () => {
    const { data, isLoading, isFetching } = useGetSessionsQuery();
    const loading = isLoading || isFetching;

    const [modalData, setModalData] = useState<ModalData>(null);
    const onClose = useCallback(() => setModalData(null), []);

    return (
        <>
            <Box className="sm:p-0 p-0 gap-0 sm:gap-0">
                <UserBox bottom>
                    <div className="flex items-center gap-4">
                        <AppLink to={routePath.user} theme="regular-icon" className="rounded-full">
                            <Left />
                        </AppLink>
                        <Heading headinglevel={1}>{t("user.devices")}</Heading>
                    </div>
                </UserBox>

                <UserBox bottom>
                    <div className="grid grid-cols-[2fr,3fr] items-start gap-x-4">
                        <Elipsis>{t("user.devices-current")}</Elipsis>
                        {loading ? (
                            <Skeleton className="h-9 sm:h-11 w-1/3" />
                        ) : (
                            <div className="flex flex-col">
                                <Elipsis className="font-medium">{data?.current.os}</Elipsis>
                                <Elipsis className="text-xs sm:text-sm text-my-neutral-500">
                                    {data?.current.browser} {data?.current.version}
                                </Elipsis>
                            </div>
                        )}
                    </div>
                </UserBox>
                <UserBox bottom>
                    <div className="grid grid-cols-[2fr,3fr] items-start gap-x-4">
                        <Elipsis>{t("user.devices-active")}</Elipsis>
                        <div className="flex flex-col gap-2">
                            {loading
                                ? Array.from({ length: 2 }, (_, i) => i).map((_, index) => (
                                      <Skeleton key={index} className="h-9 sm:h-11 w-1/3" />
                                  ))
                                : data?.other.map((item) => (
                                      <div
                                          className="flex justify-between items-center"
                                          key={`${JSON.stringify(item)}`}
                                      >
                                          <div className="flex flex-col">
                                              <Elipsis className="font-medium">{item.os}</Elipsis>
                                              <Elipsis className="text-xs sm:text-sm text-my-neutral-500">
                                                  {item.browser} {item.version}
                                              </Elipsis>
                                          </div>
                                          <Button
                                              onClick={() => setModalData(item)}
                                              theme="regularIcon"
                                              className="rounded-full"
                                          >
                                              <Close className="text-xl" />
                                          </Button>
                                      </div>
                                  ))}

                            {data && !data.other.length && (
                                <Text>{t("user.devices-active-empty")}</Text>
                            )}
                        </div>
                    </div>
                </UserBox>
                <UserBox>
                    {loading ? (
                        <Skeleton className="h-10 self-end w-52 sm:w-56" />
                    ) : (
                        <Button
                            onClick={() => setModalData("all")}
                            className="self-end gap-2"
                            theme="blue"
                            disabled={!data?.other.length}
                        >
                            <Stop className="text-xl" />
                            <Text>{t("btn.end-all-sessions")}</Text>
                        </Button>
                    )}
                </UserBox>
            </Box>
            {modalData && <DevicesModal modalData={modalData} onClose={onClose} />}
        </>
    );
};

const DevicesModal = ({ modalData, onClose }: { modalData: ModalData; onClose: () => void }) => {
    const [removeSession, { isLoading, isError, error }] = useRemoveSessionMutation();

    const onRemoveSession = () => {
        const session = modalData === "all" ? "all" : JSON.stringify(modalData);
        removeSession({ session })
            .unwrap()
            .then(() => onClose());
    };

    const { t } = useTranslation();

    if (!modalData) return null;

    return (
        <Modal onClose={onClose} theme="confirm">
            <Modal.Header header={t("Devices")} onClose={onClose} />
            <Modal.Body>
                {modalData === "all" ? (
                    <p>{t("user.devices-end-all-msg")}</p>
                ) : (
                    <>
                        <p>{t("user.devices-end-msg")}:</p>
                        <UserBox rounded className="px-2 py-2 sm:px-2">
                            <Elipsis className="font-medium">
                                {modalData.os} {modalData.browser} {modalData.version}
                            </Elipsis>
                        </UserBox>
                    </>
                )}
                {<GridMsg isOpen={isError} msg={formatServerError(error)} isError />}
            </Modal.Body>
            <Modal.Controls theme="confirm">
                <Button isLoading={isLoading} onClick={onRemoveSession} theme="blue">
                    <Text>{t("btn.end")}</Text>
                </Button>
                <Button onClick={onClose} theme="regular">
                    <Text>{t("btn.cancel")}</Text>
                </Button>
            </Modal.Controls>
        </Modal>
    );
};
