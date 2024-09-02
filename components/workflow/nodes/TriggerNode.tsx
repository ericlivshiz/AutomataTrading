import {useContext, useState } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import NodeMenu from "@/components/NodeMenu";
import { StockTypeSelect } from "@/components/StockTypeSelect";

export type TriggerNodeData = {
  label?: string;
};

export type TriggerNode = Node<TriggerNodeData>;

export default function TriggerNode(data: NodeProps<TriggerNode>) {
  const [open, setOpen] = useState(false);
  const youre = "you're";



  const handleSave = () => {
    // Load toast and save info to db
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center border border-slate-200 rounded-lg px-2 py-1 w-fit bg-sky-600">
                    <Image
                      src="/assets/icons/bolt.svg"
                      alt="Trigger Icon"
                      width={15}
                      height={15}
                    />
                    <p className="ml-1 hidden sm:block text-black text-xs font-medium" >Trigger</p>
                  </div>
                  <div className="w-fit">
                    <NodeMenu setOpen={setOpen} />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 text-10-regular">
              <p>Select the event that starts your bot.</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Trigger Menu</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Create your trigger event here. Click save when {youre} done.
            Still getting built!
          </DialogDescription>
          <StockTypeSelect />
          <Button className="flex items-center w-[200px] gradient-blue justify-between border">
            <p>Trigger at </p>
            <Select>
              <SelectTrigger className="shad-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-none">
                <SelectItem value="market-open" className="cursor-pointer">Market Open</SelectItem>
                <SelectItem value="market-close" className="cursor-pointer">Market Close</SelectItem>
                <SelectItem value="custom-time" className="cursor-pointer">Custom Time</SelectItem>
              </SelectContent>
            </Select>
          </Button>
          <DialogFooter>
            <Button type="submit" className="gradient-blue" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
