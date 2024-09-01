'use client';

import Button from "@/components/Button";
import { useAddDealContext } from "@/contexts/addDealContext";
import { NewDealType } from "@/schemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { submitDealAction } from "./actions";

export default function ReviewForm() {
  const router = useRouter();

  const { newDealData, resetLocalStorage } = useAddDealContext();
  const { name, link, coupon, discount, contactName, contactEmail, contactPhone } = newDealData;

  const handleFormSubmit = async (formData: FormData) => {
    const { success, errorMsg, redirect } = await submitDealAction(newDealData as NewDealType);

    if (success) {
      toast.success('Add new deal successfully');
      resetLocalStorage();
    } else if (errorMsg) {
      toast.error(errorMsg);
    }

    if (redirect) {
      router.push(redirect);
    }
  }

  return (
    <form 
      action={handleFormSubmit}
      className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]">
      <p className="text-xl md:text-3xl">Name: {name}</p>
      <p className="font-light text-white/90">
        Link:{' '}
        <a href={''} target="_blank" rel="noreferrer" className="font-normal underline hover:text-teal-500">
          {link}
        </a>
      </p>
      <p className="text-white/90">Coupon: {coupon}</p>
      <p className="text-white/90">Discount: {discount}</p>
      <p className="text-white/90">Contact Name: {contactName}</p>
      <p className="text-white/90">Contact Email: {contactEmail}</p>
      <p className="text-white/90">Contact Phone: {contactPhone}</p>
      <Button text="Submit" />
    </form>
  );
}
