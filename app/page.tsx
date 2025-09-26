// import Image from "next/image";
// import 'tailwindcss/tailwind.css'

import Sidebar from "@/components/Sidebar/Sidebar";
import TasksDemoPage from '@/components/Body/Body';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <TasksDemoPage />
    </div>
  );
}
