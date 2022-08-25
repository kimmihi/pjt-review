import type { FC } from "react";

import { useForm } from "react-hook-form";

const SelectByLevel: FC = () => {
  const { control } = useForm({
    defaultValues: {
      level: null,
      first: null,
      second: null,
      third: null,
    },
  });
  return <></>;
};

export default SelectByLevel;
