type FormSelectField = "level" | "first" | "second" | "third";
type Level = 0 | 1 | 2 | 3;

// FormSelectField의 key를 활용하도록 변경할 수는 없을까?
// key를 작성하다 오타가 발생할 수 있고, key를 따로 관리하는게 추후에 수정하거나 추가할 때 편리할 것 같음
interface FormValues {
  level: Level | null;
  first: string | null;
  second: string | null;
  third: string | null;
}
