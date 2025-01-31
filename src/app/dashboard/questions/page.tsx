import Table from "@/components/Table";
import { getAllQuestions } from "@/lib/questions";
import { TableTypes } from "@/types/table";


// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
    const questions = await getAllQuestions();
    const headers = [
        { label:"Order", type: TableTypes.Number, path:"order" },
        { label:"Question", type: TableTypes.String, path:"message" },
        { label:"Suggestions", type: TableTypes.Link, path:"suggestions" }
    ]
    return <Table data={questions} headers={headers} label={"questions"} />
}
