import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"


const NodeMenu = ({ setOpen }: any) => {
    const hideSelector = (e: React.MouseEvent) => {
      e.stopPropagation();  // This stops the event from reaching the DialogTrigger
      setOpen(false);
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src="/assets/images/triple-vertical-dots-2.png"
            alt="Action Icon"
            width={25}
            height={25}
            onClick={hideSelector}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel onClick={hideSelector}>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={hideSelector} className="cursor-pointer">Duplicate</DropdownMenuItem>
          <DropdownMenuItem onClick={hideSelector} className="cursor-pointer"> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  

export default NodeMenu