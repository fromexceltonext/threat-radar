import type { ReactNode } from "react"

type Props = {
    title: string;
    description: string;
    children?: ReactNode; //optional extras on the right (badges, buttons)
};

export const PageHeader = ({ title, description, children }: Props) => {

    return (
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
            <h1 className="bg-linear-to-r from-white via-blue-300 to violet-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </header>

    );
};