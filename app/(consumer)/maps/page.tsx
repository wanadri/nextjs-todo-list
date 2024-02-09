"use client";

import { useErpStore } from "@/store/erp"
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

function MapPage() {
  // state actions
  const getErpList = useErpStore((state) => state.getErpList);
  const getRegionPolygon = useErpStore((state) => state.getRegionPolygon);
  const getAreaPolygon = useErpStore((state) => state.getAreaPolygonPath);
  const setErp = useErpStore((state) => state.setSelectedErp);
  const selectedErp = useErpStore((state) => state.selectedErp);

  // state
  const erpList = useErpStore((state) => state.erpList);
  const [displayMainModal, setDisplayMainModal] = useState(true);

  useEffect(()=> {
    getErpList()
    getRegionPolygon()
  }, [getErpList, getRegionPolygon])

  const Map = useMemo(() => dynamic(
    () => import('./_components/Map'),
    {
      loading: () => <p>Load map...</p>,
      ssr: false
    }
  ), [])

  async function viewDetails(slug: string) {
    setDisplayMainModal(false);
    setErp(slug);
    await getAreaPolygon(slug);
  }

  function changeErp() {
    setDisplayMainModal(true);
    useErpStore.setState({ selectedErp: null });
    useErpStore.setState({ selectedErpPolygon: [] });
  }

  return (
    <div className="w-screen h-screen relative flex overflow-hidden">
      <div className={
        clsx(
          'bg-white text-black absolute z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl p-4 w-[50rem] h-[20rem] shadow-2xl',
          !displayMainModal && 'transform translate-y-[140%] transition-all duration-10000 ease-in',
          displayMainModal && 'transform translate-y-[-50%] transition-all duration-10000 ease-in',
        )
      }>
        {
          displayMainModal && (
            <>
              <span className="font-semibold text-2xl text-gray-600">
                Which would you like to see?
              </span>
              <div className="overflow-x-scroll scrollbar-hide">
                <div className="h-[16rem] p-4 flex flex-row space-x-2 w-[1000px]">
                  {erpList.map((erp, i) => {
                    return (
                      <div
                      onClick={() => viewDetails(erp.slug)}
                      key={i}
                      className="h-full w-1/3 rounded-3xl p-4 scale-100 hover:scale-95 hover:transition-all cursor-pointer relative overflow-hidden shadow-md ">
                        <div className={
                          clsx(
                            'absolute bottom-0 right-0 h-8 w-[200px] rotate-[135deg] mb-2 -mr-[70px] rounded-full',
                            erp.color_name === 'Red' && 'bg-red-400',
                            erp.color_name === 'Yellow' && 'bg-yellow-300',
                            erp.color_name === 'Green' && 'bg-green-400'
                          )
                        }>
                        </div>
                        <span className="font-semibold text-gray-800">
                          {erp.title}
                        </span>
                      </div>
                    )})
                  }
                </div>
              </div>
            </>
          )
        }
        {
          !displayMainModal && (
            <>
              <div>
                {selectedErp?.title}
              </div>
              <div className="absolute top-0 bg-white p-4 z-[999] right-0 mr-10 rounded-full shadow-lg -mt-10 transition-all ease-linear hover:cursor-pointer" onClick={() => changeErp()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
            </>
          )
        }

      </div>
      <Map />
    </div>
  )
}

export default MapPage