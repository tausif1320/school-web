import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={clsx(
        "glass rounded-2xl p-6",
        hover && "transition hover:-translate-y-[2px] hover:shadow-xl hover:shadow-blue-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}
