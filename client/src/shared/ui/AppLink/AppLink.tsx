import { ReactNode, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "shared/lib/classNames";

const themes = {
    clean: "clean",
    sourceSmall: "sourceSmall",
    sourceBig: "sourceBig",
    card: "card",
    button: "button",
    popup: "popup",
    "button-blue": "button-blue",
} as const;

type Themes = ObjectValues<typeof themes>;

interface AppLinkProps extends LinkProps {
    children?: ReactNode;
    className?: string;
    theme?: Themes;
}

const style: Record<Themes, string> = {
    card: "focus:ring-2 focus:ring-blue-500 outline-none",
    clean: "hover:bg-my-neutral-200 py-2 font-medium rounded-xl",
    sourceSmall:
        "opacity-0 focus:opacity-100 group-hover:opacity-100 group-focus:opacity-100 text-inherit rounded-md px-2 text-sm font-medium py-1 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none",
    sourceBig:
        "bg-neutral-950 text-neutral-50 hover:bg-neutral-900 rounded-xl h-10 flex items-center justify-center px-4 focus:bg-neutral-900 focus:ring-2 focus:ring-blue-500 outline-none",
    button: "text-inherit rounded-xl px-4 active:translate-y-[1px] bg-my-neutral-100 hover:bg-my-neutral-200 focus:bg-my-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 h-10 text-base shrink-0 flex items-center justify-center font-medium",
    popup: "text-inherit text-sm px-4 [&>*]:stroke-2 focus:ring-0 bg-my-white hover:bg-my-neutral-100 focus:bg-my-neutral-100 border-b border-my-neutral-100 last:border-b-0 outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between h-10 text-base shrink-0",
    "button-blue":
        "outline-none focus:ring-2 flex items-center h-10 text-base text-start shrink-0 line-clamp-1 break-words ring-offset-0 text-neutral-50 rounded-xl px-4 [&>*]:stroke-2 active:translate-y-[1px] bg-blue-500 justify-center hover:bg-blue-600 focus:bg-blue-600 focus:ring-my-neutral-800",
};

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
    const { children, className, theme, ...otherProps } = props;

    return (
        <Link
            ref={ref}
            className={classNames("", {}, [theme ? style[theme] : "", className])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
