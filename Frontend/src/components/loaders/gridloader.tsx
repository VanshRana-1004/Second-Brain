import React from "react";
import { GridLoader } from "react-spinners";

interface params{
    loading: boolean;
}

export function Loader( props : params ) {
  return (
    <div className={"flex items-center justify-center bg-black h-full w-full"}>
      <GridLoader color="#ffffff" loading={props.loading} size={32} />
    </div>
  );
};

