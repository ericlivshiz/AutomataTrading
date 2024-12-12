import { useContext, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import NodeMenu from "@/components/NodeMenu";
import { StockTypeSelect } from "@/components/StockTypeSelect";
import { DropDownPopover } from "@/components/DropDownPopover";

export type TriggerNodeData = {
  label?: string;
};

export type TriggerNode = Node<TriggerNodeData>;

const stockTypes = [
  {
    value: "APPL",
    label: "APPL",
  },
  {
    value: "MSFT",
    label: "MSFT",
  },
  {
    value: "NVDA",
    label: "NVDA",
  },
  {
    value: "GOOGL",
    label: "GOOGL",
  },
  {
    value: "AMZN",
    label: "AMZN",
  },
  {
    value: "META",
    label: "META",
  },
  {
    value: "BRK.B",
    label: "BRK.B",
  },
  {
    value: "LLY",
    label: "LLY",
  },  
]

const marketTypes = [
  {
    value: "Market Open",
    label: "Market Open",
  },
  {
    value: "Market Close",
    label: "Market Close",
  },
  {
    value: "Custom Time",
    label: "Custom Time",
  },
];

export default function TriggerNode(data: NodeProps<TriggerNode>) {
  const [open, setOpen] = useState(false);
  const [stockName, setStockName] = useState("Trigger"); // State to hold the stock name
  const [triggerEvent, setTriggerEvent] = useState(""); // State to hold the trigger event=
  const [updateNode, setUpdateNode] = useState(false);
  const [marketName, setMarketName] = useState("Trigger"); // State to hold the market name 
  const your = "you're";
  const handleSave = () => {
    // Close the dialog after saving changes
    setOpen(false);
    setUpdateNode(true);
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
                      src="/assets/icons/bolt.svg"
                      alt="Trigger Icon"
                      width={15}
                      height={15}
                    />
                    <p className="ml-1 hidden sm:block text-black text-xs font-medium">
                      {stockName}
                    </p>
                  </div>
                  <div className="w-fit">
                    <NodeMenu setOpen={setOpen} />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 text-10-regular">
              {updateNode ? (
                <div>
                  <p>Stock: {stockName}</p>
                  <p>Trigger at: {triggerEvent}</p>
                </div>
              ) : (
                <div>
                  <p>Create the trigger needed for the bot.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Trigger Menu</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Create your trigger event here. Click save when {your} done.
          </DialogDescription>
          <DropDownPopover
            onSelect={(selectedStock) => setStockName(selectedStock)}
            placeholder="Select Stock"
            options={stockTypes} // Pass the selected stock to update the state
          />
          
          <DropDownPopover
            onSelect={(selectedMarket) => setMarketName(selectedMarket)} 
            placeholder="Select Time"
            options={marketTypes}// Pass the selected stock to update the state
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
    </div>
  );
}
