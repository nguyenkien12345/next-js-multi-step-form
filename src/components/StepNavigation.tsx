'use client';

import { AddDealRoutes } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const steps = [
  {
    id: 1,
    title: 'Step One',
    route: 'step-one',
    link: AddDealRoutes.PRODUCT_INFO,
  },
  {
    id: 2,
    title: 'Step Two',
    route: 'step-two',
    link: AddDealRoutes.COUPON_DETAILS,
  },
  {
    id: 3,
    title: 'Step Three',
    route: 'step-three',
    link: AddDealRoutes.CONTACT_INFO,
  },
  { 
    id: 4,
    title: 'Review', 
    route: 'review', 
    link: AddDealRoutes.REVIEW_DEAL 
  },
];

export default function StepNavigation() {
  // Lấy đường dẫn hiện tại của trang web (pathname).
  const pathName = usePathname();

  // Lấy ra phần tử cuối cùng của mảng (Vd: add/step-one => Lấy ra step-one)
  const currentPath: string | undefined  = pathName.split('/').pop();

  // State quản lý màn hình đang ở step mấy
  const [currentStep, setCurrentStep] = useState<number>(0);
  console.log('currentStep: ', currentStep);

  // Mỗi lần chuyển trang tiến hành lưu lại currentStep
  useEffect(() => {
    const stepScreen = steps.findIndex((step) => step.route === currentPath);
    setCurrentStep(stepScreen > -1 ? stepScreen : 0);
    console.log('currentStep after updated: ', currentStep);
  }, [currentPath])

  return (
    <div className="mb-12 mt-4 lg:mb-0 min-w-60">
      {/* back button */}
      <Link
        href={steps[currentStep - 1]?.link || steps[0]?.link}
        prefetch={false}
        className="mb-4 flex items-center gap-2 text-xl disabled:text-white/50 lg:mb-12 lg:gap-5"
      >
        Back
      </Link>

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            prefetch={false}
            className="group z-20 flex items-center gap-3 text-2xl"
          >
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full border  text-sm  transition-colors duration-200  lg:h-12 lg:w-12 lg:text-lg',
                {
                  'border-none bg-teal-500 text-black group-hover:border-none group-hover:text-black':
                    currentPath === step.route,
                  'border-white/75 bg-gray-900 group-hover:border-white group-hover:text-white text-white/75':
                    currentPath !== step.route,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                'hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block',
                {
                  'font-semibold text-white': currentPath === step.route,
                  'font-light': currentPath !== step.route,
                }
              )}
            >
              {step.title}
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed lg:hidden" />
      </div>
    </div>
  );
}


// ***** prefetch: *****  
// - Cho phép trình duyệt tải trước các trang web liên kết một cách chủ động. 
// - Điều này có nghĩa là khi người dùng chưa thực sự click vào một liên kết nào đó, trình duyệt đã bắt đầu tải sẵn nội dung của trang đó ở chế độ nền.
// - Giảm thiểu thời gian chờ đợi khi người dùng chuyển từ trang này sang trang khác. 
// - Bằng cách tải trước nội dung, khi người dùng click vào liên kết, trang mới sẽ hiển thị gần như ngay lập tức, tạo cảm giác mượt mà và nhanh chóng cho người dùng.

// ***** clsx: Kết hợp nhiều class CSS thành 1 chuỗi duy nhất *****