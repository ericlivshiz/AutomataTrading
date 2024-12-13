import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useReactFlow } from "@xyflow/react";

interface NodeMenuProps {
  setOpen: (open: boolean) => void;
  nodeId: string;
}

const NodeMenu = ({ setOpen, nodeId }: NodeMenuProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const hideSelector = (e: React.MouseEvent) => {
      e.stopPropagation();  // This stops the event from reaching the DialogTrigger
      setOpen(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      
      // Remove the node
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
      
      // Remove any connected edges
      setEdges((edges) => edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ));
      
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
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-500">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

export default NodeMenu