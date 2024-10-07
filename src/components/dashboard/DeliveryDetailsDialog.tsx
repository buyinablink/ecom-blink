import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import ReclaimComponent from "./Reclaim";

interface DeliveryDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: {
    trackingNumber: string;
    deliveryDate: string;
  }) => void;
  currentOrderId: string;
  updateOrderStatus1: any;
}

export function DeliveryDetailsDialog({
  isOpen,
  onClose,
  currentOrderId,
  updateOrderStatus1,
}: DeliveryDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Verify</DialogTitle>
        <ReclaimComponent
          currentOrderId={currentOrderId}
          updateOrderStatus1={updateOrderStatus1}
        />
      </DialogContent>
    </Dialog>
  );
}
