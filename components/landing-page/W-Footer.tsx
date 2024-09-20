import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "./Container";
import VercelImg from "./../../public/assets/images/vercel.svg"
import LogoImg from "./../../public/assets/images/A-Letter-Logo.png"
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import WaitListModal from "./WaitListModal";

export const WaitlistFooter = () => {
  // If you actually have items you can make this as a normal array
  const navigation: any[] = [];
  const legal: any[] = [];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <Image
                  src={LogoImg}
                  alt="N"
                  width="32"
                  height="32"
                  className="w-8"
                />
                <span>Automata Trading</span>
              </Link>
            </div>

            <div className="max-w-lg mt-4 text-gray-500 dark:text-gray-400">

            </div>

            <div className="mt-5">
              <a
                href="https://vercel.com/?utm_source=web3templates&utm_campaign=oss"
                target="_blank"
                rel="noopener"
                className="relative block w-44"
              >
                <Image
                  src={VercelImg}
                  alt="Powered by Vercel"
                  width="212"
                  height="44"
                />
              </a>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button className="bg-indigo-600">
                    Join Waitlist
                  </Button>
                </DialogTrigger>
                <WaitListModal />
              </Dialog>

            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥
        </div>
      </Container>
      {/* Do not remove this */}
      <Backlink />
    </div>
  );
}

const Backlink = () => {
  return (
    <div></div>
  );
};