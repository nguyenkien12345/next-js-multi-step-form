'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormErrors } from "@/types";
import { useFormState } from "react-dom";
import { stepThreeFormAction } from "./actions";

const initialState: FormErrors = {};

export default function StepThreeForm() {
  const [ errors, formAction ] = useFormState(stepThreeFormAction, initialState);

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center justify-between">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input label="Contact name"  id="contactName"  type="text" errorMsg={errors?.contactName} />
        <Input label="Contact email" id="contactEmail" type="text" errorMsg={errors?.contactEmail} />
        <Input label="Contact phone" id="contactPhone" type="text" errorMsg={errors?.contactPhone} />
        <Button text="Submit" />
      </div>
    </form>
  );
}
