import { Departments } from "@/types";
import { Database , Server, Code} from "lucide-react";

export const departments: Departments[] = [
    {
      icon: Database,
      title: "Information Systems (IS)",
      depart: "IS",
      desc: "Focus on business information systems and database management",
    },
    {
      icon: Server,
      title: "Information Technology (IT)",
      depart: "IT",
      desc: "Specialization in networks, cybersecurity, and IT infrastructure",
    },
    {
      icon: Code,
      title: "Computer Science (CS)",
      depart: "CS",
      desc: "Advanced programming, algorithms, and software engineering",
    },
  ];