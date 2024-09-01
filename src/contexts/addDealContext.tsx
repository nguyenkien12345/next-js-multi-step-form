"use client";

import { newDealInitialValuesSchema, NewDealInitialValuesType, NewDealType } from "@/schemas";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Giá trị khởi tạo ban đầu của toàn bộ form (Bao gồm toàn bộ các field của các màn hình step)
const initialNewDeal: NewDealInitialValuesType = {
    name: '',
    link: '',
    coupon: '',
    discount: undefined,
    contactName: '',
    contactEmail: '',
    contactPhone: ''
};

type AddDealContextType = {
    newDealData: NewDealInitialValuesType;
    updateNewDealDetails: (dealDetails: Partial<NewDealType>) => void; 
    dataLoaded: boolean;
    resetLocalStorage: () => void;
};

export const AddDealContext = createContext<AddDealContextType | null>(null);

const LOCAL_STORAGE_MULTIPLE_STEP_FORM = "multiple-step-form-data";

export const AddDealContextProvider = ({children} : {children: React.ReactNode}) => {
    // Quản lý state của toàn bộ form (Toàn bộ các màn hình step)
    const [newDealData, setNewDealData] = useState<NewDealInitialValuesType>(initialNewDeal);
    // Dữ liệu ban đầu đã được tải lên hay chưa (Không phải là field quản lý loading / load)
    const [dataLoaded, setDataLoaded]   = useState<boolean>(false);

    const updateNewDealDetails = (dealDetails: Partial<NewDealType>) => {
        // Mỗi lần ở bất cứ một màn hình step nào có sự thay đổi dữ liệu của field thì tiến hành cập nhật ghi đè dữ liệu lên lại field cũ, 
        // các field còn lại giữ nguyên
        setNewDealData((prev) => ({ ...prev, ...dealDetails }));
    }

    const writeLocalStorage = useCallback(() => {
        localStorage.setItem(LOCAL_STORAGE_MULTIPLE_STEP_FORM, JSON.stringify(newDealData));
    }, [newDealData]);

    const readLocalStorage = () => {
        // Lưu trữ lại data để mỗi khi người dùng reload lại page thì sẽ không bị mất đi gía trị đã điền trước đó 
        // hoặc mỗi khi chúng ta bấm next/previous page thì dữ liệu ở các màn hình step sẽ không bị biến mất đi
        const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_MULTIPLE_STEP_FORM);
        if (!dataLocalStorage) {
            return setNewDealData(initialNewDeal);
        }

        const validatedData = newDealInitialValuesSchema.safeParse(JSON.parse(dataLocalStorage));
        if (validatedData.success) {
            setNewDealData(validatedData.data)
        }
        else {
            setNewDealData(initialNewDeal);
        }
    }

    const resetLocalStorage = () => {
        // Reset toàn bộ form về gía trị mặc định ban đầu
        setNewDealData(initialNewDeal);
        localStorage.setItem(LOCAL_STORAGE_MULTIPLE_STEP_FORM, JSON.stringify(initialNewDeal))
    }

    useEffect(() => {
        readLocalStorage();
        setDataLoaded(true);
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            writeLocalStorage();
        }
    }, [newDealData, dataLoaded, writeLocalStorage])

    return (
        <AddDealContext.Provider value={{
            newDealData,
            dataLoaded,
            updateNewDealDetails,
            resetLocalStorage
        }}>
            {children}
        </AddDealContext.Provider>
    )
}

export const useAddDealContext = () => {
    const context = useContext(AddDealContext);
    if (!context) {
        throw new Error('useAddDealContext must be used within an AddDealContext');
    }
    return context;
}