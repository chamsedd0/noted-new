import Header from "./header";
import SideBarComponent from "../components/sidebar/sideBar";
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
