"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Option {
  title?: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

export function DialogProvider({
  title,
  description,
  open,
  setOpen,
  children,
}: Option) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
