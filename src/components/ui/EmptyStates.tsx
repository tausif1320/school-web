"use client";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="glass p-10 text-center space-y-3">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm opacity-60">{description}</p>

      {action && (
        <div className="pt-4 flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}
