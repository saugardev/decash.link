'use client'

import { useState } from "react";
import { ProcessBeam } from "./process-beam";
import { ChevronRightIcon } from "lucide-react";

const components = [
  {
    name: 'Create',
    description: 'Configure easily your link.',
    link: 'https://docs.decash.link/docs/user-guide/create-link',
    component: ProcessBeam
  },
  {
    name: 'Sign',
    description: 'Confirm the deposit and create a link.',
    link: 'https://docs.decash.link/docs/user-guide/create-link#make-the-deposit',
    component: ProcessBeam
  },
  {
    name: 'Send',
    description: 'Share with anybody.',
    link: 'https://docs.decash.link/docs/user-guide/create-link#share-link',
    component: ProcessBeam
  },
];


export default function FirstSection() {
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  const ActiveComponent = components[activeComponentIndex].component;

  const handleClick = (link: string) => {
    window.location.href = link;
  };
  

  return (
    <section id="problem" className="!w-full my-20">
      <div className="flex flex-1 flex-col space-y-1 px-5">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">Simple by design</h1>
        <p className="max-w-[600px] md:text-xl">Create links with ease</p>
      </div>
      <div className="flex w-full h-full items-center gap-5">
        <ul className="mt-10 flex w-1/2 flex-col">
          {components.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-xl p-5 transition-all duration-200 ease-out hover:bg-accent"
              onClick={() => handleClick(item.link)}
            >
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="mb-2 text-muted-foreground">{item.description}</p>
              <button
                className="mt-5 flex items-center text-xs"
              >
                <span>Learn More</span>
                <ChevronRightIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 w-1/2 h-[400px]">
          <ActiveComponent />
        </div>
      </div>
    </section>
  )
}
