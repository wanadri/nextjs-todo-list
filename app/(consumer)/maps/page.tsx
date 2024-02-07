"use client";

import { useErpStore } from "@/store/erp"
import { useEffect } from "react";

function Maps() {
    const getErpList = useErpStore((state) => state.getErpList);

    useEffect(()=> {
        getErpList()
    }, [getErpList])

  return (
    <div className="bg-blue-600 text-gray-200 font-semibold h-screen w-screen">Maps</div>
  )
}

export default Maps