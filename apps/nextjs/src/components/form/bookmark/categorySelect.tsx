"use client";

import type { Dispatch, SetStateAction } from "react";
import CreatableSelect from "react-select/creatable";

import { api } from "~/utils/api";

export const CategorySelect = (props: {
  onChange: Dispatch<SetStateAction<number | null>>;
}) => {
  const [categories] = api.category.all.useSuspenseQuery();

  const options =
    categories.length === 0
      ? undefined
      : categories.map((item) => ({
          value: item.id,
          label: item.title,
        }));

  return (
    <CreatableSelect
      isClearable
      options={options}
      onChange={(v) => props.onChange(v ? v.value : null)}
    />
  );
};
