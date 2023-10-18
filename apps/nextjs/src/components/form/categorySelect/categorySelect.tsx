"use client";

import type { Dispatch, SetStateAction } from "react";
import CreatableSelect from "react-select/creatable";

import { api } from "~/utils/api";

export const CategorySelect = (props: {
  onChange: Dispatch<SetStateAction<number | null>>;
  defaultValue?: number | null;
}) => {
  const [categories] = api.category.all.useSuspenseQuery();

  const options =
    categories.length === 0
      ? undefined
      : categories.map((item) => ({
          value: item.id,
          label: item.title,
        }));

  const defaultVal = () => {
    if (!options) return null;
    if (!props.defaultValue) return null;

    const hoge = options.filter(
      (option) => option.value === props.defaultValue,
    );
    return hoge;
  };

  return (
    <CreatableSelect
      isClearable
      options={options}
      onChange={(v) => props.onChange(v ? v.value : null)}
      defaultValue={defaultVal()}
    />
  );
};
