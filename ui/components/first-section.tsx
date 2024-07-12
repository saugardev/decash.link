'use client'

import { useState } from "react";
import { ProcessBeam } from "./process-beam";
import { ChevronRightIcon } from "lucide-react";

const components = [
  {
    name: 'Process Beam',
    description: 'This is the Process Beam component description.',
    component: ProcessBeam
  },
  {
    name: 'Another Component',
    description: 'This is the Another Component description.',
    component: ProcessBeam
  },
  {
    name: 'Third Component',
    description: 'This is the Third Component description.',
    component: ProcessBeam
  },
];

export default function FirstSection() {
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  const ActiveComponent = components[activeComponentIndex].component;

  return (
    <section id="problem" className="my-20">
      <div className="flex flex-1 flex-col space-y-1.5 px-5">
        <div className="inline-block w-fit rounded-full bg-primary px-3 py-1 text-sm text-background">
          Use Cases
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">Pay your friends with a link</h1>
        <p className="max-w-[600px] md:text-xl">A seamless and easy to use protocol to sim</p>
      </div>
      <div className="flex w-full items-center gap-5">
        <ul className="mt-10 flex w-1/2 flex-col">
          {components.map((item, index) => (
            <li 
              key={index}
              className="cursor-pointer rounded-xl p-5 transition-all duration-200 ease-out hover:bg-accent"
              onClick={() => setActiveComponentIndex(index)}
            >
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="mb-2 text-muted-foreground">{item.description}</p>
              <button
                className="mt-5 flex items-center text-xs"
              >
                <span>Learn More</span>
                <ChevronRightIcon className="size-4"/>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 w-1/2">
          <ActiveComponent />
        </div>
      </div>
    </section>
  )
}
