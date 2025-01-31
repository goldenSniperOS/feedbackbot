import Navbar from "@/components/Navbar";


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <Navbar />
          <div className="flex-grow flex overflow-x-hidden">
            <div className="sm:px-7 sm:pt-7 px-4 pt-4 w-full">
            { children }
            </div>  
          </div>
        </div>
      </div>
    );
  }
