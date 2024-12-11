import Header from "@/app/components/header";
import SideBarComponent from "@/app/components/sidebar";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header hightlighted="coursenotes" />
      {children}
      <SideBarComponent page="dashboard" />
    </>
  );
}
