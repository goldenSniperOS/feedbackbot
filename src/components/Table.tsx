import { TableTypes } from "@/types/table";
import Link from "next/link";

// `app/page.tsx` is the UI for the `/` URL
export default function Table({ data, headers, label }
    : { data: any[], headers: Array<{ label: string, type: TableTypes, path: string }>, label: string }) {

    const returnCellValue = (cellValue, type) => {
        if(Array.isArray(cellValue))
            return cellValue.length;
        if(type === TableTypes.Link)
            return <div><Link href={cellValue} prefetch={false} target="_blank">{cellValue}</Link></div>;
        return cellValue
    }
    
    if (data.length === 0)
        return <h1>No {label} found.</h1>

    return (
        <div className="p-8">
            <div className="bg-transparent rounded-lg shadow-lg overflow-hidden">
                <table className="table-auto w-full">
                        <thead className="bg-blue-500 text-white shadow-lg">
                            <tr>
                                {headers.map(({label}, i) => {
                                    return <th className="py-3 px-4 text-left" key={i}>{ label }</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            { data.map((d, i) => {
                                return (
                                    <tr className="hover:bg-gray-700" key={i}>
                                        {headers.map(({ path, type }, j) => {
                                            const cellValue = d[path];
                                            return (
                                                <td className="px-4 py-3" key={`${i}-${j}`}>
                                                    { returnCellValue(cellValue, type) }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                </table>
            </div>
        </div>
    );
  }