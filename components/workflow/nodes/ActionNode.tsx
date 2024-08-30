// ActionNode.tsx
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

export type ActionNodeData = {
  label?: string;
};

export type ActionNode = Node<ActionNodeData>;

export default function ActionNode({ data }: NodeProps<ActionNode>) {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    // Load toast, save info to db
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
                    src="/assets/images/action-runner.png"
                    alt="Action Icon"
                    width={15}
                    height={15}
                  />
                  <p className="ml-1 hidden sm:block text-black text-xs font-medium">
                    Action
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 text-10-regular">
              <p>Select the action for the bot to run.</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Action Menu</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Create the action the bot should do here. Click save when you're done. Still getting built!
          </DialogDescription>
          {/* This is where you should put the options for the menu */}
          <DialogFooter>
            <Button type="submit" className="gradient-blue" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
