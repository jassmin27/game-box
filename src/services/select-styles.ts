import type { StylesConfig, GroupBase } from "react-select";

export const getSelectStyles = <T>() =>
  ({
    container: (base) => ({ ...base, minWidth: 160 }),
    control: (base) => ({ ...base, backgroundColor: "var(--select-bg)" }),
    singleValue: (base) => ({ ...base, color: "var(--text-color)" }),
    placeholder: (base) => ({ ...base, color: "var(--text-color)" }),
    menu: (base) => ({ ...base, backgroundColor: "var(--select-bg)" }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--select-option-active)"
        : state.isFocused
        ? "var(--select-option-hover)"
        : "transparent",
      color: "var(--select-text)",
      cursor: "pointer",
      ":active": {
        backgroundColor: "var(--select-option-active)",
      },
    }),
  } as StylesConfig<T, false, GroupBase<T>>);
