'use server';

import { stepOneSchema } from "@/schemas";
import { AddDealRoutes, FormErrors } from "@/types";
import { redirect } from "next/navigation";

export const stepOneFormAction = ( 
    prevState: FormErrors | undefined,  formData: FormData 
): FormErrors | undefined => {
    // Chuyển đổi dữ liệu từ formData thành một đối tượng js
    const data = Object.fromEntries(formData.entries());

    // Tiến hành xác thực xem có lỗi validate nào không
    const validated = stepOneSchema.safeParse(data);

    if (!validated.success) {
        const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
            acc[issue.path[0]] = issue.message;
            return acc;
        }, {});
        return errors;
    } else {
        redirect(AddDealRoutes.COUPON_DETAILS);
    }
};

// Example about errors (validated.error.errors giống với validated.error.issues)
// validated.error.errors:  
// [
//     {
//         code: 'too_small',
//         minimum: 3,
//         type: 'string',
//         inclusive: true,
//         exact: false,
//         message: 'Name must be at least 3 characters',
//         path: [ 'name' ]
//     },
//     {
//         validation: 'url',
//         code: 'invalid_string',
//         message: 'Please enter a valid URL including starting with https://',
//         path: [ 'link' ]
//     }
// ]
