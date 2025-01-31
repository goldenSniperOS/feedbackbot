import "./globals.css";

export const metadata = {
  title: "Feedbackbot",
  description: "Interactive Chatbot to get and analyze customer feedback",
};

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}
