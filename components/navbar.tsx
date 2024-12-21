"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
//import { Image } from "@nextui-org/image";
import Image from "next/image";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { Badge } from "@nextui-org/react";

import { initialState } from "@/redux/userSlice";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LinkedinIcon, GithubIcon, HackerRankIcon } from "@/components/icons";
import { DataUser, RootState, setUser } from "@/redux/userSlice";
import { LOCALSTORAGE_KEY, LOCALSTORAGE_CART } from "@/dataEnv/dataEnv";

export const Navbar = () => {
  const router = useRouter();
  const user: DataUser = useSelector((state: RootState) => state.user);
  const [storedDataUser] = useLocalStorage<DataUser>(
    LOCALSTORAGE_KEY,
    initialState
  );
  const [cart] = useLocalStorage(LOCALSTORAGE_CART, []);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dataUser: ", user);
  }, [user]);

  useEffect(() => {
    console.log("storedDataUser: ", storedDataUser);
    if (storedDataUser.email && !user.email) {
      dispatch(setUser(storedDataUser));
    }
  }, [storedDataUser]);

  const showCart = () => {
    console.log("show cartShop: ");
    router.push("/pricing");
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1 me-4"
            href="/"
          >
            <Image
              alt="NextUI hero Image"
              height={30}
              src={user.imageUrl ? user.imageUrl : "/logoMagicLog.png"}
              width={30}
            />
            <p className="font-bold text-inherit">
              {user.name ? user.name : "MagicLog"}
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {user.email && (
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href="/logout"
              >
                Logout
              </NextLink>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            aria-label="Linkedin"
            href={siteConfig.links.linkedin}
          >
            <LinkedinIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="HackerRank"
            href={siteConfig.links.hackerRank}
          >
            <HackerRankIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle className="flex lg:hidden" />
        <Badge color="primary" content={cart.length} size="sm">
          <BsCart3
            className="text-2xl text-default-500"
            style={{ cursor: "pointer" }}
            onClick={showCart}
          />
        </Badge>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
        <Badge color="primary" content={cart.length} size="sm">
          <BsCart3
            className="text-2xl text-default-500"
            style={{ cursor: "pointer" }}
            onClick={showCart}
          />
        </Badge>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {user.email && (
            <NavbarMenuItem>
              <Link href="/logout" size="lg">
                Logout
              </Link>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
