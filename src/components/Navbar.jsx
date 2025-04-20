"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import Link from "next/link"; // For navigation
import { usePathname } from "next/navigation"; // To get the current route
import { signIn, signOut, useSession } from "next-auth/react";
import SignOutButton from "../app/(customerFacing)/_components/SignInButton";
import { getUser } from "../app/(customerFacing)/actions/checkout";
import { useCustomSession } from "../context/AuthContext";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blogs", href: "/blogs" },
    { name: `FAQ's`, href: "/faqs" },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Access current route
  const isAuthenticated = useCustomSession();


  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <span className="text-lg font-semibold text-gray-800">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-gray-600 hover:text-green-600 transition"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-6 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                <a
                    href={page.href}
                    onClick={() => setOpen(false)} // Close menu on click
                    className={`block text-lg font-medium text-gray-800 hover:text-green-600 transition-all duration-300 ${
                      pathname === page.href ? "border-b-2 border-green-500" : ""
                    }`}
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {isAuthenticated ? (
                <SignOutButton/>
              ) : (
                <>
                  <div className="flow-root">
                    <a
                    onClick={() => setOpen(false)} 
                      href="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                    onClick={() => setOpen(false)} 
                      href="/sign-up"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="/" className="-m-2 flex items-center p-2">
                <img
                  alt="brand logo"
                  src="/india logo.png"
                  className="block h-auto w-10 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">
                  IND
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹499
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Eden Mist</span>
                  <img alt="" src="/brand.jpg" className="h-14 w-20" />
                </a>
              </div>

              {/* Desktop Navigation */}
              <PopoverGroup className="hidden lg:flex lg:ml-8">
                <div className="flex space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                    key={page.name}
                    href={page.href}
                    className={`text-sm font-medium ${
                      pathname === page.href ? "text-green-600 border-b-2 border-green-500" : "text-gray-700"
                    } hover:text-gray-800`}
                  >
                    {page.name}
                  </Link>
                  ))}
                </div>
              </PopoverGroup>

              {/* User & Account Section */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {isAuthenticated ? <SignOutButton/> : (
                    <>
                       <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a href="/sign-up" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                    </>
                  )}
                  
                  {/* <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a href="/sign-up" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a> */}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="/"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      alt=""
                      src="/india logo.png"
                      className="block h-auto w-10 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">IND</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Account */}
                {isAuthenticated && (
                  <div className="flex lg:ml-6">
                  <a href="/my-account" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">User</span>
                    <UserIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div>
                )}
                

              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
