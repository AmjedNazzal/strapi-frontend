"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type Item = {
  id: number;
  ItemTitle: string;
  itemDescription: string;
};

type HomePageData = {
  pageTitle: string;
  pageSubtitle: string;
  pageDesc: string;
  items: Item[];
};

export default function Home() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [openItemId, setOpenItemId] = useState<number | null>(0);

  useEffect(() => {
    axios.get("http://localhost:1337/api/main?populate=items").then((res) => {
      console.log(res);
      const { pageTitle, items, pageSubtitle, pageDesc } = res.data.data;
      setData({ pageTitle, items, pageSubtitle, pageDesc });
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <main className="p-6 flex flex-col mx-auto font-sans gap-6">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-[24px]">{data.pageTitle}</h2>
        <h1 className="text-[36px] font-bold">{data.pageSubtitle}</h1>
        <p>{data.pageDesc}</p>
      </div>
      <div className="grid grid-cols-2 gap-[50px] w-full justify-between px-[100px]">
        <div className="flex w-full relative items-center">
          <div className="w-[230px] z-[-1] h-[230px] overflow-hidden rounded-full absolute right-[15%]">
            <Image
              src={"/mainImage.jpg"}
              width={230}
              height={230}
              alt="main image"
              className="overflow-hidden rouned-full object-cover"
            />
          </div>

          <div className="flex w-[230px] h-[230px] rounded-full bg-red-300/70 overflow-hidden p-4 items-center">
            {typeof openItemId === "number" && (
              <div className="flex flex-col gap-2">
                <p className="text-white text-[14px] font-bold">
                  {data.items[openItemId].ItemTitle}
                </p>
                <p className="text-white text-[12px] leading-tight break-words">
                  {data.items[openItemId].itemDescription}
                </p>
              </div>
            )}
          </div>
        </div>
        <ul className="space-y-3">
          {data.items.map((item, index) => (
            <li key={index}>
              <button
                className={`flex w-full justify-between font-bold ${
                  openItemId === index ? "bg-red-300" : "bg-gray-300"
                } py-2 px-4 rounded-full`}
                onClick={() =>
                  setOpenItemId(openItemId === index ? null : index)
                }
              >
                <p>{"<"}</p>
                <p className={`${openItemId === index ? "text-white" : ""}`}>
                  {item.ItemTitle}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
