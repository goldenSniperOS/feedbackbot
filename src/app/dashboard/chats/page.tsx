import ChatSection from "@/components/ChatSection";

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
    return (
        <ChatSection host={process.env.HOST_URI} />
    )
  }