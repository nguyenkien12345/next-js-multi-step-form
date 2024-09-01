'use server';

import { stepThreeSchema } from "@/schemas";
import { AddDealRoutes, FormErrors } from "@/types";
import { redirect } from "next/navigation";

export const stepThreeFormAction = (    
    prevState: FormErrors | undefined,  formData: FormData 
): FormErrors | undefined => {
    // Chuyển đổi dữ liệu từ formData thành một đối tượng js
    const data = Object.fromEntries(formData.entries());

    // Tiến hành xác thực xem có lỗi validate nào không
    const validated = stepThreeSchema.safeParse(data);

    if (!validated.success) {
        const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
            acc[issue.path[0]] = issue.message;
            return acc;
        }, {});
        return errors;
    } else {
        redirect(AddDealRoutes.REVIEW_DEAL);
    }
};
