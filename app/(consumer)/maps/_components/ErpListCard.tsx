import useApi from '@/hooks/useApi'
import route from '@/utils/api_route'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import clsx from 'clsx'
import { useErpStore } from '@/store/erp'

type ErpListCardProps = {
    onClickViewDetails: (status: boolean) => void;
};

function ErpListCard(props: ErpListCardProps) {
    const setErp = useErpStore((state) => state.setSelectedErp);
    const getAreaPolygon = useErpStore((state) => state.getAreaPolygonPath);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['erpList'],
        queryFn: (): Promise<IBaseResponse<IErpListResponse[]>> => useApi.get({ url: route.erp.list }),
    })

    useEffect(() => {
        useErpStore.setState({ erpList: data?.data });
    }, [data])

    async function viewDetails(slug: string) {
        props.onClickViewDetails(false);
        setErp(slug);
        await getAreaPolygon(slug);
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error...</p>

    let erpList = data?.data;

    return (
        <>
            {
                erpList?.map(
                    (erp, i) => {
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
                        )
                    }
                )
            }
        </>
    )
}

export default ErpListCard