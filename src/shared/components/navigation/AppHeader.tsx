// import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/Button";

import { ThemeToggle } from "../ui/ThemeToggle";
import DummySearch from "../ui/DummySearch";
import { CreateIcon, NotificationsIcon } from "../ui/icons/SangumIcons";
import { IconButton } from "../ui/IconButton";
import { UserAvatar } from "@/modules/user/components/UserAvatar";


export const AppHeader: React.FC = () => {
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const onScroll = () => setScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);



  return (
    <nav className="sticky top-0 w-full z-99 transition-all duration-300 border-border bg-bg text-text border-b flex items-center justify-between p-6 h-14">
<DummySearch />

        <div className="hidden tablet:flex items-center gap-2 justify-end">
            <Button size="sm" iconLeft={<CreateIcon />}>
              Create
            </Button>
            <ThemeToggle />
            
            <IconButton icon={<NotificationsIcon/>} aria-label="Notification"></IconButton>
            {/* // href recieve endpoints */}
            <UserAvatar displayName="Avatar" username="avatar" size="sm" href="userss"/>
            


          {/* Desktop */}
          {/* <div className="hidden md:flex items-center gap-2 text-text-secondary">
            <Button variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>

            <Button size="sm">
              <Link to="/register" >Register</Link>
            </Button>
          </div> */}
          


        </div>
      {/* </div> */}


    </nav>
  );
};
