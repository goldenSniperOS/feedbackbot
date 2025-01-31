import Reports from "@/components/Reports";
import { getAllClassifications } from "@/lib/classifications";

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
    const classifications = await JSON.parse(JSON.stringify(await getAllClassifications()));
    return <Reports classifications={classifications}/>
}
