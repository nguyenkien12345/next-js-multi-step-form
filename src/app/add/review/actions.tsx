'use server';

import { NewDealType, stepOneSchema, stepThreeSchema, stepTwoSchema } from "@/schemas";
import { AddDealRoutes } from "@/types";

export type SubmitDealActionReturnType = {
   redirect?: AddDealRoutes;
   errorMsg?: string;
   success?: boolean 
}

export const submitDealAction = async (deal: NewDealType): Promise<SubmitDealActionReturnType> => {
    // Nếu màn hình step nào có lỗi validate thì return về màn hình đó kèm message lỗi
    
    const stepOneValidated = stepOneSchema.safeParse(deal);
    if (!stepOneValidated.success) {
        return {
            redirect: AddDealRoutes.PRODUCT_INFO,
            errorMsg: "Please validate product info"
        }
    }

    const stepTwoValidated = stepTwoSchema.safeParse(deal);
    if (!stepTwoValidated.success) {
        return {
            redirect: AddDealRoutes.COUPON_DETAILS,
            errorMsg: "Please validate coupon details"
        }
    }

    const stepThreeValidated = stepThreeSchema.safeParse(deal);
    if (!stepThreeValidated.success) {
        return {
            redirect: AddDealRoutes.CONTACT_INFO,
            errorMsg: "Please validate contact info"
        }
    }

    return {
        redirect: AddDealRoutes.PRODUCT_INFO,
        errorMsg: '',
        success: true
    }
};
