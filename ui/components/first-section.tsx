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

  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <section id="problem" className="w-full my-20 px-5">
      <div className="flex flex-col space-y-1 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">Simple by design</h1>
        <p className="max-w-[600px] mx-auto md:mx-0 md:text-xl">Create links with ease</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-5 mt-10">
        <ul className="flex flex-col w-full md:w-1/2 space-y-5">
          {components.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-xl p-5 transition-all duration-200 ease-out hover:bg-accent"
              onClick={() => handleClick(item.link)}
            >
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="mb-2 text-muted-foreground">{item.description}</p>
              <button className="mt-5 flex items-center text-xs">
                <span>Learn More</span>
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </button>
            </li>
          ))}
        </ul>
        <div className="w-full lg:w-1/2 h-[400px] mt-8 md:mt-0">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
}
