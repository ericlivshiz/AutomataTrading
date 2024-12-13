import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import {
  Card,
  CardContent,
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
import ActionDropdown from "@/components/ActionDropdown";
import { ActionValue } from "@/types/actionTypes";

export type ActionNodeData = {
  label?: string;
  id: string;
};

export type ActionNode = Node<ActionNodeData>;

export default function ActionNode({ data, id }: NodeProps<ActionNode>) {
  const [open, setOpen] = useState(false);
  const [actionDetails, setActionDetails] = useState<ActionValue>({ action: 'Action' });
  const [updateNode, setUpdateNode] = useState(false);
  const youre = "you're";

  const handleSave = () => {
    setUpdateNode(true);
    setOpen(false);
  };

  const handleActionChange = (details: ActionValue) => {
    setActionDetails(details);
  };

  const getDisplayText = () => {
    if (!actionDetails.action || actionDetails.action === 'Action') {
      return 'Action';
    }

    const { action, symbol, quantity, email, message, phoneNumber } = actionDetails;

    switch (action) {
      case 'Place Buy Order':
      case 'Place Sell Order':
        if (symbol && quantity) {
          return `${action}: ${symbol} x${quantity}`;
        }
        return action;
      case 'Send Email':
        if (email && message) {
          return `${action} to ${email}`;
        }
        return action;
      case 'Send Text':
        if (phoneNumber && message) {
          return `${action} to ${phoneNumber}`;
        }
        return action;
      default:
        return action;
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card>
            <CardHeader className="p-2">
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-slate-200 rounded-lg px-2 py-1 w-fit bg-sky-600">
                    <Image
                      src="/assets/icons/run-action.svg"
                      alt="Action Icon"
                      width={17}
                      height={17}
                    />
                    <p className="ml-1 hidden sm:block text-black text-xs font-medium">
                      {getDisplayText()}
                    </p>
                  </div>
                  <div className="">
                    <NodeMenu setOpen={setOpen} nodeId={id} />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 text-10-regular">
              {updateNode ? (
                <p>Action: {getDisplayText()}</p>
              ) : (
                <p>Select the action for the bot to run.</p>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="shad-dialog">
          <DialogHeader>
            <DialogTitle>Action Menu</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Create the action the bot should do here. Click save when {youre} done.
          </DialogDescription>
          <ActionDropdown onActionChange={handleActionChange} />
          <DialogFooter>
            <Button type="submit" className="gradient-blue" onClick={handleSave}>
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
