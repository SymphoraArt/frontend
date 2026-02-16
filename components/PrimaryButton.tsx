import type { MouseEventHandler } from "react";

type PrimaryButtonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

export default function PrimaryButton({
  text,
  onClick,
  isLoading = false,
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={
        "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      }
      data-testid="primary-button"
    >
      {isLoading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
          aria-hidden="true"
        />
      ) : null}
      <span>{text}</span>
    </button>
  );
}

export {};
