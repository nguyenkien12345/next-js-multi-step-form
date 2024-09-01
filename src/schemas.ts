import z from 'zod';

export const stepOneSchema = z.object({
  name: z.string()
    .min(3,   { message: 'Name must be at least 3 characters' })
    .max(255, { message: 'Name cannot exceed 255 characters' } ),
  link: z.string()
    .url('Please enter a valid URL including starting with https://'),
});

export const stepTwoSchema = z.object({
  coupon: z.string()
    .min(5, { message: 'Coupon code must be at least 5 characters' })
    .max(24, { message: 'Coupon code cannot exceed 24 characters' } ),
  // z.coerce.number() Ép kiểu dữ liệu về thành số 
  discount: z.coerce.number()
    .min(1, 'Discount must be at least 1%')
    .max(100, 'Discount must be at most 100%'),
});

export const stepThreeSchema = z.object({
  contactName: z.string()
    .min(5, 'Please enter a contact name of at least 5 characters'),
  contactEmail: z.string()
    .email('Please enter a valid email'),
  contactPhone: z.string()
    .regex(/^(03|05|07|08|09)[0-9]{8,9}$/, 'Please enter a valid phone number')
});

export const newDealSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
});

// .shape: Lấy ra một đối tượng chứa thông tin về cấu trúc của schema đó.
// z.infer: Hàm này nhận vào một schema làm đối số và trả về một kiểu dữ liệu TypeScript tương ứng với cấu trúc của schema đó.

// Tạo ra 1 kiểu dữ liệu mới có tên là NewDealType 
export type NewDealType = z.infer<typeof newDealSchema>;

export const newDealInitialValuesSchema = z.object({
  name: z.string().optional(),
  link: z.string().optional(),
  coupon: z.string().optional(),
  discount: z.coerce.number().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
});

// Tạo ra 1 kiểu dữ liệu mới có tên là NewDealInitialValuesType 
export type NewDealInitialValuesType = z.infer<
  typeof newDealInitialValuesSchema
>;
