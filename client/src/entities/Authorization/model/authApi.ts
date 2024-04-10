import { FetchErrorWithToast } from "@/app/store/types";
import { authAndUserSliceActions } from "@/features/LoadingAuthorizationAndUser";
import { userActions, userApi } from "@/entities/User";
import { serverApi } from "@/shared/api/serverApi";
import { ServerMessageResponse } from "@/shared/api/types";
import { GenericResponse, LoginRequest, RegisterRequest } from "../model/types";

const authApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<GenericResponse, RegisterRequest>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(authAndUserSliceActions.startLoading());
                    await queryFulfilled;
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    // errorMiddleware
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },
        }),
        login: builder.mutation<GenericResponse, LoginRequest>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(authAndUserSliceActions.startLoading());
                    await queryFulfilled;
                    const { refetch } = dispatch(userApi.endpoints.getMe.initiate());
                    refetch();
                } catch (e) {
                    // errorMiddleware
                    dispatch(authAndUserSliceActions.endLoading());
                }
            },
            transformErrorResponse: (error: FetchErrorWithToast) => {
                error.toast = true;
                return error;
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;

                    // RESET EVERYTHING AFTER LOGOUT
                    // When calling dispatch in other order there is infinite loading on useGetMeQuery hook, that shows fullscreen spinner. Can't understand why...

                    dispatch(userActions.logout());
                    dispatch(serverApi.util.resetApiState());
                } catch (e) {
                    // errorMiddleware
                }
            },
        }),
        checkPassword: builder.mutation<GenericResponse, { password: string }>({
            query: ({ password }) => ({
                url: "/checkPassword",
                method: "POST",
                body: { password },
                credentials: "include",
            }),
        }),
        forgotPassword: builder.mutation<ServerMessageResponse, { email: string }>({
            query: (body) => ({ url: "/forgot", method: "POST", body, credentials: "include" }),
        }),
        resetPassword: builder.mutation<
            ServerMessageResponse,
            { password: string; confirmPassword: string; resetToken: string }
        >({
            query: (payload) => {
                const { resetToken, ...body } = payload;

                return {
                    url: `/reset/${resetToken}`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useCheckPasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
