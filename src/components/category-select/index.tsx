import type { FC } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
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

// 첫 번째 설계했을 때
const getCategoryList = (parent: number, list: Array<Category>) => {
  return list.filter((item) => item.parent === parent);
};

const CategorySelect: FC = () => {
  const [mainId, setMainId] = useState<number | null>(null);
  const [mediumId, setMediumId] = useState<number | null>(null);
  const [smallId, setSmallId] = useState<number | null>(null);

  const [mainCategory, setMainCategory] = useState<Array<Category>>([]);
  const [mediumCategory, setMediumCategory] = useState<Array<Category>>([]);
  const [smallCategory, setSmallCategory] = useState<Array<Category>>([]);

  const handleChangeMain = (e: SelectChangeEvent) => {
    const id = Number(e.target.value);
    setMainId(id);
    setMediumId(null);
    setSmallId(null);
    setMediumCategory(getCategoryList(id, MediumCategory));
  };

  const handleChangeMedium = (e: SelectChangeEvent) => {
    const id = Number(e.target.value);
    setMediumId(id);
    setSmallId(null);
    setSmallCategory(getCategoryList(id, SmallCategory));
  };

  const handleChangeSmall = (e: SelectChangeEvent) => {
    const id = Number(e.target.value);
    setSmallId(id);
  };

  useEffect(() => {
    setMainCategory(getCategoryList(0, MainCategory));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px",
      }}
    >
      <FormControl>
        <InputLabel>대분류</InputLabel>
        <Select
          value={mainId ? `${mainId}` : ""}
          label="대분류"
          onChange={handleChangeMain}
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
      <FormControl>
        <InputLabel>중분류</InputLabel>
        <Select
          value={mediumId ? `${mediumId}` : ""}
          label="대분류"
          onChange={handleChangeMedium}
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
      <FormControl>
        <InputLabel>소분류</InputLabel>
        <Select
          value={smallId ? `${smallId}` : ""}
          label="소분류"
          onChange={handleChangeSmall}
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
    </Box>
  );
};

export default CategorySelect;

/*
문제점
- 분류가 추가된다면? 관리해야할 상태가 증가, 이벤트 핸들러 추가
- 복잡한 상태
*/
