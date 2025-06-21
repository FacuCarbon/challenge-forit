import { twMergeCustom } from "@/lib/utils/tw-merge-custom";

type Props = {
  completed: boolean | undefined;
  changeCompleted: (status: boolean | undefined) => void;
};
type FilterProps = {
  label: string;
  value: boolean | undefined;
};
export const FilterTasks = ({ completed, changeCompleted }: Props) => {
  const filters: FilterProps[] = [
    {
      label: "All tasks",
      value: undefined,
    },
    {
      label: "Completed",
      value: true,
    },
    {
      label: "In progress",
      value: false,
    },
  ];
  return (
    <div className="flex items-center gap-4">
      {filters?.map((filter) => (
        <button
          key={filter?.label}
          onClick={() => changeCompleted(filter?.value)}
          className={twMergeCustom(
            "rounded-md p-2 text-sm min-w-[4rem]",
            filter?.value === completed && "bg-[#4E6688]"
          )}
        >
          {filter?.label}
        </button>
      ))}
    </div>
  );
};
