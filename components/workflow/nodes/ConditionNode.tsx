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
  DialogFooter,
} from "@/components/ui/dialog";

import { useState } from "react";
import NodeMenu from "@/components/NodeMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropDownPopover } from "@/components/DropDownPopover";

export type ConditionNodeData = {
  label?: string;
};

export type ConditionNode = Node<ConditionNodeData>;

const conditionType = [
  {
    value: "Price-Based",
    label: "Price-Based",
  },
  {
    value: "Technical Indicator",
    label: "Technical Indicator",
  },
  {
    value: "Time-Based",
    label: "Time-Based",
  }
]

export default function ConditionNode({ data }: NodeProps<ConditionNode>) {
  const [open, setOpen] = useState(false);
  const [triggerEvent, setTriggerEvent] = useState(""); // State to hold the trigger
  const [marketkName, setMarketName] = useState("Condition"); // State to hold the stock name

  const youre = "you're";

  const handleSave = () => {
    // Load the toast, save info to database
    setOpen(false);
  };

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
                      src="/assets/icons/light-bulb-2.svg"
                      alt="Action Icon"
                      width={15}
                      height={15}
                    />
                    <p className="ml-1 hidden sm:block text-black text-xs font-medium">
                      Condition
                    </p>
                  </div>
                  <div className="w-fit">
                    <NodeMenu setOpen={setOpen} />
                  </div>
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
            Create your conditions here.Click save when {youre} done.
          </DialogDescription>
          {/* <Button className="relative flex items-center w-[200px] gradient-blue justify-between border">
            <p>Trigger at </p>
            <Select
              onValueChange={(value) => setTriggerEvent(value)} // Update trigger event state
            >
              <SelectTrigger className="shad-select">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="absolute left-0 mt-2">
                <SelectItem value="Market Open" className="cursor-pointer">
                  Market Open
                </SelectItem>
                <SelectItem value="Market Close" className="cursor-pointer">
                  Market Close
                </SelectItem>
                <SelectItem value="Custom Time" className="cursor-pointer">
                  Custom Time
                </SelectItem>
              </SelectContent>
            </Select>
          </Button> */}
          <DropDownPopover
            onSelect={(selectedMarket) => setMarketName(selectedMarket)} 
            placeholder="Select Category"
            options={conditionType}// Pass the selected stock to update the state
          />
          <DialogFooter>
            <Button
              type="submit"
              className="gradient-blue"
              onClick={handleSave}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
