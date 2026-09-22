import type { StylesConfig, GroupBase } from "react-select";

export const getSelectStyles = <T>() =>
  ({
    container: (base) => ({
      ...base,
      minWidth: 160,
    }),

    control: (base, state) => ({
      ...base,
      backgroundColor: "var(--select-bg)",
      opacity: state.isDisabled ? 0.5 : 1,
      cursor: state.isDisabled ? "not-allowed" : "default",
    }),

    singleValue: (base) => ({
      ...base,
      color: "var(--text-color)",
    }),

    placeholder: (base, state) => ({
      ...base,
      color: "var(--text-color)",
      opacity: state.isDisabled ? 0.6 : 1,
    }),

    input: (base) => ({
      ...base,
      color: "var(--text-color)",
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "var(--select-bg)",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--select-option-active)"
        : state.isFocused
          ? "var(--select-option-hover)"
          : "var(--select-bg)",
      color: "var(--select-text)",
      cursor: "pointer",

      ":active": {
        backgroundColor: "var(--select-option-active)",
      },
    }),

    dropdownIndicator: (base, state) => ({
      ...base,
      color: "var(--select-indicator-color)",
      opacity: state.isDisabled ? 0.5 : 1,

      "&:hover": {
        color: "var(--select-indicator-color)",
      },
    }),

    clearIndicator: (base) => ({
      ...base,
      color: "var(--select-indicator-color)",

      "&:hover": {
        color: "var(--select-indicator-color)",
      },
    }),
  }) as StylesConfig<T, false, GroupBase<T>>;
