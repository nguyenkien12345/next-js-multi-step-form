'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormErrors } from "@/types";
import { useFormState } from "react-dom";
import { stepOneFormAction } from "./actions";

const initialState: FormErrors = {};

export default function StepOneForm() {
  const [ errors, formAction ] = useFormState(stepOneFormAction, initialState);

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center justify-between">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input label="Name" id="name" type="text" errorMsg={errors?.name}/>
        <Input label="Link" description="Must start with https" id="link" type="text" errorMsg={errors?.link} />
        <Button text="Submit" />
      </div>
    </form>
  );
}
