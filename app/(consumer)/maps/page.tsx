"use client";

import { useErpStore } from "@/store/erp"
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import ErpListModal from "./_components/ErpListModal";

function MapPage() {

  // state actions
  const getRegionPolygon = useErpStore((state) => state.getRegionPolygon);

  useEffect(() => {
    getRegionPolygon();
  },[getRegionPolygon])

  const Map = useMemo(() => dynamic(
    () => import('./_components/Map'),
    {
      loading: () => <p>Load map...</p>,
      ssr: false
    }
  ), [])

  return (
    <div className="w-screen h-screen relative flex overflow-hidden">
      <ErpListModal />
      <Map />
    </div>
  )
}

export default MapPage