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
import { useState } from "react";

export type ConditionNodeData = {
  label?: string;
};

export type ConditionNode = Node<ConditionNodeData>;

export default function ConditionNode({ data }: NodeProps<ConditionNode>) {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // Load the toast, save info to database
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle>
                <div className="flex items-center border-2 border-black rounded-lg p-1 w-fit bg-slate-500">
                  <Image
                    src="/assets/images/split-rgb.png"
                    alt="Action Icon"
                    width={15}
                    height={15}
                  />
                  <p className="ml-1 hidden sm:block text-black text-xs font-medium">
                    Condition
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 text-10-regular">
              <p>Create the conditions needed for the bot.</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Condition Menu</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Create your conditions here. You can add as many conditions as you wish, just click on the + button after selecting.
            Click save when you're done.
            Still getting built!
          </DialogDescription>
          {/* This is where you should put the options for the menu */}
          <DialogFooter>
            <Button type="submit" className="gradient-blue" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div >
  );
}
