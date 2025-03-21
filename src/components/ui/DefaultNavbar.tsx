import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Divider,
  Button,
} from "@heroui/react";
// import clsx from "clsx";
import BrandLogo from "./BrandLogo";
import authenticateUser from "@/handlers/supabase-authentication";
import { useAuthContext } from "@/hooks/useAuthContext";
import userIcon from "@/assets/images/user-icon.jpeg";
import { Link, useLocation } from "react-router-dom";
import NavBarLink from "./NavBarLink";
import Search from "./Search";

const { signInWithGooglePopup, signOutGoogle } = authenticateUser;

/* eslint-disable no-console */
const DefaultNavbar = () => {
  const { session, setSession } = useAuthContext();
  const { pathname } = useLocation();
  console.log(session?.user);

  return (
    <Navbar maxWidth="full" className="bg-white z-40">
      <NavbarContent className="md:container md:mx-auto">
        <NavbarContent className="w-full overflow-hidden" justify="start">
          <NavbarBrand>
            <Link className="flex w-full items-center" to="/">
              <BrandLogo />
              <p
                className={`hidden md:block font-normal text-inherit antialiased ${pathname === "/" ? "text-primary-500" : ""}`}
              >
                Fotox
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="px-4 flex gap-3">
          <NavbarItem className="hidden sm:block ">
            <NavBarLink pathName="/" toProp="/" lintText="Home" />
          </NavbarItem>
          {session && (
            <NavbarItem className="hidden sm:block ">
              <NavBarLink
                pathName="/my-fotox"
                toProp="/my-fotox"
                lintText="My Fotox"
              />
            </NavbarItem>
          )}
          {session && (
            <NavbarItem className="hidden sm:block ">
              <NavBarLink
                pathName="/profile"
                toProp="/profile"
                lintText="Account"
              />
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent
          as="div"
          className="items-center px-2  [@media(min-width:350px)]:min-w-[200px] [@media(max-width:490px)]:min-w-0"
          justify="end"
        >
          {!pathname.includes("/fotox/") ? <Search /> : ""}
          <Dropdown className="rounded-sm h-screen relative mt-2">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform w-full h-full max-w-8 max-h-8"
                color={`${pathname === "/profile" ? "primary" : "default"}`}
                name={session ? session?.user?.user_metadata.name : ""}
                src={
                  session
                    ? `${session?.user?.user_metadata.avatar_url}`
                    : userIcon
                }
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className={`h-full relative  ${session ? "" : "flex flex-col justify-center"}`}
            >
              <DropdownItem
                key="user"
                textValue="user"
                className={`gap-2 max-h-min ${session ? "pointer-events-none" : ""}`}
              >
                {!session && (
                  <Button
                    className="capitalize w-full"
                    onPress={async () => {
                      await signInWithGooglePopup();
                    }}
                  >
                    Sign in
                  </Button>
                )}
                {session && (
                  <div className="antialiased flex flex-col gap-2 h-full items-center font-inter text-default-500 dark:text-default-400">
                    <p>{session ? session?.user?.user_metadata.name : ""}</p>
                    <p>{session ? session?.user?.user_metadata.email : ""}</p>
                  </div>
                )}
              </DropdownItem>
              {session && <DropdownItem
                key="divider"
                textValue="divider"
                className="pointer-events-none -mt-2"
              >
                <Divider key="hrule" />
              </DropdownItem>}

              {session && (
                <DropdownItem
                  className="antialiased block sm:hidden max-h-min"
                  key="home"
                  textValue="home"
                >
                  <NavBarLink pathName="/" toProp="/" lintText="Home" />
                </DropdownItem>
              )}
              {session && (
                <DropdownItem
                  className="antialiased block sm:hidden max-h-min"
                  key="my fotox"
                  textValue="my fotox"
                >
                  <NavBarLink
                    pathName="/my-fotox"
                    toProp="/my-fotox"
                    lintText="My fotox"
                  />
                </DropdownItem>
              )}

              {session && (
                <DropdownItem
                  className="antialiased block sm:hidden max-h-min"
                  key="account"
                  textValue="account"
                >
                  <NavBarLink
                    pathName="/profile"
                    toProp="/profile"
                    lintText="Account"
                  />
                </DropdownItem>
              )}

              {session && (
                <DropdownItem
                  textValue="signout"
                  key="signout"
                  color="danger"
                  className="mb-28 h-min absolute bottom-0 left-0"
                >
                  <Button
                    color="danger"
                    className="capitalize w-full"
                    onPress={async () => {
                      await signOutGoogle().then((resolve) =>
                        setSession(resolve)
                      );
                    }}
                  >
                    Sign out
                  </Button>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>
      <Divider className="bg-[#dcdcdc] w-full h-[1px] absolute top-0 left-0 inset-0 mt-16" />
    </Navbar>
  );
};

export default DefaultNavbar;
