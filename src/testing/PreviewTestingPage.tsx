import Sidebar from "@/shared/components/navigation/Sidebar";
import { useState } from "react";
// import { AppHeader } from "@/shared/components/navigation/AppHeader";
// import SidebarToggle from "@/shared/components/navigation/SidebarToggle";

const PreviewTestingPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="pt-16">

<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
    </div>
  )
}

export default PreviewTestingPage