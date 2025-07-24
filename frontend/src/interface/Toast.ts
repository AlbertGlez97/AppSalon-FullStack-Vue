interface Toast {
  open: (options: { message: string; type: string }) => void
}

export type { Toast }