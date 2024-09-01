'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormErrors } from "@/types";
import { useFormState } from "react-dom";
import { stepTwoFormAction } from "./actions";

const initialState: FormErrors = {};

export default function StepTwoForm() {
  const [ errors, formAction ] = useFormState(stepTwoFormAction, initialState);

  return (
    <form action={formAction} className="flex flex-1 flex-col items-center justify-between">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input label="Coupon Code"  id="coupon"    type="text"     errorMsg={errors?.coupon} />
        <Input label="Discount (%)" id="discount"  type="number"   errorMsg={errors?.discount} />
        <Button text="Submit" />
      </div>
    </form>
  );
}
