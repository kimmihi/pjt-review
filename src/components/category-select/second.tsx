import type { FC } from "react";
import type { Control, UseFormReset } from "react-hook-form";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect, useRef } from "react";
import { useForm, useController, useWatch } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  MainCategory,
  MediumCategory,
  SmallCategory,
} from "src/data/level-select";

// react-hook-form 사용해서

type FormValues = {
  mainId: string;
  mediumId: string;
  smallId: string;
};

interface SelectProps {
  control: Control<FormValues>;
  list: Array<Category>;
  reset: UseFormReset<FormValues>;
}

const getCategoryList = (parent: number, list: Array<Category>) => {
  return list.filter((item) => item.parent === parent);
};

const MainCategorySelect = ({ control, list, reset }: SelectProps) => {
  const mainCategory = getCategoryList(0, list);
  const {
    field: { ref, value, onChange },
  } = useController({
    name: "mainId",
    control,
  });

  return (
    <FormControl>
      <InputLabel>대분류</InputLabel>
      <Select
        ref={ref}
        value={value ?? ""}
        label="대분류"
        onChange={(e) => {
          onChange(e);
          reset({
            mainId: e.target.value,
            mediumId: "",
            smallId: "",
          });
        }}
        sx={{
          width: "220px",
        }}
      >
        {mainCategory.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const MediumCategorySelect = ({ control, list, reset }: SelectProps) => {
  const mainId = useWatch({ control, name: "mainId" });
  const mediumCategory = getCategoryList(Number(mainId), list);

  const {
    field: { ref, value, onChange },
  } = useController({
    name: "mediumId",
    control,
  });

  return (
    <FormControl>
      <InputLabel>중분류</InputLabel>
      <Select
        ref={ref}
        value={value ?? ""}
        label="중분류"
        onChange={(e) => {
          onChange(e);
          reset({
            mainId,
            mediumId: e.target.value,
            smallId: "",
          });
        }}
        sx={{
          width: "220px",
        }}
      >
        {mediumCategory.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SmallCategorySelect = ({ control, list, reset }: SelectProps) => {
  const mediumId = useWatch({ control, name: "mediumId" });
  const smallCategory = getCategoryList(Number(mediumId), list);

  const {
    field: { ref, value, onChange },
  } = useController({
    name: "smallId",
    control,
  });

  return (
    <FormControl>
      <InputLabel>소분류</InputLabel>
      <Select
        ref={ref}
        value={value ?? ""}
        label="소분류"
        onChange={onChange}
        sx={{
          width: "220px",
        }}
      >
        {smallCategory.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const CategorySelect: FC = () => {
  const { control, reset } = useForm<FormValues>({
    defaultValues: {
      mainId: "",
      mediumId: "",
      smallId: "",
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px",
      }}
    >
      <MainCategorySelect control={control} list={MainCategory} reset={reset} />
      <MediumCategorySelect
        control={control}
        list={MediumCategory}
        reset={reset}
      />
      <SmallCategorySelect
        control={control}
        list={SmallCategory}
        reset={reset}
      />
    </Box>
  );
};

export default CategorySelect;
