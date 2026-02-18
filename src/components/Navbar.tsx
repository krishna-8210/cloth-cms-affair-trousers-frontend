import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";

import { Input } from "@heroui/input";
import { Key, Menu } from 'lucide-react';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { div } from "framer-motion/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@heroui/tooltip";



const Nav_icons = ({ data }: any) => {
  return (
    <div className="w-10 h-10 rounded-xl flex justify-center items-center bg-blue-500 border">
      {data.icon}
    </div>
  )
}

export default function Navbar({ navOpen, setNavOpen }: any) {


  const itemsxads = window.location.pathname.split('/').pop();
  console.log(itemsxads)
  const [clicked, setClicked] = useState(itemsxads);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const nav_items = [

    // { id: "", title: "Home", tooltip: "", route: "/", icon: "Hm" },
    {
      id: "", title: "Works", tooltip: "", route: "/works", icon: "Wk", childs: [
        { title: "", route: "" }

      ]
    },
    { id: "", title: "Workers", tooltip: "", route: "/workers", icon: "Wr" },
    { id: "", title: "Inventry", tooltip: "", route: "/inventry", icon: "In" },
    // { id: "", title: "Invoice", tooltip: "", route: "/invoice", icon: "Gr" },
    { id: "", title: "Invoices", tooltip: "", route: "/Invoices", icon: "Iv" },
    { id: "", title: "Customers", tooltip: "", route: "/customers", icon: "Cm" },
    { id: "", title: "Agent", tooltip: "", route: "/agent", icon: "Ag" },


  ]

  return (
    <div className="w-full flex  flex-col pt-2 items-center h-full justify-start border-r-2 border-default-200 ">
      <Button onClick={() => { setNavOpen(!navOpen) }} isIconOnly variant="flat">
        <Menu />
      </Button>
      <div className="flex flex-col items-center  transition-all duration-100 
                ease-out">

        <ThemeSwitch />

      </div>
      <div className="flex flex-col gap-2 w-full h-full  items-center mt-5 ">
        {nav_items && nav_items.map((e: any, n: number) => {
          return <div key={n + 'nav_items'}>
            {clicked?.toLocaleLowerCase() == e.title.toLocaleLowerCase() ?
              <Link to={e.route}>
              <div onClick={(x) => {

                setClicked(e.title);

              }} className="cursor-pointer flex items-center flex-col">

                <div className="w-10 h-10  rounded-xl flex justify-center items-center bg-blue-500 ">{e.icon}</div>


                <div className="text-[10px]  text-center">{e.title}</div>
              </div>
</Link>
              :
              <Link to={e.route}>
                <div onClick={(x) => {

                  setClicked(e.title);

                }} className=" flex items-center flex-col">
                  <Tooltip placement="right" className="p-2" content={<div>{e.title}</div>}>
                    <div className="w-10 h-10 rounded-xl flex justify-center items-center bg-default-100">{e.icon}</div>
                  </Tooltip>

                  <div className="text-[10px] text-center">{e.title}</div>
                </div>
              </Link>



            }
          </div>
        })}
      </div>
    </div>
    // <HeroUINavbar maxWidth="xl" position="sticky">
    //   <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
    //     <NavbarBrand className="gap-3 max-w-fit">
    //       <Link
    //         className="flex justify-start items-center gap-1"
    //         color="foreground"
    //         href="/"
    //       >
    //         <Logo />
    //         <p className="font-bold text-inherit">ACME</p>
    //       </Link>
    //     </NavbarBrand>
    //     <div className="hidden lg:flex gap-4 justify-start ml-2">
    //       {siteConfig.navItems.map((item) => (
    //         <NavbarItem key={item.href}>
    //           <Link
    //             className={clsx(
    //               linkStyles({ color: "foreground" }),
    //               "data-[active=true]:text-primary data-[active=true]:font-medium",
    //             )}
    //             color="foreground"
    //             href={item.href}
    //           >
    //             {item.label}
    //           </Link>
    //         </NavbarItem>
    //       ))}
    //     </div>
    //   </NavbarContent>

    //   <NavbarContent
    //     className="hidden sm:flex basis-1/5 sm:basis-full"
    //     justify="end"
    //   >
    //     <NavbarItem className="hidden sm:flex gap-2">
    //       <Link isExternal href={siteConfig.links.twitter} title="Twitter">
    //         <TwitterIcon className="text-default-500" />
    //       </Link>
    //       <Link isExternal href={siteConfig.links.discord} title="Discord">
    //         <DiscordIcon className="text-default-500" />
    //       </Link>
    //       <Link isExternal href={siteConfig.links.github} title="GitHub">
    //         <GithubIcon className="text-default-500" />
    //       </Link>
    //       <ThemeSwitch />
    //     </NavbarItem>
    //     <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
    //     <NavbarItem className="hidden md:flex">
    //       <Button
    //         isExternal
    //         as={Link}
    //         className="text-sm font-normal text-default-600 bg-default-100"
    //         href={siteConfig.links.sponsor}
    //         startContent={<HeartFilledIcon className="text-danger" />}
    //         variant="flat"
    //       >
    //         Sponsor
    //       </Button>
    //     </NavbarItem>
    //   </NavbarContent>

    //   <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
    //     <Link isExternal href={siteConfig.links.github}>
    //       <GithubIcon className="text-default-500" />
    //     </Link>
    //     <ThemeSwitch />
    //     <NavbarMenuToggle />
    //   </NavbarContent>

    //   <NavbarMenu>
    //     {searchInput}
    //     <div className="mx-4 mt-2 flex flex-col gap-2">
    //       {siteConfig.navMenuItems.map((item, index) => (
    //         <NavbarMenuItem key={`${item}-${index}`}>
    //           <Link
    //             color={
    //               index === 2
    //                 ? "primary"
    //                 : index === siteConfig.navMenuItems.length - 1
    //                   ? "danger"
    //                   : "foreground"
    //             }
    //             href="#"
    //             size="lg"
    //           >
    //             {item.label}
    //           </Link>
    //         </NavbarMenuItem>
    //       ))}
    //     </div>
    //   </NavbarMenu>
    // </HeroUINavbar>
  );
};
